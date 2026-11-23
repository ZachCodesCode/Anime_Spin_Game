"""Bounded offline ACDB HTML parser. Never fetches or executes page resources."""
import sys,json,re,hashlib
from html.parser import HTMLParser
from urllib.parse import urljoin,urlparse,parse_qs
class Node:
 def __init__(self,tag='',attrs=None,parent=None):self.tag=tag;self.attrs=dict(attrs or []);self.parent=parent;self.children=[];self.closed=False
 def walk(self):
  yield self
  for c in self.children:
   if isinstance(c,Node):yield from c.walk()
 def text(self):return re.sub(r'\s+',' ',''.join(c.text() if isinstance(c,Node) else c for c in self.children)).strip()
class Tree(HTMLParser):
 def __init__(self):super().__init__(convert_charrefs=True);self.root=Node();self.stack=[self.root];self.count=0
 def handle_starttag(self,tag,attrs):
  if self.count>200000:raise ValueError('HTML node limit exceeded')
  self.count+=1
  stop={'tr':{'tr'},'td':{'td','th'},'th':{'td','th'},'li':{'li'},'dt':{'dt','dd'},'dd':{'dt','dd'},'p':{'p'}}.get(tag,set())
  boundary={'tr':{'table'},'td':{'tr','table'},'th':{'tr','table'},'li':{'ul','ol'}}.get(tag,set())
  for i in range(len(self.stack)-1,0,-1):
   if self.stack[i].tag in boundary:break
   if self.stack[i].tag in stop:self.stack=self.stack[:i];break
  n=Node(tag,attrs,self.stack[-1]);self.stack[-1].children.append(n)
  if tag not in {'br','img','meta','link','input','hr','source','wbr','area','base','embed','param','track','col'}:self.stack.append(n)
 def handle_endtag(self,tag):
  for i in range(len(self.stack)-1,0,-1):
   if self.stack[i].tag==tag:self.stack[i].closed=True;self.stack=self.stack[:i];return
 def handle_data(self,text):
  if not any(n.tag in {'script','style','noscript','nav','footer','aside','form'} for n in self.stack):self.stack[-1].children.append(text)
def near(n,tag):
 n=n.parent
 while n:
  if n.tag==tag:return n
  n=n.parent
 return None
def url_id(url):
 u=urlparse(urljoin('https://www.animecharactersdatabase.com/',url));ids=parse_qs(u.query).get('id',[])
 return ids[0] if u.hostname in ['www.animecharactersdatabase.com','animecharactersdatabase.com'] and u.path=='/characters.php' and len(ids)==1 and ids[0].isdigit() else None
def parse(html,entry):
 t=Tree();t.feed(html);t.close();nodes=list(t.root.walk());rows=[]
 for n in nodes:
  if n.tag!='tr':continue
  cells=[c for c in n.children if isinstance(c,Node) and c.tag in ['th','td']]
  if len(cells)>=2:rows.append((cells[0].text().strip(' :').lower(),cells[1],near(n,'table')))
 tables={id(table):table for _,_,table in rows if table};info=[]
 for table in tables.values():
  own=[r for r in rows if r[2] is table];keys={k for k,_,_ in own}
  if 'name' in keys and ('id' in keys or 'primary assignment' in keys):info.append(own)
 if len(info)>1:raise ValueError('Ambiguous character profile tables')
 own=info[0] if info else [];found_ids=[c.text() for k,c,_ in own if k=='id'];declared=[]
 for n in nodes:
  if n.tag=='meta' and n.attrs.get('property')=='og:url' or n.tag=='link' and n.attrs.get('rel')=='canonical':
   q=url_id(n.attrs.get('content') or n.attrs.get('href',''))
   if q:declared.append(q)
  if n.tag=='h1':
   for a in n.walk():
    if a.tag=='a' and url_id(a.attrs.get('href','')):declared.append(url_id(a.attrs['href']))
 expected=str(entry.get('characterId') or '')
 identities=set(found_ids+declared+([expected] if expected else []))
 if len(identities)!=1 or not next(iter(identities)).isdigit():raise ValueError('Missing or conflicting ACDB character ID')
 cid=next(iter(identities));source=entry.get('sourceUrl') or 'https://www.animecharactersdatabase.com/characters.php?id='+cid
 if url_id(source)!=cid:raise ValueError('Manifest source URL/ID mismatch')
 names=[c.text() for k,c,_ in own if k=='name'];name=names[0] if names else entry.get('name')
 if not name:raise ValueError('Missing character name (partial pages need manifest name)')
 character_name=name
 if entry.get('name') and names and entry['name'].casefold()!=name.casefold():raise ValueError('Manifest/page character name mismatch')
 fields={};coverage={'tagsSectionPresent':False,'tagsAbsenceAuthoritative':False,'profileSectionPresent':False,'partialInput':not any(n.tag=='html' and n.closed for n in nodes),'warnings':[]};tags=[]
 def tags_from(cell):
  links=[n for n in cell.walk() if n.tag=='a' and n.text() and urlparse(urljoin('https://www.animecharactersdatabase.com/',n.attrs.get('href',''))).hostname in ['animecharactersdatabase.com','www.animecharactersdatabase.com'] and any(k in parse_qs(urlparse(n.attrs.get('href','')).query) for k in ['tag','tag_id','tid'])]
  if links:
   for a in links:
    query=parse_qs(urlparse(a.attrs.get('href','')).query)
    if any(query.get(k) and query[k]!=[cid] for k in ['cid','character_id']):raise ValueError('Tag assignment points to a different character')
    tagid=(query.get('tag_id') or query.get('tid') or [None])[0]
    # tag=glasses is a label, not a fabricated numeric tag ID.
    if tagid is None and query.get('tag',[''])[0].isdigit():tagid=query['tag'][0]
    tags.append({'label':a.text(),'tagId':tagid,'entityType':'character'})
  else:
   # A tag editor/menu link is not a plain-text tag assignment.
   if any(n.tag in ['a','button','input'] for n in cell.walk()):return
   for text in re.split(r'[,;\n]',cell.text()):
    if text.strip() and text.strip().lower() not in ['none','no tags','no tags yet','no tags found','add tags','add a tag']:tags.append({'label':text.strip(),'entityType':'character'})
 # Restrict generic headings to the character's region, ending before community widgets.
 main_start=next((i for i,n in enumerate(nodes) if n.tag=='h1' and any(a.tag=='a' and url_id(a.attrs.get('href',''))==cid for a in n.walk())),0)
 main_end=next((i for i,n in enumerate(nodes) if i>main_start and n.tag in ['h2','h3','h4'] and n.text().strip().lower() in ['comments','community','suggested characters','similar characters','site events','recommendations']),len(nodes))
 main_nodes=nodes[main_start:main_end]
 for key,cell,_ in own:
  if key=='tags':coverage['tagsSectionPresent']=True;tags_from(cell)
 for h in main_nodes:
  if not coverage['tagsSectionPresent'] and h.tag in ['h2','h3','h4'] and h.text().strip().lower()=='tags':
   coverage['tagsSectionPresent']=True;start=nodes.index(h)+1;end=next((i for i in range(start,main_end) if nodes[i].tag in ['h2','h3','h4']),main_end)
   # Heading sections usually have a list or tag container, never harvest the rest of the page.
   section=nodes[start:end];container=next((n for n in section if n.tag in ['ul','div','p'] and not near(n,'nav')),None)
   if container:tags_from(container)

 # Alternate explicit character-tag container; never a site-wide Tags menu.
 if not coverage['tagsSectionPresent']:
  for n in main_nodes:
   if n.attrs.get('id') in ['character-tags','character_tags'] and n.attrs.get('data-character-id',cid)==cid:coverage['tagsSectionPresent']=True;tags_from(n)
 mapping={'other names':'aliases','aliases':'aliases','japanese name':'japaneseName','role':'characterRole','gender':'gender','sex':'gender','hair color':'hairColour','hair colour':'hairColour','eye color':'eyeColour','eye colour':'eyeColour','hair length':'hairLength','apparent age':'apparentAge','age':'ages','ages':'ages','height':'height','birthday':'birthday','occupation':'occupations','position':'positions','crew':'crewMembership','organization':'affiliations','affiliation':'affiliations','species':'species','race':'race','weapons':'weapons','weapon':'weapons','abilities':'abilities','powers':'abilities','special abilities':'abilities','special powers':'abilities','power':'abilities','family':'family','friends':'friendships','rivals':'rivalries','enemies':'enemies','relationships':'relationships','crew membership':'crewMembership','organizations':'affiliations','affiliations':'affiliations','personality':'personality','devil fruit':'devilFruit'}
 headings=[n for n in main_nodes if n.tag in ['h2','h3','h4']];profile_heads=[n for n in headings if n.attrs.get('id')=='section001_summary' or n.text().lower() in ['profile','biography','character profile']]
 scoped=list(own);description=[]
 for h in profile_heads:
  coverage['profileSectionPresent']=True;start=nodes.index(h);end=next((nodes.index(n) for n in headings if nodes.index(n)>start),main_end);section=nodes[start+1:end]
  section_ids={id(n) for n in section};scoped.extend(r for r in rows if id(r[1]) in section_ids)
  description.extend(n.text() for n in section if n.tag=='p' and n.text() and not near(n,'table'))
  for n in section:
   if n.tag=='dt':
    siblings=n.parent.children;i=siblings.index(n);dd=next((x for x in siblings[i+1:] if isinstance(x,Node)),None)
    if dd and dd.tag=='dd':scoped.append((n.text().strip(' :').lower(),dd,None))
 for key,cell,_ in scoped:
  if key not in mapping or not cell.text():continue
  field=mapping[key];text=cell.text();parts=[text]
  if field in ['family','friendships','rivalries','enemies','relationships']:
   targets=[{'target':{'name':a.text(),'externalId':url_id(a.attrs.get('href',''))}} for a in cell.walk() if a.tag=='a' and a.text() and url_id(a.attrs.get('href',''))]
   fields.setdefault(field,[]).extend(targets or [s.strip() for s in re.split(r'[,;]',text) if s.strip()]);continue
  if field in ['ages','aliases','occupations','positions','abilities','weapons','affiliations','crewMembership']:parts=[s.strip() for s in re.split(r'[,;]|\s+/\s+',text) if s.strip()]
  if field=='ages':parts=[{'value':s,'context':{'scope':'Explicit source age; chronology unspecified; not permanently true'}} for s in parts]
  fields.setdefault(field,[]).extend(parts)
 for field,values in list(fields.items()):fields[field]=list({json.dumps(v,sort_keys=True):v for v in values}.values())
 # Primary media must be explicit; assignment titles alone do not prove anime.
 primary=[c for k,c,_ in own if k=='primary assignment'];media=[c.text().lower() for k,c,_ in own if k=='media type'];appearances=[]
 if primary:
  for a in primary[0].walk():
   if a.tag=='a' and urlparse(a.attrs.get('href','')).path.endswith('source.php'):appearances.append({'title':a.text(),'externalTitleId':(parse_qs(urlparse(a.attrs['href']).query).get('id') or [None])[0],'media':'anime' if media==['anime'] else 'unknown','primary':True})
 relation_heads=[h for h in headings if h.attrs.get('id')=='section23' or h.text().lower() in ['relations','relationships','family']]
 relations=[]
 for h in relation_heads:
  start=nodes.index(h);end=next((nodes.index(n) for n in headings if nodes.index(n)>start),main_end)
  for n in nodes[start+1:end]:
   if n.tag=='li':
    labels=[parse_qs(urlparse(a.attrs.get('href','')).query).get('relation',[''])[0] for a in n.walk() if a.tag=='a' and urlparse(a.attrs.get('href','')).path.endswith('relations.php')]
    relation=labels[0] if len(labels)==1 else '';r=relation.lower().strip()
    # ACDB labels describe SUBJECT relative to TARGET. Do not reverse parent/child.
    kind='unmapped'
    if re.fullmatch(r'(younger |older )?(brother|sister|sibling) of',r):kind='sibling'
    elif r in ['mother of','father of','parent of']:kind='child'
    elif r in ['son of','daughter of','child of']:kind='parent'
    elif r in ['friend of','rival of','enemy of']:kind=r.split()[0]
    elif r=='mentor of':kind='student'
    elif r=='student of':kind='mentor'
    elif r in ['married to','spouse of']:kind='spouse'
    targets={}
    for a in n.walk():
     target=url_id(a.attrs.get('href','')) if a.tag=='a' else None
     if target and target!=cid and a.text():targets[target]=a.text()
    for target,target_name in targets.items():relations.append({'type':kind,'sourceRelation':relation or 'unspecified','target':{'name':target_name,'externalId':target}})
   if n.tag!='tr':continue
   cells=[c for c in n.children if isinstance(c,Node) and c.tag in ['th','td']]
   relation_label=cells[0].text().strip(' :').lower() if cells else '';types=[relation_label] if relation_label in ['father','mother','sister','brother','friend','rival','enemy','mentor','spouse'] else []
   for a in n.walk():
    target=url_id(a.attrs.get('href','')) if a.tag=='a' else None
    if target and target!=cid:relations.append({'type':types[0] if len(types)==1 else 'unmapped','target':{'name':a.text(),'externalId':target}})
 if relations:fields['relationships']=relations
 profile={'externalId':cid,'name':character_name,'sourceUrl':source,'appearances':appearances,'fields':fields,'pageExtraction':coverage}
 if coverage['tagsSectionPresent']:
  owners={}
  for tag in tags:
   if tag.get('tagId'):
    prior=owners.setdefault(tag['tagId'],tag['label'].casefold())
    if prior!=tag['label'].casefold():raise ValueError('Conflicting labels for the same tag ID')
  profile['tags']=list({(v['label'].casefold(),v.get('tagId')):v for v in tags}.values())
 if description:profile['description']='\n'.join(dict.fromkeys(description))
 coverage['structuredFields']=len(fields);coverage['characterTagsExtracted']=len(profile.get('tags',[]));coverage['descriptionPresent']=bool(description)
 if not info:coverage['warnings'].append('Primary profile table missing; identity relies on supplied manifest/page metadata')
 return profile
if __name__=='__main__':
 try:
  p=json.load(sys.stdin);html=p['html']
  if len(html)>10*1024*1024:raise ValueError('HTML exceeds 10 MiB limit')
  print(json.dumps(parse(html,p.get('entry',{})),ensure_ascii=False))
 except Exception as e:print(str(e),file=sys.stderr);sys.exit(1)
