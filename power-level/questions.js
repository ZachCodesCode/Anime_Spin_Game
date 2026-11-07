// Frozen v4 bank: one broad prompt per anime, each with dozens of valid answers.
// Rarity is an editorial 0–100 rating of how obscure an answer is, not fighting strength.
// Never edit a frozen file: copy it to a new version, and keep power-level/questions.js identical to the newest.
const POWER_LEVEL_SERIES=[{"id":"bleach","name":"Bleach"},{"id":"naruto","name":"Naruto"},{"id":"onepiece","name":"One Piece"},{"id":"hxh","name":"Hunter × Hunter"},{"id":"tokyoghoul","name":"Tokyo Ghoul"},{"id":"mha","name":"My Hero Academia"},{"id":"blackclover","name":"Black Clover"},{"id":"demonslayer","name":"Demon Slayer"},{"id":"aot","name":"Attack on Titan"}];
const POWER_LEVEL_QUESTIONS=(()=>{
const a=(name,rarity,...aliases)=>aliases.length?{name,aliases,rarity}:{name,rarity};
const q=(id,anime,category,text,note,answers)=>({id:'timed-v4-'+id,anime,category,text,note,answers});
return [
q('naruto-leaf','naruto','Naruto','Naruto — Name any shinobi from the Hidden Leaf Village.','Naruto & Shippuden · any rank, living or dead',[
 a('Naruto Uzumaki',0,'Naruto'),a('Sasuke Uchiha',2,'Sasuke'),a('Kakashi Hatake',2,'Kakashi'),a('Sakura Haruno',3,'Sakura'),
 a('Itachi Uchiha',5,'Itachi'),a('Jiraiya',6),a('Tsunade',6),a('Shikamaru Nara',8,'Shikamaru'),a('Hinata Hyuga',8,'Hinata','Hinata Hyuuga'),
 a('Rock Lee',8,'Lee'),a('Minato Namikaze',8,'Minato','Fourth Hokage'),a('Might Guy',10,'Guy','Gai','Might Gai','Maito Gai'),a('Neji Hyuga',10,'Neji','Neji Hyuuga'),
 a('Orochimaru',12),a('Hiruzen Sarutobi',15,'Hiruzen','Third Hokage'),a('Madara Uchiha',15,'Madara'),a('Obito Uchiha',18,'Obito'),
 a('Kiba Inuzuka',18,'Kiba'),a('Hashirama Senju',20,'Hashirama','First Hokage'),a('Choji Akimichi',20,'Choji','Chouji','Chouji Akimichi'),a('Ino Yamanaka',20,'Ino'),
 a('Tobirama Senju',25,'Tobirama','Second Hokage'),a('Shino Aburame',25,'Shino'),a('Tenten',25),a('Iruka Umino',25,'Iruka'),a('Sai',25,'Sai Yamanaka'),
 a('Asuma Sarutobi',28,'Asuma'),a('Yamato',30,'Tenzo','Tenzou'),a('Konohamaru Sarutobi',30,'Konohamaru'),a('Danzo Shimura',30,'Danzo','Danzou'),a('Kabuto Yakushi',30,'Kabuto'),
 a('Kurenai Yuhi',35,'Kurenai','Kurenai Yuuhi'),a('Shisui Uchiha',35,'Shisui'),a('Kushina Uzumaki',40,'Kushina'),a('Anko Mitarashi',45,'Anko'),a('Rin Nohara',45,'Rin'),
 a('Shizune',45),a('Ibiki Morino',55,'Ibiki'),a('Hanabi Hyuga',55,'Hanabi','Hanabi Hyuuga'),a('Shikaku Nara',55,'Shikaku'),a('Hiashi Hyuga',60,'Hiashi','Hiashi Hyuuga'),
 a('Fugaku Uchiha',60,'Fugaku'),a('Inoichi Yamanaka',65,'Inoichi'),a('Genma Shiranui',70,'Genma'),a('Ebisu',70),a('Hizashi Hyuga',70,'Hizashi','Hizashi Hyuuga'),
 a('Choza Akimichi',70,'Choza','Chouza'),a('Sakumo Hatake',70,'Sakumo','White Fang'),a('Mizuki',70),a('Moegi',70,'Moegi Kazamatsuri'),a('Udon',75,'Udon Ise'),
 a('Hayate Gekko',75,'Hayate','Hayate Gekkou'),a('Mikoto Uchiha',75,'Mikoto'),a('Dan Kato',75,'Dan'),a('Izumo Kamizuki',80,'Izumo'),a('Kotetsu Hagane',80,'Kotetsu'),
 a('Tsume Inuzuka',80,'Tsume'),a('Aoba Yamashiro',85,'Aoba'),a('Raido Namiashi',85,'Raido'),a('Hana Inuzuka',85,'Hana'),a('Nawaki Senju',85,'Nawaki'),
 a('Shibi Aburame',90,'Shibi'),a('Torune Aburame',90,'Torune'),a('Homura Mitokado',90,'Homura'),a('Koharu Utatane',90,'Koharu'),
 a('Tokuma Hyuga',92,'Tokuma','Tokuma Hyuuga'),a('Yugao Uzuki',92,'Yugao'),a('Kagami Uchiha',100,'Kagami')]),
q('onepiece-fruit','onepiece','One Piece','One Piece — Name any Devil Fruit user.','Anyone shown to have eaten a Devil Fruit, including SMILEs',[
 a('Monkey D. Luffy',0,'Luffy'),a('Tony Tony Chopper',5,'Chopper'),a('Nico Robin',5,'Robin'),a('Brook',8),a('Portgas D. Ace',8,'Ace'),
 a('Trafalgar Law',10,'Law','Trafalgar D. Water Law'),a('Marshall D. Teach',12,'Blackbeard','Teach'),a('Donquixote Doflamingo',12,'Doflamingo','Doffy'),a('Buggy',12,'Buggy the Clown'),
 a('Boa Hancock',15,'Hancock'),a('Crocodile',15,'Sir Crocodile'),a('Edward Newgate',15,'Whitebeard'),a('Kaido',15,'Kaidou'),a('Charlotte Linlin',15,'Big Mom','Linlin'),
 a('Sabo',18),a('Sakazuki',18,'Akainu'),a('Kuzan',18,'Aokiji'),a('Enel',20,'Eneru'),a('Marco',20,'Marco the Phoenix'),a('Borsalino',20,'Kizaru'),a('Charlotte Katakuri',20,'Katakuri'),
 a('Rob Lucci',22,'Lucci'),a('Smoker',22),a('Bartholomew Kuma',25,'Kuma'),a('Gecko Moria',25,'Moria'),a('Eustass Kid',25,'Kid','Kidd','Eustass Kidd'),
 a('Bentham',25,'Mr. 2','Bon Clay','Bon Kurei','Mr. 2 Bon Clay'),a('Yamato',25),a('Issho',30,'Fujitora'),a('Perona',30),a('Magellan',30),a('Emporio Ivankov',30,'Ivankov','Iva'),
 a('Jewelry Bonney',35,'Bonney'),a('Galdino',35,'Mr. 3'),a('Caesar Clown',35,'Caesar'),a('Sengoku',35),a('Queen',35),a('King',35,'Alber'),
 a('Kaku',40),a('Wapol',40),a('Jack',40,'Jack the Drought'),a('Charlotte Pudding',40,'Pudding'),a('Capone Bege',40,'Bege'),
 a('Basil Hawkins',45,'Hawkins'),a('Daz Bonez',45,'Mr. 1'),a('Bellamy',45),a('Sugar',45),a('Charlotte Cracker',45,'Cracker'),a('Foxy',45),a('Momonosuke',45,'Kozuki Momonosuke','Momo'),
 a('X Drake',50,'Drake'),a('Monet',50),a('Baby 5',50,'Baby Five'),a('Charlotte Perospero',50,'Perospero'),a('Kurozumi Kanjuro',50,'Kanjuro'),a('Alvida',50),
 a('Scratchmen Apoo',55,'Apoo'),a('Aramaki',55,'Ryokugyu','Green Bull'),a('Kalifa',55),a('Pell',55),a('Trebol',55),a('Viola',55,'Violet'),a('Charlotte Smoothie',55,'Smoothie'),
 a('Charlotte Brulee',55,'Brulee'),a('Kurozumi Orochi',55,'Orochi'),a('Kin\'emon',55,'Kinemon'),a('Shiryu',55),a('Boa Sandersonia',55,'Sandersonia'),a('Boa Marigold',55,'Marigold'),
 a('Miss Doublefinger',60,'Zala'),a('Mr. 5',60,'Gem'),a('Miss Valentine',60,'Mikita'),a('Blueno',60),a('Jabra',60),a('Diamante',60),a('Pica',60),a('Senor Pink',60,'Señor Pink'),
 a('Buffalo',60),a('Charlotte Oven',60,'Oven'),a('Caribou',60),a('Van Augur',60),
 a('Gladius',65),a('Charlotte Daifuku',65,'Daifuku'),a('Ulti',65),a('Black Maria',65),a('Absalom',65),a('Inazuma',65),
 a('Machvise',75),a('Jora',75),a('Laffitte',70),a('Page One',70),a('Vander Decken IX',70,'Vander Decken'),a('Kozuki Toki',70,'Toki'),a('Miss Merry Christmas',70,'Drophy'),
 a('Who\'s-Who',75,'Whos Who'),a('Shinobu',75),a('Holdem',75),a('Sasaki',80),a('Chaka',100)]),
q('bleach-gotei','bleach','Bleach','Bleach — Name any captain or lieutenant of the Gotei 13, past or present.','Any era, including Thousand-Year Blood War',[
 a('Sosuke Aizen',3,'Aizen','Sousuke Aizen'),a('Kenpachi Zaraki',3,'Kenpachi','Zaraki'),a('Genryusai Shigekuni Yamamoto',5,'Yamamoto','Head Captain Yamamoto','Shigekuni Yamamoto'),
 a('Byakuya Kuchiki',5,'Byakuya'),a('Toshiro Hitsugaya',5,'Hitsugaya','Toshiro','Toushirou Hitsugaya'),a('Renji Abarai',5,'Renji'),a('Rukia Kuchiki',5,'Rukia'),
 a('Gin Ichimaru',10,'Gin'),a('Kisuke Urahara',10,'Urahara','Kisuke'),a('Rangiku Matsumoto',10,'Rangiku'),a('Yoruichi Shihoin',12,'Yoruichi','Yoruichi Shihouin'),
 a('Retsu Unohana',15,'Unohana'),a('Shunsui Kyoraku',15,'Kyoraku','Shunsui','Shunsui Kyouraku'),a('Mayuri Kurotsuchi',15,'Mayuri'),a('Momo Hinamori',15,'Hinamori','Momo'),
 a('Soi Fon',20,'Soifon','Sui-Feng','Suì-Fēng'),a('Jushiro Ukitake',20,'Ukitake','Juushirou Ukitake'),a('Yachiru Kusajishi',20,'Yachiru'),
 a('Sajin Komamura',25,'Komamura'),a('Kaname Tosen',25,'Tosen','Tousen'),a('Shuhei Hisagi',25,'Hisagi','Shuhei','Shuuhei Hisagi'),
 a('Shinji Hirako',30,'Shinji'),a('Izuru Kira',30,'Kira'),a('Nanao Ise',35,'Nanao'),a('Nemu Kurotsuchi',40,'Nemu'),
 a('Kensei Muguruma',45,'Kensei'),a('Kaien Shiba',45,'Kaien'),a('Isane Kotetsu',50,'Isane'),a('Hiyori Sarugaki',50,'Hiyori'),a('Marechiyo Omaeda',50,'Omaeda'),
 a('Rojuro Otoribashi',55,'Rose','Rojuro','Roujuurou Otoribashi'),a('Tetsuzaemon Iba',55,'Iba'),a('Love Aikawa',60,'Love'),a('Lisa Yadomaru',60,'Lisa'),
 a('Chojiro Sasakibe',65,'Sasakibe','Choujirou Sasakibe'),a('Mashiro Kuna',70,'Mashiro'),
 a('Kirio Hikifune',90,'Hikifune','Kirio'),a('Kenpachi Kiganjo',92,'Kiganjo'),a('Tenjiro Kirinji',100,'Kirinji','Tenjirou Kirinji')]),
q('hxh-troupe','hxh','Hunter × Hunter','Hunter × Hunter — Name any member of the Phantom Troupe or the Zoldyck family.','Includes former and replacement Troupe members',[
 a('Killua Zoldyck',0,'Killua'),a('Hisoka',0,'Hisoka Morow'),a('Chrollo Lucilfer',3,'Chrollo','Kuroro','Kuroro Lucifer'),a('Illumi Zoldyck',5,'Illumi'),
 a('Feitan',15,'Feitan Portor'),a('Silva Zoldyck',15,'Silva'),a('Zeno Zoldyck',15,'Zeno'),a('Phinks',20,'Phinks Magcub','Finks'),a('Machi',20,'Machi Komacine'),
 a('Uvogin',20,'Ubogin'),a('Milluki Zoldyck',20,'Milluki','Miluki'),a('Nobunaga Hazama',25,'Nobunaga'),a('Shalnark',25,'Sharnalk'),
 a('Alluka Zoldyck',25,'Alluka'),a('Kalluto Zoldyck',25,'Kalluto'),a('Shizuku Murasaki',30,'Shizuku'),a('Pakunoda',30,'Paku'),a('Kikyo Zoldyck',30,'Kikyo'),
 a('Franklin',35,'Franklin Bordeau'),a('Kortopi',50),a('Bonolenov Ndongo',55,'Bonolenov'),a('Maha Zoldyck',70,'Maha'),a('Omokage',100)]),
q('tokyoghoul-ghouls','tokyoghoul','Tokyo Ghoul','Tokyo Ghoul — Name any ghoul who worked at Anteiku or fought for Aogiri Tree.','Tokyo Ghoul & √A',[
 a('Ken Kaneki',0,'Kaneki','Ken','Eyepatch'),a('Touka Kirishima',3,'Touka','Toka Kirishima'),a('Yamori',10,'Jason'),a('Ayato Kirishima',12,'Ayato'),
 a('Nishiki Nishio',15,'Nishiki','Nishiki Nishiki'),a('Eto Yoshimura',15,'Eto','One-Eyed Owl','Sen Takatsuki'),a('Hinami Fueguchi',20,'Hinami'),
 a('Kuzen Yoshimura',25,'Yoshimura','Manager Yoshimura'),a('Renji Yomo',30,'Yomo'),a('Tatara',30),a('Naki',40),a('Seidou Takizawa',45,'Takizawa'),
 a('Enji Koma',50,'Koma'),a('Kaya Irimi',50,'Irimi'),a('Noro',50),a('Kurona Yasuhisa',55,'Kurona'),a('Nashiro Yasuhisa',60,'Nashiro'),a('Roma Hoito',70,'Roma')]),
q('mha-classes','mha','My Hero Academia','My Hero Academia — Name any student in U.A. High’s Class 1-A or Class 1-B.','Hero course first-years · real names or hero names',[
 a('Izuku Midoriya',0,'Deku','Izuku','Midoriya'),a('Katsuki Bakugo',0,'Bakugo','Bakugou','Kacchan','Katsuki Bakugou'),a('Shoto Todoroki',2,'Todoroki','Shoto','Shouto Todoroki'),
 a('Ochaco Uraraka',2,'Uraraka','Ochako Uraraka','Uravity'),a('Tenya Iida',5,'Iida','Ingenium'),a('Eijiro Kirishima',8,'Kirishima','Red Riot'),
 a('Momo Yaoyorozu',10,'Yaoyorozu','Creati'),a('Tsuyu Asui',10,'Tsuyu','Froppy'),a('Denki Kaminari',12,'Kaminari','Chargebolt'),a('Fumikage Tokoyami',15,'Tokoyami','Tsukuyomi'),
 a('Kyoka Jiro',18,'Jiro','Jirou','Earphone Jack','Kyouka Jirou'),a('Minoru Mineta',20,'Mineta','Grape Juice'),a('Mina Ashido',22,'Ashido','Pinky'),
 a('Hanta Sero',35,'Sero','Cellophane'),a('Yuga Aoyama',35,'Aoyama','Can\'t Stop Twinkling'),a('Neito Monoma',40,'Monoma','Phantom Thief'),
 a('Mashirao Ojiro',45,'Ojiro','Tailman'),a('Mezo Shoji',45,'Shoji','Tentacole'),a('Toru Hagakure',45,'Hagakure','Invisible Girl'),
 a('Itsuka Kendo',45,'Kendo','Battle Fist'),a('Tetsutetsu Tetsutetsu',45,'Tetsutetsu','Real Steel'),a('Koji Koda',55,'Koda','Anima'),a('Rikido Sato',55,'Sato','Sugarman'),
 a('Ibara Shiozaki',60,'Shiozaki','Vine'),a('Setsuna Tokage',70,'Tokage','Lizardy'),a('Pony Tsunotori',70,'Pony','Tsunotori'),
 a('Juzo Honenuki',75,'Honenuki','Mudman'),a('Kinoko Komori',75,'Komori','Shemage'),a('Yosetsu Awase',75,'Awase','Welder'),
 a('Kojiro Bondo',80,'Bondo','Plamo'),a('Reiko Yanagi',80,'Yanagi','Emily'),a('Jurota Shishida',80,'Shishida','Gevaudan'),a('Shihai Kuroiro',80,'Kuroiro','Vantablack'),
 a('Hiryu Rin',85,'Rin','Ryukyu'),a('Yui Kodai',85,'Kodai','Rule'),a('Nirengeki Shoda',85,'Shoda','Mines'),a('Manga Fukidashi',85,'Fukidashi','Comic Man'),
 a('Togaru Kamakiri',85,'Kamakiri','Jack Mantis'),a('Kosei Tsuburaba',85,'Tsuburaba','Membrane'),a('Sen Kaibara',100,'Kaibara','Spiral')]),
q('blackclover-knights','blackclover','Black Clover','Black Clover — Name any Magic Knight squad captain or any member of the Black Bulls.','Clover Kingdom · any point in the series',[
 a('Asta',0),a('Yami Sukehiro',2,'Yami'),a('Noelle Silva',5,'Noelle'),a('William Vangeance',15,'Vangeance','William'),a('Fuegoleon Vermillion',15,'Fuegoleon'),
 a('Magna Swing',15,'Magna'),a('Luck Voltia',15,'Luck'),a('Finral Roulacase',15,'Finral'),a('Vanessa Enoteca',15,'Vanessa'),
 a('Nozel Silva',20,'Nozel'),a('Mereoleona Vermillion',20,'Mereoleona'),a('Gauche Adlai',20,'Gauche'),a('Charmy Pappitson',20,'Charmy'),
 a('Charlotte Roselei',25,'Charlotte'),a('Grey',30,'Gray'),a('Secre Swallowtail',30,'Secre','Nero'),a('Jack the Ripper',35,'Jack'),
 a('Gordon Agrippa',35,'Gordon'),a('Zora Ideale',35,'Zora'),a('Nacht Faust',40,'Nacht'),a('Rill Boismortier',40,'Rill'),
 a('Henry Legolant',50,'Henry'),a('Dorothy Unsworth',50,'Dorothy'),a('Gueldre Poizot',55,'Gueldre')]),
q('demonslayer-ranks','demonslayer','Demon Slayer','Demon Slayer — Name any Hashira or any of the Twelve Kizuki (Upper and Lower Moons).','Current or former · Muzan doesn’t count',[
 a('Akaza',5),a('Kyojuro Rengoku',5,'Rengoku','Kyojuro','Kyoujurou Rengoku'),a('Giyu Tomioka',8,'Giyu','Giyuu Tomioka','Tomioka Giyu'),a('Shinobu Kocho',10,'Shinobu','Kocho Shinobu'),
 a('Tengen Uzui',10,'Tengen','Uzui'),a('Rui',15),a('Mitsuri Kanroji',15,'Mitsuri'),a('Sanemi Shinazugawa',20,'Sanemi'),a('Muichiro Tokito',20,'Muichiro','Muichirou Tokitou'),
 a('Doma',20,'Douma'),a('Gyomei Himejima',25,'Gyomei','Gyoumei Himejima'),a('Obanai Iguro',25,'Obanai'),a('Kokushibo',25,'Kokushibou'),a('Daki',25),a('Enmu',25),
 a('Gyutaro',30,'Gyuutarou'),a('Hantengu',40),a('Gyokko',40),a('Kanae Kocho',50,'Kanae'),a('Kaigaku',55),a('Nakime',55),
 a('Sakonji Urokodaki',55,'Urokodaki'),a('Shinjuro Rengoku',60,'Shinjuro','Shinjurou Rengoku'),a('Jigoro Kuwajima',60,'Kuwajima','Jigoro'),a('Kyogai',65,'Kyougai'),
 a('Kamanue',80),a('Rokuro',85),a('Wakuraba',85),a('Mukago',100)]),
q('aot-scouts','aot','Attack on Titan','Attack on Titan — Name any member of the Survey Corps.','Any era, including members who later left or betrayed it',[
 a('Eren Yeager',0,'Eren','Eren Jaeger'),a('Mikasa Ackerman',2,'Mikasa'),a('Levi Ackerman',2,'Levi','Captain Levi'),a('Armin Arlert',3,'Armin'),a('Erwin Smith',5,'Erwin'),
 a('Hange Zoe',8,'Hange','Hanji','Hanji Zoe'),a('Jean Kirstein',10,'Jean','Jean Kirschtein'),a('Sasha Blouse',12,'Sasha','Sasha Braus'),a('Connie Springer',15,'Connie'),
 a('Historia Reiss',15,'Historia','Krista Lenz','Christa Renz'),a('Reiner Braun',18,'Reiner'),a('Ymir',20),a('Bertholdt Hoover',25,'Bertholdt','Bertolt Hoover'),
 a('Petra Ral',30,'Petra'),a('Oluo Bozado',40,'Oluo','Oruo Bozad'),a('Mike Zacharias',45,'Mike','Mike Zacharius'),a('Floch Forster',45,'Floch'),
 a('Eld Jinn',50,'Eld','Eld Gin'),a('Gunther Schultz',50,'Gunther','Gunter Schultz'),a('Moblit Berner',55,'Moblit'),a('Keith Shadis',55,'Shadis','Keith Sadies'),
 a('Nanaba',60),a('Gelgar',70),a('Marlo Freudenberg',70,'Marlo'),a('Nifa',70),a('Ilse Langnar',80,'Ilse'),a('Dita Ness',80,'Ness'),
 a('Luke Siss',85,'Siss'),a('Lynne',85),a('Henning',100)])
];})();
if(typeof module!=="undefined")module.exports=POWER_LEVEL_QUESTIONS;
