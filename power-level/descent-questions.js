// Add reviewed Descent questions here, seven at a time (five char, two title).
// Each entry needs a unique id, shared semantic conceptId, descent kind, text,
// note, top, and answers [{name, aliases:[], rarity}]. Existing question IDs
// remain in questions.js to preserve published bank and player scores.
(function(root){
'use strict';
// November 27 Descent #8: future-date questions.
const questions=[
  {"id":"timed-v4-descent-8-headband","anime":"mixed","category":"Any anime","text":"Name any anime character who wears a headband.","note":"Documented character trait or relationship","since":"2026-11-27","descent":"char","conceptId":"nov27-headband","top":"Naruto Uzumaki","answers":[
    {"name":"Doma","rarity":25,"aliases":["Bohemian Knight"]},
    {"name":"Squardo","rarity":25,"aliases":["Oo Uzu Gumo (大渦蜘蛛)","Great Whirlpool Spider"]},
    {"name":"Shii","rarity":50},
    {"name":"Suiren","rarity":50},
    {"name":"Ran","rarity":50},
    {"name":"Esdeath no Chichi","rarity":50,"aliases":["Esdeath's father"]},
    {"name":"Mitsuru Ishino","rarity":50,"aliases":["Fever (フィーバー)"]},
    {"name":"Chess Belle","rarity":75,"aliases":["Chesu Beru"]},
    {"name":"Ken Oyanagi","rarity":75,"aliases":["Rock-Paper-Scissors Kid"]},
    {"name":"Squalo","rarity":75},
    {"name":"Tiziano","rarity":75},
    {"name":"Carne","rarity":75},
    {"name":"N'Doul","rarity":75,"aliases":["N'Dool"]},
    {"name":"Kinue Hayase","rarity":75},
    {"name":"Hiei","rarity":50,"aliases":["Hiei of the Evil Eye","Hiei Jaganshi"]},
    {"name":"Kazari Uiharu","rarity":50,"aliases":["Uiharu-n","Goalkeeper"]},
    {"name":"Masahiko Umezawa","rarity":75},
    {"name":"Ayano Minegishi","rarity":75},
    {"name":"Fuyumi Yanagi","rarity":50,"aliases":["Willow"]},
    {"name":"Naruto Uzumaki","rarity":0},
  ]},
  {"id":"timed-v4-descent-8-sibling","anime":"mixed","category":"Any anime","text":"Name any anime character who has a sibling.","note":"Documented character trait or relationship","since":"2026-11-27","descent":"char","conceptId":"nov27-sibling","top":"Tanjiro Kamado","answers":[
    {"name":"Ellie","rarity":25},
    {"name":"Tanjiro Kamado","rarity":0,"aliases":["Tanjirou Kamado","Gonpachiro Kamaboko","Monjiro"]},
    {"name":"Nezuko Kamado","rarity":8},
    {"name":"Sanemi Shinazugawa","rarity":25,"aliases":["Wind Hashira","Wind Pillar"]},
    {"name":"Genya Shinazugawa","rarity":25},
    {"name":"Kanae Kochou","rarity":25},
    {"name":"Shoichi","rarity":25},
    {"name":"Teruko","rarity":25},
    {"name":"Kiyoshi","rarity":25},
    {"name":"Maki Zenin","rarity":25,"aliases":["Miss Zenin"]},
    {"name":"Mai Zenin","rarity":25},
    {"name":"Mei Mei","rarity":25},
    {"name":"Esou","rarity":25,"aliases":["Eso"]},
    {"name":"Kechizu","rarity":25},
    {"name":"Tenya Iida","rarity":25,"aliases":["Tenya Ida","Turbo Hero: Ingenium (ターボヒーロー・インゲニウム)"]},
    {"name":"Kalluto Zoldyck","rarity":25},
    {"name":"Mito Freecss","rarity":25},
    {"name":"Elena","rarity":25},
    {"name":"Eeta","rarity":25},
    {"name":"Alluka Zoldyck","rarity":25,"aliases":["Nanika"]},
    {"name":"Kurt","rarity":25},
    {"name":"Tatsumaki","rarity":25,"aliases":["Terrible Tornado"]},
    {"name":"Fubuki","rarity":25,"aliases":["Hellish Blizzard","Jigoku no Fubuki (地獄のフブキ)"]},
    {"name":"Tanktop Tiger","rarity":25},
    {"name":"Tanktop Black Hole","rarity":25},
    {"name":"Fukegao","rarity":25},
    {"name":"Luffy Monkey","rarity":8,"aliases":["Mugiwara (麦わら)","Straw Hat"]},
    {"name":"Ace Portgas","rarity":25,"aliases":["Fire Fist Ace","Portgaz D. Ace"]},
    {"name":"Arlong","rarity":25,"aliases":["Arlong the Saw"]},
    {"name":"Nojiko","rarity":25},
    {"name":"Bepo","rarity":25},
    {"name":"Shalulia Guu","rarity":25,"aliases":["Saint Shalulia"]},
    {"name":"Saint Charloss","rarity":25},
    {"name":"Sandersonia Boa","rarity":25},
    {"name":"Marigold Boa","rarity":25},
    {"name":"Shoujou","rarity":25,"aliases":["Sonar King"]},
    {"name":"Mozu","rarity":25,"aliases":["Square Sister (スクエアシスターズ)"]},
    {"name":"Kiwi","rarity":25},
    {"name":"Satori","rarity":25,"aliases":["of the Forest"]},
    {"name":"Sabo","rarity":25},
    {"name":"Izou","rarity":25,"aliases":["Izo"]},
    {"name":"Lola","rarity":25,"aliases":["Marriage Proposal Lola"]},
    {"name":"Caribou","rarity":25,"aliases":["Wet-Haired"]},
    {"name":"Coribou","rarity":25,"aliases":["Blood-Splatterer"]},
    {"name":"Campacino Achino","rarity":25},
    {"name":"Brindo Achino","rarity":25},
    {"name":"Sayo","rarity":25},
    {"name":"Lina","rarity":25},
    {"name":"Violet","rarity":25,"aliases":["Viola"]},
    {"name":"Sugar","rarity":25},
    {"name":"Rosinante Donquixote","rarity":25,"aliases":["Corazón","Cora-san"]},
    {"name":"Katakuri Charlotte","rarity":25,"aliases":["Dogtooth"]},
    {"name":"Kikunojou","rarity":25,"aliases":["Kiku","O-Kiku (お菊)"]},
    {"name":"Road","rarity":25,"aliases":["Rodo"]},
    {"name":"Prim Charlotte","rarity":25},
    {"name":"Page One","rarity":25},
    {"name":"Ulti","rarity":25},
    {"name":"Oven Charlotte","rarity":25},
    {"name":"Daifuku Charlotte","rarity":25},
    {"name":"Counter Charlotte","rarity":25},
    {"name":"Cadenza Charlotte","rarity":25},
    {"name":"Cabaletta Charlotte","rarity":25},
    {"name":"Brulee Charlotte","rarity":25},
    {"name":"Galette Charlotte","rarity":25},
    {"name":"Opera Charlotte","rarity":25,"aliases":["Shārotto Opera","Sahne-Minister"]},
    {"name":"Hajrudin","rarity":25},
    {"name":"Nusstorte Charlotte","rarity":25},
    {"name":"Loki","rarity":25,"aliases":["Accursed Prince","Shame of Elbaph"]},
    {"name":"Bjorn","rarity":25},
    {"name":"Ayato Kirishima","rarity":25,"aliases":["Black Rabbit"]},
    {"name":"Edward Elric","rarity":8,"aliases":["Fullmetal Alchemist","Pipsqueak"]},
    {"name":"Alphonse Elric","rarity":8,"aliases":["Armored Alchemist"]},
    {"name":"Scar","rarity":25,"aliases":["Kizu no Otoko (傷の男)","The Scarred Man"]},
    {"name":"Rick","rarity":25},
    {"name":"Kathleen Elle Armstrong","rarity":25,"aliases":["Catherine"]},
    {"name":"Shinri","rarity":25,"aliases":["Truth","God"]},
    {"name":"Sasuke Uchiha","rarity":8,"aliases":["The Uchiha Survivor","The Last Uchiha"]},
    {"name":"Hinata Hyuuga","rarity":25,"aliases":["Byakugan Princess (白眼の姫)","Byakugan no Hime"]},
    {"name":"Neji Hyuuga","rarity":25},
    {"name":"Temari","rarity":25},
    {"name":"Kiba Inuzuka","rarity":25},
    {"name":"Kankuro","rarity":25},
    {"name":"Aoi Rokusho","rarity":25},
    {"name":"Sakon","rarity":25},
    {"name":"Akio","rarity":25},
    {"name":"Hashirama Senju","rarity":25,"aliases":["First Hokage","Shodaime Hokage"]},
    {"name":"Tobirama Senju","rarity":25,"aliases":["Second Hokage","Nidaime Hokage"]},
    {"name":"Yashamaru","rarity":25},
    {"name":"Hana Inuzuka","rarity":25},
    {"name":"Gouzu","rarity":25},
    {"name":"Meizu","rarity":25},
    {"name":"Toki","rarity":25},
    {"name":"Renga","rarity":25},
    {"name":"Nan","rarity":25},
    {"name":"Dan Katou","rarity":25},
    {"name":"Hizashi Hyuuga","rarity":25},
    {"name":"Nawaki","rarity":25},
    {"name":"Uruchi Uchiha","rarity":25},
    {"name":"Sagi","rarity":25},
    {"name":"Ukon","rarity":25},
    {"name":"Miyako Ishida","rarity":25},
    {"name":"Ito Nishimiya","rarity":25},
    {"name":"Ishida no Ane","rarity":25},
    {"name":"Suguha Kirigaya","rarity":8,"aliases":["Leafa","Sugu"]},
    {"name":"Mitsuha Miyamizu","rarity":8},
    {"name":"Yotsuha Miyamizu","rarity":25},
    {"name":"Uri Reiss","rarity":25},
    {"name":"Kuchel Ackerman","rarity":25,"aliases":["Olympia"]},
    {"name":"Tensei Iida","rarity":25,"aliases":["Ingenium"]},
    {"name":"Natsuo Todoroki","rarity":25},
    {"name":"Fuyumi Todoroki","rarity":25},
    {"name":"Falco Grice","rarity":8,"aliases":["Ben (ベン)"]},
    {"name":"Porco Galliard","rarity":25,"aliases":["Pock (ポッコ)"]},
    {"name":"Colt Grice","rarity":25},
    {"name":"Ritsu Kageyama","rarity":25},
    {"name":"Kaito Shiratori","rarity":50},
    {"name":"Daichi Shiratori","rarity":50},
    {"name":"Taiga Okajima","rarity":50,"aliases":["Terminal Perv"]},
    {"name":"Touka Yada","rarity":50},
    {"name":"Rem","rarity":25,"aliases":["Rem-rin"]},
    {"name":"Ram","rarity":25,"aliases":["Ram-chi","Ramu"]},
    {"name":"Frederica Baumann","rarity":50,"aliases":["Frederica Tinsel"]},
    {"name":"Nagi Aiza","rarity":50},
    {"name":"Fay Yeager","rarity":50},
    {"name":"Gross","rarity":50},
    {"name":"Izuna Uchiha","rarity":50},
    {"name":"Killer Bee","rarity":50,"aliases":["Eight-Tails Jinchuuriki","Killer B"]},
    {"name":"Ebizou","rarity":50,"aliases":["Honoured Grandfather"]},
    {"name":"Katazu","rarity":50},
    {"name":"Tsukado","rarity":50},
    {"name":"Kinkaku","rarity":50},
    {"name":"Ginkaku","rarity":50},
    {"name":"Atsui","rarity":50},
    {"name":"Hamura Ootsutsuki","rarity":50},
    {"name":"Indra Ootsutsuki","rarity":50},
    {"name":"Noelle Silva","rarity":25},
    {"name":"Gauche Adlai","rarity":50},
    {"name":"Licht","rarity":50,"aliases":["Licht of Sword Magic"]},
    {"name":"Marie Adlai","rarity":50},
    {"name":"Marco Scarlet","rarity":50},
    {"name":"Tetia","rarity":50},
    {"name":"Roxanne Agrippa","rarity":50},
    {"name":"Kaede Azusagawa","rarity":25},
    {"name":"Saki Kamisato","rarity":50},
    {"name":"Yuuri Briar","rarity":50,"aliases":["Yuri Briar","Second Lieutenant Briar"]},
    {"name":"Chadwick Curtis","rarity":50,"aliases":["SSS Lieutenant","Chad (チャド)"]},
    {"name":"Kei Shirogane","rarity":50},
    {"name":"Kohaku","rarity":25},
    {"name":"Ginrou","rarity":50},
    {"name":"Kinrou","rarity":50},
    {"name":"Thorkell","rarity":50,"aliases":["Thorkell the Tall","Thorkell the Invincible"]},
    {"name":"Gilbert Bougainvillea","rarity":50,"aliases":["Gil","Major Gilbert"]},
    {"name":"Luculia Marlborough","rarity":50},
    {"name":"Honoka Sawada","rarity":50},
    {"name":"Motoko Iura","rarity":50},
    {"name":"Sumire Kanou","rarity":50},
    {"name":"Sakura Kanou","rarity":50},
    {"name":"Akame","rarity":25,"aliases":["Demon Sword Murasame","Honors Student"]},
    {"name":"Kurome","rarity":50},
    {"name":"Sora","rarity":25,"aliases":["Blank"]},
    {"name":"Veronica Liones","rarity":50},
    {"name":"Margaret Liones","rarity":50},
    {"name":"Ellen","rarity":50},
    {"name":"Luigi","rarity":50},
    {"name":"Orihime Inoue","rarity":25,"aliases":["Hime"]},
    {"name":"Kuukaku Shiba","rarity":50},
    {"name":"Ganju Shiba","rarity":50},
    {"name":"Karin Kurosaki","rarity":50},
    {"name":"Keigo Asano","rarity":50},
    {"name":"Kiyone Kotetsu","rarity":50},
    {"name":"Isane Kotetsu","rarity":50},
    {"name":"Jidanbou Ikkanzaka","rarity":50},
    {"name":"Hisana Kuchiki","rarity":50},
    {"name":"Rikichi Yuki","rarity":50},
    {"name":"Jiroubou Ikkanzaka","rarity":50},
    {"name":"Shouta Toyokawa","rarity":50},
    {"name":"Yui Toyokawa","rarity":50},
    {"name":"Senjurou Rengoku","rarity":50},
    {"name":"Lelouch Lamperouge","rarity":25,"aliases":["Lulu","Zero"]},
    {"name":"Kallen Stadtfeld","rarity":25,"aliases":["Red Lotus","Karen Kouzuki (紅月カレン)"]},
    {"name":"Cornelia li Britannia","rarity":50,"aliases":["Witch of Britannia","Goddess of Victory"]},
    {"name":"Euphemia li Britannia","rarity":50,"aliases":["Euphy","Euphie"]},
    {"name":"Odysseus eu Britannia","rarity":50},
    {"name":"Ui Ui","rarity":50},
    {"name":"Arata Nitta","rarity":50},
    {"name":"Touji Suzuhara","rarity":50},
    {"name":"Gyuutarou","rarity":50,"aliases":["Gyutaro","Gyuutarou Shabana"]},
    {"name":"Yoriichi Tsugikuni","rarity":50},
    {"name":"Iris","rarity":25,"aliases":["Sister (シスター)","Tenshi (天使)"]},
    {"name":"Shou Kusakabe","rarity":50},
    {"name":"Poco","rarity":50},
    {"name":"Poco no Ane","rarity":50,"aliases":["Poco's Sister"]},
    {"name":"Zeniba","rarity":50},
    {"name":"Shaft","rarity":50},
    {"name":"Myrd","rarity":50},
    {"name":"Kaijin","rarity":50},
    {"name":"Dord","rarity":50},
    {"name":"Garm","rarity":50},
    {"name":"Geld","rarity":50,"aliases":["Gerd","Barrier Lord"]},
    {"name":"Trya","rarity":50},
    {"name":"Zenko","rarity":50},
    {"name":"Lisa","rarity":50},
    {"name":"Shimada","rarity":50},
    {"name":"Sae Shimada","rarity":50},
    {"name":"Norn Greyrat","rarity":50},
    {"name":"Aisha Greyrat","rarity":50},
    {"name":"Melty Q Melromarc","rarity":50},
    {"name":"Mephisto Pheles","rarity":50,"aliases":["Johann Faust V","Samael"]},
    {"name":"Renzou Shima","rarity":50,"aliases":["Erotic Demon"]},
    {"name":"Jin-U Seong","rarity":25,"aliases":["Sung Jin-Woo","Shun Mizushino (水篠旬)"]},
    {"name":"Kyung-Hye Park","rarity":50,"aliases":["Gyeong-Hye Park"]},
    {"name":"Dong-Suk Hwang","rarity":50,"aliases":["Hayato Ukyou (右京隼人)","Hwang Dong-Seok (황동석)"]},
    {"name":"Shouichi Shinkawa","rarity":50,"aliases":["Red-Eyed XaXa","Death Gun"]},
    {"name":"Kyouji Shinkawa","rarity":50,"aliases":["Spiegel (シュピーゲル)","Richter (リヒター)"]},
    {"name":"Aiko Konno","rarity":50},
    {"name":"Kouhei Katsuragi","rarity":50},
    {"name":"Hinata Tachibana","rarity":50,"aliases":["Hina (ヒナ)","Miss Detective"]},
    {"name":"Manjirou Sano","rarity":25,"aliases":["Mikey (マイキー)","Invincible Mikey"]},
    {"name":"Takashi Mitsuya","rarity":50,"aliases":["Taka","Joker"]},
    {"name":"Hakkai Shiba","rarity":50,"aliases":["Young Master"]},
    {"name":"Naoto Tachibana","rarity":50},
    {"name":"Souya Kawata","rarity":50,"aliases":["Angry"]},
    {"name":"Shinichirou Sano","rarity":50},
    {"name":"Yuzuru Otonashi","rarity":25},
    {"name":"Ayato Naoi","rarity":25},
    {"name":"Hatsune Otonashi","rarity":50},
    {"name":"Sajuna Inui","rarity":50,"aliases":["Juju (ジュジュ)"]},
    {"name":"Shinju Inui","rarity":50},
    {"name":"Misa Kurobane","rarity":50},
    {"name":"Ayumi Otosaka","rarity":25,"aliases":["Ayu","Ayucchi"]},
    {"name":"Takehito Kumagami","rarity":50,"aliases":["Pooh","The Helper"]},
    {"name":"Shunsuke Otosaka","rarity":50,"aliases":["Shun"]},
    {"name":"Kazuki Tomori","rarity":50},
    {"name":"Gou Kazamatsuri","rarity":50},
    {"name":"Junichirou Tanizaki","rarity":50},
    {"name":"Naomi Tanizaki","rarity":50},
    {"name":"Hana Shimura","rarity":50},
    {"name":"Ryuuko Matoi","rarity":25,"aliases":["Ryuko Matoi"]},
    {"name":"Satsuki Kiryuuin","rarity":25,"aliases":["Satsuki Kiryuin","Steel Queen"]},
    {"name":"Kurona Yasuhisa","rarity":50},
    {"name":"Nashiro Yasuhisa","rarity":50},
    {"name":"Mare Bello Fiore","rarity":50},
    {"name":"Aura Bella Fiora","rarity":50},
    {"name":"Nemu Emmot","rarity":50},
    {"name":"Enri Emmot","rarity":50,"aliases":["New Matriarch","General Enri"]},
    {"name":"Nat","rarity":50},
    {"name":"Pilar","rarity":50},
    {"name":"Rebecca","rarity":50},
    {"name":"Takumi Aldini","rarity":50,"aliases":["Takumi-cchi"]},
    {"name":"Isami Aldini","rarity":50,"aliases":["Isami-cchi"]},
    {"name":"Natsume Sendawara","rarity":50},
    {"name":"Orie Sendawara","rarity":50},
    {"name":"Saeko Tanaka","rarity":50},
    {"name":"Tiona Hiryute","rarity":50,"aliases":["Amazon","Crusher"]},
    {"name":"Anya Fromel","rarity":50,"aliases":["Vana Alfi"]},
    {"name":"Tsubaki Nakatsukasa","rarity":25},
    {"name":"Patricia Thompson","rarity":25,"aliases":["Patty"]},
    {"name":"Elizabeth Thompson","rarity":25,"aliases":["Liz"]},
    {"name":"Asura","rarity":50,"aliases":["Kishin"]},
    {"name":"Meiko Honma","rarity":25,"aliases":["Menma"]},
    {"name":"Sanae Mizuno","rarity":50},
    {"name":"Tomoko Inose","rarity":50},
    {"name":"Yumi Ogura","rarity":50},
    {"name":"Komachi Hikigaya","rarity":50},
    {"name":"Saki Kawasaki","rarity":50},
    {"name":"Taishi Kawasaki","rarity":50},
    {"name":"Natsu Dragneel","rarity":25,"aliases":["Salamander (サラマンダー)","Dragon Slayer"]},
    {"name":"Mirajane Strauss","rarity":50,"aliases":["The Demon","Mira"]},
    {"name":"Elfman Strauss","rarity":50,"aliases":["Beast Arm Elfman"]},
    {"name":"Lisanna Strauss","rarity":50},
    {"name":"Elfman (Edolas)","rarity":50},
    {"name":"Kokushibo","rarity":50,"aliases":["Upper Moon One"]},
    {"name":"Yuuichirou Tokitou","rarity":50},
    {"name":"Tahoumaru Daigo","rarity":50},
    {"name":"Osushi Niki","rarity":50,"aliases":["Misaki"]},
    {"name":"Touma","rarity":75,"aliases":["Yamada Asaemon Touma (山田浅ェ門桐馬)","Toma"]},
    {"name":"Yuzuriha","rarity":75,"aliases":["Keishu no Yuzuriha (傾主の杠)","Yuzuriha of the Keishu"]},
    {"name":"Rolo Lamperouge","rarity":75,"aliases":["Rolo Haliburton"]},
    {"name":"Luciano Bradley","rarity":75,"aliases":["Vampire of Britannia"]},
    {"name":"Marika Soresi","rarity":75},
    {"name":"Guinevere su Britannia","rarity":75},
    {"name":"Sophie Hatter","rarity":50},
    {"name":"Kusuke Saiki","rarity":75},
    {"name":"Hina Amano","rarity":50,"aliases":["100% Sunshine Girl"]},
    {"name":"Rikka Takanashi","rarity":50,"aliases":["Jaou Shingan (邪王真眼)","Tyrant's Eye"]},
    {"name":"Kuzuha Togashi","rarity":75},
    {"name":"Houtarou Oreki","rarity":50},
    {"name":"Tomoe Oreki","rarity":75},
    {"name":"Rie Zenna","rarity":75},
    {"name":"Kayo Zenna","rarity":75},
    {"name":"Sakura Matou","rarity":75},
    {"name":"Zouken Matou","rarity":75,"aliases":["Zouken Makiri","Makiri Zolgen"]},
    {"name":"Sola-Ui Nuada-Re Sophia-Ri","rarity":75},
    {"name":"Jean-Pierre Polnareff","rarity":50},
    {"name":"Boingo","rarity":75,"aliases":["Mondatta","Voing"]},
    {"name":"Johan Liebert","rarity":50,"aliases":["Liebheart","Johann"]},
    {"name":"Anna Liebert","rarity":50,"aliases":["Nina Fortner (ニナ・フォルトナー)"]},
    {"name":"Tsukihi Araragi","rarity":75,"aliases":["Rara-chan"]},
    {"name":"Koutei","rarity":75,"aliases":["Emperor"]},
    {"name":"Guen","rarity":75,"aliases":["Quack Doctor"]},
    {"name":"Mirai Shishiou","rarity":75},
    {"name":"Ruby Hoshino","rarity":50},
    {"name":"Aquamarine Hoshino","rarity":50,"aliases":["Aqua","Prodigy Baby"]},
    {"name":"Frill Shiranui","rarity":75},
    {"name":"Demetrius Desmond","rarity":75},
    {"name":"Rin Itoshi","rarity":75,"aliases":["Eyelashes"]},
    {"name":"Junichi Wanima","rarity":75},
    {"name":"Keisuke Wanima","rarity":75},
    {"name":"Shinoa Hiiragi","rarity":50},
    {"name":"Yoichi Saotome","rarity":50},
    {"name":"Mitsuba Sanguu","rarity":50},
    {"name":"Zanoba Shirone","rarity":75,"aliases":["Doll Loving Prince"]},
    {"name":"Tersena Adoldia","rarity":75},
    {"name":"Vierra","rarity":75},
    {"name":"Shierra","rarity":75},
    {"name":"Grabell Zafin Asura","rarity":75},
    {"name":"Georgie Saikawa","rarity":75,"aliases":["Nae Saikawa (才川苗)"]},
    {"name":"Naoya Nifuji","rarity":75,"aliases":["Nao"]},
    {"name":"Ichika Nakano","rarity":50},
    {"name":"Nino Nakano","rarity":50},
    {"name":"Miku Nakano","rarity":50},
    {"name":"Yotsuba Nakano","rarity":50},
    {"name":"Itsuki Nakano","rarity":50},
    {"name":"Shousuke Komi","rarity":75},
    {"name":"Hitomi Tadano","rarity":75},
    {"name":"Claire Kagenou","rarity":75},
    {"name":"Alexia Midgar","rarity":75},
    {"name":"Iris Midgar","rarity":75},
    {"name":"Peter Ratri","rarity":75},
    {"name":"Okuyasu Nijimura","rarity":50},
    {"name":"Ayana Hirose","rarity":75},
    {"name":"Rias Gremory","rarity":50,"aliases":["Buchou (部長)","President"]},
    {"name":"Asia Argento","rarity":50},
    {"name":"Koneko Toujou","rarity":50,"aliases":["Shirone"]},
    {"name":"Sirzechs Lucifer","rarity":75,"aliases":["Crimson Satan"]},
    {"name":"Momiji Souma","rarity":75,"aliases":["Momiji Soma","Momicchi"]},
    {"name":"Saki Hanajima","rarity":75,"aliases":["Hana-chan"]},
    {"name":"Kakeru Manabe","rarity":75},
    {"name":"Machi Kuragi","rarity":75},
    {"name":"Momo Souma","rarity":75,"aliases":["Momo Soma"]},
    {"name":"Megumi Hanajima","rarity":75},
    {"name":"Sing Soo-Ling","rarity":75},
    {"name":"Abraham Dawson","rarity":75},
    {"name":"Goblin Slayer","rarity":50,"aliases":["Orcbolg","Beard-cutter"]},
    {"name":"Ushikai Musume no Oji","rarity":75,"aliases":["Cow Girl's Uncle"]},
    {"name":"Fuuko Ibuki","rarity":50,"aliases":["Fuko","Fuu-chan"]},
    {"name":"Tomoyo Sakagami","rarity":50,"aliases":["Tomo-pyon"]},
    {"name":"Yukine Miyazawa","rarity":75,"aliases":["Yuki-nee"]},
    {"name":"Ryou Fujibayashi","rarity":50},
    {"name":"Youhei Sunohara","rarity":50,"aliases":["Baby Sunohara","'Kazuto Miyazawa'"]},
    {"name":"Mei Sunohara","rarity":75},
    {"name":"Mitsui","rarity":75},
    {"name":"Botan","rarity":75,"aliases":["Button"]},
    {"name":"Kagura","rarity":50,"aliases":["Gura","China Girl"]},
    {"name":"Tae Shimura","rarity":75,"aliases":["Otae","Anego"]},
    {"name":"Shigeshige Tokugawa","rarity":75,"aliases":["Sho-chan","Shogun-sama"]},
    {"name":"Kamui","rarity":75,"aliases":["Admiral idiot","Baka Teitoku"]},
    {"name":"Mitsuba Okita","rarity":75},
    {"name":"Tetsuko Murata","rarity":75},
    {"name":"Seimei Ketsuno","rarity":75},
    {"name":"Soyo Tokugawa","rarity":75,"aliases":["Princess"]},
    {"name":"Urara","rarity":75},
    {"name":"Kirara","rarity":75},
    {"name":"Tetsuya Murata","rarity":75},
    {"name":"Lance Crown","rarity":50},
    {"name":"Finn Ames","rarity":50},
    {"name":"Rain Ames","rarity":75,"aliases":["Rayne Ames"]},
    {"name":"Wirth Mádl","rarity":75},
    {"name":"Atsumu Miya","rarity":75,"aliases":["Tsumu"]},
    {"name":"Osamu Miya","rarity":75,"aliases":["Samu","Kusosamu"]},
    {"name":"Kourai Hoshiumi","rarity":75,"aliases":["The New Little Giant"]},
    {"name":"Shizuo Heiwajima","rarity":50,"aliases":["Shizu-chan"]},
    {"name":"Seiji Yagiri","rarity":75},
    {"name":"Namie Yagiri","rarity":75},
    {"name":"Mika Harima","rarity":75},
    {"name":"Mairu Orihara","rarity":75,"aliases":["Mai"]},
    {"name":"Kururi Orihara","rarity":75,"aliases":["Kyo","Kuru-nee"]},
    {"name":"Ran Izumii","rarity":75},
    {"name":"Oingo","rarity":75,"aliases":["Oing","Zenyatta"]},
    {"name":"Selka Zuberg","rarity":75},
    {"name":"Takiguri","rarity":75},
    {"name":"Amayori","rarity":75},
    {"name":"Misaki Ayuzawa","rarity":50,"aliases":["Kaichou","Misa"]},
    {"name":"Shizuko Kaga","rarity":75},
    {"name":"Nagisa Tsuwamono","rarity":75},
    {"name":"Denzel Liones","rarity":75},
    {"name":"Jenna","rarity":75},
    {"name":"Zaneri","rarity":75},
    {"name":"Rosa","rarity":75},
    {"name":"Neiru Aonuma","rarity":50},
    {"name":"Nekobasu","rarity":75,"aliases":["Cat Bus"]},
    {"name":"Ui Hirasawa","rarity":75},
    {"name":"Satoshi Tainaka","rarity":75},
    {"name":"Jun Suzuki","rarity":75},
    {"name":"Thorgil","rarity":75},
    {"name":"Hiroomi Nase","rarity":50},
    {"name":"Sakura Inami","rarity":75},
    {"name":"Keika Kawasaki","rarity":75},
    {"name":"Yuuko Kanda","rarity":75},
    {"name":"Fuuka Kamiigusa","rarity":75},
    {"name":"Iori Himemiya","rarity":75},
    {"name":"Kanae","rarity":75},
    {"name":"Ogi Zenin","rarity":75},
    {"name":"Pilemon Notos Greyrat","rarity":75},
    {"name":"Nijika Ijichi","rarity":50,"aliases":["Shimokitazawa no Daitenshi (下北沢の大天使)","Archangel of Shimokitazawa"]},
    {"name":"Zepes Indu","rarity":75},
    {"name":"Leorig Indu","rarity":75},
    {"name":"Sasha Necron","rarity":50,"aliases":["Witch of Destruction"]},
    {"name":"Renner Theiere Chardelon Ryle Vaiself","rarity":75,"aliases":["Golden Princess"]},
    {"name":"Zaryusu Shasha","rarity":75},
    {"name":"Shasuryu Shasha","rarity":75},
    {"name":"Tina","rarity":75},
    {"name":"Tuareninya Veyron","rarity":75},
    {"name":"Tia","rarity":75},
    {"name":"Zanac Valleon Igana Ryle Vaiself","rarity":75},
    {"name":"The Exile","rarity":75},
    {"name":"Leo","rarity":75,"aliases":["Rio"]},
    {"name":"Fletcher Tringham","rarity":75},
    {"name":"Shinji Matou","rarity":75,"aliases":["Seaweed"]},
    {"name":"Issei Ryuudou","rarity":75},
    {"name":"Yuuzan Yoshida","rarity":75},
    {"name":"Vincent Phantomhive","rarity":75,"aliases":["Queen's Watchdog"]},
    {"name":"Rachel Phantomhive","rarity":75},
    {"name":"Ran Mao","rarity":75},
    {"name":"Kazuomi Ooga","rarity":50,"aliases":["Oga","Kazu"]},
    {"name":"Tao Pai Pai","rarity":75,"aliases":["Mercenary Tao","General Tao"]},
    {"name":"Jinzouningen 17-gou","rarity":75,"aliases":["No. 17 (Juunana-gou)","Lapis"]},
    {"name":"Goten Son","rarity":75},
    {"name":"Bra","rarity":75,"aliases":["Bulla","Bura"]},
    {"name":"Jinzouningen 18-gou","rarity":75,"aliases":["Lazuli","Android 18"]},
    {"name":"Raditz","rarity":75,"aliases":["Radish"]},
    {"name":"Piccolo Daimaou","rarity":75,"aliases":["King Piccolo","Piccolo Dai-Ma-Ku"]},
    {"name":"Miyuki Shiba","rarity":50,"aliases":["Snow Queen"]},
    {"name":"Tatsuya Shiba","rarity":50,"aliases":["Onii-sama","Ooguro Ryuuya"]},
    {"name":"Maya Yotsuba","rarity":75},
    {"name":"Subaru Mimasaka","rarity":75},
    {"name":"Fuyumi Ootori","rarity":75},
    {"name":"Kirimi Nekozawa","rarity":75},
    {"name":"Yasuchika Haninozuka","rarity":75,"aliases":["Chika"]},
    {"name":"Mika Iwakura","rarity":75},
    {"name":"Alisa Haiba","rarity":75},
    {"name":"Akane Yamamoto","rarity":75},
    {"name":"Kanae Sumida","rarity":50},
    {"name":"You Takami","rarity":50,"aliases":["Yoh Takami"]},
    {"name":"Minatsuki Takami","rarity":75,"aliases":["Hummingbird"]},
    {"name":"Mari Kurihara","rarity":75},
    {"name":"Chitose Kaginoji","rarity":75,"aliases":["Chii-chan"]},
    {"name":"Kotori Itsuka","rarity":50,"aliases":["Commander"]},
    {"name":"Mana Takamiya","rarity":75},
    {"name":"Ureirika","rarity":75},
    {"name":"Barbro Andrean Ierudo Ryle Vaiself","rarity":75},
    {"name":"Shizuku Kurogane","rarity":50,"aliases":["Lorelei"]},
    {"name":"Ethan Barklem","rarity":75},
    {"name":"Fumiki Hatori","rarity":75},
    {"name":"Stella Barklem","rarity":75},
    {"name":"Chinatsu Hayase","rarity":75},
    {"name":"Kanetsugu Gasou","rarity":75,"aliases":["Kanetsugu Gasou the 17th"]},
    {"name":"Allen Fromel","rarity":75,"aliases":["Vana Freya"]},
    {"name":"Yahiro Samukawa","rarity":75},
    {"name":"Mana Ouma","rarity":75},
    {"name":"Kurosu Ouma","rarity":75},
    {"name":"Tsukasa Yugi","rarity":75,"aliases":["Runt (チビ)"]},
    {"name":"Hikari Kirishima","rarity":75},
    {"name":"Nanaka Kotegawa","rarity":75},
    {"name":"Kanako Iida","rarity":75},
    {"name":"Tsurusen'nin","rarity":75,"aliases":["Crane Sage","Master Shen"]},
    {"name":"Junko Enoshima","rarity":50,"aliases":["Chou Koukou Kyuu no Gal (超高校級のギャル)","Super High School Level Gal"]},
    {"name":"Mondo Oowada","rarity":50,"aliases":["Owada","Ultimate Biker Gang Leader"]},
    {"name":"Mukuro Ikusaba","rarity":75,"aliases":["Ultimate Soldier"]},
    {"name":"Komaru Naegi","rarity":75,"aliases":["Omaru","Dekomaru"]},
    {"name":"Daiya Oowada","rarity":75},
    {"name":"Cassim","rarity":75,"aliases":["Kashim","Qasim"]},
    {"name":"Hakuryuu Ren","rarity":75},
    {"name":"Spartos Leoxses","rarity":75},
    {"name":"Mariam","rarity":75},
    {"name":"Mari Katsuki","rarity":75},
    {"name":"Michele Crispino","rarity":75,"aliases":["Mickey"]},
    {"name":"Mary Macbeth","rarity":75,"aliases":["White"]},
    {"name":"Leonardo Watch","rarity":50},
    {"name":"William Macbeth","rarity":75,"aliases":["Black","Will"]},
    {"name":"Michella Watch","rarity":75,"aliases":["Michella McLachlan Watch"]},
    {"name":"Falin Thorden","rarity":75,"aliases":["Farin","Falyn"]},
    {"name":"Kiki Floke","rarity":75},
    {"name":"Kaka Floke","rarity":75},
    {"name":"Leed","rarity":75},
    {"name":"Couronna Dola","rarity":50,"aliases":["Couron"]},
    {"name":"Mio Kofune","rarity":50},
    {"name":"Ryuunosuke Nagumo","rarity":75},
    {"name":"Natsuki Seba","rarity":75},
    {"name":"Daida","rarity":75},
    {"name":"Desha","rarity":75},
    {"name":"Daemon","rarity":75},
    {"name":"Ushio Okazaki","rarity":50,"aliases":["Shio"]},
    {"name":"Yuu","rarity":75},
    {"name":"Hina Tachibana","rarity":50,"aliases":["Hina-sensei","Nee"]},
    {"name":"Rui Tachibana","rarity":50},
    {"name":"Caulifla","rarity":75,"aliases":["Sis"]},
    {"name":"Vados","rarity":75,"aliases":["Universe 6 Angel"]},
    {"name":"Tights","rarity":75,"aliases":["Tights Briefs"]},
    {"name":"Bergamo","rarity":75,"aliases":["The Crusher"]},
    {"name":"Lavender","rarity":75},
    {"name":"Rensou","rarity":75},
    {"name":"Fuji Shikimori","rarity":75},
    {"name":"Edward Mason","rarity":75,"aliases":["Eddie (エディ)"]},
    {"name":"Ayla","rarity":75},
    {"name":"Aylin","rarity":75},
    {"name":"Royd Lloyd","rarity":75,"aliases":["The Yourself"]},
    {"name":"Alisa Kujou","rarity":50,"aliases":["Alya (アーリャ)"]},
    {"name":"Yuki Suou","rarity":75,"aliases":["Noble Princess"]},
    {"name":"Mariya Kujou","rarity":75,"aliases":["Masha (マーシャ)"]},
    {"name":"Dominique de Sade","rarity":75,"aliases":["Domi"]},
    {"name":"Nox","rarity":75},
    {"name":"Manet","rarity":75},
    {"name":"Veronica de Sade","rarity":75},
    {"name":"Ritsuka Uenoyama","rarity":50,"aliases":["Rikka","Uecchi"]},
    {"name":"Runa Sasaki","rarity":75},
    {"name":"Eita Sasaki","rarity":75},
    {"name":"Takumi Ichinose","rarity":75},
    {"name":"Nami Komatsu","rarity":75},
    {"name":"Naota Nandaba","rarity":50,"aliases":["Takkun"]},
    {"name":"Keera L. Greenwood","rarity":75},
    {"name":"Megumi Kobayashi","rarity":75},
    {"name":"Seita","rarity":50},
    {"name":"Setsuko","rarity":50},
    {"name":"Roy Alphard","rarity":75},
    {"name":"Joshua Euclius","rarity":75,"aliases":["Joshua Juukulius"]},
    {"name":"Nadja Liones","rarity":75},
    {"name":"Re=L Rayford","rarity":75,"aliases":["The Chariot"]},
    {"name":"Sion Rayford","rarity":75},
    {"name":"Kyon no Imouto","rarity":75,"aliases":["Kyon's Sister"]},
    {"name":"Shamisen","rarity":75,"aliases":["Shami"]},
    {"name":"Nina Rantz","rarity":75},
    {"name":"Natsu","rarity":75},
    {"name":"Nanami Kuribayashi","rarity":75},
    {"name":"Selina Sherlock","rarity":75},
    {"name":"Lieselotte Sherlock","rarity":50},
    {"name":"Aoi Sanguu","rarity":75},
    {"name":"Ikoma","rarity":50},
    {"name":"Hatsune","rarity":75},
    {"name":"Serafall Leviathan","rarity":75},
    {"name":"Hotaru Furuya","rarity":75},
    {"name":"Hermes Costello","rarity":50},
    {"name":"Enrico Pucci","rarity":50,"aliases":["Emilio Pucci","Father Pucci"]},
    {"name":"Yuzuki Katagiri","rarity":75},
    {"name":"Tamaki Katagiri","rarity":75},
    {"name":"Kuon Amane","rarity":75,"aliases":["Orcelott (オルスロット)"]},
    {"name":"Miharu","rarity":75},
    {"name":"Suzu","rarity":75},
    {"name":"Ito","rarity":75},
    {"name":"Aya","rarity":75},
    {"name":"Kai","rarity":75},
    {"name":"Tadakuni","rarity":50},
    {"name":"Hidenori Tabata","rarity":50,"aliases":["Jack","Depp"]},
    {"name":"Yoshitake Tanaka","rarity":50,"aliases":["Markovich"]},
    {"name":"Motoharu","rarity":75},
    {"name":"Habara","rarity":75,"aliases":["Archdemon","Flat Chest"]},
    {"name":"Yoshitake no Ane","rarity":75,"aliases":["Yoshitake's Sister","Tanaka"]},
    {"name":"Kiyotaka no Imouto","rarity":75,"aliases":["Kiyotaka's Little Sister"]},
    {"name":"Ame","rarity":50},
    {"name":"Louis Valentin","rarity":75},
    {"name":"Edward","rarity":75},
    {"name":"Yumi Hinode","rarity":75},
    {"name":"Suss","rarity":75},
    {"name":"Maika Tsuchimikado","rarity":75},
    {"name":"Taichi Yaegashi","rarity":50},
    {"name":"Rina Yaegashi","rarity":75},
    {"name":"Tatsumi Yamada","rarity":75},
    {"name":"Leona Miyamura","rarity":75},
    {"name":"Katsuma Shimano","rarity":75},
    {"name":"Mahoro Shimano","rarity":75},
    {"name":"Eve Genoard","rarity":75},
    {"name":"Maiza Avaro","rarity":50},
    {"name":"Tick Jefferson","rarity":75,"aliases":["Chick"]},
    {"name":"Tim","rarity":75},
    {"name":"Lia Lin-Shan","rarity":75},
    {"name":"Elean Duga","rarity":75},
    {"name":"Sayu Ogiwara","rarity":50},
    {"name":"Issa Ogiwara","rarity":75},
    {"name":"Luke Valentine","rarity":75},
    {"name":"Arthur Hellsing","rarity":75},
    {"name":"Tron Morceau","rarity":75},
    {"name":"Cello Morceau","rarity":75},
    {"name":"May von Earlshide","rarity":75},
    {"name":"Kyousuke Kousaka","rarity":75,"aliases":["Kyou-chan"]},
    {"name":"Kirino Kousaka","rarity":75,"aliases":["Kiririn"]},
    {"name":"Ruri Gokou","rarity":75,"aliases":["Kuroneko","Shironeko"]},
    {"name":"Saori Makishima","rarity":75,"aliases":["Saori Bajeena (沙織・バジーナ)"]},
    {"name":"Hinata Gokou","rarity":75},
    {"name":"Tatsuya Himuro","rarity":75},
    {"name":"Zen Wistaria","rarity":50,"aliases":["Zen Wistalia"]},
    {"name":"Gou Matsuoka","rarity":50,"aliases":["Kou"]},
    {"name":"Nigredo","rarity":75},
    {"name":"Aika Sakuranomiya","rarity":75},
    {"name":"Kouichi Sakuranomiya","rarity":75},
    {"name":"Isuzu","rarity":75,"aliases":["Yamada Asaemon Isuzu (山田浅ェ門威鈴)"]},
    {"name":"Saya","rarity":75},
    {"name":"Iori Hashima","rarity":75},
    {"name":"Kinzou Shima","rarity":75,"aliases":["Kin-nii"]},
    {"name":"Satoshi Houjou","rarity":75,"aliases":["Nii-Nii"]},
    {"name":"Kuroka","rarity":75},
    {"name":"Venelana Gremory","rarity":75,"aliases":["Venelana Bael"]},
    {"name":"Amber","rarity":75,"aliases":["February"]},
    {"name":"Hinata Souma","rarity":75},
    {"name":"Toa","rarity":75},
    {"name":"Ryuuji Danma","rarity":75},
    {"name":"Azusa Fuyutsuki","rarity":50},
    {"name":"Nao Kadena","rarity":75},
    {"name":"Atoferatofe Raibaku","rarity":75,"aliases":["Atofe","Immortal Demon King"]},
    {"name":"Keita Amano","rarity":50,"aliases":["Tsucchie","Yama-san"]},
    {"name":"Konoha Hoshinomori","rarity":50},
    {"name":"Riki Misumi","rarity":75},
    {"name":"Mari Inuyashiki","rarity":75},
    {"name":"Takeshi Inuyashiki","rarity":75},
    {"name":"Inuyasha","rarity":50},
    {"name":"Sango","rarity":50},
    {"name":"Sesshoumaru","rarity":75},
    {"name":"Kikyou","rarity":75,"aliases":["Miko"]},
    {"name":"Kaede","rarity":75},
    {"name":"Gatenmaru","rarity":75},
    {"name":"Hiten Raijou","rarity":75},
    {"name":"Manten Raijou","rarity":75},
    {"name":"Sara Asano","rarity":75},
    {"name":"Souta Higurashi","rarity":75},
    {"name":"Mayu Ikeda","rarity":75},
    {"name":"Umaru Doma","rarity":50,"aliases":["Komaru","UMR"]},
    {"name":"Taihei Doma","rarity":50},
    {"name":"Takeshi Motoba","rarity":75,"aliases":["Bomber"]},
    {"name":"Alex Tachibana","rarity":75},
    {"name":"Izuko Gaen","rarity":75},
    {"name":"Kasegi","rarity":75,"aliases":["The Director"]},
    {"name":"Marilyn Nebraska","rarity":75,"aliases":["Maririn"]},
    {"name":"Ranran Valac","rarity":75},
    {"name":"Sinsin Valac","rarity":75},
    {"name":"Keebow Valac","rarity":75},
    {"name":"Konchie Valac","rarity":75},
    {"name":"Mal","rarity":75},
    {"name":"Sylvia Sabnock","rarity":75},
    {"name":"March Marbas","rarity":75},
    {"name":"Myron Alexius","rarity":75},
    {"name":"Kyouko Shimizu","rarity":75},
    {"name":"Mifuyu Matsumoto","rarity":75},
    {"name":"Bernadette Cavendish","rarity":75},
    {"name":"Kodaka Hasegawa","rarity":50,"aliases":["Pudding Head"]},
    {"name":"Kobato Hasegawa","rarity":75,"aliases":["Leysis Vi Felicity Sumeragi"]},
    {"name":"Maria Takayama","rarity":75},
    {"name":"Sakura Kagamihara","rarity":75},
    {"name":"Minami Toba","rarity":75},
    {"name":"Akari Inuyama","rarity":75},
    {"name":"Haru Onodera","rarity":75},
    {"name":"Yuuya Miyaji","rarity":75},
    {"name":"Akane Koganei","rarity":75},
    {"name":"Yuuichirou Saitou","rarity":75},
    {"name":"Kurumi Nonaka","rarity":75},
    {"name":"Diamond","rarity":75,"aliases":["Dia","Didi"]},
    {"name":"Yukina","rarity":75},
    {"name":"Touya","rarity":75},
    {"name":"Shizuru Kuwabara","rarity":75},
    {"name":"Toguro Ani","rarity":75,"aliases":["Elder Toguro"]},
    {"name":"Natsume","rarity":75},
    {"name":"Kujo","rarity":75},
    {"name":"Souichirou Hoshina","rarity":75},
    {"name":"William Moriarty","rarity":50,"aliases":["Liam"]},
    {"name":"Mycroft Holmes","rarity":75},
    {"name":"Linze Silhoueska","rarity":50},
    {"name":"Alma Strand","rarity":75},
    {"name":"Juutarou Kokonoe","rarity":75},
    {"name":"Origa Strand","rarity":75,"aliases":["Olga Strand"]},
    {"name":"Alfred Urnea Ortlinde","rarity":75},
    {"name":"Alm-Onji","rarity":75},
    {"name":"Ai Sunakawa","rarity":75},
    {"name":"Ayato Amagiri","rarity":50},
    {"name":"Priscilla Urzaiz","rarity":75},
    {"name":"Irene Urzaiz","rarity":75},
    {"name":"Henrietta de Tristain","rarity":75,"aliases":["Rietta"]},
    {"name":"Shuuji Yusa","rarity":75},
    {"name":"Ayame Moriya","rarity":75},
    {"name":"Maki Kuwana","rarity":75},
    {"name":"Suresia Analeit","rarity":75,"aliases":["Sue"]},
    {"name":"Schlain Zagan Analeit","rarity":50,"aliases":["Shunsuke Yamada (山田俊輔)"]},
    {"name":"Balto Phthalo","rarity":75},
    {"name":"Bloe Phthalo","rarity":75},
    {"name":"Nagisa Kurosawa","rarity":75,"aliases":["Nagi","Koharu"]},
    {"name":"Tomoko Kuroki","rarity":50,"aliases":["Mokocchi","Kuro"]},
    {"name":"Akihiko Arai","rarity":75,"aliases":["Akki"]},
    {"name":"Kohaku Kawashima","rarity":75},
    {"name":"Tsubame Kamaya","rarity":75},
    {"name":"Atla","rarity":75},
    {"name":"Fohl","rarity":75},
    {"name":"Mikado Shijo","rarity":75,"aliases":["Boyfucker Mikado (ボーイファッカー帝)"]},
    {"name":"Jigi","rarity":75,"aliases":["Rudy"]},
    {"name":"Isao","rarity":75,"aliases":["Mateo"]},
    {"name":"Kentarou Honda","rarity":75,"aliases":["Ken-Chan"]},
    {"name":"Mareyo Oomaeda","rarity":75},
    {"name":"Niko Kuna","rarity":75},
    {"name":"Naoki Azuma","rarity":50},
    {"name":"Alan Stuart","rarity":50,"aliases":["Prince Alan"]},
    {"name":"Sophia Ascart","rarity":50},
    {"name":"Lang","rarity":75},
    {"name":"Ryou Mashiba","rarity":75,"aliases":["Shinigami","The Executioner"]},
    {"name":"Kumi Mashiba","rarity":75},
    {"name":"Baobhan Sith","rarity":75,"aliases":["Laura Hellsing"]},
    {"name":"Tamaki Gokou","rarity":75},
    {"name":"Miyabi","rarity":75},
    {"name":"Rinko","rarity":75},
    {"name":"Kurara Hoshino","rarity":75},
    {"name":"Taylor Bartlett","rarity":50},
    {"name":"Koyuki Chigiri","rarity":75},
    {"name":"Tsukasa Hiiragi","rarity":50},
    {"name":"Kagami Hiiragi","rarity":50,"aliases":["Kagamin"]},
    {"name":"Inori Hiiragi","rarity":75},
    {"name":"Hikage Miyakawa","rarity":75},
    {"name":"Kaya Saimori","rarity":75},
    {"name":"Hazuki Kudou","rarity":75},
    {"name":"Yuzuha Shiba","rarity":75},
    {"name":"Luna Mitsuya","rarity":75,"aliases":["Runa Mitsuya"]},
    {"name":"Yuru","rarity":50},
    {"name":"Iori Shingou","rarity":75},
    {"name":"Yuzu Aihara","rarity":50,"aliases":["Okogi Yuzu (小此木柚子)","Yuzupon (ゆずポン)"]},
    {"name":"Tomozaki no Imouto","rarity":75,"aliases":["Tomozaki's Little Sister","Little Sister Tomozaki"]},
    {"name":"Flora Beltrum","rarity":75},
    {"name":"Aki Sendou","rarity":75},
    {"name":"Masato Sendou","rarity":75},
    {"name":"Vanessa Emerle","rarity":75},
    {"name":"Jeanne Euphoria","rarity":75},
    {"name":"Roroa Amidonia","rarity":75},
    {"name":"Julius Amidonia","rarity":75,"aliases":["Julius Lastania"]},
    {"name":"Rito Yuuki","rarity":50,"aliases":["Riko Yuusaki"]},
    {"name":"Haruna Sairenji","rarity":50},
    {"name":"Mikan Yuuki","rarity":75},
    {"name":"Akiho Sairenji","rarity":75},
    {"name":"Natsu no Chichi Dragneel","rarity":75},
    {"name":"Natsu no Haha Dragneel","rarity":75,"aliases":["Natsu's Mother"]},
    {"name":"Baki Hanma","rarity":50,"aliases":["Champion","Chijō Saikyō no Gaki"]},
    {"name":"Koushou Shinogi","rarity":75,"aliases":["The Cord Cutter"]},
    {"name":"Kureha Shinogi","rarity":75},
    {"name":"Youhei Nikaidou","rarity":75},
    {"name":"Kouhei Nikaidou","rarity":75},
    {"name":"Makanakkuru","rarity":75},
    {"name":"Staz Blood","rarity":50,"aliases":["Cherry-Blood"]},
    {"name":"Braz D. Blood","rarity":50},
    {"name":"Wild","rarity":75},
    {"name":"Rody Soul","rarity":75},
    {"name":"Mikio Shirato","rarity":75},
    {"name":"Battler Ushiromiya","rarity":80},
    {"name":"Gabiru","rarity":80},
    {"name":"Airi Kashii","rarity":80},
    {"name":"Kagetsu Hakamada","rarity":80},
    {"name":"Nayu Hasegawa","rarity":80},
    {"name":"Natsuhi Takenaka","rarity":80},
    {"name":"Manaka Nobidome","rarity":80},
    {"name":"Hatsue Nobidome","rarity":80},
    {"name":"Tsubaki Takenaka","rarity":80},
    {"name":"Hiiragi Takenaka","rarity":80},
    {"name":"Banri Kashii","rarity":80},
    {"name":"Pax Shirone","rarity":80},
    {"name":"Pirica Usui","rarity":80},
    {"name":"Gin Nanami","rarity":80},
    {"name":"Karen Nora Mathers","rarity":80},
    {"name":"Dabura","rarity":80},
    {"name":"Kazuya Uesugi","rarity":80},
    {"name":"Tatsuya Uesugi","rarity":80},
    {"name":"Eugene Rantz","rarity":80},
    {"name":"Shourei Nouzen","rarity":80},
    {"name":"Gyes Dedoldia","rarity":80},
    {"name":"Minitona Dedoldia","rarity":80},
    {"name":"Koji Kabuto","rarity":80},
    {"name":"Mona Narumi","rarity":80},
    {"name":"Satoshi Mochida","rarity":80},
    {"name":"Yuka Mochida","rarity":80},
    {"name":"Sena Narumi","rarity":80},
    {"name":"Yū Setoguchi","rarity":80},
    {"name":"Chiaki Serizawa","rarity":80},
    {"name":"Kōji","rarity":80},
    {"name":"Kyon-Kyon","rarity":80},
    {"name":"Ran-Ran","rarity":80},
    {"name":"Shino Madarame","rarity":80},
    {"name":"Kanna Ogata","rarity":80},
    {"name":"Yanagi Uzaki","rarity":80},
    {"name":"Kiri Uzaki","rarity":80},
    {"name":"Aza Chōbei","rarity":80},
    {"name":"Aza Tōma","rarity":80},
    {"name":"Futari Gotō","rarity":80},
    {"name":"Murdock","rarity":80},
    {"name":"Linia Dedoldia","rarity":80},
    {"name":"Pursena Adoldia","rarity":80},
    {"name":"Therese Latreia","rarity":80},
    {"name":"Shannon Sherwood","rarity":80},
    {"name":"Honami Konohoshi","rarity":80},
    {"name":"Erhart Hawke","rarity":80},
    {"name":"Kyle Salutania","rarity":80},
    {"name":"Rayne Salutania","rarity":80},
    {"name":"Elise Littstein","rarity":80},
    {"name":"Lambert Aurousseau","rarity":80},
    {"name":"Laios Touden","rarity":80},
    {"name":"Roy Valentine","rarity":80},
    {"name":"Marina Akitsuki","rarity":80},
    {"name":"Calca Bessarez","rarity":80},
    {"name":"Kō no Moronao","rarity":80},
    {"name":"Kō no Moroyasu","rarity":80},
    {"name":"Ashikaga Tadayoshi","rarity":80},
    {"name":"Yuuna Matsumoto","rarity":80},
    {"name":"Haruna Amaori","rarity":80},
    {"name":"Ravel Phenex","rarity":80},
    {"name":"Koku-u","rarity":80},
    {"name":"Haku-u","rarity":80},
    {"name":"Seki-u","rarity":80},
    {"name":"Leivinia Birdway","rarity":80},
    {"name":"Seria Kumokawa","rarity":80},
    {"name":"Carissa","rarity":80},
    {"name":"Riméa","rarity":80},
    {"name":"Elizalina","rarity":80},
    {"name":"Maiden of Versailles","rarity":80},
    {"name":"Villian","rarity":80},
    {"name":"Fremea Seivelun","rarity":80},
    {"name":"Kuuderika","rarity":80},
    {"name":"Ange Ushiromiya","rarity":80},
    {"name":"Kuriru Wakasagi","rarity":80},
    {"name":"Moruda Wakasagi","rarity":80},
    {"name":"Kiri Ichidou","rarity":80},
    {"name":"Ippei Kawa","rarity":80},
    {"name":"Kiyoi Shusse","rarity":80},
    {"name":"Mei Undou","rarity":80},
    {"name":"Hayate Hisakawa","rarity":80},
    {"name":"Nagi Hisakawa","rarity":80},
    {"name":"Ralph","rarity":80},
    {"name":"Zasha","rarity":80},
    {"name":"Mash","rarity":80},
    {"name":"Silvia Sabnock","rarity":80},
    {"name":"Urara Valac","rarity":80},
    {"name":"Yoichi Shigaraki","rarity":80},
    {"name":"Hiroe Atago","rarity":80},
    {"name":"Kinue Atago","rarity":80},
    {"name":"Ayako Kuroba","rarity":80},
    {"name":"Fumiya Kuroba","rarity":80},
    {"name":"Kanata Tsutsumi","rarity":80},
    {"name":"Kotona Tsutsumi","rarity":80},
    {"name":"Horokeu Usui","rarity":80},
    {"name":"Pingu","rarity":80},
    {"name":"Beerus","rarity":80},
    {"name":"Champa","rarity":80},
    {"name":"Cooler","rarity":80},
    {"name":"Kami","rarity":80},
    {"name":"Takeru Takaishi","rarity":80},
    {"name":"Phoenix Ikki","rarity":80},
    {"name":"Andromeda Shun","rarity":80},
    {"name":"Suigetsu Hōzuki","rarity":80},
    {"name":"Marin Eagle","rarity":80},
    {"name":"Remilia Scarlet","rarity":80},
    {"name":"Flandre Scarlet","rarity":80},
    {"name":"Akio Nitta","rarity":80},
    {"name":"Yuka Nitta","rarity":80},
    {"name":"Drum","rarity":80},
    {"name":"Jessica","rarity":80},
    {"name":"Nakoruru","rarity":80},
    {"name":"Kōichi Sakuranomiya","rarity":80},
    {"name":"Frieza","rarity":80},
    {"name":"Goten","rarity":80},
    {"name":"Celeste","rarity":80},
    {"name":"Moeha Fujiwara","rarity":80},
    {"name":"Edmaris Falmuth","rarity":80},
    {"name":"Doreth","rarity":80},
    {"name":"Narino Koiwai","rarity":80},
    {"name":"Akiko Hoshi","rarity":80},
    {"name":"Gwyn Sherwood","rarity":80},
    {"name":"Campacino","rarity":80},
    {"name":"Louis Valentine","rarity":80},
    {"name":"Kelart Custodio","rarity":80},
    {"name":"Carmine","rarity":80},
    {"name":"Kieran","rarity":80},
    {"name":"Sōtarō Tsumugi","rarity":80},
    {"name":"Franka","rarity":80},
    {"name":"Sieg","rarity":80},
    {"name":"Nekoryū","rarity":80},
    {"name":"Jinichi Zen'in","rarity":80},
    {"name":"Catwoman","rarity":80},
    {"name":"Wolverine","rarity":80},
    {"name":"Elena Miyano","rarity":80},
    {"name":"Hiromitsu Morofushi","rarity":80},
    {"name":"Captain Falcon","rarity":80},
    {"name":"Mariko Yashida","rarity":80},
    {"name":"Mizar Zeta Syd","rarity":80},
    {"name":"The Big","rarity":80},
    {"name":"The Cloud","rarity":80},
    {"name":"The Little","rarity":80},
    {"name":"The Rain","rarity":80},
    {"name":"Jean Grey","rarity":80},
    {"name":"Kinjiro Ryotsu","rarity":80},
    {"name":"Asbel","rarity":80},
    {"name":"Rastel","rarity":80},
    {"name":"Takaaki Morofushi","rarity":80},
    {"name":"Cyclops","rarity":80},
    {"name":"Pelly","rarity":80},
    {"name":"Phyllis","rarity":80},
  ]},
  {"id":"timed-v4-descent-8-school","anime":"mixed","category":"Any anime","text":"Name any anime set primarily at a school.","note":"School is the primary setting","since":"2026-11-27","descent":"title","conceptId":"nov27-school","top":"My Hero Academia","answers":[
    {"name":"My Hero Academia","rarity":0,"aliases":["Boku no Hero Academia"]},
    {"name":"Assassination Classroom","rarity":25,"aliases":["Ansatsu Kyoushitsu"]},
    {"name":"HAIKYU!!","rarity":25,"aliases":["Haikyuu!!"]},
    {"name":"Kaguya-sama: Love is War","rarity":25,"aliases":["Kaguya-sama wa Kokurasetai: Tensaitachi no Renai Zunousen"]},
    {"name":"Horimiya","rarity":25},
    {"name":"Toradora!","rarity":25},
    {"name":"My Hero Academia Season 4","rarity":25,"aliases":["Boku no Hero Academia 4"]},
    {"name":"Kakegurui","rarity":25},
    {"name":"Classroom of the Elite","rarity":25,"aliases":["Youkoso Jitsuryoku Shijou Shugi no Kyoushitsu e"]},
    {"name":"Charlotte","rarity":25},
    {"name":"Food Wars!","rarity":25,"aliases":["Shokugeki no Souma"]},
    {"name":"Soul Eater","rarity":25},
    {"name":"Another","rarity":25},
    {"name":"My Teen Romantic Comedy SNAFU","rarity":25,"aliases":["Yahari Ore no Seishun Love Come wa Machigatteiru."]},
    {"name":"Assassination Classroom Second Season","rarity":50,"aliases":["Ansatsu Kyoushitsu 2nd Season"]},
    {"name":"The Disastrous Life of Saiki K.","rarity":50,"aliases":["Saiki Kusuo no Ψ-nan"]},
    {"name":"Hyouka","rarity":50},
    {"name":"The Quintessential Quintuplets","rarity":50,"aliases":["Go-toubun no Hanayome"]},
    {"name":"Komi Can’t Communicate","rarity":50,"aliases":["Komi-san wa, Komyushou desu."]},
    {"name":"Clannad","rarity":50},
    {"name":"MASHLE: MAGIC AND MUSCLES","rarity":50,"aliases":["MASHLE"]},
    {"name":"Kaguya-sama: Love is War -Ultra Romantic-","rarity":50,"aliases":["Kaguya-sama wa Kokurasetai: Ultra Romantic"]},
    {"name":"Maid-Sama!","rarity":50,"aliases":["Kaichou wa Maid-sama!"]},
    {"name":"Kuroko's Basketball","rarity":50,"aliases":["Kuroko no Basket"]},
    {"name":"K-ON!","rarity":50},
    {"name":"My Teen Romantic Comedy SNAFU TOO!","rarity":50,"aliases":["Yahari Ore no Seishun Love Come wa Machigatteiru. Zoku"]},
    {"name":"The Pet Girl of Sakurasou","rarity":50,"aliases":["Sakurasou no Pet na Kanojo"]},
    {"name":"The Misfit of Demon King Academy: History’s Strongest Demon King Reincarnates and Goes to School with His Descendants","rarity":50,"aliases":["Maou Gakuin no Futekigousha: Shijou Saikyou no Maou no Shiso, Tensei shite Shison-tachi no Gakkou e Kayou"]},
    {"name":"Nisekoi","rarity":50},
    {"name":"DON'T TOY WITH ME, MISS NAGATORO","rarity":50,"aliases":["Ijiranaide, Nagatoro-san"]},
    {"name":"Classroom of the Elite Season 2","rarity":50,"aliases":["Youkoso Jitsuryoku Shijou Shugi no Kyoushitsu e 2nd Season"]},
    {"name":"My Little Monster","rarity":50,"aliases":["Tonari no Kaibutsu-kun"]},
    {"name":"ReLIFE","rarity":50},
    {"name":"The Irregular at Magic High School","rarity":50,"aliases":["Mahouka Koukou no Rettousei"]},
    {"name":"Ouran High School Host Club","rarity":50,"aliases":["Ouran Koukou Host Club"]},
    {"name":"BEASTARS","rarity":50},
    {"name":"Kimi ni Todoke: From Me to You","rarity":50,"aliases":["Kimi ni Todoke"]},
    {"name":"Prison School","rarity":50},
    {"name":"Chivalry of a Failed Knight","rarity":50,"aliases":["Rakudai Kishi no Cavalry"]},
    {"name":"Masamune-kun's Revenge","rarity":50,"aliases":["Masamune-kun no Revenge"]},
    {"name":"Blue Spring Ride","rarity":50,"aliases":["Ao Haru Ride"]},
    {"name":"Nichijou - My Ordinary Life","rarity":50,"aliases":["Nichijou"]},
    {"name":"Toilet-bound Hanako-kun","rarity":50,"aliases":["Jibaku Shounen Hanako-kun"]},
    {"name":"Kakegurui xx","rarity":50},
    {"name":"Orange","rarity":50},
    {"name":"My Teen Romantic Comedy SNAFU Climax!","rarity":50,"aliases":["Yahari Ore no Seishun Love Come wa Machigatteiru. Kan"]},
    {"name":"The Fragrant Flower Blooms With Dignity","rarity":50,"aliases":["Kaoru Hana wa Rin to Saku"]},
    {"name":"Alya Sometimes Hides Her Feelings in Russian","rarity":50,"aliases":["Tokidoki Bosotto Rossiya-go de Dereru Tonari no Alya-san"]},
    {"name":"SHIMONETA: A Boring World Where the Concept of Dirty Jokes Doesn’t Exist","rarity":50,"aliases":["Shimoneta to Iu Gainen ga Sonzai Shinai Taikutsu na Sekai"]},
    {"name":"Akashic Records of Bastard Magic Instructor","rarity":50,"aliases":["Rokudenashi Majutsu Koushi to Akashic Records"]},
    {"name":"The Melancholy of Haruhi Suzumiya","rarity":50,"aliases":["Suzumiya Haruhi no Yuuutsu"]},
    {"name":"Tsuredure Children","rarity":50,"aliases":["Tsurezure Children"]},
    {"name":"WIND BREAKER","rarity":50},
    {"name":"Daily Lives of High School Boys","rarity":50,"aliases":["Danshi Koukousei no Nichijou"]},
    {"name":"Classroom of the Elite Season 3","rarity":50,"aliases":["Youkoso Jitsuryoku Shijou Shugi no Kyoushitsu e 3rd Season"]},
    {"name":"Haven't You Heard? I'm Sakamoto","rarity":50,"aliases":["Sakamoto desu ga?"]},
    {"name":"Kokoro Connect","rarity":50},
    {"name":"Yamada and the Seven Witches","rarity":50,"aliases":["Yamada-kun to 7-nin no Majo"]},
    {"name":"Love, Chunibyo & Other Delusions - Heart Throb -","rarity":50,"aliases":["Chuunibyou demo Koi ga Shitai! Ren"]},
    {"name":"Wistoria: Wand and Sword","rarity":50,"aliases":["Tsue to Tsurugi no Wistoria"]},
    {"name":"Tomo-chan Is a Girl!","rarity":50,"aliases":["Tomo-chan wa Onnanoko!"]},
    {"name":"GTO: Great Teacher Onizuka","rarity":50,"aliases":["GTO"]},
    {"name":"More than a Married Couple, but Not Lovers.","rarity":50,"aliases":["Fuufu Ijou, Koibito Miman."]},
    {"name":"Welcome to Demon School! Iruma-kun","rarity":50,"aliases":["Mairimashita! Iruma-kun"]},
    {"name":"Komi Can't Communicate Part 2","rarity":50,"aliases":["Komi-san wa, Komyushou desu. 2"]},
    {"name":"Horimiya: The Missing Pieces","rarity":50,"aliases":["Horimiya: piece"]},
    {"name":"K-ON! Season 2","rarity":50},
    {"name":"Little Witch Academia (TV)","rarity":50},
    {"name":"Haganai","rarity":50,"aliases":["Boku wa Tomodachi ga Sukunai"]},
    {"name":"The Dangers in My Heart","rarity":50,"aliases":["Boku no Kokoro no Yabai Yatsu"]},
    {"name":"Tsukigakirei","rarity":50},
    {"name":"Say \"I love you\".","rarity":50,"aliases":["Sukitte Ii na yo."]},
    {"name":"Sound! Euphonium","rarity":50,"aliases":["Hibike! Euphonium"]},
    {"name":"Kaguya-sama: Love is War -The First Kiss That Never Ends-","rarity":50,"aliases":["Kaguya-sama wa Kokurasetai: First Kiss wa Owaranai"]},
    {"name":"Lucky☆Star","rarity":50},
    {"name":"The Fruit of Grisaia","rarity":50,"aliases":["Grisaia no Kajitsu"]},
    {"name":"The Daily Life of the Immortal King","rarity":50,"aliases":["Xian Wang De Richang Shenghuo"]},
    {"name":"ORESUKI: Are you the only one who loves me?","rarity":50,"aliases":["Ore wo Suki nano wa Omae dake ka yo"]},
    {"name":"BEASTARS Season 2","rarity":50,"aliases":["BEASTARS 2nd Season"]},
    {"name":"The Misfit of Demon King Academy Ⅱ: History's Strongest Demon King Reincarnates and Goes to School with His Descendants","rarity":50,"aliases":["Maou Gakuin no Futekigousha: Shijou Saikyou no Maou no Shiso, Tensei shite Shison-tachi no Gakkou e Kayou II"]},
    {"name":"Lovely Complex","rarity":50},
    {"name":"Rosario + Vampire","rarity":80,"aliases":["Rosario to Vampire"]},
    {"name":"Isekai Quartet","rarity":80},
    {"name":"Interviews with Monster Girls","rarity":80,"aliases":["Demi-chan wa Kataritai"]},
    {"name":"Vampire Knight","rarity":80},
    {"name":"Rosario + Vampire Capu2","rarity":80,"aliases":["Rosario to Vampire Capu2"]},
    {"name":"Actually, I Am","rarity":80,"aliases":["Jitsu wa Watashi wa"]},
    {"name":"Valvrave the Liberator","rarity":80,"aliases":["Kakumeiki Valvrave"]},
    {"name":"Karin: Chibi Vampire","rarity":80,"aliases":["Karin"]},
    {"name":"FORTUNE ARTERIAL: Akai Yakusoku","rarity":80},
    {"name":"Vermeil in Gold","rarity":80,"aliases":["Kinsou no Vermeil: Gakeppuchi Majutsushi wa Saikyou no Yakusai to Mahou Sekai wo Tsukisusumu"]},
    {"name":"My Deer Friend Nokotan","rarity":80,"aliases":["Shikanoko Nokonoko Koshitantan"]},
    {"name":"Welcome to Demon School! Iruma-kun Season 2","rarity":80,"aliases":["Mairimashita! Iruma-kun 2"]},
    {"name":"To Love Ru Darkness","rarity":80},
    {"name":"Welcome to Demon School! Iruma-kun Season 3","rarity":80,"aliases":["Mairimashita! Iruma-kun 3"]},
    {"name":"Motto To Love Ru","rarity":80},
    {"name":"The Fruit of Evolution: Before I Knew It, My Life Had It Made Season 2","rarity":80,"aliases":["Shin Shinka no Mi: Shiranai Uchi ni Kachigumi Jinsei"]},
    {"name":"Welcome to Demon School! Iruma-kun Season 4","rarity":80,"aliases":["Mairimashita! Iruma-kun 4"]},
    {"name":"Mysteria Friends","rarity":80,"aliases":["Manaria Friends"]},
    {"name":"A Centaur's Life","rarity":80,"aliases":["Centaur no Nayami"]},
    {"name":"A Terrified Teacher at Ghoul School!","rarity":80,"aliases":["Youkai Gakkou no Sensei Hajimemashita!"]},
    {"name":"Aharen-san wa Hakarenai","rarity":80},
    {"name":"SCHOOL-LIVE!","rarity":80,"aliases":["Gakkou Gurashi!"]},
    {"name":"Ghost Stories","rarity":80,"aliases":["Gakkou no Kaidan"]},
    {"name":"Blade Dance of the Elementalers","rarity":80,"aliases":["Seirei Tsukai no Blade Dance"]},
    {"name":"Urusei Yatsura (2022) Seasons 1 & 2","rarity":80,"aliases":["Urusei Yatsura (2022)"]},
    {"name":"Reign of the Seven Spellblades","rarity":80,"aliases":["Nanatsu no Maken ga Shihai Suru"]},
    {"name":"Silver Spoon","rarity":80,"aliases":["Gin no Saji"]},
    {"name":"S.A: Special A","rarity":80,"aliases":["Special A"]},
    {"name":"Seton Academy: Join the Pack!","rarity":80,"aliases":["Murenase! Seton Gakuen"]},
    {"name":"Cromartie High School","rarity":80,"aliases":["Sakigake!! Cromartie Koukou"]},
    {"name":"Go For It, Nakamura-kun!!","rarity":80,"aliases":["Ganbare! Nakamura-kun!!"]},
    {"name":"Silver Spoon Season 2","rarity":80,"aliases":["Gin no Saji 2"]},
    {"name":"Umamusume: Pretty Derby Season 3","rarity":80},
    {"name":"Teasing Master Takagi-san: The Movie","rarity":80,"aliases":["Karakai Jouzu no Takagi-san Movie"]},
    {"name":"Mashiroiro Symphony","rarity":80,"aliases":["Mashiroiro Symphony: The color of lovers"]},
    {"name":"Disney Twisted-Wonderland: The Animation","rarity":80,"aliases":["Disney Twisted-Wonderland: THE ANIMATION - Season 1: EPISODE of HEARTSLABYUL"]},
    {"name":"Bloom Into You","rarity":80,"aliases":["Yagate Kimi ni Naru"]},
    {"name":"Makeine: Too Many Losing Heroines!","rarity":80,"aliases":["Make Heroine ga Oosugiru!"]},
    {"name":"Skip and Loafer","rarity":80,"aliases":["Skip to Loafer"]},
    {"name":"You and I Are Polar Opposites","rarity":80,"aliases":["Seihantai na Kimi to Boku"]},
    {"name":"Gabriel DropOut","rarity":80},
    {"name":"Kimi ni Todoke: From Me to You Season 2","rarity":80,"aliases":["Kimi ni Todoke 2ND SEASON"]},
    {"name":"The Melancholy of Haruhi Suzumiya (2009)","rarity":80,"aliases":["Suzumiya Haruhi no Yuuutsu (2009)"]},
    {"name":"Love Live! School Idol Project","rarity":80},
    {"name":"Azumanga Daioh","rarity":80,"aliases":["Azumanga Daiou THE ANIMATION"]},
    {"name":"O Maidens in Your Savage Season","rarity":80,"aliases":["Araburu Kisetsu no Otome-domo yo."]},
    {"name":"ReLIFE: Final Arc","rarity":80,"aliases":["ReLIFE: Kanketsu-hen"]},
    {"name":"Why the hell are you here, Teacher!?","rarity":80,"aliases":["Nande Koko ni Sensei ga!?"]},
    {"name":"My Stepmom's Daughter is My Ex","rarity":80,"aliases":["Mamahaha no Tsurego ga Motokano datta"]},
    {"name":"The Dangers in My Heart Season 2","rarity":80,"aliases":["Boku no Kokoro no Yabai Yatsu 2nd Season"]},
    {"name":"I Made Friends with the Second Prettiest Girl in My Class","rarity":80,"aliases":["Class de 2-banme ni Kawaii Onnanoko to Tomodachi ni Natta"]},
    {"name":"DON'T TOY WITH ME, MISS NAGATORO 2nd Attack","rarity":80,"aliases":["Ijiranaide, Nagatoro-san 2nd Attack"]},
    {"name":"Little Witch Academia","rarity":80},
    {"name":"Secrets of the Silent Witch","rarity":80,"aliases":["Silent Witch: Chinmoku no Majo no Kakushigoto"]},
    {"name":"Pseudo Harem","rarity":80,"aliases":["Giji Harem"]},
    {"name":"Kaguya-sama wa Kokurasetai: Tensaitachi no Renai Zunousen OVA","rarity":80},
    {"name":"Teasing Master Takagi-san Season 2","rarity":80,"aliases":["Karakai Jouzu no Takagi-san 2"]},
    {"name":"The Ramparts of Ice","rarity":80,"aliases":["Koori no Jouheki"]},
    {"name":"Danganronpa 3: The End of Hope’s Peak High School - Despair Arc","rarity":80,"aliases":["Danganronpa 3: The End of Kibougamine Gakuen - Zetsubou-hen"]},
    {"name":"Just Because!","rarity":80},
    {"name":"YuruYuri","rarity":80},
    {"name":"Mysterious Girlfriend X","rarity":80,"aliases":["Nazo no Kanojo X"]},
    {"name":"Ao-chan Can't Study!","rarity":80,"aliases":["Midara na Ao-chan wa Benkyou ga Dekinai"]},
    {"name":"This Art Club Has a Problem!","rarity":80,"aliases":["Kono Bijutsu-bu ni wa Mondai ga Aru!"]},
    {"name":"The Troubled Life of Miss Kotoura","rarity":80,"aliases":["Kotoura-san"]},
    {"name":"My Girlfriend is Shobitch","rarity":80,"aliases":["Boku no Kanojo ga Majime Sugiru Shoujo Bitch na Ken"]},
    {"name":"Aria the Scarlet Ammo","rarity":80,"aliases":["Hidan no Aria"]},
    {"name":"Akebi’s Sailor Uniform","rarity":80,"aliases":["Akebi-chan no Sailor Fuku"]},
    {"name":"Mobile Suit Gundam: The Witch from Mercury","rarity":80,"aliases":["Kidou Senshi Gundam: Suisei no Majo"]},
    {"name":"Hitoribocchi no Marumaruseikatsu","rarity":80,"aliases":["Hitoribocchi no ○○ Seikatsu"]},
    {"name":"You and I Are Polar Opposites Season 2","rarity":80,"aliases":["Seihantai na Kimi to Boku 2nd Season"]},
    {"name":"Sakura Trick","rarity":80},
    {"name":"Yamada's First Time: B Gata H Kei","rarity":80,"aliases":["B Gata H Kei"]},
    {"name":"I've Always Liked You","rarity":80,"aliases":["Zutto Mae kara Suki deshita.: Kokuhaku Jikkou Iinkai"]},
    {"name":"When Will Ayumu Make His Move?","rarity":80,"aliases":["Soredemo Ayumu wa Yosetekuru"]},
    {"name":"Tokyo Ravens","rarity":80},
    {"name":"Demon King Daimao","rarity":80,"aliases":["Ichiban Ushiro no Daimaou"]},
    {"name":"Aesthetica of a Rogue Hero","rarity":80,"aliases":["Hagure Yuusha no Estetica"]},
    {"name":"The World God Only Knows II","rarity":80,"aliases":["Kami nomi zo Shiru Sekai II"]},
    {"name":"A Returner's Magic Should Be Special","rarity":80,"aliases":["Kikansha no Mahou wa Tokubetsu desu"]},
    {"name":"Anti-Magic Academy: The 35th Test Platoon","rarity":80,"aliases":["Taimadou Gakuen 35 Shiken Shoutai"]},
    {"name":"The Misfit of Demon King Academy II (Cour 2)","rarity":80,"aliases":["Maou Gakuin no Futekigousha: Shijou Saikyou no Maou no Shiso, Tensei shite Shison-tachi no Gakkou e Kayou II Part 2"]},
    {"name":"From Overshadowed to Overpowered: Second Reincarnation of a Talentless Sage","rarity":80,"aliases":["Rakudai Kenja no Gakuin Musou: Nidome no Tensei, S-Rank Cheat Majutsushi Bouken-roku"]},
    {"name":"The 100 Girlfriends Who Really, Really, Really, Really, REALLY Love You","rarity":80,"aliases":["Kimi no Koto ga Dai Dai Dai Dai Daisuki na 100-nin no Kanojo"]},
    {"name":"Oreshura","rarity":80,"aliases":["Ore no Kanojo to Osananajimi ga Shuraba Sugiru"]},
    {"name":"We Never Learn: BOKUBEN","rarity":80,"aliases":["Bokutachi wa Benkyou ga Dekinai"]},
    {"name":"School Days (TV)","rarity":80},
    {"name":"Tanaka-kun is Always Listless","rarity":80,"aliases":["Tanaka-kun wa Itsumo Kedaruge"]},
    {"name":"Classroom of the Elite 4th Season: Second Year, First Semester","rarity":80,"aliases":["Youkoso Jitsuryoku Shijou Shugi no Kyoushitsu e 4th Season 2-nensei-hen Ichi Gakki"]},
    {"name":"Absolute Duo","rarity":80},
    {"name":"Baka and Test - Summon the Beasts","rarity":80,"aliases":["Baka to Test to Shoukanjuu"]},
    {"name":"Boarding School Juliet","rarity":80,"aliases":["Kishuku Gakkou no Juliet"]},
    {"name":"Seitokai Yakuindomo","rarity":80},
    {"name":"When Supernatural Battles Became Commonplace","rarity":80,"aliases":["Inou-Battle wa Nichijou-kei no Naka de"]},
    {"name":"School Babysitters","rarity":80,"aliases":["Gakuen Babysitters"]},
    {"name":"Mayo Chiki!","rarity":80},
    {"name":"Armed Girl's Machiavellism","rarity":80,"aliases":["Busou Shoujo Machiavellianism"]},
    {"name":"Kubo Won't Let Me Be Invisible","rarity":80,"aliases":["Kubo-san wa Mob wo Yurusanai"]},
    {"name":"The Disastrous Life of Saiki K. Season 3","rarity":80,"aliases":["Saiki Kusuo no Ψ-nan: Kanketsu-hen"]},
    {"name":"The Girl I Like Forgot Her Glasses","rarity":80,"aliases":["Suki na Ko ga Megane wo Wasureta"]},
    {"name":"The Dreaming Boy is a Realist","rarity":80,"aliases":["Yumemiru Danshi wa Genjitsushugisha"]},
    {"name":"My Mental Choices Are Completely Interfering With My School Romantic Comedy","rarity":80,"aliases":["Ore no Nounai Sentakushi ga, Gakuen Love Comedy wo Zenryoku de Jama Shiteiru"]},
    {"name":"Amagami SS","rarity":80},
    {"name":"D-Frag!","rarity":80},
    {"name":"Osamake: Romcom Where The Childhood Friend Won't Lose","rarity":80,"aliases":["Osananajimi ga Zettai ni Makenai Love Kome"]},
    {"name":"Witch on the Holy Night","rarity":80,"aliases":["Mahoutsukai no Yoru"]},
    {"name":"Mobile Suit Gundam: The Witch from Mercury Season 2","rarity":80,"aliases":["Kidou Senshi Gundam: Suisei no Majo Season 2"]},
    {"name":"RWBY: Ice Queendom","rarity":80,"aliases":["RWBY: Hyousetsu Teikoku"]},
    {"name":"Blue Archive The Animation","rarity":80},
    {"name":"Anne-Happy","rarity":80},
    {"name":"My-HiME","rarity":80,"aliases":["Mai-HiME"]},
    {"name":"Pani Poni Dash!","rarity":80},
    {"name":"Kakegurui Twin","rarity":80},
    {"name":"Here is Greenwood","rarity":80,"aliases":["Koko wa Green Wood"]},
    {"name":"Seiren","rarity":80},
    {"name":"There's No Freaking Way I'll Be Your Lover! Unless…","rarity":80,"aliases":["Watashi ga Koibito ni Nareru Wake Nai jan, Muri Muri! (※Muri ja Nakatta!?)"]},
    {"name":"Bottom-Tier Character Tomozaki 2nd Stage","rarity":80,"aliases":["Jaku-Chara Tomozaki-kun 2nd STAGE"]},
    {"name":"SKET Dance","rarity":80},
    {"name":"Student Council's Discretion","rarity":80,"aliases":["Seitokai no Ichizon"]},
    {"name":"A Misanthrope Teaches a Class for Demi-Humans","rarity":80,"aliases":["Jingai Kyoushitsu no Ningengirai Kyoushi"]},
    {"name":"Isekai Quartet 3","rarity":80},
    {"name":"Ichijyoma Mankitsu Gurashi!","rarity":80,"aliases":["Ichijouma Mankitsu-gurashi!"]},
    {"name":"Slam Dunk","rarity":80},
    {"name":"Ahiru no Sora","rarity":80},
    {"name":"2.43: Seiin High School Boys Volleyball Team","rarity":80,"aliases":["2.43: Seiin Koukou Danshi Volley-bu"]},
    {"name":"HAIKYU!!: VS Failing Marks","rarity":80,"aliases":["Haikyuu!!: VS Akaten"]},
    {"name":"Eyeshield 21","rarity":80},
    {"name":"Girls und Panzer der Film","rarity":80,"aliases":["Girls und Panzer Movie"]},
    {"name":"High Speed! -Free! Starting Days-","rarity":80},
    {"name":"Wandance","rarity":80},
    {"name":"TAMAYOMI: The Baseball Girls","rarity":80,"aliases":["Tamayomi"]},
    {"name":"Touch","rarity":80},
  ]},
  {"id":"timed-v4-descent-8-wings","anime":"mixed","category":"Any anime","text":"Name any anime character who has wings.","note":"Documented character trait or relationship","since":"2026-11-27","descent":"char","conceptId":"nov27-wings","top":"Hawks","answers":[
    {"name":"Ryuuko Tatsuma","rarity":50,"aliases":["Ryuko Tatsuma","Dragoon Hero: Ryuukyuu"]},
    {"name":"Ulquiorra Cifer","rarity":50,"aliases":["Schiffer"]},
    {"name":"Shagotte","rarity":50,"aliases":["Queen"]},
    {"name":"Aleksai Amigochaz","rarity":75},
    {"name":"Urouge","rarity":25},
    {"name":"Pierre","rarity":25},
    {"name":"Batman","rarity":25},
    {"name":"Hetare","rarity":25},
    {"name":"Konan","rarity":50},
    {"name":"Azriel","rarity":50},
    {"name":"Hawks","rarity":0,"aliases":["Keigo Takami"]},
    {"name":"Shrieker","rarity":50},
    {"name":"Hyourinmaru","rarity":50},
    {"name":"Ruri'iro Kujaku","rarity":50},
    {"name":"Albedo","rarity":50},
    {"name":"Lucifer","rarity":25},
    {"name":"Happy","rarity":25},
    {"name":"Jose Porla","rarity":50},
    {"name":"Chomusuke","rarity":50},
    {"name":"Ryou Asuka","rarity":50},
    {"name":"Dohnaseek","rarity":75},
    {"name":"Hana Kurusu","rarity":75},
    {"name":"Victim","rarity":75},
    {"name":"Gajira Norimaki","rarity":75},
    {"name":"Raphael","rarity":75},
    {"name":"Artosh","rarity":75},
    {"name":"Gros","rarity":75},
    {"name":"Zodd","rarity":75},
    {"name":"Slan","rarity":75},
    {"name":"Lilith","rarity":75},
    {"name":"Kalego Naberius","rarity":75},
    {"name":"Monad Proxy","rarity":75},
    {"name":"Kairyu","rarity":75},
    {"name":"Heracros","rarity":75},
    {"name":"Yorunozuku","rarity":75},
    {"name":"Lizardon","rarity":75},
    {"name":"Butterfree","rarity":75},
    {"name":"Crobat","rarity":75},
  ]},
  {"id":"timed-v4-descent-8-fly","anime":"mixed","category":"Any anime","text":"Name any anime character who can fly.","note":"Documented character trait or relationship","since":"2026-11-27","descent":"char","conceptId":"nov27-fly","top":"Goku","answers":[
    {"name":"Pell","rarity":25,"aliases":["Peregrine Falcon","Peru"]},
    {"name":"Happy","rarity":25},
    {"name":"Bra","rarity":75,"aliases":["Bulla","Bura"]},
    {"name":"Zodd","rarity":75,"aliases":["Nosferatu Zodd (不死のゾッド)","Zodd the Immortal"]},
    {"name":"Shippo","rarity":50},
    {"name":"Crobat","rarity":75,"aliases":["Nostenfer","Iksbat"]},
    {"name":"Konan","rarity":50},
    {"name":"Keigo Takami","rarity":50},
    {"name":"Kiki","rarity":50},
    {"name":"Kairyu","rarity":75},
    {"name":"Lizardon","rarity":75},
    {"name":"Butterfree","rarity":75},
    {"name":"Cream the Rabbit","rarity":80},
    {"name":"Selene","rarity":80},
    {"name":"BooGoo","rarity":80},
    {"name":"Babidi","rarity":80},
    {"name":"Peggy","rarity":80},
    {"name":"Igneel","rarity":80},
    {"name":"Ace","rarity":80},
    {"name":"Chomei","rarity":80},
    {"name":"Jean Grey","rarity":80},
    {"name":"Storm","rarity":80},
    {"name":"Captain Celebrity","rarity":80},
    {"name":"Goku","rarity":0},
  ]},
  {"id":"timed-v4-descent-8-games","anime":"mixed","category":"Any anime","text":"Name any anime where games or competitions are central to the story.","note":"Games or structured competitions are central","since":"2026-11-27","descent":"title","conceptId":"nov27-games","top":"Yu-Gi-Oh!","answers":[
    {"name":"Sword Art Online","rarity":8},
    {"name":"HAIKYU!!","rarity":25,"aliases":["Haikyuu!!"]},
    {"name":"No Game, No Life","rarity":25},
    {"name":"Kakegurui","rarity":25},
    {"name":"Sword Art Online II","rarity":25},
    {"name":"The Future Diary","rarity":25,"aliases":["Mirai Nikki"]},
    {"name":"HAIKYU!! 2nd Season","rarity":25,"aliases":["Haikyuu!! 2nd Season"]},
    {"name":"HAIKYU!! 3rd Season","rarity":50,"aliases":["Haikyuu!!: Karasuno Koukou VS Shiratorizawa Gakuen Koukou"]},
    {"name":"Fate/Zero","rarity":50},
    {"name":"BLUE LOCK","rarity":50},
    {"name":"HAIKYU!! TO THE TOP","rarity":50,"aliases":["Haikyuu!! TO THE TOP"]},
    {"name":"Kuroko's Basketball","rarity":50,"aliases":["Kuroko no Basket"]},
    {"name":"JUJUTSU KAISEN Season 3: The Culling Game Part 1","rarity":50,"aliases":["Jujutsu Kaisen: Shimetsu Kaiyuu - Zenpen"]},
    {"name":"HAIKYU!! TO THE TOP Part 2","rarity":50,"aliases":["Haikyuu!! TO THE TOP 2"]},
    {"name":"Log Horizon","rarity":50},
    {"name":"SK8 the Infinity","rarity":50},
    {"name":"Yuri!!! on ICE","rarity":50,"aliases":["Yuuri!!! on ICE"]},
    {"name":"No Game, No Life Zero","rarity":50},
    {"name":"My Love Story with Yamada-kun at Lv999","rarity":50,"aliases":["Yamada-kun to Lv999 no Koi wo Suru"]},
    {"name":"Sword Art Online the Movie: Ordinal Scale","rarity":50,"aliases":["Sword Art Online: Ordinal Scale"]},
    {"name":"Shangri-La Frontier","rarity":50},
    {"name":"Fate/stay night","rarity":50},
    {"name":"BOFURI: I Don't Want to Get Hurt, so I'll Max Out My Defense.","rarity":50,"aliases":["Itai no wa Iya nano de Bougyoryoku ni Kyokufuri Shitai to Omoimasu."]},
    {"name":"Kuroko's Basketball 2","rarity":50,"aliases":["Kuroko no Basket 2nd SEASON"]},
    {"name":"Free! -Iwatobi Swim Club-","rarity":50,"aliases":["Free!"]},
    {"name":"GAMERS!","rarity":50},
    {"name":"Darwin's Game","rarity":50},
    {"name":"Tomodachi Game","rarity":50},
    {"name":"Sword Art Online Alternative: Gun Gale Online","rarity":50},
    {"name":"BTOOOM!","rarity":50},
    {"name":"Kuroko's Basketball 3","rarity":50,"aliases":["Kuroko no Basket 3rd SEASON"]},
    {"name":"Blue Box","rarity":50,"aliases":["Ao no Hako"]},
    {"name":"BLUE LOCK Season 2","rarity":50,"aliases":["Blue Lock VS. U-20 JAPAN"]},
    {"name":"Megalobox","rarity":50},
    {"name":"Akagi","rarity":80,"aliases":["Touhai Densetsu Akagi: Yami ni Maiorita Tensai"]},
    {"name":"JUNI TAISEN：ZODIAC WAR","rarity":80,"aliases":["Juuni Taisen"]},
    {"name":"Killing Bites","rarity":80},
    {"name":"Shangri-La Frontier Season 2","rarity":80,"aliases":["Shangri-La Frontier 2nd Season"]},
    {"name":"Umamusume: Pretty Derby","rarity":80},
    {"name":"From Bureaucrat to Villainess: Dad's Been Reincarnated!","rarity":80,"aliases":["Akuyaku Reijou Tensei Oji-san"]},
    {"name":"Umamusume: Pretty Derby Season 3","rarity":80},
    {"name":"Umamusume: Cinderella Gray 2nd Cour","rarity":80,"aliases":["Uma Musume: Cinderella Gray Part 2"]},
    {"name":"Walkure Romanze","rarity":80},
    {"name":"Recovery of an MMO Junkie","rarity":80,"aliases":["Net-juu no Susume"]},
    {"name":"NEW GAME!","rarity":80},
    {"name":"Redline","rarity":80},
    {"name":"Keijo!!!!!!!!","rarity":80},
    {"name":"Sword Art Online the Movie -Progressive- Aria of a Starless Night","rarity":80,"aliases":["Sword Art Online: Progressive - Hoshinaki Yoru no Aria"]},
    {"name":"Bubble","rarity":80},
    {"name":"Girls und Panzer","rarity":80},
    {"name":"Do You Love Your Mom and Her Two-Hit Multi-Target Attacks?","rarity":80,"aliases":["Tsuujou Kougeki ga Zentai Kougeki de Ni-kai Kougeki no Okaasan wa Suki desu ka?"]},
    {"name":"Hikaru no Go","rarity":80},
    {"name":"After School Dice Club","rarity":80,"aliases":["Houkago Saikoro Club"]},
    {"name":"Saki: The Nationals","rarity":80,"aliases":["Saki: Zenkoku-hen"]},
    {"name":"Saki - Episode of Side A","rarity":80,"aliases":["Saki: Achiga-hen - episode of side-A"]},
    {"name":"Shion no Ou: The Flowers of Hard Blood","rarity":80},
    {"name":"Usagi ga Kowai","rarity":80},
    {"name":"Shogi Hour","rarity":80},
    {"name":"The World Hasn’t Even Started Yet","rarity":80,"aliases":["Sekai wa Mada Hajimatte sura Inai"]},
    {"name":"I'm Standing on a Million Lives","rarity":80,"aliases":["100-man no Inochi no Ue ni Ore wa Tatteiru"]},
    {"name":"Aoashi","rarity":80},
    {"name":"Kuroko's Basketball: Last Game","rarity":80,"aliases":["Kuroko no Basket: Last Game"]},
    {"name":"Danganronpa 3: The End of Hope’s Peak High School - Future Arc","rarity":80,"aliases":["Danganronpa 3: The End of Kibougamine Gakuen - Mirai-hen"]},
    {"name":"Magical Girl Raising Project","rarity":80,"aliases":["Mahou Shoujo Ikusei Keikaku"]},
    {"name":"Inazuma Eleven GO: Chrono Stone","rarity":80},
    {"name":"Angelic Layer","rarity":80,"aliases":["Kidou Tenshi Angelic Layer"]},
    {"name":"Liar, Liar","rarity":80},
    {"name":"Death Billiards","rarity":80},
    {"name":"One Outs","rarity":80},
    {"name":"Kakegurui Twin","rarity":80},
    {"name":"LIAR GAME","rarity":80},
    {"name":"The Ones Within","rarity":80,"aliases":["Naka no Hito Genome [Jikkyouchuu]"]},
    {"name":"One Piece The Movie: The Dead End Adventure","rarity":80,"aliases":["ONE PIECE THE MOVIE: Dead End no Bouken"]},
    {"name":"FX Fighter Kurumi-chan","rarity":80,"aliases":["FX Senshi Kurumi-chan"]},
    {"name":"BUS GAMER","rarity":80},
    {"name":"Gambler Densetsu Tetsuya","rarity":80},
    {"name":"The Prince of Tennis: Two Samurais, The First Game","rarity":80,"aliases":["Tennis no Ouji-sama: Futari no Samurai - The First Game"]},
    {"name":"Hanabichan ~The girl who popped out of the game world~","rarity":80,"aliases":["Hanabi-chan wa Okure-gachi"]},
    {"name":"Log Horizon 2","rarity":80},
    {"name":"The King's Avatar","rarity":80,"aliases":["Quanzhi Gaoshou"]},
    {"name":"Full Dive: This Ultimate Next-Gen Full Dive RPG Is Even Shittier than Real Life!","rarity":80,"aliases":["Kyuukyoku Shinka Shita Full Dive RPG ga Genjitsu yori mo Kusogee Dattara"]},
    {"name":"Overgeared","rarity":80,"aliases":["Tempal: Item no Chikara"]},
    {"name":"Sword Art Online the Movie -Progressive- Scherzo of Deep Night","rarity":80,"aliases":["Sword Art Online: Progressive - Kuraki Yuuyami no Scherzo"]},
    {"name":"In the Land of Leadale","rarity":80,"aliases":["Leadale no Daichi nite"]},
    {"name":"Infinite Dendrogram","rarity":80},
    {"name":"Apocalypse Bringer Mynoghra: World Conquest Starts with the Civilization of Ruin","rarity":80,"aliases":["Isekai Mokushiroku Mynoghra: Hametsu no Bunmei de Hajimeru Sekai Seifuku"]},
    {"name":"Sword Art Online Alternative: Gun Gale Online II","rarity":80},
    {"name":"Seven Senses of the Re'Union","rarity":80,"aliases":["Shichisei no Subaru"]},
    {"name":"HAIKYU!!: Lev Appears!","rarity":80,"aliases":["Haikyuu!!: Lev Kenzan!"]},
    {"name":"Endo and Kobayashi Live! The Latest on Tsundere Villainess Lieselotte","rarity":80,"aliases":["Tsundere Akuyaku Reijou Liselotte to Jikkyou no Endou-kun to Kaisetsu no Kobayashi-san"]},
    {"name":"Hyperdimension Neptunia","rarity":80,"aliases":["Choujigen Game Neptune THE ANIMATION"]},
    {"name":"A Playthrough of a Certain Dude's VRMMO Life","rarity":80,"aliases":["Toaru Ossan no VRMMO Katsudouki"]},
    {"name":"Hi Score Girl II","rarity":80},
    {"name":".hack//SIGN","rarity":80},
    {"name":"HUNTER×HUNTER: Greed Island","rarity":80},
    {"name":"The King's Avatar S2","rarity":80,"aliases":["Quanzhi Gaoshou 2"]},
    {"name":"Young Ladies Don't Play Fighting Games","rarity":80,"aliases":["Tai-Ari deshita.: Ojou-sama wa Kakutou Game nante Shinai"]},
    {"name":"GOOD NIGHT WORLD","rarity":80},
    {"name":"Quanzhi Gaoshou Specials","rarity":80},
    {"name":"16bit Sensation: Another Layer","rarity":80},
    {"name":"Protocol: Rain","rarity":80,"aliases":["Bokura no Ameiro Protocol"]},
    {"name":"The King's Avatar: For the Glory","rarity":80,"aliases":["Quanzhi Gaoshou: Dianfeng Rongyao"]},
    {"name":"Detective Conan: The Phantom of Baker Street","rarity":80,"aliases":["Meitantei Conan: Baker Street no Bourei"]},
    {"name":"Magic of Stella","rarity":80,"aliases":["Stella no Mahou"]},
    {"name":".hack//Roots","rarity":80},
    {"name":"Shadowverse","rarity":80},
    {"name":"Necronomico and the Cosmic Horror Show","rarity":80,"aliases":["Necronomico no Cosmic Horror Show"]},
    {"name":"Circlet Princess","rarity":80},
    {"name":"HAIKYU!! LAND VS. AIR","rarity":80,"aliases":["Haikyuu!! Riku VS Kuu"]},
    {"name":"HAIKYU!! The Dumpster Battle","rarity":80,"aliases":["Haikyuu!!: Gomi Suteba no Kessen"]},
    {"name":"STEEL BALL RUN JoJo's Bizarre Adventure 1st STAGE","rarity":80,"aliases":["JoJo no Kimyou na Bouken: Steel Ball Run - 1st STAGE"]},
    {"name":"Stars Align","rarity":80,"aliases":["Hoshiai no Sora"]},
    {"name":"Ace of the Diamond","rarity":80,"aliases":["Diamond no Ace"]},
    {"name":"Inazuma Eleven","rarity":80},
    {"name":"Initial D 2nd Stage","rarity":80,"aliases":["Initial D SECOND STAGE"]},
    {"name":"Tsurune","rarity":80,"aliases":["Tsurune: Kazemai Koukou Kyuudou-bu"]},
    {"name":"Ahiru no Sora","rarity":80},
    {"name":"MEGALOBOX 2: NOMAD","rarity":80,"aliases":["NOMAD: Megalo Box 2"]},
    {"name":"Chihayafuru 2","rarity":80},
    {"name":"Baki: The Great Raitai Tournament Saga","rarity":80,"aliases":["Baki: Dai Raitaisai-hen"]},
    {"name":"Blue Box Season 2","rarity":80,"aliases":["Ao no Hako Season 2"]},
    {"name":"Initial D 3rd Stage","rarity":80,"aliases":["Initial D THIRD STAGE"]},
    {"name":"Initial D 4th Stage","rarity":80,"aliases":["Initial D FOURTH STAGE"]},
    {"name":"RE-MAIN","rarity":80},
    {"name":"100 METERS","rarity":80,"aliases":["Hyakuemu."]},
    {"name":"2.43: Seiin High School Boys Volleyball Team","rarity":80,"aliases":["2.43: Seiin Koukou Danshi Volley-bu"]},
    {"name":"Chihayafuru 3","rarity":80},
    {"name":"Aoharu x Machinegun","rarity":80,"aliases":["Aoharu × Kikanjuu"]},
    {"name":"Backflip!!","rarity":80,"aliases":["Bakuten!!"]},
    {"name":"Initial D Final Stage","rarity":80},
    {"name":"Harukana Receive","rarity":80},
    {"name":"Prince of Stride: Alternative","rarity":80},
    {"name":"Burning Kabaddi","rarity":80,"aliases":["Shakunetsu Kabaddi"]},
    {"name":"AOKANA: Four Rhythm Across the Blue","rarity":80,"aliases":["Ao no Kanata no Four Rhythm"]},
    {"name":"MF GHOST","rarity":80},
    {"name":"Eyeshield 21","rarity":80},
    {"name":"Iwakakeru -Sport Climbing Girls-","rarity":80},
    {"name":"Umamusume: Pretty Derby - Beginning of a New Era","rarity":80,"aliases":["Uma Musume: Pretty Derby - Shin Jidai no Tobira"]},
    {"name":"THE FIRST SLAM DUNK","rarity":80},
    {"name":"KENGAN ASHURA Part II","rarity":80,"aliases":["Kengan Ashura Part 2"]},
    {"name":"Ace of the Diamond Second Season","rarity":80,"aliases":["Diamond no Ace: Second Season"]},
    {"name":"Girls und Panzer der Film","rarity":80,"aliases":["Girls und Panzer Movie"]},
    {"name":"Hinomaru Sumo","rarity":80,"aliases":["Hinomaru-Zumou"]},
    {"name":"Haikyu!! The Movie: Battle of Concepts","rarity":80,"aliases":["Haikyuu!!: Concept no Tatakai"]},
    {"name":"Hajime no Ippo: The Fighting! - Mashiba vs Kimura","rarity":80,"aliases":["Hajime no Ippo: Mashiba vs Kimura - Shikei Shikkou"]},
    {"name":"Aoashi Season 2","rarity":80,"aliases":["Aoashi 2nd Season"]},
    {"name":"Haikyu!! The Movie: Talent and Sense","rarity":80,"aliases":["Haikyuu!!: Sainou to Sense"]},
    {"name":"Salaryman's Club","rarity":80,"aliases":["Ryman's Club"]},
    {"name":"OVERTAKE!","rarity":80},
    {"name":"Yowamushi Pedal: Grande Road","rarity":80},
    {"name":"Beyblade","rarity":80,"aliases":["Bakuten Shoot Beyblade"]},
    {"name":"Ace of the Diamond act II","rarity":80,"aliases":["Diamond no Ace act II"]},
    {"name":"Kuroko's Basketball: Tip Off","rarity":80,"aliases":["Kuroko no Basket: Tip Off"]},
    {"name":"SK8 the Infinity EXTRA PART","rarity":80,"aliases":["SK∞ Extra Part"]},
    {"name":"Grappler Baki Maximum Tournament","rarity":80,"aliases":["Grappler Baki: Saidai Tournament-hen"]},
    {"name":"Teekyuu","rarity":80},
    {"name":"The Gymnastics Samurai","rarity":80,"aliases":["Taisou Zamurai"]},
    {"name":"Big Windup!","rarity":80,"aliases":["Ookiku Furikabutte"]},
    {"name":"number24","rarity":80},
    {"name":"Suzuka","rarity":80},
    {"name":"My Hero Academia Season 5 OVA","rarity":80,"aliases":["Boku no Hero Academia 5 (ONA)"]},
    {"name":"Girls und Panzer das Finale - Part 1","rarity":80,"aliases":["Girls und Panzer: Saishuushou 1"]},
    {"name":"Ro-Kyu-Bu ~ Fast Break!","rarity":80,"aliases":["Ro-Kyu-Bu!"]},
    {"name":"Medalist Season 2","rarity":80,"aliases":["Medalist 2nd Season"]},
    {"name":"Tsurune - The Linking Shot -","rarity":80,"aliases":["Tsurune: Tsunagari no Issha"]},
    {"name":"Beyblade: Metal Masters","rarity":80,"aliases":["Metal Fight Beyblade: Baku"]},
    {"name":"MF GHOST Season 2","rarity":80,"aliases":["MF Ghost 2nd Season"]},
    {"name":"Bamboo Blade","rarity":80},
    {"name":"Yowamushi Pedal New Generation","rarity":80},
    {"name":"Girls und Panzer: This is the Real Anzio Battle!","rarity":80,"aliases":["Girls und Panzer: Kore ga Hontou no Anzio-sen Desu!"]},
    {"name":"Initial D Extra Stage","rarity":80},
    {"name":"Narenare -Cheer for you!-","rarity":80,"aliases":["Na-Nare Hana-Nare"]},
    {"name":"Farewell, My Dear Cramer","rarity":80,"aliases":["Sayonara Watashi no Cramer"]},
    {"name":"Kandagawa Jet Girls","rarity":80},
    {"name":"Girls und Panzer das Finale - Part 2","rarity":80,"aliases":["Girls und Panzer: Saishuushou 2"]},
    {"name":"Inazuma Eleven Go: Galaxy","rarity":80},
    {"name":"Skate-Leading Stars","rarity":80},
    {"name":"WAVE!! Surfing Yappe!!","rarity":80},
    {"name":"BIRDIE WING -Golf Girls’ Story- Season 2","rarity":80},
    {"name":"Giant Killing","rarity":80},
    {"name":"Girls und Panzer OVA Series","rarity":80,"aliases":["Girls und Panzer Specials"]},
    {"name":"MF GHOST Season 3","rarity":80,"aliases":["MF Ghost 3rd Season"]},
    {"name":"Love All Play","rarity":80},
    {"name":"Chidori RSC","rarity":80,"aliases":["Rifle Is Beautiful"]},
    {"name":"Major S3","rarity":80},
    {"name":"Inazuma Eleven Ares","rarity":80,"aliases":["Inazuma Eleven: Ares no Tenbin"]},
    {"name":"TAMAYOMI: The Baseball Girls","rarity":80,"aliases":["Tamayomi"]},
    {"name":"Major S4","rarity":80},
    {"name":"Initial D Legend 1: Awakening","rarity":80,"aliases":["New Initial D Movie: Legend 1 - Kakusei"]},
    {"name":"Dive!!","rarity":80},
    {"name":"Major S6","rarity":80},
    {"name":"Touch","rarity":80},
    {"name":"Beyblade Burst","rarity":80},
    {"name":"The Prince of Tennis II","rarity":80,"aliases":["Shin Tennis no Ouji-sama"]},
    {"name":"KENGAN ASHURA Season 2 Part.2","rarity":80},
    {"name":"Beyblade G Revolution","rarity":80,"aliases":["Bakuten Shoot Beyblade G Revolution"]},
    {"name":"Tekken: Bloodline","rarity":80},
    {"name":"WAVE!! -Let's go surfing!!- (TV)","rarity":80,"aliases":["WAVE!! Surfing Yappe!! (TV)"]},
    {"name":"PuraOre! ~Pride of Orange~","rarity":80},
    {"name":"Turkey! Time to Strike","rarity":80,"aliases":["Turkey!"]},
    {"name":"Inazuma Eleven: The Seal of Orion","rarity":80,"aliases":["Inazuma Eleven: Orion no Kokuin"]},
    {"name":"Initial D Legend 2: Racer","rarity":80,"aliases":["New Initial D Movie: Legend 2 - Dokusou"]},
    {"name":"Rising Impact","rarity":80},
    {"name":"Inazuma Eleven: Saikyou Gundan Ogre Shuurai","rarity":80},
    {"name":"Girls und Panzer das Finale - Part 4","rarity":80,"aliases":["Girls und Panzer: Saishuushou 4"]},
    {"name":"Ippon! again","rarity":80,"aliases":["Mou Ippon!"]},
    {"name":"Cinderella Nine","rarity":80,"aliases":["Hachigatsu no Cinderella Nine"]},
    {"name":"Initial D Legend 3: Dream","rarity":80,"aliases":["New Initial D Movie: Legend 3 - Mugen"]},
    {"name":"Ro-Kyu-Bu! SS","rarity":80},
    {"name":"MAJOR 2nd","rarity":80},
    {"name":"BASQUASH!","rarity":80},
    {"name":"Yowamushi Pedal: The Movie","rarity":80,"aliases":["Yowamushi Pedal (Movie)"]},
    {"name":"Big Windup! 2","rarity":80,"aliases":["Ookiku Furikabutte: Natsu no Taikai-hen"]},
    {"name":"Long Riders!","rarity":80},
    {"name":"Umamusume: Pretty Derby - 1st Anniversary Special Animation","rarity":80},
    {"name":"MIX","rarity":80,"aliases":["MIX: MEISEI STORY"]},
    {"name":"Winter Cup Highlights Episode 1 – Winter Cup Highlights -Shadow and Light-","rarity":80,"aliases":["Kuroko no Basket: Winter Cup Soushuuhen - Kage to Hikari"]},
    {"name":"Backflip!! The Movie","rarity":80,"aliases":["Bakuten!! Movie"]},
    {"name":"Yowamushi Pedal Limit Break","rarity":80},
    {"name":"Skating Rink Kaleidoscope","rarity":80,"aliases":["Ginban Kaleidoscope"]},
    {"name":"TWOCAR","rarity":80},
    {"name":"Aoharu x Machinegun: This is a Battlefield for Beasts!","rarity":80,"aliases":["Aoharu × Kikanjuu: Kemono-tachi no Senjou da na!"]},
    {"name":"Winter Cup Highlights Episode 3 – Winter Cup Highlights -Crossing the Door-","rarity":80,"aliases":["Kuroko no Basket: Winter Cup Soushuuhen - Tobira no Mukou"]},
    {"name":"Beyblade Burst Evolution","rarity":80,"aliases":["Beyblade Burst God"]},
    {"name":"Tennis no Ouji-sama: Zenkoku Taikai-hen","rarity":80},
    {"name":"HIGHSPEED Étoile","rarity":80},
    {"name":"Over Drive","rarity":80},
    {"name":"Grappler Baki: The Ultimate Fighter","rarity":80,"aliases":["Grappler Baki"]},
    {"name":"capeta","rarity":80},
    {"name":"Tennis no Ouji-sama: Zenkoku Taikai-hen Semifinal","rarity":80},
    {"name":"Tennis no Ouji-sama: Zenkoku Taikai-hen Final","rarity":80},
    {"name":"Inazuma Eleven GO the Movie: The Ultimate Bonds Gryphon","rarity":80,"aliases":["Inazuma Eleven GO: Kyuukyoku no Kizuna Gryphon"]},
    {"name":"MAJOR SECOND Season 2","rarity":80,"aliases":["Major 2nd Season 2"]},
    {"name":"Idaten Jump","rarity":80},
    {"name":"Softenni","rarity":80},
    {"name":"Taisho Baseball Girls","rarity":80,"aliases":["Taishou Yakyuu Musume."]},
    {"name":"DAYS: Touin Gakuen-sen!","rarity":80},
    {"name":"Slam Dunk Movie 1","rarity":80,"aliases":["SLAM DUNK (Movie)"]},
    {"name":"Galaxy Kickoff!!","rarity":80,"aliases":["Ginga e Kickoff!!"]},
    {"name":"Captain Tsubasa J","rarity":80},
    {"name":"Try Knights","rarity":80},
    {"name":"Shoot! Goal to the Future","rarity":80},
    {"name":"Left-Hand Layup!","rarity":80,"aliases":["Zuoshou Shanglan"]},
    {"name":"Drucker in the Dugout","rarity":80,"aliases":["Moshidora"]},
    {"name":"Inazuma Eleven: Choujigen Dream Match","rarity":80},
    {"name":"Zoids New Century/Zero","rarity":80,"aliases":["Zoids Shin Seiki/Zero"]},
    {"name":"Beyblade: Shogun Steel","rarity":80,"aliases":["Metal Fight Beyblade ZERO G"]},
    {"name":"Captain Tsubasa: Junior Youth Arc","rarity":80,"aliases":["Captain Tsubasa: Season 2 - Junior Youth-hen"]},
    {"name":"The Prince of Tennis II U-17 World Cup","rarity":80,"aliases":["Shin Tennis no Ouji-sama: U-17 WORLD CUP"]},
    {"name":"IGPX","rarity":80,"aliases":["IGPX Immortal Grand Prix"]},
    {"name":"Haikyuu!! Ningyou Anime","rarity":80},
    {"name":"BEYBLADE X","rarity":80},
    {"name":"Hungry Heart: Wild Striker","rarity":80},
    {"name":"Speed Racer","rarity":80,"aliases":["Mach GoGoGo"]},
    {"name":"Slam Dunk: Shohoku Maximum Crisis! Burn Sakuragi Hanamichi","rarity":80,"aliases":["SLAM DUNK: Shouhoku Saidai no Kiki! Moero Sakuragi Hanamichi"]},
    {"name":"Hikaru no Go: Hokuto Hai e no Michi","rarity":80},
    {"name":"Inazuma Eleven GO vs Danball Senki W","rarity":80},
    {"name":"Rising Impact Season 2","rarity":80},
    {"name":"The Ping-Pong Club","rarity":80,"aliases":["Ike! Ina-chuu Takkyuubu"]},
    {"name":"Nasu: Summer in Andalusia","rarity":80,"aliases":["Nasu: Andalusia no Natsu"]},
    {"name":"Rinkai!","rarity":80},
    {"name":"Hoop Days","rarity":80,"aliases":["DEAR BOYS"]},
    {"name":"Future GPX Cyber Formula","rarity":80,"aliases":["Shin Seiki GPX Cyber Formula"]},
    {"name":"Princess Nine","rarity":80,"aliases":["Princess Nine: Kisaragi Joshikou Yakyuu-bu"]},
    {"name":"LOS ANGELES LAKERS x ONE PIECE","rarity":80},
    {"name":"Gurazeni: Money Pitch","rarity":80,"aliases":["Gurazeni"]},
    {"name":"Shin Captain Tsubasa","rarity":80},
    {"name":"Tekken: The Motion Picture","rarity":80,"aliases":["Tekken"]},
    {"name":"BUZZER BEATER","rarity":80},
    {"name":"Attack No.1","rarity":80},
    {"name":"Initial D BATTLE STAGE 3","rarity":80},
    {"name":"Yu-Gi-Oh!","rarity":0},
  ]},
  {"id":"timed-v4-descent-8-parent","anime":"mixed","category":"Any anime","text":"Name any anime character who is a parent.","note":"Documented character trait or relationship","since":"2026-11-27","descent":"char","conceptId":"nov27-parent","top":"Goku","answers":[
    {"name":"Grisha Yeager","rarity":25,"aliases":["Grisha Jaeger"]},
    {"name":"Petra no Chichi","rarity":25},
    {"name":"Tanjurou Kamado","rarity":25},
    {"name":"Nagi Yoshino","rarity":25},
    {"name":"Shuuichi Aizawa","rarity":25,"aliases":["Shuichi Aizawa"]},
    {"name":"Sachiko Yagami","rarity":25},
    {"name":"Eriko Aizawa","rarity":25},
    {"name":"Ging Freecss","rarity":25},
    {"name":"Light Nostrade","rarity":25},
    {"name":"Razor","rarity":25},
    {"name":"Dragon","rarity":25},
    {"name":"Garp","rarity":25,"aliases":["The Fist","Hero of the Marines"]},
    {"name":"Yasopp","rarity":25},
    {"name":"Spandine","rarity":25},
    {"name":"Roswald Sei","rarity":25,"aliases":["Saint Roswald"]},
    {"name":"Ririka","rarity":25},
    {"name":"Olvia Nico","rarity":25},
    {"name":"Stool","rarity":25},
    {"name":"Dadan Curly","rarity":25},
    {"name":"Mekao","rarity":25,"aliases":["Mechao"]},
    {"name":"Sabo no Chichi","rarity":25,"aliases":["Sabo's Father","Outlook III"]},
    {"name":"Sabo no Haha","rarity":25,"aliases":["Sabo's Mother"]},
    {"name":"Neptune","rarity":25,"aliases":["God of the Sea","Great Knight of the Sea"]},
    {"name":"Otohime","rarity":25,"aliases":["Queen","Incarnation of Love"]},
    {"name":"Kinemon","rarity":25,"aliases":["Foxfire"]},
    {"name":"Vergo","rarity":25,"aliases":["Demon Bamboo","Corazon"]},
    {"name":"Kyros","rarity":25,"aliases":["Thunder Soldier of Rage","The Angry Lightning Soldier"]},
    {"name":"Toki Kouzuki","rarity":25,"aliases":["Amatsuki Toki","Toki Kozuki"]},
    {"name":"Sukiyaki Kouzuki","rarity":25,"aliases":["Kozuki Sukiyaki"]},
    {"name":"Sora Vinsmoke","rarity":25},
    {"name":"Yasuie Shimotsuki","rarity":25,"aliases":["Hedgehog","Tonoyasu"]},
    {"name":"Señor Pink","rarity":25},
    {"name":"Oden Kouzuki","rarity":25,"aliases":["Idiot Lord","Kozuki Oden"]},
    {"name":"Scopper Gaban","rarity":25},
    {"name":"Pound","rarity":25},
    {"name":"Chiffon Charlotte","rarity":25},
    {"name":"Riku Doldo III","rarity":25,"aliases":["Ricky"]},
    {"name":"Bakkin","rarity":25,"aliases":["Miss Bakkin"]},
    {"name":"Ginny","rarity":25},
    {"name":"Figarland Garling Sei","rarity":25,"aliases":["Saint Figarland Garling"]},
    {"name":"Arata Kirishima","rarity":25,"aliases":["Corpse Collector"]},
    {"name":"Artur Blouse","rarity":25,"aliases":["Artur Braus"]},
    {"name":"Kaya no Haha","rarity":25,"aliases":["Kaya’s Mom"]},
    {"name":"Conny no Haha","rarity":25},
    {"name":"Izumi Curtis","rarity":25,"aliases":["Izumi Harnet","Auntie"]},
    {"name":"Greed","rarity":25,"aliases":["Ultimate Shield","Mightiest Shield"]},
    {"name":"Shou Tucker","rarity":25,"aliases":["Sewing-Life Alchemist"]},
    {"name":"King Bradley","rarity":25},
    {"name":"Rosé Tomas","rarity":25,"aliases":["Rose"]},
    {"name":"Van Hohenheim","rarity":25,"aliases":["Hohenheim of Light","The Light"]},
    {"name":"Trisha Elric","rarity":25},
    {"name":"Paninya","rarity":25},
    {"name":"Berthold Hawkeye","rarity":25},
    {"name":"Gamabunta","rarity":25},
    {"name":"Hiruzen Sarutobi","rarity":25,"aliases":["Third","Sandaime"]},
    {"name":"Menma","rarity":25},
    {"name":"Shibi Aburame","rarity":25},
    {"name":"Chouza Akimichi","rarity":25},
    {"name":"Inoichi Yamanaka","rarity":25},
    {"name":"Tsume Inuzuka","rarity":25},
    {"name":"Tsunami","rarity":25},
    {"name":"Fugaku Uchiha","rarity":25},
    {"name":"Teuchi","rarity":25},
    {"name":"Shikaku Nara","rarity":25},
    {"name":"Mikoto Uchiha","rarity":25},
    {"name":"Yoshino Nara","rarity":25},
    {"name":"Hizashi Hyuuga","rarity":25},
    {"name":"Rasa","rarity":25,"aliases":["Yondaime Kazekage (四代目風影)","Fourth Kazekage"]},
    {"name":"Mebuki Haruno","rarity":25},
    {"name":"Miyako Ishida","rarity":25},
    {"name":"Yaeko Nishimiya","rarity":25},
    {"name":"Yui","rarity":25},
    {"name":"Futaba Miyamizu","rarity":25},
    {"name":"Alma","rarity":25},
    {"name":"Enji Todoroki","rarity":25,"aliases":["Endeavor (エンデヴァー)"]},
    {"name":"Rei Todoroki","rarity":25},
    {"name":"Dina Fritz","rarity":25},
    {"name":"Lisa Blouse","rarity":25},
    {"name":"Grisha no Chichi Yeager","rarity":25,"aliases":["Grisha's Father Yeager","Mr. Yeager"]},
    {"name":"Grisha no Haha Yeager","rarity":25,"aliases":["Grisha's Mother Yeager"]},
    {"name":"Karina Braun","rarity":25},
    {"name":"Reiner Chichi","rarity":25,"aliases":["Reiner's Father"]},
    {"name":"Denji no Chichi","rarity":25,"aliases":["Denji's Father"]},
    {"name":"Gross","rarity":50},
    {"name":"Furido","rarity":50,"aliases":["Kazuma"]},
    {"name":"Sakumo Hatake","rarity":50,"aliases":["Konoha's White Fang"]},
    {"name":"Karura","rarity":50},
    {"name":"Torune Aburame","rarity":50},
    {"name":"Katazu","rarity":50},
    {"name":"Sukune","rarity":50},
    {"name":"Yone","rarity":50},
    {"name":"Kizashi Haruno","rarity":50},
    {"name":"Chouji no Haha","rarity":50,"aliases":["Chouji's Mother"]},
    {"name":"Ino no Haha","rarity":50,"aliases":["Ino's Mother"]},
    {"name":"Kaguya Ootsutsuki","rarity":50},
    {"name":"Sachiko Fujinuma","rarity":50},
    {"name":"Gaku Yashiro","rarity":50},
    {"name":"Akemi Hinazuki","rarity":50},
    {"name":"Inasa Yoarashi","rarity":50,"aliases":["Gale Force","Baldy"]},
    {"name":"Mika Jirou","rarity":50},
    {"name":"Yuugo Tennouji","rarity":50,"aliases":["Tennoji","Mr. Braun"]},
    {"name":"Dr. Nakabachi","rarity":50,"aliases":["Hakase","Professor"]},
    {"name":"Zara Ideale","rarity":50},
    {"name":"Orsi Ofai","rarity":50,"aliases":["Shinpu (神父)","Father"]},
    {"name":"Acier Silva","rarity":50,"aliases":["Ashie Shiruva"]},
    {"name":"Majo Ou","rarity":50,"aliases":["Queen of Witches"]},
    {"name":"Liliane Vaude","rarity":50},
    {"name":"Ledior Vaude","rarity":50},
    {"name":"Licita","rarity":50,"aliases":["Richita"]},
    {"name":"Loyce Grinberryall","rarity":50},
    {"name":"Jonna Agrippa","rarity":50},
    {"name":"Mai no Haha","rarity":50,"aliases":["Mai's Mother"]},
    {"name":"Nodoka no Haha","rarity":50,"aliases":["Nodoka's Mother"]},
    {"name":"Edgar","rarity":50},
    {"name":"Shirogane no Chichi","rarity":50,"aliases":["Papa Shirogane","Father Shirogane"]},
    {"name":"Ryokan Kurita","rarity":50,"aliases":["Damn Fatass"]},
    {"name":"Kokuyo","rarity":50},
    {"name":"Sagan","rarity":50},
    {"name":"Natri","rarity":50},
    {"name":"Alumi","rarity":50},
    {"name":"Alabaster","rarity":50},
    {"name":"Askeladd","rarity":25},
    {"name":"Thors Snorresson","rarity":50,"aliases":["The Troll of Jom","Jomstrollet"]},
    {"name":"Thorkell","rarity":50,"aliases":["Thorkell the Tall","Thorkell the Invincible"]},
    {"name":"Sweyn","rarity":50,"aliases":["Sweyn Forkbeard","King Sweyn"]},
    {"name":"Ari","rarity":50,"aliases":["Little Rat"]},
    {"name":"Helga","rarity":50},
    {"name":"Olaf","rarity":50},
    {"name":"Tiffany Evergarden","rarity":50},
    {"name":"Oscar Webster","rarity":50},
    {"name":"Clara Magnolia","rarity":50},
    {"name":"Yuriko Hori","rarity":50,"aliases":["Yuriko Koyanagi (小柳百合子)"]},
    {"name":"Iori Miyamura","rarity":50},
    {"name":"Yasuko Takasu","rarity":50,"aliases":["Mirano","Ya-chan"]},
    {"name":"Bors","rarity":50,"aliases":["Bols"]},
    {"name":"Chouri","rarity":50},
    {"name":"Zaratras","rarity":50,"aliases":["Silver"]},
    {"name":"Bartra Liones","rarity":50},
    {"name":"Golgius","rarity":50},
    {"name":"Dale","rarity":50},
    {"name":"Dana","rarity":50},
    {"name":"Orihime Inoue","rarity":25,"aliases":["Hime"]},
    {"name":"Isshin Kurosaki","rarity":50},
    {"name":"Nelliel Tu Oderschvank","rarity":50,"aliases":["Nel Tu"]},
    {"name":"Masaki Kurosaki","rarity":50},
    {"name":"Shrieker","rarity":50},
    {"name":"Sougyo no Kotowari","rarity":50},
    {"name":"Shin'etsu Kisaragi","rarity":50},
    {"name":"Shinjurou Rengoku","rarity":50},
    {"name":"Amane Ubuyashiki","rarity":50,"aliases":["Amane Himorogi"]},
    {"name":"Marianne vi Britannia","rarity":50,"aliases":["The Flash","The Soul"]},
    {"name":"Charles zi Britannia","rarity":50,"aliases":["Absolute Emperor"]},
    {"name":"Kallen no Haha","rarity":50,"aliases":["Kallen's Mother"]},
    {"name":"Mitsuru","rarity":25,"aliases":["Code:326"]},
    {"name":"Touji Fushiguro","rarity":50,"aliases":["Sorcerer Killer","Toji Fushiguro"]},
    {"name":"Asuka Langley Souryuu","rarity":25,"aliases":["Second Child","Asuka Langley Shikinami"]},
    {"name":"Gendou Ikari","rarity":50,"aliases":["Gendoh Ikari"]},
    {"name":"Kyouko Zeppelin Souryuu","rarity":50},
    {"name":"Joutarou Kuujou","rarity":50,"aliases":["JoJo","Qtaro"]},
    {"name":"Jonathan Joestar","rarity":25},
    {"name":"Will A. Zeppeli","rarity":50,"aliases":["Baron Zeppeli"]},
    {"name":"Suzie Q","rarity":50,"aliases":["Suzie Quatro"]},
    {"name":"Dario Brando","rarity":50},
    {"name":"Holly Kuujou","rarity":50,"aliases":["Holly Joestar","Seiko"]},
    {"name":"Mary Joestar","rarity":50},
    {"name":"George II Joestar","rarity":50,"aliases":["Jorge Joestar"]},
    {"name":"Bull","rarity":50,"aliases":["Laughing Bull"]},
    {"name":"Amahare","rarity":50},
    {"name":"Zanbai","rarity":50},
    {"name":"Mukade Kouhai","rarity":50,"aliases":["Junior Centipede"]},
    {"name":"Sylphiette","rarity":25,"aliases":["Sylphy"]},
    {"name":"Paul Greyrat","rarity":50},
    {"name":"Eris Boreas Greyrat","rarity":25,"aliases":["Mad Dog"]},
    {"name":"Roxy Migurdia","rarity":25},
    {"name":"Ruijerd Superdia","rarity":25,"aliases":["Watch Dog","Dead End"]},
    {"name":"Lilia","rarity":50},
    {"name":"Zenith Greyrat","rarity":50},
    {"name":"Philip Boreas Greyrat","rarity":50},
    {"name":"Hilda Boreas Greyrat","rarity":50},
    {"name":"Aultcray Melromarc XXXII","rarity":50,"aliases":["Trash","Luge Lancarose"]},
    {"name":"Kyung-Hye Park","rarity":50,"aliases":["Gyeong-Hye Park"]},
    {"name":"Kyouko Yuuki","rarity":50},
    {"name":"Masashi Asagiri","rarity":50},
    {"name":"Ryouko Tachibana","rarity":50},
    {"name":"Ymir Fritz","rarity":50},
    {"name":"Daichi Fujiwara","rarity":50},
    {"name":"Rea Amano","rarity":50},
    {"name":"Kurou Amano","rarity":50},
    {"name":"Karyuudo Tsukishima","rarity":50,"aliases":["Tenth"]},
    {"name":"Saika Gasai","rarity":50},
    {"name":"Ushio Gasai","rarity":50},
    {"name":"Kotarou Shimura","rarity":50},
    {"name":"Nao Shimura","rarity":50},
    {"name":"Gloria Martinez","rarity":50},
    {"name":"Senzaemon Nakiri","rarity":50},
    {"name":"Jouichirou Yukihira","rarity":50,"aliases":["Jouichirou Saiba","Asura"]},
    {"name":"Tadokoro no Haha","rarity":50,"aliases":["Tadokoro's Mother"]},
    {"name":"Madoka Yachi","rarity":50},
    {"name":"Tsukishima no haha","rarity":50,"aliases":["Tsukishima's Mother"]},
    {"name":"Hephaestus","rarity":50,"aliases":["Hephaistos","Divine Smith"]},
    {"name":"Demeter","rarity":50},
    {"name":"Tsubaki Nakatsukasa","rarity":25},
    {"name":"Shinigami","rarity":50,"aliases":["Lord Death"]},
    {"name":"Spirit Albarn","rarity":50,"aliases":["Death Scythe","Papa"]},
    {"name":"Medusa Gorgon","rarity":50},
    {"name":"Marie Mjolnir","rarity":50,"aliases":["Crushing Weapon Marie"]},
    {"name":"White☆Star","rarity":50},
    {"name":"Penny Chinkosu","rarity":50,"aliases":["Dover Demon (ドーバーデーモン)","Gig Worker (ギグワーカー)"]},
    {"name":"Kenichi Natsuki","rarity":50},
    {"name":"Zekua Melon","rarity":50,"aliases":["Kemu Zaleon"]},
    {"name":"Ivan Dreyar","rarity":50},
    {"name":"Jude Heartfilia","rarity":50},
    {"name":"Layla Heartfilia","rarity":50},
    {"name":"Grandine","rarity":50},
    {"name":"Igneel","rarity":50,"aliases":["Salamander"]},
    {"name":"Balsamico Hakushaku","rarity":50},
    {"name":"Sakura no Haha","rarity":50,"aliases":["Sakura's Mother"]},
    {"name":"Kyougo Shinazugawa","rarity":50},
    {"name":"Ignis Dustiness Ford","rarity":50},
    {"name":"Kagemitsu Daigo","rarity":50},
    {"name":"Nuinokata","rarity":50},
    {"name":"Ojiya","rarity":50},
    {"name":"Hibukuro","rarity":50},
    {"name":"Munetsuna","rarity":50},
    {"name":"Osa","rarity":75,"aliases":["Sato no Naga (里の長)","Village Chief"]},
    {"name":"Kichiji","rarity":75,"aliases":["Yamada Asaemon Kichiji (山田浅工門吉次)","Sagiri no Chichi (佐切の父)"]},
    {"name":"Tomi","rarity":75},
    {"name":"Kuniharu Saiki","rarity":75},
    {"name":"Kumagoro Saiki","rarity":75},
    {"name":"Tomomi Masaoka","rarity":75},
    {"name":"Noel Makimura","rarity":75,"aliases":["Kousaku Makimura (牧村耕作)"]},
    {"name":"Irisviel von Einzbern","rarity":50,"aliases":["Iri"]},
    {"name":"Tokiomi Toosaka","rarity":50,"aliases":["Tokiomi Tohsaka"]},
    {"name":"Aoi Tohsaka","rarity":75},
    {"name":"Maiya Hisau","rarity":75},
    {"name":"Risei Kotomine","rarity":75},
    {"name":"Enya Geil","rarity":75,"aliases":["N-Yah Gail","Enyaba"]},
    {"name":"Karl Neumann","rarity":75,"aliases":["Neuman","Karl Shubert (カール・シューバルト)"]},
    {"name":"Herbert Knaup","rarity":75},
    {"name":"Viera Černá","rarity":75,"aliases":["Anna"]},
    {"name":"Senjougahara no Chichi","rarity":75,"aliases":["Senjougahara's Father"]},
    {"name":"Aaduo","rarity":75,"aliases":["Pure Consort","Ah Duo"]},
    {"name":"Lakan","rarity":75,"aliases":["Luohan","Rakan"]},
    {"name":"Anaak-ui Eomma","rarity":75,"aliases":["Anaak's mother アナクの母親"]},
    {"name":"Taishi no Haha","rarity":75,"aliases":["Taishi's Mother","Gotanda's Mother"]},
    {"name":"Akane no Haha","rarity":75,"aliases":["Akane's Mother"]},
    {"name":"Kana no Haha","rarity":75},
    {"name":"Airi Himekawa","rarity":75},
    {"name":"George no chichi","rarity":75,"aliases":["Jack Glooman"]},
    {"name":"Issei Isagi","rarity":75,"aliases":["Isagi's Father"]},
    {"name":"Iyo Isagi","rarity":75,"aliases":["Isagi's Mother"]},
    {"name":"Yuu Bachira","rarity":75,"aliases":["Bachira's Mom"]},
    {"name":"Damocles","rarity":75,"aliases":["Shuuen-tei (終焉帝)","Emperor of Demise"]},
    {"name":"Junko Kaname","rarity":75},
    {"name":"Nino Nakano","rarity":50},
    {"name":"Isanari Uesugi","rarity":75},
    {"name":"Oda","rarity":75,"aliases":["Hige no Ojisan (ヒゲのおじさん)"]},
    {"name":"Masayoshi Komi","rarity":75},
    {"name":"Shuuko Komi","rarity":75,"aliases":["Shuuko Niimi"]},
    {"name":"Cid no Haha","rarity":75,"aliases":["Cid's Mother"]},
    {"name":"Midgar Kokuou","rarity":75,"aliases":["King of Midgar"]},
    {"name":"Igoss Cropp","rarity":75},
    {"name":"Tomoko Higashikata","rarity":75},
    {"name":"Ryouhei Higashikata","rarity":75},
    {"name":"Kouichi Haha","rarity":75,"aliases":["Kouichi's Mother"]},
    {"name":"Sirzechs Lucifer","rarity":75,"aliases":["Crimson Satan"]},
    {"name":"Reshia Tinzel","rarity":75,"aliases":["Reala Thompson (リアラ・トンプソン)"]},
    {"name":"Framir Suewen","rarity":75},
    {"name":"Mazeran Suewen","rarity":75},
    {"name":"Max Lobo","rarity":75,"aliases":["Max Glenreed"]},
    {"name":"Jessica Randy","rarity":75},
    {"name":"Mirumo Tsukiyama","rarity":75,"aliases":["Croque Monsieur"]},
    {"name":"Paolo Bucciarati","rarity":75},
    {"name":"Donatella Una","rarity":75,"aliases":["Donatella Versace"]},
    {"name":"Madoka Oze","rarity":75},
    {"name":"Garakuta no Ningyou","rarity":75,"aliases":["Garbage Doll"]},
    {"name":"Naoyuki Okazaki","rarity":75},
    {"name":"Katakuriko Matsudaira","rarity":75,"aliases":["God of Destruction"]},
    {"name":"Tama","rarity":75,"aliases":["Fuyou No. 0","Hayashi Fuyou"]},
    {"name":"Ken Katou","rarity":75},
    {"name":"Hinowa","rarity":75,"aliases":["The Sun of Yoshiwara","Yoshiwara no Taiyou (吉原の太陽)"]},
    {"name":"Tokumori Saigou","rarity":75,"aliases":["Mademoiselle Saigou"]},
    {"name":"Kaguzou Mashiroi","rarity":75},
    {"name":"Tsuu no Chichioya","rarity":75,"aliases":["Tsuu's Father","Jimon (寺門)"]},
    {"name":"Fusa","rarity":75,"aliases":["Ofusa"]},
    {"name":"Hana","rarity":75},
    {"name":"Shuji Niekawa","rarity":75},
    {"name":"Gasupht Zuberg","rarity":75},
    {"name":"Isao Shinomiya","rarity":75,"aliases":["Director General Shinomiya"]},
    {"name":"Kagetora Aida","rarity":75},
    {"name":"Rei Miyamoto","rarity":50},
    {"name":"Yuriko Takagi","rarity":75},
    {"name":"Souichirou Takagi","rarity":75},
    {"name":"Majin Ou","rarity":75,"aliases":["Demon King"]},
    {"name":"Tae Ooto","rarity":75,"aliases":["Tae Ohto"]},
    {"name":"Daigorou","rarity":75},
    {"name":"Sousuke Kawara","rarity":75},
    {"name":"Nagamitsu Sakonshougen","rarity":75},
    {"name":"Sara","rarity":75},
    {"name":"Ketil","rarity":75},
    {"name":"Sverkell","rarity":75},
    {"name":"Nana","rarity":50,"aliases":["Number 7"]},
    {"name":"Mariko Kurama","rarity":75,"aliases":["35番 (Number 35)"]},
    {"name":"Kurama","rarity":75},
    {"name":"Arakawa","rarity":75},
    {"name":"Kakuzawa Choukan","rarity":75,"aliases":["Chief Kakuzawa"]},
    {"name":"Hiromi Kurama","rarity":75},
    {"name":"Tomie Takami","rarity":75,"aliases":["Hawks no Haha (ホークスの母)","Hawk's Mother"]},
    {"name":"Rei no Chichi","rarity":75,"aliases":["Himura (氷叢)"]},
    {"name":"Ogi Zenin","rarity":75},
    {"name":"Jin Itadori","rarity":75},
    {"name":"Kaori Itadori","rarity":75},
    {"name":"Juliette","rarity":75,"aliases":["Julie"]},
    {"name":"Pilemon Notos Greyrat","rarity":75},
    {"name":"Izabella","rarity":75},
    {"name":"Gusta Raizeo","rarity":75},
    {"name":"Elio Ludowell","rarity":75},
    {"name":"Adelt Wogner Kirisaki","rarity":75,"aliases":["Adel"]},
    {"name":"Gen Tachibana","rarity":75},
    {"name":"Nanako Onodera","rarity":75},
    {"name":"Issei Ichijou","rarity":75},
    {"name":"Zaryusu Shasha","rarity":75},
    {"name":"Crusch Lulu","rarity":75},
    {"name":"Elias Brandt Dale Raeven","rarity":75},
    {"name":"Ramposa III","rarity":75},
    {"name":"Amo no Haha","rarity":75,"aliases":["Amo's Mother"]},
    {"name":"Narumori Sakayanagi","rarity":75,"aliases":["Chairman"]},
    {"name":"Vincent Phantomhive","rarity":75,"aliases":["Queen's Watchdog"]},
    {"name":"Bora","rarity":75},
    {"name":"Chi-Chi","rarity":75},
    {"name":"Briefs Hakase","rarity":75,"aliases":["Dr. Brief","Dr. Briefs"]},
    {"name":"Bulma no Mama","rarity":75,"aliases":["Mam","Mom"]},
    {"name":"Bra","rarity":75,"aliases":["Bulla","Bura"]},
    {"name":"Freeza","rarity":75,"aliases":["Frieza","Freezer"]},
    {"name":"Zarbon","rarity":75},
    {"name":"Bardock","rarity":75,"aliases":["Burdock"]},
    {"name":"Dodoria","rarity":75},
    {"name":"Bibidi","rarity":75},
    {"name":"Mister Satan","rarity":75,"aliases":["Hercule"]},
    {"name":"Cold Daiou","rarity":75,"aliases":["King Cold"]},
    {"name":"Tatsurou Shiba","rarity":75,"aliases":["Shiibara Tatsurou"]},
    {"name":"Leonora Nakiri","rarity":75},
    {"name":"Yoshio Ootori","rarity":75},
    {"name":"Yuzuru Suoh","rarity":75,"aliases":["Director"]},
    {"name":"Yabu","rarity":75},
    {"name":"Yasuo Iwakura","rarity":75},
    {"name":"Pieck Chichi","rarity":75,"aliases":["Finger (フィンガー)"]},
    {"name":"Roberta Cisneros","rarity":75},
    {"name":"Kageyama","rarity":75},
    {"name":"Nagi Kengamine","rarity":75,"aliases":["Owl"]},
    {"name":"Kurihara","rarity":75},
    {"name":"Arisugawa","rarity":75,"aliases":["Arisugawa haha (有栖川母)"]},
    {"name":"Chika Hatori","rarity":75},
    {"name":"Yuuki Hatori","rarity":75},
    {"name":"Fuyu no Megami","rarity":75,"aliases":["Winter Goddess","Dark Lady (ダークレディ)"]},
    {"name":"David Barley","rarity":75},
    {"name":"Kinue Hayase","rarity":75},
    {"name":"Teruo Tendou","rarity":75},
    {"name":"Akiko Tendou","rarity":75},
    {"name":"Yuiyui","rarity":75},
    {"name":"Byakuya Matou","rarity":75},
    {"name":"Noritaka Emiya","rarity":75},
    {"name":"Kikimimi-kun","rarity":75,"aliases":["Snoops","Jouhouya (情報屋)"]},
    {"name":"Gram Gretcher Sr.","rarity":75,"aliases":["Olka Gretcher no Chichi (オルカ・グレッチャーの父)"]},
    {"name":"Haruka Ouma","rarity":75},
    {"name":"Major General Yan","rarity":75},
    {"name":"Kurosu Ouma","rarity":75},
    {"name":"Hikari Kirishima","rarity":75},
    {"name":"Sherman Priest","rarity":75,"aliases":["Axe-Wielding Old Man"]},
    {"name":"Itsutsuko no Sofu","rarity":75,"aliases":["Quintuplets' Grandfather"]},
    {"name":"Nanako Hasegawa","rarity":75},
    {"name":"Masae Kyan","rarity":75},
    {"name":"Rashid Saluja","rarity":75},
    {"name":"Christina","rarity":75,"aliases":["Chris"]},
    {"name":"Miki Edamura","rarity":75},
    {"name":"Hiroko Katsuki","rarity":75},
    {"name":"Toshiya Katsuki","rarity":75},
    {"name":"Benjamin Macbeth","rarity":75},
    {"name":"Emma Macbeth","rarity":75},
    {"name":"Freinag","rarity":75},
    {"name":"Haine","rarity":75},
    {"name":"Seidou Hishigata","rarity":75},
    {"name":"Ryuunosuke Nagumo","rarity":75},
    {"name":"Alain Kofune","rarity":75},
    {"name":"Chitose Hishigata","rarity":75},
    {"name":"Asako Kobayakawa","rarity":75},
    {"name":"Tatsuo Kobayakawa","rarity":75},
    {"name":"Azami Nakiri","rarity":75,"aliases":["Azami Nakamura"]},
    {"name":"Aoi Sakamoto","rarity":75},
    {"name":"Yukino no Haha","rarity":75,"aliases":["Mother Yukinoshita"]},
    {"name":"Sheena","rarity":75},
    {"name":"Kinshiki Ootsutsuki","rarity":75},
    {"name":"Gojou","rarity":75},
    {"name":"Ushio Okazaki","rarity":50,"aliases":["Shio"]},
    {"name":"Tsukiko Tachibana","rarity":75},
    {"name":"Akihito Fujii","rarity":75},
    {"name":"David Shield","rarity":50,"aliases":["Dave"]},
    {"name":"Daishinkan","rarity":75,"aliases":["Grand Priest","Grand Minister"]},
    {"name":"Akisada Izumi","rarity":75},
    {"name":"Motoko Izumi","rarity":75},
    {"name":"Miyabi Shikimori","rarity":75,"aliases":["Shikimori no Haha (式守の母)","Shikimori's Mother"]},
    {"name":"Jun-gi An","rarity":75},
    {"name":"Soo-jin Kan","rarity":75},
    {"name":"Masachika Kouda","rarity":75},
    {"name":"Izumi Ishida","rarity":75},
    {"name":"Keisuke Onigashira","rarity":75},
    {"name":"Shizue Satou","rarity":75},
    {"name":"Heinkel Astrea","rarity":75},
    {"name":"Daisy Haha","rarity":75,"aliases":["Daisy's Mother"]},
    {"name":"Casel El Tiberius","rarity":75,"aliases":["Kazeru Koushaku","Marquis Casel"]},
    {"name":"Kenshou Yomogawa","rarity":75},
    {"name":"Tetsuhiro Shigemura","rarity":75},
    {"name":"Kisuke","rarity":75},
    {"name":"Isana","rarity":75},
    {"name":"Natalie Beriam","rarity":75},
    {"name":"Arthur Hellsing","rarity":75},
    {"name":"Ayame soshite Yuki no Haha","rarity":75,"aliases":["Yuki and Ayame's mother"]},
    {"name":"Satsuki Souma","rarity":75},
    {"name":"Metalicana","rarity":75,"aliases":["The Iron Dragon"]},
    {"name":"Weisslogia","rarity":75},
    {"name":"Skiadrum","rarity":75},
    {"name":"Yuri Dreyar","rarity":75},
    {"name":"Deishuu Kaiki","rarity":75,"aliases":["Suzuki"]},
    {"name":"Hikaru Kamiki","rarity":75},
    {"name":"Akane no Chichi","rarity":75,"aliases":["Akane's Father"]},
    {"name":"Seijuurou Uehara","rarity":75},
    {"name":"Ferris Olston","rarity":75},
    {"name":"Shuuto Fujimiya","rarity":75},
    {"name":"Sayo Shiina","rarity":75},
    {"name":"Mamoru Itou","rarity":50},
    {"name":"Yaozou Shima","rarity":75},
    {"name":"Venelana Gremory","rarity":75,"aliases":["Venelana Bael"]},
    {"name":"Akira Souma","rarity":75,"aliases":["Akira Soma"]},
    {"name":"Kunio Murai","rarity":50},
    {"name":"Anko Uehara","rarity":75,"aliases":["An-chan"]},
    {"name":"Mizuki Nanako no Chichi","rarity":75,"aliases":["Mizuki Nanako's Father"]},
    {"name":"Mizuki Nanako no Haha","rarity":75,"aliases":["Mizuki Nanako's Mother"]},
    {"name":"Nomura Tomoko no Chichi","rarity":75,"aliases":["Nomura Tomoko's Father"]},
    {"name":"Chizuru Oota","rarity":75},
    {"name":"Kizaki","rarity":75,"aliases":["Hitomi's father"]},
    {"name":"Kotaro Aizawa","rarity":75},
    {"name":"Masayo Aizawa","rarity":75},
    {"name":"Yuuko Shishigami","rarity":75},
    {"name":"Ichirou Hiiragi","rarity":75,"aliases":["The Florist"]},
    {"name":"Miroku","rarity":50,"aliases":["Houshi","Monk"]},
    {"name":"Sara Asano","rarity":75,"aliases":["Princess"]},
    {"name":"Izayoi","rarity":75,"aliases":["Inuyasha's mother"]},
    {"name":"Koharu","rarity":75},
    {"name":"Mama","rarity":75},
    {"name":"Nagasaki Hitomi","rarity":75},
    {"name":"Soue Nakiri","rarity":75,"aliases":["Sōe Nakiri"]},
    {"name":"Araragi no Haha","rarity":75,"aliases":["Araragi Matriarch","Mother Araragi"]},
    {"name":"Tsunade","rarity":75,"aliases":["Mayoi no Haha"]},
    {"name":"Mayoi no Chichi","rarity":75},
    {"name":"Nadeko no Chichi","rarity":75,"aliases":["Nadeko's Father"]},
    {"name":"Nadeko no Haha","rarity":75},
    {"name":"Mother Valac","rarity":75,"aliases":["Mommy"]},
    {"name":"Amuryllis Asmodeus","rarity":75,"aliases":["Head of Lust"]},
    {"name":"Wataru Sawaragi","rarity":75},
    {"name":"Yutaka Mikasa","rarity":75},
    {"name":"Mira Dianus Artemina","rarity":75},
    {"name":"Tamiko Shiraishi","rarity":75},
    {"name":"Takako Kobuchizawa","rarity":75},
    {"name":"Daryl Cavendish","rarity":75},
    {"name":"Pegasus Kashiwazaki","rarity":75,"aliases":["Tenma"]},
    {"name":"Shizuka Kagamihara","rarity":75},
    {"name":"Shuuichirou Kagamihara","rarity":75},
    {"name":"Hana Kirisaki","rarity":75,"aliases":["Madam Flower"]},
    {"name":"Macaron","rarity":75},
    {"name":"Sanae Yamada","rarity":75,"aliases":["Yamada's Mother","Yamada Haha (山田母)"]},
    {"name":"Ichikawa Haha","rarity":75,"aliases":["Ichikawa's Mother"]},
    {"name":"Yoshihisa Kira","rarity":75},
    {"name":"Touko Yotsuya","rarity":75,"aliases":["Miko no Haha (みこの母)","Miko's Mother"]},
    {"name":"Mamoru Yotsuya","rarity":75,"aliases":["Miko's Father (みこの父)"]},
    {"name":"Jin Toujou","rarity":75,"aliases":["War God"]},
    {"name":"Atsuko Urameshi","rarity":75},
    {"name":"Shiori Minamino","rarity":75},
    {"name":"Enma Daiou","rarity":75},
    {"name":"Hina","rarity":75},
    {"name":"Woman","rarity":75,"aliases":["Kudakusushi"]},
    {"name":"Hikari Shinomiya","rarity":75,"aliases":["Captain Shinomiya"]},
    {"name":"Quinn","rarity":75},
    {"name":"Leon Blitz","rarity":75},
    {"name":"Alm-Onji","rarity":75},
    {"name":"Yuriko Gouda","rarity":75},
    {"name":"Ernesta Kuhne","rarity":75},
    {"name":"Yukiko Inomata","rarity":75,"aliases":["Taiki no Haha (大喜の母)"]},
    {"name":"Seras Keren","rarity":75},
    {"name":"Mei no Chichi","rarity":75,"aliases":["Mei's Father"]},
    {"name":"Kurosawa no Haha","rarity":75,"aliases":["Kurosawa's Mother"]},
    {"name":"Tomoko no Chichi","rarity":75,"aliases":["Chichioya"]},
    {"name":"Tomoko no Haha","rarity":75,"aliases":["Tomoko's Mom","Hahaoya"]},
    {"name":"Reiko Amabuki","rarity":75,"aliases":["Dorami Shodai Souchou (怒羅美初代総長)","Dorami‘s First Boss"]},
    {"name":"Emi Handa","rarity":75},
    {"name":"Seimei Handa","rarity":75},
    {"name":"Akiko Oumae","rarity":75},
    {"name":"Tsuki Uzaki","rarity":75},
    {"name":"Sakaki","rarity":75,"aliases":["Giovanni"]},
    {"name":"Kyou","rarity":75,"aliases":["Koga"]},
    {"name":"Ruriko","rarity":75,"aliases":["Luana"]},
    {"name":"Anoki","rarity":75,"aliases":["Anthony"]},
    {"name":"Hanako","rarity":75,"aliases":["Delia Ketchum"]},
    {"name":"Nanako no Chichi","rarity":75,"aliases":["Nanako's Father"]},
    {"name":"Dan Ascart","rarity":75},
    {"name":"Gaia","rarity":75},
    {"name":"Eiji Date","rarity":75},
    {"name":"Mikami","rarity":75},
    {"name":"Mother Kimura","rarity":75},
    {"name":"Tatsuya Chichi","rarity":75,"aliases":["Tatsuya's Father","Kimura Chichi (木村父)"]},
    {"name":"Ako no Haha","rarity":75,"aliases":["Ako's Mother"]},
    {"name":"Yoshino Kousaka","rarity":75},
    {"name":"Daisuke Kousaka","rarity":75},
    {"name":"Neneko Chigiri","rarity":75},
    {"name":"Soujirou Izumi","rarity":75},
    {"name":"Yukari Takara","rarity":75},
    {"name":"Miki Hiiragi","rarity":75},
    {"name":"Tadao Hiiragi","rarity":75},
    {"name":"Mine","rarity":75},
    {"name":"Gonzo Kagemori","rarity":75},
    {"name":"Roei Tadera","rarity":75},
    {"name":"Ume Aihara","rarity":75},
    {"name":"Tsukina Farrow","rarity":75},
    {"name":"Yuba","rarity":75},
    {"name":"Gustave Huguenot","rarity":75},
    {"name":"Toushu","rarity":75,"aliases":["Head of the Petrification Kingdom"]},
    {"name":"Kazuya Souma","rarity":50},
    {"name":"Glaive Magna","rarity":75},
    {"name":"Gid Lucion Deviluke","rarity":75},
    {"name":"Irene Belserion","rarity":75,"aliases":["Scarlet Despair","Queen of Dragons"]},
    {"name":"Grammi","rarity":75},
    {"name":"Natsu no Chichi Dragneel","rarity":75},
    {"name":"Natsu no Haha Dragneel","rarity":75,"aliases":["Natsu's Mother"]},
    {"name":"Rita Dreyar","rarity":75},
    {"name":"Rung","rarity":75},
    {"name":"Yuujirou Hanma","rarity":75,"aliases":["The King","The Ogre"]},
    {"name":"Doppo Orochi","rarity":75,"aliases":["God of War"]},
    {"name":"Mohammad Alai","rarity":75},
    {"name":"Heads Hydra","rarity":75},
    {"name":"Nousgalia","rarity":75},
    {"name":"Luna","rarity":80},
    {"name":"Nayu Hasegawa","rarity":80},
    {"name":"Kaori Minato","rarity":80},
    {"name":"Ginga Hasegawa","rarity":80},
    {"name":"Shinobu Minato","rarity":80},
    {"name":"Fuuga Misawa","rarity":80},
    {"name":"Sauros Boreas Greyrat","rarity":80},
    {"name":"Jūbei","rarity":80},
    {"name":"Rowin Migurdia","rarity":80},
    {"name":"Rokari Migurdia","rarity":80},
    {"name":"Erald Grimwald","rarity":80},
    {"name":"Gyes Dedoldia","rarity":80},
    {"name":"Gustav Dedoldia","rarity":80},
    {"name":"Sato Akebi","rarity":80},
    {"name":"Hyoizaburoo","rarity":80},
    {"name":"Yuni Irido","rarity":80},
    {"name":"Mineaki Irido","rarity":80},
    {"name":"Deling Rembran","rarity":80},
    {"name":"Persephone I","rarity":80},
    {"name":"Fujio Uzaki","rarity":80},
    {"name":"Amaryllis Asmodeus","rarity":80},
    {"name":"Henri Azazel","rarity":80},
    {"name":"Michiyo Gotō","rarity":80},
    {"name":"Naoki Gotō","rarity":80},
    {"name":"Hiropon","rarity":80},
    {"name":"Chloe Halford","rarity":80},
    {"name":"Theodore McFarlane","rarity":80},
    {"name":"Gal Farion","rarity":80},
    {"name":"Siegfried Salutania","rarity":80},
    {"name":"Dominic Goltz","rarity":80},
    {"name":"Raphael Oriana","rarity":80},
    {"name":"L'Ausseil Bauer","rarity":80},
    {"name":"Tōe Gaen","rarity":80},
    {"name":"Diana","rarity":80},
    {"name":"Lucca","rarity":80},
    {"name":"Alex","rarity":80},
    {"name":"Kaede","rarity":80},
    {"name":"Cervantis","rarity":80},
    {"name":"Shenmei","rarity":80},
    {"name":"Aleister Crowley","rarity":80},
    {"name":"Toya Kamijo","rarity":80},
    {"name":"Elizard","rarity":80},
    {"name":"Monaka Oyafune","rarity":80},
    {"name":"Oliver Baker","rarity":80},
    {"name":"Munuinia Ilyslym","rarity":80},
    {"name":"Kilistran Denshusha","rarity":80},
    {"name":"Kyōko Tsumugi","rarity":80},
    {"name":"Keiichirō Tsumugi","rarity":80},
    {"name":"Takuseki Ichidou","rarity":80},
    {"name":"Naori Ichidou","rarity":80},
    {"name":"Itazou Kawa","rarity":80},
    {"name":"Puutarou Reietsu","rarity":80},
    {"name":"Ayato Matsumae","rarity":80},
    {"name":"Karla","rarity":80},
    {"name":"Bierce","rarity":80},
    {"name":"Gloria","rarity":80},
    {"name":"Kunishige Rokuhira","rarity":80},
    {"name":"Danpei Ichigeki","rarity":80},
    {"name":"Chin'nen Kobotoke","rarity":80},
    {"name":"Ataru's Mother","rarity":80},
    {"name":"Ataru's Father","rarity":80},
    {"name":"Fubuki Azuma","rarity":80},
    {"name":"Professor Hiiragi","rarity":80},
    {"name":"Mitsugu Kuroba","rarity":80},
    {"name":"Father Wolf","rarity":80},
    {"name":"Akane Miyoshi","rarity":80},
    {"name":"Kaguya Ōtsutsuki","rarity":80},
    {"name":"Mavis Vermillion","rarity":80},
    {"name":"Artemis","rarity":80},
    {"name":"Toshio Asakura","rarity":80},
    {"name":"Paragus","rarity":80},
    {"name":"Tsurara Shirayuki","rarity":80},
    {"name":"Takashi Hinatsuru","rarity":80},
    {"name":"Vanilla the Rabbit","rarity":80},
    {"name":"Abiru","rarity":80},
    {"name":"Laws","rarity":80},
    {"name":"Edmaris Falmuth","rarity":80},
    {"name":"Dagruel","rarity":80},
    {"name":"Václav Milizé","rarity":80},
    {"name":"Yugi's mother","rarity":80},
    {"name":"Maximilian Jenius","rarity":80},
    {"name":"Ittetsu Hoshi","rarity":80},
    {"name":"Arman Gandesblood","rarity":80},
    {"name":"Sayoko Koganei","rarity":80},
    {"name":"Klaus Midgar","rarity":80},
    {"name":"Garek Thompson","rarity":80},
    {"name":"Tesoro's mother","rarity":80},
    {"name":"Lucius","rarity":80},
    {"name":"Rystal","rarity":80},
    {"name":"Leila","rarity":80},
    {"name":"Gramma","rarity":80},
    {"name":"Tamaki Yuzuriha","rarity":80},
    {"name":"Pabel Baraja","rarity":80},
    {"name":"Johanna","rarity":80},
    {"name":"Sasuke Sarutobi","rarity":80},
    {"name":"Sir Furt","rarity":80},
    {"name":"Baron Montserrat","rarity":80},
    {"name":"Lord Takeribi","rarity":80},
    {"name":"Lady Toyohana","rarity":80},
    {"name":"Franka","rarity":80},
    {"name":"Deid","rarity":80},
    {"name":"Mama-nyan","rarity":80},
    {"name":"Ikuo Fukuga","rarity":80},
    {"name":"Kozue Fukuga","rarity":80},
    {"name":"Catwoman","rarity":80},
    {"name":"Yoshi Miyoshi","rarity":80},
    {"name":"Milia Fallyna Jenius","rarity":80},
    {"name":"Wolverine","rarity":80},
    {"name":"Elena Miyano","rarity":80},
    {"name":"Atsushi Miyano","rarity":80},
    {"name":"Leira","rarity":80},
    {"name":"Mariko Yashida","rarity":80},
    {"name":"Guru","rarity":80},
    {"name":"Jean Grey","rarity":80},
    {"name":"Regis Lucis Caelum","rarity":80},
    {"name":"Ginji Ryotsu","rarity":80},
    {"name":"Yone Ryotsu","rarity":80},
    {"name":"Mizore's father","rarity":80},
    {"name":"Jhil","rarity":80},
    {"name":"Rastel's mother","rarity":80},
    {"name":"Pejite mayor","rarity":80},
    {"name":"Halvar","rarity":80},
    {"name":"Ylva","rarity":80},
    {"name":"Yukio","rarity":80},
    {"name":"Cyclops","rarity":80},
    {"name":"Kapp'n","rarity":80},
    {"name":"Kaitlin","rarity":80},
    {"name":"Goku","rarity":0},
  ]},
];
// BEGIN NOV27 APPROVED CSV EXPANSION
// Source: user-approved November 27 CSVs. Existing rarity inputs and Top Answers remain unchanged.
{
 const q=questions.find(x=>x.id==="timed-v4-descent-8-fly");if(!q)throw Error("Missing November 27 question timed-v4-descent-8-fly");
 {const a=q.answers.find(x=>x.name==="Kairyu");if(!a)throw Error("Missing canonical answer Kairyu");a.aliases=a.aliases||[];
  a.aliases.push("Dragonite");
 }
 {const a=q.answers.find(x=>x.name==="Lizardon");if(!a)throw Error("Missing canonical answer Lizardon");a.aliases=a.aliases||[];
  a.aliases.push("Charizard");
 }
 q.answers.push({"name":"Android 17","rarity":30,"aliases":[]});
 q.answers.push({"name":"Android 18","rarity":30,"aliases":[]});
 q.answers.push({"name":"Beerus","rarity":30,"aliases":[]});
 q.answers.push({"name":"Broly","rarity":30,"aliases":[]});
 q.answers.push({"name":"Burter","rarity":30,"aliases":[]});
 q.answers.push({"name":"Cabba","rarity":30,"aliases":[]});
 q.answers.push({"name":"Captain Ginyu","rarity":30,"aliases":[]});
 q.answers.push({"name":"Caulifla","rarity":30,"aliases":[]});
 q.answers.push({"name":"Cell","rarity":30,"aliases":[]});
 q.answers.push({"name":"Chiaotzu","rarity":30,"aliases":[]});
 q.answers.push({"name":"Dodoria","rarity":30,"aliases":[]});
 q.answers.push({"name":"Frieren","rarity":30,"aliases":[]});
 q.answers.push({"name":"Frieza","rarity":30,"aliases":[]});
 q.answers.push({"name":"Gogeta","rarity":30,"aliases":[]});
 q.answers.push({"name":"Gohan","rarity":30,"aliases":[]});
 q.answers.push({"name":"Goku Black","rarity":30,"aliases":[]});
 q.answers.push({"name":"Goten","rarity":30,"aliases":[]});
 q.answers.push({"name":"Gotenks","rarity":30,"aliases":[]});
 q.answers.push({"name":"Guldo","rarity":30,"aliases":[]});
 q.answers.push({"name":"Hawks","rarity":30,"aliases":[]});
 q.answers.push({"name":"Hit","rarity":30,"aliases":[]});
 q.answers.push({"name":"Jeice","rarity":30,"aliases":[]});
 q.answers.push({"name":"Jiren","rarity":30,"aliases":[]});
 q.answers.push({"name":"Kale","rarity":30,"aliases":[]});
 q.answers.push({"name":"Kefla","rarity":30,"aliases":[]});
 q.answers.push({"name":"Kibito","rarity":30,"aliases":[]});
 q.answers.push({"name":"King Kai","rarity":30,"aliases":[]});
 q.answers.push({"name":"Krillin","rarity":30,"aliases":[]});
 q.answers.push({"name":"Majin Buu","rarity":30,"aliases":[]});
 q.answers.push({"name":"Nappa","rarity":30,"aliases":[]});
 q.answers.push({"name":"Pan","rarity":30,"aliases":[]});
 q.answers.push({"name":"Piccolo","rarity":30,"aliases":[]});
 q.answers.push({"name":"Pikkon","rarity":30,"aliases":[]});
 q.answers.push({"name":"Raditz","rarity":30,"aliases":[]});
 q.answers.push({"name":"Recoome","rarity":30,"aliases":[]});
 q.answers.push({"name":"Ryuk","rarity":30,"aliases":[]});
 q.answers.push({"name":"Shin","rarity":30,"aliases":[]});
 q.answers.push({"name":"Super Buu","rarity":30,"aliases":[]});
 q.answers.push({"name":"Tatsumaki","rarity":30,"aliases":[]});
 q.answers.push({"name":"Tien Shinhan","rarity":30,"aliases":[]});
 q.answers.push({"name":"Toppo","rarity":30,"aliases":[]});
 q.answers.push({"name":"Trunks","rarity":30,"aliases":[]});
 q.answers.push({"name":"Vados","rarity":30,"aliases":[]});
 q.answers.push({"name":"Vegeta","rarity":30,"aliases":[]});
 q.answers.push({"name":"Vegito","rarity":30,"aliases":[]});
 q.answers.push({"name":"Videl","rarity":30,"aliases":[]});
 q.answers.push({"name":"Whis","rarity":30,"aliases":[]});
 q.answers.push({"name":"Yamcha","rarity":30,"aliases":[]});
 q.answers.push({"name":"Zamasu","rarity":30,"aliases":[]});
 q.answers.push({"name":"Zarbon","rarity":30,"aliases":[]});
 q.answers.push({"name":"Acnologia","rarity":55,"aliases":[]});
 q.answers.push({"name":"Aerodactyl","rarity":55,"aliases":[]});
 q.answers.push({"name":"Ainz Ooal Gown","rarity":55,"aliases":[]});
 q.answers.push({"name":"Akeno Himejima","rarity":55,"aliases":[]});
 q.answers.push({"name":"Albedo","rarity":55,"aliases":[]});
 q.answers.push({"name":"Altaria","rarity":55,"aliases":[]});
 q.answers.push({"name":"Arceus","rarity":55,"aliases":[]});
 q.answers.push({"name":"Articuno","rarity":55,"aliases":[]});
 q.answers.push({"name":"Asia Argento","rarity":55,"aliases":[]});
 q.answers.push({"name":"Asta","rarity":55,"aliases":[]});
 q.answers.push({"name":"Azazel","rarity":55,"aliases":[]});
 q.answers.push({"name":"Azriel","rarity":55,"aliases":[]});
 q.answers.push({"name":"Beedrill","rarity":55,"aliases":[]});
 q.answers.push({"name":"Boros","rarity":55,"aliases":[]});
 q.answers.push({"name":"Braviary","rarity":55,"aliases":[]});
 q.answers.push({"name":"Carla","rarity":55,"aliases":[]});
 q.answers.push({"name":"Celebi","rarity":55,"aliases":[]});
 q.answers.push({"name":"Corviknight","rarity":55,"aliases":[]});
 q.answers.push({"name":"Demiurge","rarity":55,"aliases":[]});
 q.answers.push({"name":"Deoxys","rarity":55,"aliases":[]});
 q.answers.push({"name":"Diablo","rarity":55,"aliases":[]});
 q.answers.push({"name":"Elaine","rarity":55,"aliases":[]});
 q.answers.push({"name":"Elizabeth Liones","rarity":55,"aliases":[]});
 q.answers.push({"name":"Endeavor","rarity":55,"aliases":[]});
 q.answers.push({"name":"Enel","rarity":55,"aliases":[]});
 q.answers.push({"name":"Fearow","rarity":55,"aliases":[]});
 q.answers.push({"name":"Fern","rarity":55,"aliases":[]});
 q.answers.push({"name":"Flygon","rarity":55,"aliases":[]});
 q.answers.push({"name":"Fubuki","rarity":55,"aliases":[]});
 q.answers.push({"name":"Genos","rarity":55,"aliases":[]});
 q.answers.push({"name":"Gloxinia","rarity":55,"aliases":[]});
 q.answers.push({"name":"Golbat","rarity":55,"aliases":[]});
 q.answers.push({"name":"Gran Torino","rarity":55,"aliases":[]});
 q.answers.push({"name":"Grandeeney","rarity":55,"aliases":[]});
 q.answers.push({"name":"Ho-Oh","rarity":55,"aliases":[]});
 q.answers.push({"name":"Honchkrow","rarity":55,"aliases":[]});
 q.answers.push({"name":"Inasa Yoarashi","rarity":55,"aliases":[]});
 q.answers.push({"name":"Issei Hyoudou","rarity":55,"aliases":[]});
 q.answers.push({"name":"Izuku Midoriya","rarity":55,"aliases":[]});
 q.answers.push({"name":"Jibril","rarity":55,"aliases":[]});
 q.answers.push({"name":"Jirachi","rarity":55,"aliases":[]});
 q.answers.push({"name":"Kaguya Otsutsuki","rarity":55,"aliases":[]});
 q.answers.push({"name":"Kaido","rarity":55,"aliases":[]});
 q.answers.push({"name":"Katsuki Bakugo","rarity":55,"aliases":[]});
 q.answers.push({"name":"Kiba Yuuto","rarity":55,"aliases":[]});
 q.answers.push({"name":"King","rarity":55,"aliases":[]});
 q.answers.push({"name":"Kozuki Momonosuke","rarity":55,"aliases":[]});
 q.answers.push({"name":"Kusuo Saiki","rarity":55,"aliases":[]});
 q.answers.push({"name":"Lafitte","rarity":55,"aliases":[]});
 q.answers.push({"name":"Landorus","rarity":55,"aliases":[]});
 q.answers.push({"name":"Latias","rarity":55,"aliases":[]});
 q.answers.push({"name":"Latios","rarity":55,"aliases":[]});
 q.answers.push({"name":"Liebe","rarity":55,"aliases":[]});
 q.answers.push({"name":"Ludociel","rarity":55,"aliases":[]});
 q.answers.push({"name":"Lugia","rarity":55,"aliases":[]});
 q.answers.push({"name":"Lunala","rarity":55,"aliases":[]});
 q.answers.push({"name":"Madara Uchiha","rarity":55,"aliases":[]});
 q.answers.push({"name":"Mael","rarity":55,"aliases":[]});
 q.answers.push({"name":"Marco","rarity":55,"aliases":[]});
 q.answers.push({"name":"Metalicana","rarity":55,"aliases":[]});
 q.answers.push({"name":"Mew","rarity":55,"aliases":[]});
 q.answers.push({"name":"Mewtwo","rarity":55,"aliases":[]});
 q.answers.push({"name":"Milim Nava","rarity":55,"aliases":[]});
 q.answers.push({"name":"Moltres","rarity":55,"aliases":[]});
 q.answers.push({"name":"Momoshiki Otsutsuki","rarity":55,"aliases":[]});
 q.answers.push({"name":"Monet","rarity":55,"aliases":[]});
 q.answers.push({"name":"Monkey D. Luffy","rarity":55,"aliases":[]});
 q.answers.push({"name":"Mu","rarity":55,"aliases":[]});
 q.answers.push({"name":"Naganadel","rarity":55,"aliases":[]});
 q.answers.push({"name":"Naruto Uzumaki","rarity":55,"aliases":[]});
 q.answers.push({"name":"Nejire Hado","rarity":55,"aliases":[]});
 q.answers.push({"name":"Noctowl","rarity":55,"aliases":[]});
 q.answers.push({"name":"Noivern","rarity":55,"aliases":[]});
 q.answers.push({"name":"Obito Uchiha","rarity":55,"aliases":[]});
 q.answers.push({"name":"Onoki","rarity":55,"aliases":[]});
 q.answers.push({"name":"Oricorio","rarity":55,"aliases":[]});
 q.answers.push({"name":"Panther Lily","rarity":55,"aliases":[]});
 q.answers.push({"name":"Pelipper","rarity":55,"aliases":[]});
 q.answers.push({"name":"Pidgeot","rarity":55,"aliases":[]});
 q.answers.push({"name":"Pidgeotto","rarity":55,"aliases":[]});
 q.answers.push({"name":"Ravel Phenex","rarity":55,"aliases":[]});
 q.answers.push({"name":"Rayquaza","rarity":55,"aliases":[]});
 q.answers.push({"name":"Rem","rarity":55,"aliases":[]});
 q.answers.push({"name":"Reshiram","rarity":55,"aliases":[]});
 q.answers.push({"name":"Rias Gremory","rarity":55,"aliases":[]});
 q.answers.push({"name":"Rimuru Tempest","rarity":55,"aliases":[]});
 q.answers.push({"name":"Ryukyu","rarity":55,"aliases":[]});
 q.answers.push({"name":"Sanji","rarity":55,"aliases":[]});
 q.answers.push({"name":"Sariel","rarity":55,"aliases":[]});
 q.answers.push({"name":"Satoru Gojo","rarity":55,"aliases":[]});
 q.answers.push({"name":"Serie","rarity":55,"aliases":[]});
 q.answers.push({"name":"Shalltear Bloodfallen","rarity":55,"aliases":[]});
 q.answers.push({"name":"Shigeo Kageyama","rarity":55,"aliases":[]});
 q.answers.push({"name":"Sidoh","rarity":55,"aliases":[]});
 q.answers.push({"name":"Sirzechs Lucifer","rarity":55,"aliases":[]});
 q.answers.push({"name":"Skarmory","rarity":55,"aliases":[]});
 q.answers.push({"name":"Spearow","rarity":55,"aliases":[]});
 q.answers.push({"name":"Staraptor","rarity":55,"aliases":[]});
 q.answers.push({"name":"Swellow","rarity":55,"aliases":[]});
 q.answers.push({"name":"Talonflame","rarity":55,"aliases":[]});
 q.answers.push({"name":"Tamaki Amajiki","rarity":55,"aliases":[]});
 q.answers.push({"name":"Tarmiel","rarity":55,"aliases":[]});
 q.answers.push({"name":"Teruki Hanazawa","rarity":55,"aliases":[]});
 q.answers.push({"name":"Thundurus","rarity":55,"aliases":[]});
 q.answers.push({"name":"Togekiss","rarity":55,"aliases":[]});
 q.answers.push({"name":"Toichiro Suzuki","rarity":55,"aliases":[]});
 q.answers.push({"name":"Toneri Otsutsuki","rarity":55,"aliases":[]});
 q.answers.push({"name":"Tornadus","rarity":55,"aliases":[]});
 q.answers.push({"name":"Toucannon","rarity":55,"aliases":[]});
 q.answers.push({"name":"Unfezant","rarity":55,"aliases":[]});
 q.answers.push({"name":"Vali Lucifer","rarity":55,"aliases":[]});
 q.answers.push({"name":"Veldora Tempest","rarity":55,"aliases":[]});
 q.answers.push({"name":"Vespiquen","rarity":55,"aliases":[]});
 q.answers.push({"name":"Vivillon","rarity":55,"aliases":[]});
 q.answers.push({"name":"Volcarona","rarity":55,"aliases":[]});
 q.answers.push({"name":"Wingull","rarity":55,"aliases":[]});
 q.answers.push({"name":"Xenovia Quarta","rarity":55,"aliases":[]});
 q.answers.push({"name":"Yanmega","rarity":55,"aliases":[]});
 q.answers.push({"name":"Yuno Grinberryall","rarity":55,"aliases":[]});
 q.answers.push({"name":"Yveltal","rarity":55,"aliases":[]});
 q.answers.push({"name":"Zapdos","rarity":55,"aliases":[]});
 q.answers.push({"name":"Zekrom","rarity":55,"aliases":[]});
 q.answers.push({"name":"Zubat","rarity":55,"aliases":[]});
}
{
 const q=questions.find(x=>x.id==="timed-v4-descent-8-games");if(!q)throw Error("Missing November 27 question timed-v4-descent-8-games");
 q.answers.push({"name":"Aikatsu Planet!","rarity":55,"aliases":[]});
 q.answers.push({"name":"Air Gear","rarity":55,"aliases":[]});
 q.answers.push({"name":"Ashita e Free Kick","rarity":55,"aliases":[]});
 q.answers.push({"name":"B-Daman Crossfire","rarity":55,"aliases":[]});
 q.answers.push({"name":"Bakusou Kyoudai Let’s & Go!!","rarity":55,"aliases":[]});
 q.answers.push({"name":"Battle Athletes Victory","rarity":55,"aliases":[]});
 q.answers.push({"name":"Battle Athletes Victory ReSTART!","rarity":55,"aliases":[]});
 q.answers.push({"name":"Battle B-Daman","rarity":55,"aliases":[]});
 q.answers.push({"name":"Battle Spirits: Brave","rarity":55,"aliases":[]});
 q.answers.push({"name":"Beyblade Burst QuadDrive","rarity":55,"aliases":[]});
 q.answers.push({"name":"Cardfight!! Vanguard Divinez","rarity":55,"aliases":[]});
 q.answers.push({"name":"Crush Gear Turbo","rarity":55,"aliases":[]});
 q.answers.push({"name":"Danball Senki","rarity":55,"aliases":[]});
 q.answers.push({"name":"Dash! Yonkuro","rarity":55,"aliases":[]});
 q.answers.push({"name":"Extreme Hearts","rarity":55,"aliases":[]});
 q.answers.push({"name":"Fanfare of Adolescence","rarity":55,"aliases":[]});
 q.answers.push({"name":"Idol Time PriPara","rarity":55,"aliases":[]});
 q.answers.push({"name":"Inazuma Eleven GO","rarity":55,"aliases":[]});
 q.answers.push({"name":"Inazuma Eleven Orion","rarity":55,"aliases":[]});
 q.answers.push({"name":"Kiratto Pri Chan","rarity":55,"aliases":[]});
 q.answers.push({"name":"Medabots","rarity":55,"aliases":[]});
 q.answers.push({"name":"Medabots Damashii","rarity":55,"aliases":[]});
 q.answers.push({"name":"Oban Star-Racers","rarity":55,"aliases":[]});
 q.answers.push({"name":"Pretty Rhythm: Aurora Dream","rarity":55,"aliases":[]});
 q.answers.push({"name":"Pretty Rhythm: Dear My Future","rarity":55,"aliases":[]});
 q.answers.push({"name":"Pretty Rhythm: Rainbow Live","rarity":55,"aliases":[]});
 q.answers.push({"name":"PriPara","rarity":55,"aliases":[]});
 q.answers.push({"name":"Scan2Go","rarity":55,"aliases":[]});
 q.answers.push({"name":"Shadowverse Flame: Seven Shadows Arc","rarity":55,"aliases":[]});
 q.answers.push({"name":"Shakunetsu no Takkyuu Musume","rarity":55,"aliases":[]});
 q.answers.push({"name":"Shining Star","rarity":55,"aliases":[]});
 q.answers.push({"name":"Sorairo Utility","rarity":55,"aliases":[]});
 q.answers.push({"name":"Tribe Nine","rarity":55,"aliases":[]});
 q.answers.push({"name":"Uma Musume: Pretty Derby — Road to the Top","rarity":55,"aliases":[]});
 q.answers.push({"name":"Victory Kickoff!!","rarity":55,"aliases":[]});
 q.answers.push({"name":"Waccha PriMagi!","rarity":55,"aliases":[]});
 q.answers.push({"name":"Wangan Midnight","rarity":55,"aliases":[]});
 q.answers.push({"name":"Yumeiro Patissiere","rarity":55,"aliases":[]});
}
{
 const q=questions.find(x=>x.id==="timed-v4-descent-8-headband");if(!q)throw Error("Missing November 27 question timed-v4-descent-8-headband");
 q.answers.push({"name":"Akatsuchi","rarity":30,"aliases":[]});
 q.answers.push({"name":"Anko Mitarashi","rarity":30,"aliases":[]});
 q.answers.push({"name":"Ao","rarity":30,"aliases":[]});
 q.answers.push({"name":"Asuma Sarutobi","rarity":30,"aliases":[]});
 q.answers.push({"name":"Baki","rarity":30,"aliases":[]});
 q.answers.push({"name":"Choji Akimichi","rarity":30,"aliases":[]});
 q.answers.push({"name":"Chojuro","rarity":30,"aliases":[]});
 q.answers.push({"name":"Darui","rarity":30,"aliases":[]});
 q.answers.push({"name":"Deidara","rarity":30,"aliases":[]});
 q.answers.push({"name":"Fuu","rarity":30,"aliases":[]});
 q.answers.push({"name":"Gaara","rarity":30,"aliases":[]});
 q.answers.push({"name":"Genma Shiranui","rarity":30,"aliases":[]});
 q.answers.push({"name":"Han","rarity":30,"aliases":[]});
 q.answers.push({"name":"Hayate Gekko","rarity":30,"aliases":[]});
 q.answers.push({"name":"Hidan","rarity":30,"aliases":[]});
 q.answers.push({"name":"Hinata Hyuga","rarity":30,"aliases":[]});
 q.answers.push({"name":"Ibiki Morino","rarity":30,"aliases":[]});
 q.answers.push({"name":"Ino Yamanaka","rarity":30,"aliases":[]});
 q.answers.push({"name":"Iruka Umino","rarity":30,"aliases":[]});
 q.answers.push({"name":"Itachi Uchiha","rarity":30,"aliases":[]});
 q.answers.push({"name":"Izumo Kamizuki","rarity":30,"aliases":[]});
 q.answers.push({"name":"Jiraiya","rarity":30,"aliases":[]});
 q.answers.push({"name":"Kabuto Yakushi","rarity":30,"aliases":[]});
 q.answers.push({"name":"Kakashi Hatake","rarity":30,"aliases":[]});
 q.answers.push({"name":"Kakuzu","rarity":30,"aliases":[]});
 q.answers.push({"name":"Kankuro","rarity":30,"aliases":[]});
 q.answers.push({"name":"Karui","rarity":30,"aliases":[]});
 q.answers.push({"name":"Kiba Inuzuka","rarity":30,"aliases":[]});
 q.answers.push({"name":"Killer Bee","rarity":30,"aliases":[]});
 q.answers.push({"name":"Kisame Hoshigaki","rarity":30,"aliases":[]});
 q.answers.push({"name":"Konan","rarity":30,"aliases":[]});
 q.answers.push({"name":"Konohamaru Sarutobi","rarity":30,"aliases":[]});
 q.answers.push({"name":"Kotetsu Hagane","rarity":30,"aliases":[]});
 q.answers.push({"name":"Kurenai Yuhi","rarity":30,"aliases":[]});
 q.answers.push({"name":"Kurotsuchi","rarity":30,"aliases":[]});
 q.answers.push({"name":"Mei Terumi","rarity":30,"aliases":[]});
 q.answers.push({"name":"Might Guy","rarity":30,"aliases":[]});
 q.answers.push({"name":"Minato Namikaze","rarity":30,"aliases":[]});
 q.answers.push({"name":"Neji Hyuga","rarity":30,"aliases":[]});
 q.answers.push({"name":"Obito Uchiha","rarity":30,"aliases":[]});
 q.answers.push({"name":"Omoi","rarity":30,"aliases":[]});
 q.answers.push({"name":"Onoki","rarity":30,"aliases":[]});
 q.answers.push({"name":"Pain","rarity":30,"aliases":[]});
 q.answers.push({"name":"Rin Nohara","rarity":30,"aliases":[]});
 q.answers.push({"name":"Rock Lee","rarity":30,"aliases":[]});
 q.answers.push({"name":"Roshi","rarity":30,"aliases":[]});
 q.answers.push({"name":"Sai","rarity":30,"aliases":[]});
 q.answers.push({"name":"Sakura Haruno","rarity":30,"aliases":[]});
 q.answers.push({"name":"Sasuke Uchiha","rarity":30,"aliases":[]});
 q.answers.push({"name":"Shikamaru Nara","rarity":30,"aliases":[]});
 q.answers.push({"name":"Shino Aburame","rarity":30,"aliases":[]});
 q.answers.push({"name":"Temari","rarity":30,"aliases":[]});
 q.answers.push({"name":"Tenten","rarity":30,"aliases":[]});
 q.answers.push({"name":"Utakata","rarity":30,"aliases":[]});
 q.answers.push({"name":"Yagura Karatachi","rarity":30,"aliases":[]});
 q.answers.push({"name":"Yamato","rarity":30,"aliases":[]});
 q.answers.push({"name":"Yugao Uzuki","rarity":30,"aliases":[]});
 q.answers.push({"name":"Yugito Nii","rarity":30,"aliases":[]});
 q.answers.push({"name":"Zabuza Momochi","rarity":30,"aliases":[]});
 q.answers.push({"name":"Adlet Mayer","rarity":55,"aliases":[]});
 q.answers.push({"name":"Araya","rarity":55,"aliases":[]});
 q.answers.push({"name":"Asta","rarity":55,"aliases":[]});
 q.answers.push({"name":"Bandana Waddle Dee","rarity":55,"aliases":[]});
 q.answers.push({"name":"Bardock","rarity":55,"aliases":[]});
 q.answers.push({"name":"Boruto Uzumaki","rarity":55,"aliases":[]});
 q.answers.push({"name":"Chocho Akimichi","rarity":55,"aliases":[]});
 q.answers.push({"name":"Denki Kaminarimon","rarity":55,"aliases":[]});
 q.answers.push({"name":"Houki Taketori","rarity":55,"aliases":[]});
 q.answers.push({"name":"Inojin Yamanaka","rarity":55,"aliases":[]});
 q.answers.push({"name":"Iwabee Yuino","rarity":55,"aliases":[]});
 q.answers.push({"name":"Keishin Ukai","rarity":55,"aliases":[]});
 q.answers.push({"name":"Kohaku","rarity":55,"aliases":[]});
 q.answers.push({"name":"Korrina","rarity":55,"aliases":[]});
 q.answers.push({"name":"Mamoru Endou","rarity":55,"aliases":[]});
 q.answers.push({"name":"Mayoi Hachikuji","rarity":55,"aliases":[]});
 q.answers.push({"name":"Metal Lee","rarity":55,"aliases":[]});
 q.answers.push({"name":"Mirai Sarutobi","rarity":55,"aliases":[]});
 q.answers.push({"name":"Mitsuki","rarity":55,"aliases":[]});
 q.answers.push({"name":"Namida Suzumeno","rarity":55,"aliases":[]});
 q.answers.push({"name":"Ram","rarity":55,"aliases":[]});
 q.answers.push({"name":"Rem","rarity":55,"aliases":[]});
 q.answers.push({"name":"Roronoa Zoro","rarity":55,"aliases":[]});
 q.answers.push({"name":"Sarada Uchiha","rarity":55,"aliases":[]});
 q.answers.push({"name":"Shikadai Nara","rarity":55,"aliases":[]});
 q.answers.push({"name":"Shinki","rarity":55,"aliases":[]});
 q.answers.push({"name":"Sumire Kakei","rarity":55,"aliases":[]});
 q.answers.push({"name":"Tengen Uzui","rarity":55,"aliases":[]});
 q.answers.push({"name":"Tomoyo Daidouji","rarity":55,"aliases":[]});
 q.answers.push({"name":"Tomoyo Sakagami","rarity":55,"aliases":[]});
 q.answers.push({"name":"Victorique de Blois","rarity":55,"aliases":[]});
 q.answers.push({"name":"Wasabi Izuno","rarity":55,"aliases":[]});
 q.answers.push({"name":"Wendy Marvell","rarity":55,"aliases":[]});
 q.answers.push({"name":"Yodo","rarity":55,"aliases":[]});
}
{
 const q=questions.find(x=>x.id==="timed-v4-descent-8-parent");if(!q)throw Error("Missing November 27 question timed-v4-descent-8-parent");
 q.answers.push({"name":"Banchina","rarity":30,"aliases":[]});
 q.answers.push({"name":"Bulma","rarity":30,"aliases":[]});
 q.answers.push({"name":"Carla Yeager","rarity":30,"aliases":[]});
 q.answers.push({"name":"Caroline","rarity":30,"aliases":[]});
 q.answers.push({"name":"Charlotte Linlin","rarity":30,"aliases":[]});
 q.answers.push({"name":"Choji Akimichi","rarity":30,"aliases":[]});
 q.answers.push({"name":"Gaara","rarity":30,"aliases":[]});
 q.answers.push({"name":"Gohan","rarity":30,"aliases":[]});
 q.answers.push({"name":"Grace","rarity":30,"aliases":[]});
 q.answers.push({"name":"Gracia Hughes","rarity":30,"aliases":[]});
 q.answers.push({"name":"Hiashi Hyuga","rarity":30,"aliases":[]});
 q.answers.push({"name":"Hinata Uzumaki","rarity":30,"aliases":[]});
 q.answers.push({"name":"Ichigo Kurosaki","rarity":30,"aliases":[]});
 q.answers.push({"name":"Ino Yamanaka","rarity":30,"aliases":[]});
 q.answers.push({"name":"Inuyasha","rarity":30,"aliases":[]});
 q.answers.push({"name":"Kagaya Ubuyashiki","rarity":30,"aliases":[]});
 q.answers.push({"name":"Kagome Higurashi","rarity":30,"aliases":[]});
 q.answers.push({"name":"Kaido","rarity":30,"aliases":[]});
 q.answers.push({"name":"Karui Akimichi","rarity":30,"aliases":[]});
 q.answers.push({"name":"Katsuya Honda","rarity":30,"aliases":[]});
 q.answers.push({"name":"Kie Kamado","rarity":30,"aliases":[]});
 q.answers.push({"name":"Kokiri","rarity":30,"aliases":[]});
 q.answers.push({"name":"Kozuki Toki","rarity":30,"aliases":[]});
 q.answers.push({"name":"Kushina Uzumaki","rarity":30,"aliases":[]});
 q.answers.push({"name":"Kyoko Honda","rarity":30,"aliases":[]});
 q.answers.push({"name":"Loid Forger","rarity":30,"aliases":[]});
 q.answers.push({"name":"Lusamine","rarity":30,"aliases":[]});
 q.answers.push({"name":"Maes Hughes","rarity":30,"aliases":[]});
 q.answers.push({"name":"Mamoru Chiba","rarity":30,"aliases":[]});
 q.answers.push({"name":"Minato Namikaze","rarity":30,"aliases":[]});
 q.answers.push({"name":"Mohn","rarity":30,"aliases":[]});
 q.answers.push({"name":"Naruto Uzumaki","rarity":30,"aliases":[]});
 q.answers.push({"name":"Nefertari Cobra","rarity":30,"aliases":[]});
 q.answers.push({"name":"Norman","rarity":30,"aliases":[]});
 q.answers.push({"name":"Okino","rarity":30,"aliases":[]});
 q.answers.push({"name":"Orochimaru","rarity":30,"aliases":[]});
 q.answers.push({"name":"Professor Burnet","rarity":30,"aliases":[]});
 q.answers.push({"name":"Professor Kukui","rarity":30,"aliases":[]});
 q.answers.push({"name":"Renji Abarai","rarity":30,"aliases":[]});
 q.answers.push({"name":"Rock Lee","rarity":30,"aliases":[]});
 q.answers.push({"name":"Rod Reiss","rarity":30,"aliases":[]});
 q.answers.push({"name":"Ruka Rengoku","rarity":30,"aliases":[]});
 q.answers.push({"name":"Rukia Kuchiki","rarity":30,"aliases":[]});
 q.answers.push({"name":"Sai","rarity":30,"aliases":[]});
 q.answers.push({"name":"Sakura Haruno","rarity":30,"aliases":[]});
 q.answers.push({"name":"Sasuke Uchiha","rarity":30,"aliases":[]});
 q.answers.push({"name":"Sesshomaru","rarity":30,"aliases":[]});
 q.answers.push({"name":"Shikamaru Nara","rarity":30,"aliases":[]});
 q.answers.push({"name":"Shinjuro Rengoku","rarity":30,"aliases":[]});
 q.answers.push({"name":"Tanjuro Kamado","rarity":30,"aliases":[]});
 q.answers.push({"name":"Temari Nara","rarity":30,"aliases":[]});
 q.answers.push({"name":"Usagi Tsukino","rarity":30,"aliases":[]});
 q.answers.push({"name":"Vegeta","rarity":30,"aliases":[]});
 q.answers.push({"name":"Videl","rarity":30,"aliases":[]});
 q.answers.push({"name":"Vinsmoke Judge","rarity":30,"aliases":[]});
 q.answers.push({"name":"Vinsmoke Sora","rarity":30,"aliases":[]});
 q.answers.push({"name":"Yor Forger","rarity":30,"aliases":[]});
}
{
 const q=questions.find(x=>x.id==="timed-v4-descent-8-school");if(!q)throw Error("Missing November 27 question timed-v4-descent-8-school");
 q.answers.push({"name":"A Condition Called Love","rarity":55,"aliases":[]});
 q.answers.push({"name":"And You Thought There Is Never a Girl Online?","rarity":55,"aliases":[]});
 q.answers.push({"name":"Aokana: Four Rhythm Across the Blue","rarity":55,"aliases":[]});
 q.answers.push({"name":"Bottom-Tier Character Tomozaki","rarity":55,"aliases":[]});
 q.answers.push({"name":"Chronicles of the Going Home Club","rarity":55,"aliases":[]});
 q.answers.push({"name":"Classroom for Heroes","rarity":55,"aliases":[]});
 q.answers.push({"name":"D4DJ First Mix","rarity":55,"aliases":[]});
 q.answers.push({"name":"Do It Yourself!!","rarity":55,"aliases":[]});
 q.answers.push({"name":"Domestic Girlfriend","rarity":55,"aliases":[]});
 q.answers.push({"name":"Fruits Basket (2019)","rarity":55,"aliases":[]});
 q.answers.push({"name":"Gamers!","rarity":55,"aliases":[]});
 q.answers.push({"name":"GJ Club","rarity":55,"aliases":[]});
 q.answers.push({"name":"Hidamari Sketch","rarity":55,"aliases":[]});
 q.answers.push({"name":"Hokkaido Gals Are Super Adorable!","rarity":55,"aliases":[]});
 q.answers.push({"name":"Hoshikuzu Telepath","rarity":55,"aliases":[]});
 q.answers.push({"name":"I’m in Love with the Villainess","rarity":55,"aliases":[]});
 q.answers.push({"name":"Kaginado","rarity":55,"aliases":[]});
 q.answers.push({"name":"KimiKiss: Pure Rouge","rarity":55,"aliases":[]});
 q.answers.push({"name":"Love Lab","rarity":55,"aliases":[]});
 q.answers.push({"name":"Love Live! Superstar!! Season 2","rarity":55,"aliases":[]});
 q.answers.push({"name":"Love Me, Love Me Not","rarity":55,"aliases":[]});
 q.answers.push({"name":"MagiKano","rarity":55,"aliases":[]});
 q.answers.push({"name":"Medaka Kuroiwa Is Impervious to My Charms","rarity":55,"aliases":[]});
 q.answers.push({"name":"Mieruko-chan","rarity":55,"aliases":[]});
 q.answers.push({"name":"My Clueless First Friend","rarity":55,"aliases":[]});
 q.answers.push({"name":"My First Girlfriend Is a Gal","rarity":55,"aliases":[]});
 q.answers.push({"name":"My Love Story!!","rarity":55,"aliases":[]});
 q.answers.push({"name":"My Wife Is the Student Council President","rarity":55,"aliases":[]});
 q.answers.push({"name":"Nijiiro Days","rarity":55,"aliases":[]});
 q.answers.push({"name":"OniAi","rarity":55,"aliases":[]});
 q.answers.push({"name":"Plastic Nee-san","rarity":55,"aliases":[]});
 q.answers.push({"name":"Re:Stage! Dream Days","rarity":55,"aliases":[]});
 q.answers.push({"name":"Senryu Girl","rarity":55,"aliases":[]});
 q.answers.push({"name":"Slow Start","rarity":55,"aliases":[]});
 q.answers.push({"name":"Softenni","rarity":55,"aliases":[]});
 q.answers.push({"name":"Super Cub","rarity":55,"aliases":[]});
 q.answers.push({"name":"The Student Council President Is My Wife","rarity":55,"aliases":[]});
 q.answers.push({"name":"The World God Only Knows","rarity":55,"aliases":[]});
 q.answers.push({"name":"Yuyushiki","rarity":55,"aliases":[]});
}
{
 const q=questions.find(x=>x.id==="timed-v4-descent-8-sibling");if(!q)throw Error("Missing November 27 question timed-v4-descent-8-sibling");
 q.answers.push({"name":"Akiteru Tsukishima","rarity":30,"aliases":[]});
 q.answers.push({"name":"Aqua Hoshino","rarity":30,"aliases":[]});
 q.answers.push({"name":"Ayame Sohma","rarity":30,"aliases":[]});
 q.answers.push({"name":"Emma Sano","rarity":30,"aliases":[]});
 q.answers.push({"name":"Eren Yeager","rarity":30,"aliases":[]});
 q.answers.push({"name":"Futari Gotoh","rarity":30,"aliases":[]});
 q.answers.push({"name":"Hanabi Hyuga","rarity":30,"aliases":[]});
 q.answers.push({"name":"Hikaru Hitachiin","rarity":30,"aliases":[]});
 q.answers.push({"name":"Hinata Hyuga","rarity":30,"aliases":[]});
 q.answers.push({"name":"Hitori Gotoh","rarity":30,"aliases":[]});
 q.answers.push({"name":"Ichiji Vinsmoke","rarity":30,"aliases":[]});
 q.answers.push({"name":"Itachi Uchiha","rarity":30,"aliases":[]});
 q.answers.push({"name":"Kaoru Hitachiin","rarity":30,"aliases":[]});
 q.answers.push({"name":"Kei Tsukishima","rarity":30,"aliases":[]});
 q.answers.push({"name":"Komekko","rarity":30,"aliases":[]});
 q.answers.push({"name":"Kusuo Saiki","rarity":30,"aliases":[]});
 q.answers.push({"name":"Kyojuro Rengoku","rarity":30,"aliases":[]});
 q.answers.push({"name":"Manjiro Sano","rarity":30,"aliases":[]});
 q.answers.push({"name":"Megumin","rarity":30,"aliases":[]});
 q.answers.push({"name":"Meliodas","rarity":30,"aliases":[]});
 q.answers.push({"name":"Miwa Kageyama","rarity":30,"aliases":[]});
 q.answers.push({"name":"Muichiro Tokito","rarity":30,"aliases":[]});
 q.answers.push({"name":"Natsu Hinata","rarity":30,"aliases":[]});
 q.answers.push({"name":"Niji Vinsmoke","rarity":30,"aliases":[]});
 q.answers.push({"name":"Nunnally Lamperouge","rarity":30,"aliases":[]});
 q.answers.push({"name":"Reiju Vinsmoke","rarity":30,"aliases":[]});
 q.answers.push({"name":"Rudeus Greyrat","rarity":30,"aliases":[]});
 q.answers.push({"name":"Sae Itoshi","rarity":30,"aliases":[]});
 q.answers.push({"name":"Sakuta Azusagawa","rarity":30,"aliases":[]});
 q.answers.push({"name":"Sanji","rarity":30,"aliases":[]});
 q.answers.push({"name":"Schneizel el Britannia","rarity":30,"aliases":[]});
 q.answers.push({"name":"Senjuro Rengoku","rarity":30,"aliases":[]});
 q.answers.push({"name":"Shingo Tsukino","rarity":30,"aliases":[]});
 q.answers.push({"name":"Shinichiro Sano","rarity":30,"aliases":[]});
 q.answers.push({"name":"Shoto Todoroki","rarity":30,"aliases":[]});
 q.answers.push({"name":"Shoyo Hinata","rarity":30,"aliases":[]});
 q.answers.push({"name":"Sung Jinah","rarity":30,"aliases":[]});
 q.answers.push({"name":"Tobio Kageyama","rarity":30,"aliases":[]});
 q.answers.push({"name":"Toya Todoroki","rarity":30,"aliases":[]});
 q.answers.push({"name":"Usagi Tsukino","rarity":30,"aliases":[]});
 q.answers.push({"name":"Yonji Vinsmoke","rarity":30,"aliases":[]});
 q.answers.push({"name":"Yor Forger","rarity":30,"aliases":[]});
 q.answers.push({"name":"Yuichiro Tokito","rarity":30,"aliases":[]});
 q.answers.push({"name":"Yuki Sohma","rarity":30,"aliases":[]});
 q.answers.push({"name":"Zeke Yeager","rarity":30,"aliases":[]});
 q.answers.push({"name":"Zeldris","rarity":30,"aliases":[]});
}
{
 const q=questions.find(x=>x.id==="timed-v4-descent-8-wings");if(!q)throw Error("Missing November 27 question timed-v4-descent-8-wings");
 {const a=q.answers.find(x=>x.name==="Yorunozuku");if(!a)throw Error("Missing canonical answer Yorunozuku");a.aliases=a.aliases||[];
  a.aliases.push("Noctowl");
 }
 q.answers.push({"name":"Angel Devil","rarity":30,"aliases":[]});
 q.answers.push({"name":"Asta","rarity":30,"aliases":[]});
 q.answers.push({"name":"King","rarity":30,"aliases":[]});
 q.answers.push({"name":"Marco","rarity":30,"aliases":[]});
 q.answers.push({"name":"Milim Nava","rarity":30,"aliases":[]});
 q.answers.push({"name":"Rimuru Tempest","rarity":30,"aliases":[]});
 q.answers.push({"name":"Ryuk","rarity":30,"aliases":[]});
 q.answers.push({"name":"Acnologia","rarity":55,"aliases":[]});
 q.answers.push({"name":"Aerodactyl","rarity":55,"aliases":[]});
 q.answers.push({"name":"Aisa","rarity":55,"aliases":[]});
 q.answers.push({"name":"Akeno Himejima","rarity":55,"aliases":[]});
 q.answers.push({"name":"Altaria","rarity":55,"aliases":[]});
 q.answers.push({"name":"Archen","rarity":55,"aliases":[]});
 q.answers.push({"name":"Archeops","rarity":55,"aliases":[]});
 q.answers.push({"name":"Articuno","rarity":55,"aliases":[]});
 q.answers.push({"name":"Asia Argento","rarity":55,"aliases":[]});
 q.answers.push({"name":"Azazel","rarity":55,"aliases":[]});
 q.answers.push({"name":"Beautifly","rarity":55,"aliases":[]});
 q.answers.push({"name":"Beedrill","rarity":55,"aliases":[]});
 q.answers.push({"name":"Bombirdier","rarity":55,"aliases":[]});
 q.answers.push({"name":"Braham","rarity":55,"aliases":[]});
 q.answers.push({"name":"Braviary","rarity":55,"aliases":[]});
 q.answers.push({"name":"Carla","rarity":55,"aliases":[]});
 q.answers.push({"name":"Chatot","rarity":55,"aliases":[]});
 q.answers.push({"name":"Conis","rarity":55,"aliases":[]});
 q.answers.push({"name":"Corviknight","rarity":55,"aliases":[]});
 q.answers.push({"name":"Corvisquire","rarity":55,"aliases":[]});
 q.answers.push({"name":"Cramorant","rarity":55,"aliases":[]});
 q.answers.push({"name":"Dartrix","rarity":55,"aliases":[]});
 q.answers.push({"name":"Decidueye","rarity":55,"aliases":[]});
 q.answers.push({"name":"Delibird","rarity":55,"aliases":[]});
 q.answers.push({"name":"Demiurge","rarity":55,"aliases":[]});
 q.answers.push({"name":"Ducklett","rarity":55,"aliases":[]});
 q.answers.push({"name":"Dustox","rarity":55,"aliases":[]});
 q.answers.push({"name":"Elaine","rarity":55,"aliases":[]});
 q.answers.push({"name":"Elizabeth Liones","rarity":55,"aliases":[]});
 q.answers.push({"name":"Falco Grice","rarity":55,"aliases":[]});
 q.answers.push({"name":"Farfetch'd","rarity":55,"aliases":[]});
 q.answers.push({"name":"Fearow","rarity":55,"aliases":[]});
 q.answers.push({"name":"Fezandipiti","rarity":55,"aliases":[]});
 q.answers.push({"name":"Filo","rarity":55,"aliases":[]});
 q.answers.push({"name":"Fitoria","rarity":55,"aliases":[]});
 q.answers.push({"name":"Flamigo","rarity":55,"aliases":[]});
 q.answers.push({"name":"Flapple","rarity":55,"aliases":[]});
 q.answers.push({"name":"Fletchinder","rarity":55,"aliases":[]});
 q.answers.push({"name":"Fletchling","rarity":55,"aliases":[]});
 q.answers.push({"name":"Flygon","rarity":55,"aliases":[]});
 q.answers.push({"name":"Frosmoth","rarity":55,"aliases":[]});
 q.answers.push({"name":"Fumikage Tokoyami","rarity":55,"aliases":[]});
 q.answers.push({"name":"Gabriel","rarity":55,"aliases":[]});
 q.answers.push({"name":"Gabriel Tenma White","rarity":55,"aliases":[]});
 q.answers.push({"name":"Gedatsu","rarity":55,"aliases":[]});
 q.answers.push({"name":"Gelus","rarity":55,"aliases":[]});
 q.answers.push({"name":"Genbo","rarity":55,"aliases":[]});
 q.answers.push({"name":"Gerheade","rarity":55,"aliases":[]});
 q.answers.push({"name":"Gligar","rarity":55,"aliases":[]});
 q.answers.push({"name":"Gliscor","rarity":55,"aliases":[]});
 q.answers.push({"name":"Gloxinia","rarity":55,"aliases":[]});
 q.answers.push({"name":"Golbat","rarity":55,"aliases":[]});
 q.answers.push({"name":"Grandeeney","rarity":55,"aliases":[]});
 q.answers.push({"name":"Hikari","rarity":55,"aliases":[]});
 q.answers.push({"name":"Ho-Oh","rarity":55,"aliases":[]});
 q.answers.push({"name":"Honchkrow","rarity":55,"aliases":[]});
 q.answers.push({"name":"Hoothoot","rarity":55,"aliases":[]});
 q.answers.push({"name":"Igneel","rarity":55,"aliases":[]});
 q.answers.push({"name":"Iron Moth","rarity":55,"aliases":[]});
 q.answers.push({"name":"Issei Hyoudou","rarity":55,"aliases":[]});
 q.answers.push({"name":"Jibril","rarity":55,"aliases":[]});
 q.answers.push({"name":"Kalgara","rarity":55,"aliases":[]});
 q.answers.push({"name":"Kamakiri","rarity":55,"aliases":[]});
 q.answers.push({"name":"Kana","rarity":55,"aliases":[]});
 q.answers.push({"name":"Kanade Tachibana","rarity":55,"aliases":[]});
 q.answers.push({"name":"Kilowattrel","rarity":55,"aliases":[]});
 q.answers.push({"name":"Kleavor","rarity":55,"aliases":[]});
 q.answers.push({"name":"Koneko Toujou","rarity":55,"aliases":[]});
 q.answers.push({"name":"Kricketune","rarity":55,"aliases":[]});
 q.answers.push({"name":"Kuroka","rarity":55,"aliases":[]});
 q.answers.push({"name":"Kuu","rarity":55,"aliases":[]});
 q.answers.push({"name":"Lafitte","rarity":55,"aliases":[]});
 q.answers.push({"name":"Latias","rarity":55,"aliases":[]});
 q.answers.push({"name":"Latios","rarity":55,"aliases":[]});
 q.answers.push({"name":"Ledian","rarity":55,"aliases":[]});
 q.answers.push({"name":"Ledyba","rarity":55,"aliases":[]});
 q.answers.push({"name":"Liebe","rarity":55,"aliases":[]});
 q.answers.push({"name":"Ludociel","rarity":55,"aliases":[]});
 q.answers.push({"name":"Lugia","rarity":55,"aliases":[]});
 q.answers.push({"name":"Lunala","rarity":55,"aliases":[]});
 q.answers.push({"name":"Mael","rarity":55,"aliases":[]});
 q.answers.push({"name":"Mandibuzz","rarity":55,"aliases":[]});
 q.answers.push({"name":"Mantine","rarity":55,"aliases":[]});
 q.answers.push({"name":"Mantyke","rarity":55,"aliases":[]});
 q.answers.push({"name":"Masquerain","rarity":55,"aliases":[]});
 q.answers.push({"name":"McKinley","rarity":55,"aliases":[]});
 q.answers.push({"name":"Meruem","rarity":55,"aliases":[]});
 q.answers.push({"name":"Metalicana","rarity":55,"aliases":[]});
 q.answers.push({"name":"Michael","rarity":55,"aliases":[]});
 q.answers.push({"name":"Midori","rarity":55,"aliases":[]});
 q.answers.push({"name":"Mirajane Strauss","rarity":55,"aliases":[]});
 q.answers.push({"name":"Moltres","rarity":55,"aliases":[]});
 q.answers.push({"name":"Monet","rarity":55,"aliases":[]});
 q.answers.push({"name":"Mothim","rarity":55,"aliases":[]});
 q.answers.push({"name":"Murkrow","rarity":55,"aliases":[]});
 q.answers.push({"name":"Naganadel","rarity":55,"aliases":[]});
 q.answers.push({"name":"Natu","rarity":55,"aliases":[]});
 q.answers.push({"name":"Nemu","rarity":55,"aliases":[]});
 q.answers.push({"name":"Ninjask","rarity":55,"aliases":[]});
 q.answers.push({"name":"Noibat","rarity":55,"aliases":[]});
 q.answers.push({"name":"Noivern","rarity":55,"aliases":[]});
 q.answers.push({"name":"Ohm","rarity":55,"aliases":[]});
 q.answers.push({"name":"Orbeetle","rarity":55,"aliases":[]});
 q.answers.push({"name":"Oricorio","rarity":55,"aliases":[]});
 q.answers.push({"name":"Pagaya","rarity":55,"aliases":[]});
 q.answers.push({"name":"Panther Lily","rarity":55,"aliases":[]});
 q.answers.push({"name":"Pelipper","rarity":55,"aliases":[]});
 q.answers.push({"name":"Pell","rarity":55,"aliases":[]});
 q.answers.push({"name":"Pidgeot","rarity":55,"aliases":[]});
 q.answers.push({"name":"Pidgeotto","rarity":55,"aliases":[]});
 q.answers.push({"name":"Pidgey","rarity":55,"aliases":[]});
 q.answers.push({"name":"Pidove","rarity":55,"aliases":[]});
 q.answers.push({"name":"Pikipek","rarity":55,"aliases":[]});
 q.answers.push({"name":"Pinsir","rarity":55,"aliases":[]});
 q.answers.push({"name":"Raki","rarity":55,"aliases":[]});
 q.answers.push({"name":"Rakka","rarity":55,"aliases":[]});
 q.answers.push({"name":"Raphiel Ainsworth Shiraha","rarity":55,"aliases":[]});
 q.answers.push({"name":"Ravel Phenex","rarity":55,"aliases":[]});
 q.answers.push({"name":"Raynare","rarity":55,"aliases":[]});
 q.answers.push({"name":"Reki","rarity":55,"aliases":[]});
 q.answers.push({"name":"Rem","rarity":55,"aliases":[]});
 q.answers.push({"name":"Reshiram","rarity":55,"aliases":[]});
 q.answers.push({"name":"Rias Gremory","rarity":55,"aliases":[]});
 q.answers.push({"name":"Ribombee","rarity":55,"aliases":[]});
 q.answers.push({"name":"Riser Phenex","rarity":55,"aliases":[]});
 q.answers.push({"name":"Rookidee","rarity":55,"aliases":[]});
 q.answers.push({"name":"Rowlet","rarity":55,"aliases":[]});
 q.answers.push({"name":"Rufflet","rarity":55,"aliases":[]});
 q.answers.push({"name":"Ryukyu","rarity":55,"aliases":[]});
 q.answers.push({"name":"Sariel","rarity":55,"aliases":[]});
 q.answers.push({"name":"Sasuke Uchiha","rarity":55,"aliases":[]});
 q.answers.push({"name":"Satanichia McDowell Kurumizawa","rarity":55,"aliases":[]});
 q.answers.push({"name":"Satori","rarity":55,"aliases":[]});
 q.answers.push({"name":"Scizor","rarity":55,"aliases":[]});
 q.answers.push({"name":"Scyther","rarity":55,"aliases":[]});
 q.answers.push({"name":"Secre Swallowtail","rarity":55,"aliases":[]});
 q.answers.push({"name":"Shalltear Bloodfallen","rarity":55,"aliases":[]});
 q.answers.push({"name":"Shura","rarity":55,"aliases":[]});
 q.answers.push({"name":"Sidoh","rarity":55,"aliases":[]});
 q.answers.push({"name":"Sigilyph","rarity":55,"aliases":[]});
 q.answers.push({"name":"Sirfetch'd","rarity":55,"aliases":[]});
 q.answers.push({"name":"Sirzechs Lucifer","rarity":55,"aliases":[]});
 q.answers.push({"name":"Skarmory","rarity":55,"aliases":[]});
 q.answers.push({"name":"Sona Sitri","rarity":55,"aliases":[]});
 q.answers.push({"name":"Spearow","rarity":55,"aliases":[]});
 q.answers.push({"name":"Squawkabilly","rarity":55,"aliases":[]});
 q.answers.push({"name":"Staraptor","rarity":55,"aliases":[]});
 q.answers.push({"name":"Staravia","rarity":55,"aliases":[]});
 q.answers.push({"name":"Starly","rarity":55,"aliases":[]});
 q.answers.push({"name":"Swablu","rarity":55,"aliases":[]});
 q.answers.push({"name":"Swanna","rarity":55,"aliases":[]});
 q.answers.push({"name":"Swellow","rarity":55,"aliases":[]});
 q.answers.push({"name":"Swoobat","rarity":55,"aliases":[]});
 q.answers.push({"name":"Taillow","rarity":55,"aliases":[]});
 q.answers.push({"name":"Talonflame","rarity":55,"aliases":[]});
 q.answers.push({"name":"Tamaki Amajiki","rarity":55,"aliases":[]});
 q.answers.push({"name":"Tarmiel","rarity":55,"aliases":[]});
 q.answers.push({"name":"Togekiss","rarity":55,"aliases":[]});
 q.answers.push({"name":"Toucannon","rarity":55,"aliases":[]});
 q.answers.push({"name":"Tranquill","rarity":55,"aliases":[]});
 q.answers.push({"name":"Trumbeak","rarity":55,"aliases":[]});
 q.answers.push({"name":"Unfezant","rarity":55,"aliases":[]});
 q.answers.push({"name":"Urogi","rarity":55,"aliases":[]});
 q.answers.push({"name":"Vali Lucifer","rarity":55,"aliases":[]});
 q.answers.push({"name":"Veldora Tempest","rarity":55,"aliases":[]});
 q.answers.push({"name":"Venomoth","rarity":55,"aliases":[]});
 q.answers.push({"name":"Vespiquen","rarity":55,"aliases":[]});
 q.answers.push({"name":"Vibrava","rarity":55,"aliases":[]});
 q.answers.push({"name":"Vignette April Tsukinose","rarity":55,"aliases":[]});
 q.answers.push({"name":"Vivillon","rarity":55,"aliases":[]});
 q.answers.push({"name":"Volcarona","rarity":55,"aliases":[]});
 q.answers.push({"name":"Vullaby","rarity":55,"aliases":[]});
 q.answers.push({"name":"Wattrel","rarity":55,"aliases":[]});
 q.answers.push({"name":"Wingull","rarity":55,"aliases":[]});
 q.answers.push({"name":"Woobat","rarity":55,"aliases":[]});
 q.answers.push({"name":"Wyper","rarity":55,"aliases":[]});
 q.answers.push({"name":"Xatu","rarity":55,"aliases":[]});
 q.answers.push({"name":"Xenovia Quarta","rarity":55,"aliases":[]});
 q.answers.push({"name":"Yama","rarity":55,"aliases":[]});
 q.answers.push({"name":"Yanma","rarity":55,"aliases":[]});
 q.answers.push({"name":"Yanmega","rarity":55,"aliases":[]});
 q.answers.push({"name":"Yuno Grinberryall","rarity":55,"aliases":[]});
 q.answers.push({"name":"Yuuto Kiba","rarity":55,"aliases":[]});
 q.answers.push({"name":"Yveltal","rarity":55,"aliases":[]});
 q.answers.push({"name":"Zapdos","rarity":55,"aliases":[]});
 q.answers.push({"name":"Zubat","rarity":55,"aliases":[]});
}
// END NOV27 APPROVED CSV EXPANSION
// Own review of Descent #8 (Nov 27 2026), done the day before release: clearer hints, obvious answers players will reach for,
// and short franchise names for title answers that were only listed season by season. Source scores (low = common);
// D.bank flips them. Top Answers are unchanged.
{
 const key27=v=>String(v).normalize('NFKD').replace(/[̀-ͯ]/g,'').toLowerCase().replace(/[^a-z0-9]/g,'');
 const d27=(name,rarity,...aliases)=>({name,rarity,aliases});
 const Q27=id=>{const q=questions.find(x=>x.id==='timed-v4-descent-8-'+id);if(!q)throw Error('Unknown Nov 27 Descent question: '+id);return q;};
 const NOTES27={headband:'Headbands, hairbands and ninja forehead protectors',sibling:'A brother or sister, including half- and step-siblings',school:'Most of the story takes place at a school',
  wings:'Natural wings, or wings from a power or transformation',fly:'Flying by their own power, magic or technique',games:'Games, sports or other competitions drive the story',parent:'Has a child, by birth or adoption'};
 for(const [id,note] of Object.entries(NOTES27))Q27(id).note=note;
 Q27('games').text='Name any anime built around games or competitions.';
 const ALIAS27={
  sibling:{"Maki Zenin":["Maki"],"Ayato Kirishima":["Ayato"],"Yotsuba Nakano":["Yotsuba"]},
  school:{"Kaguya-sama: Love is War":["Kaguya-sama","Kaguya sama"],"The Melancholy of Haruhi Suzumiya":["Haruhi","Haruhi Suzumiya"],"Love Live! School Idol Project":["Love Live"],
   "DON'T TOY WITH ME, MISS NAGATORO":["Nagatoro","Miss Nagatoro"]},
  parent:{"Minato Namikaze":["Minato"],"Sasuke Uchiha":["Sasuke"],"Sakura Haruno":["Sakura"]}};
 const MORE27={
  headband:[d27("Haruhi Suzumiya",30,"Haruhi"),d27("Usopp",30,"Sogeking"),d27("Ryu",50)],
  sibling:[d27("Killua Zoldyck",10,"Killua"),d27("Ichigo Kurosaki",10,"Ichigo"),d27("Son Goku",10,"Goku","Kakarot"),d27("Son Gohan",15,"Gohan"),d27("Rukia Kuchiki",15,"Rukia"),
   d27("Kirito",15,"Kazuto Kirigaya"),d27("Rin Okumura",15,"Rin"),d27("Shinobu Kocho",15,"Shinobu","Shinobu Kochou"),d27("Shigeo Kageyama",15,"Mob"),
   d27("Megumi Fushiguro",20,"Megumi"),d27("Trunks",20),d27("Yukio Okumura",20,"Yukio"),d27("Zeref Dragneel",20,"Zeref"),d27("Dabi",20,"Toya Todoroki"),
   d27("Yuji Itadori",25,"Yuji","Itadori"),d27("Choso",25),d27("Light Yagami",25,"Light"),d27("Vegeta",25),d27("Byakuya Kuchiki",25,"Byakuya"),d27("Boa Hancock",25,"Hancock"),
   d27("Historia Reiss",40,"Historia","Krista Lenz")],
  school:[d27("The Disastrous Life of Saiki K.",15,"Saiki K","Saiki Kusuo no Psi Nan"),d27("Jujutsu Kaisen",20,"JJK"),d27("Teasing Master Takagi-san",20,"Takagi-san","Karakai Jouzu no Takagi-san"),
   d27("Blue Exorcist",25,"Ao no Exorcist"),d27("Your Lie in April",30,"Shigatsu wa Kimi no Uso"),d27("My Teen Romantic Comedy SNAFU",30,"Oregairu","SNAFU"),
   d27("Rascal Does Not Dream of Bunny Girl Senpai",30,"Bunny Girl Senpai"),d27("Angel Beats!",30,"Angel Beats"),d27("High School DxD",30,"Highschool DxD"),
   d27("Beelzebub",50),d27("Shikimori's Not Just a Cutie",50,"Shikimori")],
  wings:[d27("Tohru",25),d27("Madoka Kaname",30,"Madoka"),d27("Cell",30),d27("Homura Akemi",35,"Homura"),d27("Sosuke Aizen",35,"Aizen"),d27("Kirito",35,"Kazuto Kirigaya"),
   d27("Leafa",40,"Suguha Kirigaya"),d27("Asuna",40,"Asuna Yuuki"),d27("Sebastian Michaelis",40,"Sebastian"),d27("Nico Robin",45,"Robin"),d27("Ikaros",45),
   d27("Belldandy",50),d27("Nymph",55)],
  fly:[d27("Shigeo Kageyama",25,"Mob"),d27("Deidara",30),d27("Gaara",30),d27("Howl",30,"Howl Pendragon"),d27("Tohru",30),d27("Izuku Midoriya",30,"Deku","Izuku"),
   d27("Ochaco Uraraka",35,"Uraraka","Ochaco"),d27("Sesshomaru",35),d27("Haku",35,"Kohaku River"),d27("Kirito",40,"Kazuto Kirigaya"),d27("Leafa",40,"Suguha Kirigaya"),
   d27("Nausicaä",40,"Nausicaa"),d27("Kagura",45),d27("Shiki",45,"Golden Lion"),d27("Sosuke Aizen",45,"Aizen"),d27("Ulquiorra Cifer",45,"Ulquiorra"),d27("Angel Devil",50)],
  games:[d27("Pokémon",10,"Pokemon"),d27("Kaiji",20,"Gyakkyou Burai Kaiji"),d27("Food Wars!",25,"Food Wars","Shokugeki no Soma"),d27("Slam Dunk",25),d27("Hajime no Ippo",25,"Fighting Spirit"),
   d27("Initial D",30),d27("March Comes in Like a Lion",30,"3-gatsu no Lion"),d27("Death Parade",30),d27("The Prince of Tennis",30,"Prince of Tennis"),d27("Chihayafuru",30),
   d27("Captain Tsubasa",30),d27("Bakugan Battle Brawlers",35,"Bakugan"),d27("Baki",35,"Baki the Grappler","Grappler Baki"),d27("Yowamushi Pedal",35),
   d27("Uma Musume: Pretty Derby",35,"Uma Musume","Umamusume"),d27("Overlord",40),d27("Hunter x Hunter",40,"HxH","Greed Island"),d27("Gantz",40),d27("Kengan Ashura",40),
   d27("The Gamers!",50,"Gamers!"),d27("Love Live! School Idol Project",40,"Love Live"),d27("Saki",50)],
  parent:[d27("Gol D. Roger",15,"Roger","Gold Roger"),d27("Charlotte Linlin",20,"Big Mom"),d27("Gendo Ikari",20,"Gendo"),d27("Monkey D. Dragon",25,"Dragon"),
   d27("Inko Midoriya",25,"Inko"),d27("Whitebeard",30,"Edward Newgate"),d27("Bell-mère",30,"Bellemere","Bellmere"),d27("Soichiro Yagami",30,"Soichiro"),d27("Krillin",30),
   d27("Android 18",30,"Lazuli"),d27("Mr. Satan",30,"Hercule"),d27("Mitsuki Bakugo",35,"Mitsuki"),d27("Silva Zoldyck",35,"Silva"),d27("King Vegeta",40),d27("Ox-King",40,"Gyumao"),
   d27("Yui Ikari",40),d27("Rudeus Greyrat",40,"Rudeus"),d27("Shanks",40),d27("Kikyo Zoldyck",45),d27("Gine",45),d27("Ryuken Ishida",45,"Ryuken"),
   d27("Ken Kaneki",45,"Kaneki"),d27("Touka Kirishima",45,"Touka")],
 };
 for(const [id,map] of Object.entries(ALIAS27)){const q=Q27(id);const seen=new Set(q.answers.flatMap(y=>[y.name,...(y.aliases||[])]).map(key27));
  for(const [n,als] of Object.entries(map)){const x=q.answers.find(y=>y.name===n);if(!x)throw Error('Missing '+n+' in '+id);for(const al of als){if(seen.has(key27(al)))continue;seen.add(key27(al));x.aliases=[...(x.aliases||[]),al];}}}
 for(const [id,extra] of Object.entries(MORE27)){const q=Q27(id);const seen=new Set(q.answers.flatMap(y=>[y.name,...(y.aliases||[])]).map(key27));
  for(const e of extra){const same=q.answers.find(y=>key27(y.name)===key27(e.name));if(same){for(const al of e.aliases)if(!seen.has(key27(al))){seen.add(key27(al));same.aliases=[...(same.aliases||[]),al];}continue;}const keep=[];for(const f of [e.name,...e.aliases])if(!seen.has(key27(f))){seen.add(key27(f));keep.push(f);}q.answers.push({name:e.name,rarity:e.rarity,aliases:keep.slice(1)});}}
}
// November 28 Descent #9: imported from the submitted CSV (anime_descent_nov28_2026_expanded_v3.csv); duplicates merged.
// Source scores as submitted (low = common); D.bank flips them.
questions.push(...[
 {"id":"timed-v4-descent-9-hats","anime":"mixed","category":"Any anime","text":"Name any anime character who wears a hat or cap.","note":"A hat or cap they are known for wearing","since":"2026-11-28","descent":"char","conceptId":"nov28-hats","top":"Monkey D. Luffy","answers":[{"name":"A","rarity":55,"aliases":["A (Fourth Raikage)"]},{"name":"Akiko Ogasawara","rarity":80,"aliases":[]},{"name":"Akio Nitta","rarity":80,"aliases":[]},{"name":"Akira Nagao","rarity":80,"aliases":[]},{"name":"Akira Nishina","rarity":80,"aliases":[]},{"name":"Alucard","rarity":82,"aliases":[]},{"name":"Alvida","rarity":55,"aliases":[]},{"name":"Anita Kabashima","rarity":80,"aliases":[]},{"name":"Anna Sasaki","rarity":80,"aliases":[]},{"name":"Anya Forger","rarity":80,"aliases":[]},{"name":"Aoba Tsukishima","rarity":80,"aliases":[]},{"name":"Arachne Gorgon","rarity":80,"aliases":[]},{"name":"Arrietty","rarity":80,"aliases":[]},{"name":"Ashitaka","rarity":80,"aliases":[]},{"name":"Ash Ketchum","rarity":10,"aliases":["Satoshi"]},{"name":"Ayato Naoi","rarity":55,"aliases":[]},{"name":"Azusa Hanai","rarity":80,"aliases":[]},{"name":"Basil Hawkins","rarity":55,"aliases":[]},{"name":"Benn Beckman","rarity":55,"aliases":[]},{"name":"Bentham","rarity":55,"aliases":[]},{"name":"Bepo","rarity":55,"aliases":[]},{"name":"Best Jeanist","rarity":80,"aliases":[]},{"name":"Bickslow","rarity":80,"aliases":[]},{"name":"Biscuit Krueger","rarity":80,"aliases":[]},{"name":"Blackbeard","rarity":55,"aliases":[]},{"name":"Blair","rarity":80,"aliases":["Blair (Soul Eater)"]},{"name":"Bonney Jewelry","rarity":30,"aliases":["Jewelry Bonney"]},{"name":"Bonnie","rarity":80,"aliases":["Bonnie (Pokémon)"]},{"name":"Borsalino","rarity":55,"aliases":["Borsalino (Kizaru)"]},{"name":"Brendan","rarity":80,"aliases":["Brendan (Pokémon)"]},{"name":"Brook","rarity":30,"aliases":[]},{"name":"Buggy","rarity":48,"aliases":[]},{"name":"Bulma","rarity":48,"aliases":[]},{"name":"Byakuran","rarity":80,"aliases":[]},{"name":"Caesar Anthonio Zeppeli","rarity":55,"aliases":[]},{"name":"Cameron","rarity":80,"aliases":["Cameron (Pokémon)"]},{"name":"Capone Bege","rarity":48,"aliases":[]},{"name":"Carlos Toshiki Kamiya","rarity":80,"aliases":[]},{"name":"Carrot","rarity":55,"aliases":["Carrot (One Piece)"]},{"name":"Cavendish","rarity":48,"aliases":[]},{"name":"Cementoss","rarity":80,"aliases":[]},{"name":"Charlotte Brulee","rarity":55,"aliases":[]},{"name":"Charlotte Cracker","rarity":55,"aliases":[]},{"name":"Charlotte Daifuku","rarity":55,"aliases":[]},{"name":"Charlotte Linlin","rarity":48,"aliases":["Big Mom"]},{"name":"Charlotte Oven","rarity":55,"aliases":[]},{"name":"Charlotte Perospero","rarity":55,"aliases":[]},{"name":"Charlotte Pudding","rarity":55,"aliases":[]},{"name":"Charlotte Smoothie","rarity":55,"aliases":[]},{"name":"Chisato Fujii","rarity":80,"aliases":[]},{"name":"Chloe Cerise","rarity":80,"aliases":[]},{"name":"Chuuya Nakahara","rarity":55,"aliases":[]},{"name":"Clemont","rarity":80,"aliases":[]},{"name":"Colonello","rarity":80,"aliases":[]},{"name":"Crocus","rarity":55,"aliases":[]},{"name":"Cynthia","rarity":80,"aliases":["Cynthia (Pokémon)"]},{"name":"Daigo Shigeno","rarity":80,"aliases":[]},{"name":"Dawn","rarity":65,"aliases":["Hikari"]},{"name":"Death the Kid","rarity":80,"aliases":[]},{"name":"Deidara","rarity":30,"aliases":[]},{"name":"Denjiro","rarity":55,"aliases":[]},{"name":"Dennis Johnson","rarity":80,"aliases":["Dennis Johnson (One Outs)"]},{"name":"Doc Q","rarity":55,"aliases":[]},{"name":"Dola","rarity":80,"aliases":["Dola (Castle in the Sky)"]},{"name":"Don Kanonji","rarity":62,"aliases":[]},{"name":"Don Krieg","rarity":55,"aliases":[]},{"name":"Doppio Vinegar","rarity":80,"aliases":[]},{"name":"Dot","rarity":80,"aliases":["Dot (Pokémon Horizons)"]},{"name":"Dracule Mihawk","rarity":30,"aliases":["Mihawk"]},{"name":"Dr. Hiriluk","rarity":55,"aliases":[]},{"name":"Edgeshot","rarity":80,"aliases":[]},{"name":"Eijun Sawamura","rarity":80,"aliases":[]},{"name":"Elizabeth Thompson","rarity":55,"aliases":[]},{"name":"Emperor Pilaf","rarity":48,"aliases":["Pilaf"]},{"name":"Emporio Alnino","rarity":65,"aliases":[]},{"name":"Enrico Pucci","rarity":80,"aliases":[]},{"name":"Eruka Frog","rarity":80,"aliases":[]},{"name":"Esidisi","rarity":80,"aliases":[]},{"name":"Excalibur","rarity":55,"aliases":["Excalibur (Soul Eater)"]},{"name":"Fat Gum","rarity":80,"aliases":[]},{"name":"Feitan Portor","rarity":80,"aliases":[]},{"name":"Finnian","rarity":55,"aliases":[]},{"name":"Fiona Frost","rarity":80,"aliases":[]},{"name":"Fio Piccolo","rarity":80,"aliases":[]},{"name":"Fon","rarity":80,"aliases":[]},{"name":"Foxy","rarity":55,"aliases":[]},{"name":"Fran","rarity":80,"aliases":["Fran (Katekyo Hitman Reborn)"]},{"name":"Franky Franklin","rarity":80,"aliases":[]},{"name":"Free","rarity":80,"aliases":["Free (Soul Eater)"]},{"name":"Friede","rarity":65,"aliases":[]},{"name":"Fumiki Mizutani","rarity":80,"aliases":[]},{"name":"Fyodor Dostoevsky","rarity":55,"aliases":[]},{"name":"Gaara","rarity":65,"aliases":["Kazekage"]},{"name":"Gary Oak","rarity":80,"aliases":[]},{"name":"Gengetsu Hozuki","rarity":55,"aliases":["Gengetsu Hozuki (Mizukage)"]},{"name":"Genjirou Tanigaki","rarity":82,"aliases":[]},{"name":"Gentle Criminal","rarity":80,"aliases":[]},{"name":"Gina","rarity":80,"aliases":["Gina (Porco Rosso)"]},{"name":"Gin","rarity":55,"aliases":["Gin (Detective Conan)"]},{"name":"Ging Freecss","rarity":82,"aliases":[]},{"name":"Gladion","rarity":80,"aliases":["Gladion (Pokémon)"]},{"name":"Goh","rarity":80,"aliases":[]},{"name":"Gokudera Hayato","rarity":80,"aliases":[]},{"name":"Gol D. Roger","rarity":28,"aliases":[]},{"name":"Goro Shigeno","rarity":80,"aliases":[]},{"name":"Gou Nagakura","rarity":80,"aliases":[]},{"name":"Gran Torino","rarity":80,"aliases":[]},{"name":"Guido Mista","rarity":30,"aliases":[]},{"name":"Gyro Zeppeli","rarity":55,"aliases":[]},{"name":"Hanako-kun","rarity":55,"aliases":[]},{"name":"Happy","rarity":80,"aliases":["Happy (Fairy Tail)"]},{"name":"Harrison","rarity":80,"aliases":["Harrison (Pokémon)"]},{"name":"Haruichi Kominato","rarity":80,"aliases":[]},{"name":"Haruka Ooyama","rarity":80,"aliases":[]},{"name":"Haruna Motoki","rarity":80,"aliases":[]},{"name":"Hashirama Senju","rarity":65,"aliases":[]},{"name":"Heiji Hattori","rarity":55,"aliases":[]},{"name":"Henry Henderson","rarity":80,"aliases":[]},{"name":"Hidan","rarity":30,"aliases":[]},{"name":"Hideaki Tojo","rarity":80,"aliases":[]},{"name":"Hideki Shigeno","rarity":80,"aliases":[]},{"name":"Hideo Saionji","rarity":80,"aliases":[]},{"name":"Hikaru Sato","rarity":80,"aliases":[]},{"name":"Hikaru Yoshimoto","rarity":80,"aliases":[]},{"name":"Hirofumi Asada","rarity":80,"aliases":[]},{"name":"Hiromichi Kojima","rarity":80,"aliases":[]},{"name":"Hiruzen Sarutobi","rarity":65,"aliases":["Third Hokage"]},{"name":"Hol Horse","rarity":55,"aliases":[]},{"name":"Hop","rarity":80,"aliases":["Hop (Pokémon)"]},{"name":"Howl Jenkins Pendragon","rarity":80,"aliases":[]},{"name":"Hyakunosuke Ogata","rarity":82,"aliases":[]},{"name":"Ichiya Vandalay Kotobuki","rarity":82,"aliases":[]},{"name":"Iris","rarity":80,"aliases":["Iris (Pokémon)"]},{"name":"Itachi Uchiha","rarity":55,"aliases":[]},{"name":"Itsuki Tadano","rarity":80,"aliases":[]},{"name":"Itsuki Takami","rarity":80,"aliases":[]},{"name":"Izumi Himuro","rarity":80,"aliases":[]},{"name":"Jack","rarity":55,"aliases":["Jack (One Piece)"]},{"name":"Jango","rarity":55,"aliases":[]},{"name":"Jean Bart","rarity":55,"aliases":[]},{"name":"Jesus Burgess","rarity":55,"aliases":[]},{"name":"Jimmy","rarity":80,"aliases":["Jimmy (Pokémon Chronicles)"]},{"name":"Jirokichi Suzuki","rarity":82,"aliases":[]},{"name":"Joe Gibson","rarity":80,"aliases":[]},{"name":"Joe Gibson Jr.","rarity":80,"aliases":[]},{"name":"Joseph Joestar","rarity":65,"aliases":[]},{"name":"Jotaro Kujo","rarity":30,"aliases":[]},{"name":"Julius Novachrono","rarity":82,"aliases":[]},{"name":"Jun Isashiki","rarity":80,"aliases":[]},{"name":"Juvia Lockser","rarity":82,"aliases":["Juvia Loxar"]},{"name":"Juzo Megure","rarity":55,"aliases":[]},{"name":"Kaito Kid","rarity":30,"aliases":["Kaitou Kid"]},{"name":"Kakashi","rarity":30,"aliases":["Kakashi (Hokage)","Kakashi Hatake"]},{"name":"Kakuzu","rarity":30,"aliases":[]},{"name":"Kamui Woods","rarity":80,"aliases":[]},{"name":"Kanako Mita","rarity":80,"aliases":[]},{"name":"Kanjuro","rarity":55,"aliases":[]},{"name":"Kaoru Shimizu","rarity":80,"aliases":[]},{"name":"Kaoru Yui","rarity":80,"aliases":[]},{"name":"Kazuma Mishima","rarity":80,"aliases":[]},{"name":"Kazuya Miyuki","rarity":80,"aliases":[]},{"name":"Kazuya Uesugi","rarity":80,"aliases":[]},{"name":"Kenji Miyazawa","rarity":55,"aliases":["Kenji Miyazawa (Bungo Stray Dogs)"]},{"name":"Kiawe","rarity":80,"aliases":["Kiawe (Pokémon)"]},{"name":"Kikunojo","rarity":55,"aliases":[]},{"name":"Kinemon","rarity":55,"aliases":[]},{"name":"King Bradley","rarity":82,"aliases":[]},{"name":"King","rarity":55,"aliases":["King (One Piece)"]},{"name":"Kisame Hoshigaki","rarity":55,"aliases":[]},{"name":"Kisuke Urahara","rarity":30,"aliases":["Urahara"]},{"name":"Kite","rarity":80,"aliases":["Kite (Hunter x Hunter)"]},{"name":"Knov","rarity":80,"aliases":[]},{"name":"Koby","rarity":55,"aliases":[]},{"name":"Koharu Hotta","rarity":80,"aliases":[]},{"name":"Koichiro Tanba","rarity":80,"aliases":[]},{"name":"Ko Kitamura","rarity":80,"aliases":[]},{"name":"Koma Nagasawa","rarity":80,"aliases":[]},{"name":"Konan","rarity":30,"aliases":[]},{"name":"Korn","rarity":55,"aliases":["Korn (Detective Conan)"]},{"name":"Koro-sensei","rarity":55,"aliases":[]},{"name":"Kosei Amahisa","rarity":80,"aliases":[]},{"name":"Koshu Okumura","rarity":80,"aliases":[]},{"name":"Koume Suzukawa","rarity":80,"aliases":[]},{"name":"Kousuke Izumi","rarity":80,"aliases":[]},{"name":"Koutarou Matsudaira","rarity":80,"aliases":[]},{"name":"Kozuki Oden","rarity":55,"aliases":[]},{"name":"Kureha","rarity":55,"aliases":[]},{"name":"Kuzan","rarity":55,"aliases":["Kuzan (Aokiji)"]},{"name":"Kyohei Nishihiro","rarity":80,"aliases":[]},{"name":"Kyouko Sakurami","rarity":80,"aliases":[]},{"name":"Lady Nagant","rarity":80,"aliases":[]},{"name":"Lafitte","rarity":55,"aliases":[]},{"name":"Lal Mirch","rarity":80,"aliases":[]},{"name":"Lana","rarity":80,"aliases":["Lana (Pokémon)"]},{"name":"Leon","rarity":65,"aliases":["Dande","Leon (Pokémon)"]},{"name":"Liko","rarity":80,"aliases":["Liko (Pokémon Horizons)"]},{"name":"Lillie","rarity":80,"aliases":["Lillie (Pokémon)"]},{"name":"Lin","rarity":80,"aliases":["Lin (Spirited Away)"]},{"name":"Lisa Lisa","rarity":80,"aliases":[]},{"name":"Loid Forger","rarity":65,"aliases":["Twilight"]},{"name":"Lucas","rarity":80,"aliases":["Lucas (Pokémon)"]},{"name":"Lucky Roux","rarity":55,"aliases":[]},{"name":"Lyra","rarity":80,"aliases":["Lyra (Pokémon)"]},{"name":"Maes Hughes","rarity":82,"aliases":[]},{"name":"Makarov Dreyar","rarity":82,"aliases":[]},{"name":"Mallow","rarity":80,"aliases":["Mallow (Pokémon)"]},{"name":"Mao Daidoji","rarity":80,"aliases":[]},{"name":"Marina","rarity":80,"aliases":["Marina (Pokémon Chronicles)"]},{"name":"Markl","rarity":80,"aliases":[]},{"name":"Marnie (Pokémon)","rarity":80,"aliases":["Marnie"]},{"name":"Marnie (When Marnie Was There)","rarity":80,"aliases":[]},{"name":"Masatoshi Harada","rarity":80,"aliases":[]},{"name":"Master Roshi","rarity":48,"aliases":["Kame Sennin"]},{"name":"Masumi Sera","rarity":55,"aliases":[]},{"name":"May","rarity":65,"aliases":["Haruka"]},{"name":"Mayuri Kurotsuchi","rarity":48,"aliases":[]},{"name":"Mayuri Shiina","rarity":55,"aliases":[]},{"name":"Medusa Gorgon","rarity":80,"aliases":[]},{"name":"Megumin","rarity":30,"aliases":[]},{"name":"Mei Narumiya","rarity":80,"aliases":[]},{"name":"Mephisto Pheles","rarity":55,"aliases":[]},{"name":"Mest Gryder","rarity":80,"aliases":[]},{"name":"Michiru Mayumura","rarity":80,"aliases":[]},{"name":"Minato Namikaze","rarity":65,"aliases":["Fourth Hokage"]},{"name":"Mizugaki Shunji","rarity":80,"aliases":[]},{"name":"Momiji Tsukishima","rarity":80,"aliases":[]},{"name":"Monkey D. Garp","rarity":55,"aliases":[]},{"name":"Monkey D. Luffy","rarity":0,"aliases":["Luffy"]},{"name":"Morel Mackernasey","rarity":80,"aliases":[]},{"name":"Morrison","rarity":80,"aliases":["Morrison (Pokémon)"]},{"name":"Mr. 2 Bon Clay","rarity":55,"aliases":[]},{"name":"Mr. 3","rarity":55,"aliases":["Mr. 3 (Galdino)"]},{"name":"Mr. Compress","rarity":80,"aliases":[]},{"name":"Mutsuko Sakura","rarity":80,"aliases":[]},{"name":"Muzan Kibutsuji","rarity":48,"aliases":[]},{"name":"N","rarity":65,"aliases":["Natural Harmonia Gropius","N (Pokémon)"]},{"name":"Nakanishi","rarity":80,"aliases":["Nakanishi (Cross Game)"]},{"name":"Naruto Uzumaki","rarity":10,"aliases":["Seventh Hokage"]},{"name":"Nemona","rarity":80,"aliases":["Nemona (Pokémon)"]},{"name":"Nene Mori","rarity":80,"aliases":[]},{"name":"Nicholas D. Wolfwood","rarity":82,"aliases":[]},{"name":"Nico Robin","rarity":48,"aliases":[]},{"name":"Nikolai Gogol","rarity":55,"aliases":[]},{"name":"Norifumi Kawakami","rarity":80,"aliases":[]},{"name":"Olivier Mira Armstrong","rarity":82,"aliases":[]},{"name":"Onoki","rarity":30,"aliases":["Ohnoki","Onoki (Tsuchikage)"]},{"name":"Oolong","rarity":48,"aliases":[]},{"name":"Osono","rarity":80,"aliases":[]},{"name":"Otto Suwen","rarity":82,"aliases":[]},{"name":"Pain","rarity":30,"aliases":["Pain (Nagato)"]},{"name":"Patricia Thompson","rarity":55,"aliases":[]},{"name":"Pazu","rarity":80,"aliases":["Pazu (Castle in the Sky)"]},{"name":"Pedro","rarity":55,"aliases":["Pedro (One Piece)"]},{"name":"Pekoms","rarity":55,"aliases":[]},{"name":"Penguin","rarity":55,"aliases":["Penguin (One Piece)"]},{"name":"Perona","rarity":48,"aliases":[]},{"name":"Porco Rosso","rarity":80,"aliases":[]},{"name":"Portgas D. Ace","rarity":28,"aliases":["Ace"]},{"name":"Queen","rarity":55,"aliases":["Queen (One Piece)"]},{"name":"Raichi Todoroki","rarity":80,"aliases":[]},{"name":"Raihan","rarity":80,"aliases":["Raihan (Pokémon)"]},{"name":"Raizo","rarity":55,"aliases":[]},{"name":"Ranpo Edogawa","rarity":55,"aliases":[]},{"name":"Rasa","rarity":55,"aliases":[]},{"name":"Reborn","rarity":80,"aliases":[]},{"name":"Recovery Girl","rarity":80,"aliases":[]},{"name":"Red","rarity":65,"aliases":["Red (Pokémon Origins)"]},{"name":"Ren Mihashi","rarity":80,"aliases":[]},{"name":"Risotto Nero","rarity":55,"aliases":[]},{"name":"Ritchie","rarity":65,"aliases":["Hiroshi"]},{"name":"Robert E. O. Speedwagon","rarity":65,"aliases":["Speedwagon"]},{"name":"Roswaal L. Mathers","rarity":82,"aliases":[]},{"name":"Roy","rarity":65,"aliases":[]},{"name":"Roy Mustang","rarity":82,"aliases":[]},{"name":"Ryo Akai","rarity":80,"aliases":[]},{"name":"Ryo Hayakawa","rarity":80,"aliases":[]},{"name":"Ryohei Sasagawa","rarity":80,"aliases":[]},{"name":"Ryosuke Kominato","rarity":80,"aliases":[]},{"name":"Ryusui Nanami","rarity":82,"aliases":[]},{"name":"Sabo","rarity":28,"aliases":[]},{"name":"Saichi Sugimoto","rarity":82,"aliases":["Immortal Sugimoto"]},{"name":"Sakazuki","rarity":55,"aliases":["Sakazuki (Akainu)"]},{"name":"Sanjuan Wolf","rarity":55,"aliases":[]},{"name":"Sasori","rarity":30,"aliases":[]},{"name":"Satoru Furuya","rarity":80,"aliases":[]},{"name":"Satoshi Ideguchi","rarity":80,"aliases":[]},{"name":"Sawyer","rarity":80,"aliases":["Sawyer (Pokémon)"]},{"name":"Scratchmen Apoo","rarity":55,"aliases":[]},{"name":"Seira Morimura","rarity":80,"aliases":[]},{"name":"Senda","rarity":80,"aliases":["Senda (Cross Game)"]},{"name":"Serena","rarity":65,"aliases":["Serena (Pokémon)"]},{"name":"Shachi","rarity":55,"aliases":["Shachi (One Piece)"]},{"name":"Shanks","rarity":28,"aliases":[]},{"name":"Shauna","rarity":80,"aliases":["Shauna (Pokémon)"]},{"name":"Shawn","rarity":80,"aliases":["Shawn (The Secret World of Arrietty)"]},{"name":"Sheeta","rarity":80,"aliases":[]},{"name":"Shigeharu Honda","rarity":80,"aliases":[]},{"name":"Shinichi Kudo","rarity":55,"aliases":[]},{"name":"Shinji Kanemaru","rarity":80,"aliases":[]},{"name":"Shintarou Oki","rarity":80,"aliases":[]},{"name":"Shin Uchiha","rarity":55,"aliases":[]},{"name":"Shirahoshi","rarity":55,"aliases":[]},{"name":"Shirasu Kenjiro","rarity":80,"aliases":[]},{"name":"Shizuka Tsukubae","rarity":80,"aliases":[]},{"name":"Shouji Suyama","rarity":80,"aliases":[]},{"name":"Shuichi Akai","rarity":82,"aliases":["Akai Shuichi"]},{"name":"Shungo Kadowaki","rarity":80,"aliases":[]},{"name":"Shunpei Sanada","rarity":80,"aliases":[]},{"name":"Shunshin You","rarity":80,"aliases":[]},{"name":"Shunsui Kyoraku","rarity":48,"aliases":["Shunsui Kyouraku"]},{"name":"Sid Barrett","rarity":80,"aliases":[]},{"name":"Skull","rarity":80,"aliases":["Skull (Reborn)"]},{"name":"Snipe","rarity":80,"aliases":["Snipe (My Hero Academia)"]},{"name":"Sophie Hatter","rarity":82,"aliases":[]},{"name":"Sophocles","rarity":80,"aliases":["Sophocles (Pokémon)"]},{"name":"Sosuke","rarity":80,"aliases":["Sosuke (Ponyo)"]},{"name":"Souichiro Ichihara","rarity":80,"aliases":[]},{"name":"Souichirou Tachibana","rarity":80,"aliases":[]},{"name":"Squalo","rarity":80,"aliases":[]},{"name":"Stephan","rarity":80,"aliases":["Stephan (Pokémon)"]},{"name":"Steven Stone","rarity":80,"aliases":["Steven Stone (Pokémon)"]},{"name":"Sylvia Sherwood","rarity":80,"aliases":[]},{"name":"Tadashi Yamaoka","rarity":80,"aliases":[]},{"name":"Taiga Shimizu","rarity":80,"aliases":[]},{"name":"Takaya Abe","rarity":80,"aliases":[]},{"name":"Takeshi Yamamoto","rarity":80,"aliases":[]},{"name":"Takeshi Yuki","rarity":80,"aliases":[]},{"name":"Takumi Harada","rarity":80,"aliases":[]},{"name":"Takuya Aoyama","rarity":80,"aliases":[]},{"name":"Tamago","rarity":55,"aliases":[]},{"name":"Tamaki Ishigaki","rarity":80,"aliases":[]},{"name":"Tao Aihara","rarity":80,"aliases":[]},{"name":"Tatsuya Uesugi","rarity":80,"aliases":[]},{"name":"Tetsushin Kataoka","rarity":80,"aliases":[]},{"name":"Tetsuya Yuki","rarity":80,"aliases":[]},{"name":"Thirteen","rarity":80,"aliases":[]},{"name":"Tierno","rarity":80,"aliases":["Tierno (Pokémon)"]},{"name":"Tobias","rarity":80,"aliases":["Tobias (Pokémon)"]},{"name":"Tobi","rarity":30,"aliases":["Tobi (Obito Uchiha)"]},{"name":"Tobirama Senju","rarity":65,"aliases":[]},{"name":"Tomoe Tsukubae","rarity":80,"aliases":[]},{"name":"Tony Tony Chopper","rarity":10,"aliases":["Chopper"]},{"name":"Toru Masuko","rarity":80,"aliases":[]},{"name":"Toshiya Sato","rarity":80,"aliases":[]},{"name":"Toshizou Hijikata","rarity":82,"aliases":[]},{"name":"Toua Tokuchi","rarity":80,"aliases":[]},{"name":"Touma Tachibana","rarity":80,"aliases":[]},{"name":"Trafalgar D. Water Law","rarity":28,"aliases":["Trafalgar Law"]},{"name":"Trevor","rarity":80,"aliases":["Trevor (Pokémon)"]},{"name":"Trip","rarity":80,"aliases":["Trip (Pokémon)"]},{"name":"Tsubaki Nakatsukasa","rarity":80,"aliases":[]},{"name":"Tsunade","rarity":30,"aliases":["Fifth Hokage"]},{"name":"Tsuneo Mihara","rarity":80,"aliases":[]},{"name":"Turnip Head","rarity":80,"aliases":[]},{"name":"Tyson","rarity":80,"aliases":["Tyson (Pokémon)"]},{"name":"Ukyo Saionji","rarity":82,"aliases":["Ukyou Saionji"]},{"name":"Undertaker","rarity":55,"aliases":["Undertaker (Black Butler)"]},{"name":"Urouge","rarity":55,"aliases":[]},{"name":"Ursula","rarity":80,"aliases":["Ursula (Kiki's Delivery Service)"]},{"name":"Usopp","rarity":28,"aliases":[]},{"name":"Van Augur","rarity":55,"aliases":[]},{"name":"Vasco Shot","rarity":55,"aliases":[]},{"name":"Verde","rarity":80,"aliases":["Verde (Reborn)"]},{"name":"Viper","rarity":80,"aliases":["Viper (Mammon)"]},{"name":"Vodka","rarity":55,"aliases":["Vodka (Detective Conan)"]},{"name":"Wamuu","rarity":80,"aliases":[]},{"name":"Wapol","rarity":55,"aliases":[]},{"name":"Will A. Zeppeli","rarity":65,"aliases":[]},{"name":"Xanxus","rarity":80,"aliases":[]},{"name":"X Drake","rarity":55,"aliases":[]},{"name":"Yagura","rarity":55,"aliases":["Yagura (Mizukage)"]},{"name":"Yamato","rarity":55,"aliases":["Yamato (One Piece)"]},{"name":"Yasopp","rarity":55,"aliases":[]},{"name":"Yayoi Sawa","rarity":80,"aliases":[]},{"name":"Yoichi Kuramochi","rarity":80,"aliases":[]},{"name":"Yoshida","rarity":80,"aliases":["Yoshida (One Outs)"]},{"name":"Yoshiro Hamada","rarity":80,"aliases":[]},{"name":"Yubaba","rarity":80,"aliases":[]},{"name":"Yuhei Azuma","rarity":80,"aliases":[]},{"name":"Yuichiro Tajima","rarity":80,"aliases":[]},{"name":"Yuki Azuma","rarity":80,"aliases":[]},{"name":"Yukiko Kudo","rarity":55,"aliases":[]},{"name":"Yuki Souya","rarity":80,"aliases":[]},{"name":"Yuuto Sakaeguchi","rarity":80,"aliases":[]},{"name":"Zeniba","rarity":80,"aliases":[]},{"name":"Zetsu","rarity":30,"aliases":[]},{"name":"Daisuke Jigen","rarity":25,"aliases":["Jigen"]},{"name":"Rob Lucci","rarity":30,"aliases":["Lucci"]},{"name":"Sengoku","rarity":30,"aliases":[]}]},
 {"id":"timed-v4-descent-9-martial-arts","anime":"mixed","category":"Any anime","text":"Name any anime character who mainly fights with martial arts or their fists.","note":"Hand-to-hand fighters: martial artists, boxers and brawlers","since":"2026-11-28","descent":"char","conceptId":"nov28-martial-arts","top":"Goku","answers":[{"name":"Adam Dudley","rarity":82,"aliases":[]},{"name":"A","rarity":63,"aliases":["A (Fourth Raikage)"]},{"name":"Kanoh Agito","rarity":55,"aliases":["Agito Kanoh"]},{"name":"Akane Tendo","rarity":55,"aliases":[]},{"name":"Akaza","rarity":30,"aliases":[]},{"name":"Akisame Koetsuji","rarity":82,"aliases":[]},{"name":"Alexander Volg Zangief","rarity":82,"aliases":[]},{"name":"All Might","rarity":30,"aliases":["Toshinori Yagi"]},{"name":"Android 16","rarity":48,"aliases":[]},{"name":"Android 17","rarity":10,"aliases":[]},{"name":"Android 18","rarity":10,"aliases":[]},{"name":"Antonio Guevara","rarity":55,"aliases":[]},{"name":"Aoi Todo","rarity":30,"aliases":["Aoi Toudou"]},{"name":"Apachai Hopachai","rarity":82,"aliases":[]},{"name":"Arnie Gregory","rarity":55,"aliases":[]},{"name":"Atsushi Suedo","rarity":82,"aliases":[]},{"name":"Baek Seungchul","rarity":82,"aliases":[]},{"name":"Baki Hanma","rarity":15,"aliases":[]},{"name":"Bando Yohei","rarity":55,"aliases":[]},{"name":"Bang","rarity":30,"aliases":["Silver Fang"]},{"name":"Bardock","rarity":65,"aliases":[]},{"name":"Bartholomew Kuma","rarity":82,"aliases":[]},{"name":"Beerus","rarity":65,"aliases":[]},{"name":"Bellamy","rarity":82,"aliases":[]},{"name":"Big Mom","rarity":82,"aliases":["Charlotte Linlin"]},{"name":"Biscuit Krueger","rarity":30,"aliases":["Bisky"]},{"name":"Biscuit Oliva","rarity":82,"aliases":[]},{"name":"Boa Hancock","rarity":82,"aliases":[]},{"name":"Bomb","rarity":82,"aliases":[]},{"name":"Boruto Uzumaki","rarity":63,"aliases":[]},{"name":"Broly","rarity":48,"aliases":[]},{"name":"Bryan Hawk","rarity":55,"aliases":[]},{"name":"Burgess Jesus","rarity":82,"aliases":["Jesus Burgess"]},{"name":"Cabba","rarity":65,"aliases":[]},{"name":"Carlos Rivera","rarity":60,"aliases":[]},{"name":"Caulifla","rarity":65,"aliases":[]},{"name":"Cell","rarity":48,"aliases":[]},{"name":"Charlotte Katakuri","rarity":82,"aliases":[]},{"name":"Chiba Takayuki","rarity":55,"aliases":[]},{"name":"Chi-Chi","rarity":48,"aliases":[]},{"name":"Chief","rarity":60,"aliases":["Chief (Nomad)"]},{"name":"Chiharu Shiba","rarity":82,"aliases":[]},{"name":"Choji Akimichi","rarity":65,"aliases":["Chouji Akimichi"]},{"name":"Chu","rarity":82,"aliases":["Chuu"]},{"name":"Cologne","rarity":55,"aliases":["Cologne (Ranma 1/2)"]},{"name":"Cosmo Imai","rarity":82,"aliases":[]},{"name":"Danpei Tange","rarity":60,"aliases":[]},{"name":"David Eagle","rarity":55,"aliases":[]},{"name":"Don Chinjao","rarity":82,"aliases":[]},{"name":"Doppo Orochi","rarity":82,"aliases":[]},{"name":"Dorian","rarity":82,"aliases":[]},{"name":"Eiji Date","rarity":82,"aliases":[]},{"name":"Eijiro Kirishima","rarity":30,"aliases":["Kirishima"]},{"name":"Elliot","rarity":55,"aliases":["Elliot (Hajime no Ippo)"]},{"name":"Fat Gum","rarity":82,"aliases":["Taishiro Toyomitsu"]},{"name":"Franky","rarity":82,"aliases":[]},{"name":"Frieza","rarity":10,"aliases":["Freeza"]},{"name":"Future Trunks","rarity":48,"aliases":[]},{"name":"Gaia","rarity":82,"aliases":[]},{"name":"Gaolang Wongsawat","rarity":82,"aliases":[]},{"name":"Garou","rarity":30,"aliases":[]},{"name":"Garp","rarity":30,"aliases":["Monkey D. Garp"]},{"name":"Genji Kamogawa","rarity":55,"aliases":[]},{"name":"Genma Saotome","rarity":55,"aliases":[]},{"name":"Genos","rarity":30,"aliases":[]},{"name":"Gohan","rarity":28,"aliases":["Son Gohan"]},{"name":"Goki Shibukawa","rarity":82,"aliases":["Gouki Shibukawa"]},{"name":"Goku","rarity":0,"aliases":["Son Goku"]},{"name":"Goku Black","rarity":65,"aliases":[]},{"name":"Gon Freecss","rarity":55,"aliases":[]},{"name":"Goten","rarity":48,"aliases":[]},{"name":"Gran Torino","rarity":82,"aliases":["Sorahiko Torino"]},{"name":"Grimmjow Jaegerjaquez","rarity":82,"aliases":[]},{"name":"Hack","rarity":82,"aliases":[]},{"name":"Hanabi Hyuga","rarity":65,"aliases":[]},{"name":"Hanafusa Hajime","rarity":55,"aliases":[]},{"name":"Han Daewi","rarity":82,"aliases":["Daewi Han"]},{"name":"Happosai","rarity":55,"aliases":[]},{"name":"Harimau","rarity":60,"aliases":[]},{"name":"Haruo Kono","rarity":82,"aliases":[]},{"name":"Hatsumi Sen","rarity":82,"aliases":[]},{"name":"Hayato Furinji","rarity":82,"aliases":[]},{"name":"Hector Doyle","rarity":55,"aliases":[]},{"name":"Herb","rarity":55,"aliases":["Herb (Ranma 1/2)"]},{"name":"Hiashi Hyuga","rarity":65,"aliases":[]},{"name":"Hinako Ninomiya","rarity":55,"aliases":[]},{"name":"Hinata Hyuga","rarity":65,"aliases":["Hinata Hyuuga"]},{"name":"Hit","rarity":48,"aliases":[]},{"name":"Ichiro Miyata","rarity":82,"aliases":["Ichirou Miyata"]},{"name":"Inaba Ryo","rarity":55,"aliases":[]},{"name":"Ippo Makunouchi","rarity":15,"aliases":["Ippo","Makunouchi Ippo"]},{"name":"Isaac Netero","rarity":55,"aliases":[]},{"name":"Iwao Shimabukuro","rarity":55,"aliases":[]},{"name":"Izuku Midoriya","rarity":10,"aliases":["Deku"]},{"name":"Jack Hanma","rarity":82,"aliases":[]},{"name":"Jaku Kaioh","rarity":82,"aliases":[]},{"name":"Jason Ozuma","rarity":55,"aliases":[]},{"name":"Jimmy Sispha","rarity":55,"aliases":[]},{"name":"Jin","rarity":82,"aliases":[]},{"name":"Jinbe","rarity":30,"aliases":["Jimbei"]},{"name":"Jin Mori","rarity":82,"aliases":["Mori Jin"]},{"name":"Jiraiya","rarity":63,"aliases":[]},{"name":"Jiren","rarity":48,"aliases":[]},{"name":"Joe","rarity":30,"aliases":["Joe (Megalo Box)"]},{"name":"Joe Yabuki","rarity":30,"aliases":[]},{"name":"Jonathan Joestar","rarity":82,"aliases":[]},{"name":"Jose Mendoza","rarity":60,"aliases":[]},{"name":"Joseph Joestar","rarity":82,"aliases":[]},{"name":"Jugo","rarity":63,"aliases":[]},{"name":"Julius Reinhold","rarity":82,"aliases":[]},{"name":"Jun Guevaru","rarity":55,"aliases":["Jun Guevara","Jun Gebaru"]},{"name":"Sekibayashi Jun","rarity":55,"aliases":["Jun Sekibayashi"]},{"name":"Kaido","rarity":82,"aliases":["Kaidou"]},{"name":"Kaku","rarity":30,"aliases":[]},{"name":"Kaku Kaioh","rarity":82,"aliases":[]},{"name":"Kale","rarity":65,"aliases":[]},{"name":"Kaneda Suekichi","rarity":82,"aliases":[]},{"name":"Kang Manseok","rarity":82,"aliases":[]},{"name":"Kaoru Hanayama","rarity":82,"aliases":[]},{"name":"Kastro","rarity":82,"aliases":[]},{"name":"Katsuki Bakugo","rarity":82,"aliases":["Bakugou"]},{"name":"Katsumi Orochi","rarity":82,"aliases":[]},{"name":"Kawaki","rarity":63,"aliases":[]},{"name":"Kazuki Sanada","rarity":82,"aliases":[]},{"name":"Kazuma Kuwabara","rarity":82,"aliases":[]},{"name":"Kehaya","rarity":55,"aliases":[]},{"name":"Keichi Hayami","rarity":55,"aliases":[]},{"name":"Kenichi Shirahama","rarity":30,"aliases":[]},{"name":"Kensei Ma","rarity":82,"aliases":[]},{"name":"Kensei Muguruma","rarity":82,"aliases":[]},{"name":"Kenta Kobashi","rarity":82,"aliases":[]},{"name":"Kiba Inuzuka","rarity":65,"aliases":[]},{"name":"Killer B","rarity":63,"aliases":[]},{"name":"Killua Zoldyck","rarity":55,"aliases":[]},{"name":"Kimimaro","rarity":63,"aliases":[]},{"name":"Kim Yong-bi","rarity":60,"aliases":[]},{"name":"Kinji Hakari","rarity":65,"aliases":[]},{"name":"Kiozan Takeru","rarity":82,"aliases":[]},{"name":"Kiryu Setsuna","rarity":55,"aliases":["Setsuna Kiryu"]},{"name":"Knuckle Bine","rarity":82,"aliases":[]},{"name":"Knuckleduster","rarity":82,"aliases":[]},{"name":"Koala","rarity":82,"aliases":[]},{"name":"Kodachi Kuno","rarity":55,"aliases":[]},{"name":"Kokichi Muta","rarity":65,"aliases":[]},{"name":"Kouji Nanjo","rarity":60,"aliases":[]},{"name":"Krillin","rarity":28,"aliases":["Kuririn"]},{"name":"Kure Erioh","rarity":55,"aliases":[]},{"name":"Kure Karla","rarity":55,"aliases":[]},{"name":"Kuroki Gensai","rarity":82,"aliases":[]},{"name":"Lao G","rarity":82,"aliases":[]},{"name":"Liu","rarity":60,"aliases":["Liu (Megalo Box)"]},{"name":"Mac","rarity":60,"aliases":["Mac (Megalo Box)"]},{"name":"Madara Uchiha","rarity":63,"aliases":[]},{"name":"Mahito","rarity":30,"aliases":[]},{"name":"Majin Buu","rarity":48,"aliases":[]},{"name":"Maki Zenin","rarity":65,"aliases":[]},{"name":"Mamoru Takamura","rarity":82,"aliases":[]},{"name":"Manabu Itagaki","rarity":82,"aliases":[]},{"name":"Marco","rarity":82,"aliases":[]},{"name":"Masaru Aoki","rarity":82,"aliases":[]},{"name":"Mashirao Ojiro","rarity":82,"aliases":["Tailman"]},{"name":"Mashiro Kuna","rarity":82,"aliases":[]},{"name":"Master Roshi","rarity":28,"aliases":["Kame Sennin"]},{"name":"Megumi Fushiguro","rarity":65,"aliases":[]},{"name":"Meguro Masaki","rarity":55,"aliases":[]},{"name":"Metal Lee","rarity":65,"aliases":[]},{"name":"Might Guy","rarity":15,"aliases":["Maito Gai"]},{"name":"Miguel","rarity":65,"aliases":[]},{"name":"Mikazuchi Rei","rarity":82,"aliases":[]},{"name":"Mirio Togata","rarity":55,"aliases":["Lemillion"]},{"name":"Mirko","rarity":30,"aliases":["Rumi Usagiyama"]},{"name":"Miu Furinji","rarity":82,"aliases":[]},{"name":"Mohammad Alai Jr.","rarity":82,"aliases":[]},{"name":"Mokichi Robinson","rarity":82,"aliases":[]},{"name":"Monkey D. Luffy","rarity":10,"aliases":["Luffy"]},{"name":"Motobe Izou","rarity":55,"aliases":[]},{"name":"Mousse","rarity":55,"aliases":[]},{"name":"Muscular","rarity":82,"aliases":[]},{"name":"Muteba Gizenga","rarity":82,"aliases":[]},{"name":"Nana Shimura","rarity":82,"aliases":[]},{"name":"Naobito Zenin","rarity":82,"aliases":[]},{"name":"Naomichi Yamada","rarity":82,"aliases":[]},{"name":"Naoto Date","rarity":60,"aliases":[]},{"name":"Naoya Zenin","rarity":65,"aliases":[]},{"name":"Nappa","rarity":65,"aliases":[]},{"name":"Naruto Uzumaki","rarity":10,"aliases":[]},{"name":"Natsu Tanimoto","rarity":82,"aliases":["Hermit"]},{"name":"Neji Hyuga","rarity":65,"aliases":["Neji Hyuuga"]},{"name":"Nezuko Kamado","rarity":82,"aliases":[]},{"name":"Nezu Masami","rarity":55,"aliases":[]},{"name":"Nikaido Ren","rarity":55,"aliases":[]},{"name":"Nishi Kanichi","rarity":60,"aliases":[]},{"name":"Noro Mamoru","rarity":60,"aliases":[]},{"name":"Ohma Tokita","rarity":30,"aliases":["Tokita Ohma"]},{"name":"Pain","rarity":63,"aliases":[]},{"name":"Pan","rarity":48,"aliases":[]},{"name":"Panda","rarity":82,"aliases":[]},{"name":"Pantsu Taro","rarity":55,"aliases":[]},{"name":"Park Ilpyo","rarity":82,"aliases":["Ilpyo Park"]},{"name":"Phinks Magcub","rarity":82,"aliases":[]},{"name":"Piccolo","rarity":28,"aliases":[]},{"name":"Pickle","rarity":82,"aliases":[]},{"name":"Ponchai Chuwatana","rarity":55,"aliases":[]},{"name":"Puri-Puri Prisoner","rarity":82,"aliases":[]},{"name":"Raditz","rarity":65,"aliases":[]},{"name":"Raian Kure","rarity":82,"aliases":[]},{"name":"Rando","rarity":82,"aliases":[]},{"name":"Randy Boy Jr.","rarity":82,"aliases":[]},{"name":"Ranma Saotome","rarity":30,"aliases":["Ranma"]},{"name":"Rappa Kendo","rarity":82,"aliases":["Kendo Rappa"]},{"name":"Retsu Kaioh","rarity":82,"aliases":[]},{"name":"Ricardo Martinez","rarity":82,"aliases":[]},{"name":"Rihito","rarity":82,"aliases":["Lihito"]},{"name":"Rinku","rarity":82,"aliases":[]},{"name":"Rob Lucci","rarity":82,"aliases":[]},{"name":"Rock Lee","rarity":15,"aliases":[]},{"name":"Ryoga Hibiki","rarity":55,"aliases":[]},{"name":"Ryo Mashiba","rarity":82,"aliases":["Ryou Mashiba"]},{"name":"Ryu Kaioh","rarity":55,"aliases":[]},{"name":"Ryukou Yanagi","rarity":55,"aliases":["Ryuukou Yanagi"]},{"name":"Ryu Kumon","rarity":55,"aliases":[]},{"name":"Ryuto Asamiya","rarity":82,"aliases":["Odin"]},{"name":"Sabo","rarity":82,"aliases":[]},{"name":"Sai","rarity":82,"aliases":[]},{"name":"Saitama","rarity":10,"aliases":[]},{"name":"Sakura Haruno","rarity":30,"aliases":[]},{"name":"Sanji Vinsmoke","rarity":30,"aliases":["Sanji"]},{"name":"Sarada Uchiha","rarity":63,"aliases":[]},{"name":"Satoru Gojo","rarity":82,"aliases":[]},{"name":"Saw Paing Yoroizuka","rarity":55,"aliases":["Yoroizuka Saw Paing","Saw Paing"]},{"name":"Seishu Akoya","rarity":82,"aliases":["Akoya Seishu"]},{"name":"Sensui Shinobu","rarity":82,"aliases":[]},{"name":"Sentomaru","rarity":82,"aliases":[]},{"name":"Shampoo","rarity":30,"aliases":[]},{"name":"Shigeta Akira","rarity":82,"aliases":[]},{"name":"Shinogi Kosho","rarity":55,"aliases":[]},{"name":"Shinogi Kureha","rarity":55,"aliases":[]},{"name":"Shio Sakaki","rarity":82,"aliases":[]},{"name":"Shira","rarity":65,"aliases":[]},{"name":"Shogo Kitsukawa","rarity":82,"aliases":["Berserker"]},{"name":"Sikorsky","rarity":82,"aliases":[]},{"name":"Silva Zoldyck","rarity":82,"aliases":[]},{"name":"Soi Fon","rarity":30,"aliases":["Sui-Feng"]},{"name":"Soun Tendo","rarity":55,"aliases":[]},{"name":"Spec","rarity":82,"aliases":[]},{"name":"Speed-o'-Sound Sonic","rarity":82,"aliases":[]},{"name":"Spider Demon Father","rarity":82,"aliases":["Father Spider Demon"]},{"name":"Suguru Geto","rarity":65,"aliases":[]},{"name":"Suiryu","rarity":30,"aliases":[]},{"name":"Sukuna","rarity":30,"aliases":["Ryomen Sukuna"]},{"name":"Sukune","rarity":55,"aliases":[]},{"name":"Superalloy Darkshine","rarity":82,"aliases":[]},{"name":"Takeshi Sendo","rarity":82,"aliases":[]},{"name":"Takuma Saeki","rarity":55,"aliases":[]},{"name":"Tanktop Master","rarity":82,"aliases":[]},{"name":"Tatewaki Kuno","rarity":55,"aliases":[]},{"name":"Tatsuya Himekawa","rarity":60,"aliases":[]},{"name":"Tatsuya Kimura","rarity":82,"aliases":[]},{"name":"Tatsuya Okita","rarity":82,"aliases":[]},{"name":"Tenya Iida","rarity":82,"aliases":["Ingenium"]},{"name":"Tetsutetsu Tetsutetsu","rarity":82,"aliases":[]},{"name":"Tien Shinhan","rarity":28,"aliases":["Tenshinhan"]},{"name":"Toguro Younger","rarity":82,"aliases":["Younger Toguro"]},{"name":"Toji Fushiguro","rarity":65,"aliases":[]},{"name":"Toppo","rarity":48,"aliases":[]},{"name":"Toru Rikiishi","rarity":60,"aliases":[]},{"name":"Trunks","rarity":48,"aliases":[]},{"name":"Tsunade","rarity":30,"aliases":[]},{"name":"Ukyo Kuonji","rarity":55,"aliases":[]},{"name":"Urouge","rarity":82,"aliases":[]},{"name":"Uub","rarity":48,"aliases":[]},{"name":"Uvogin","rarity":30,"aliases":[]},{"name":"Vegeta","rarity":10,"aliases":[]},{"name":"Videl","rarity":48,"aliases":[]},{"name":"Wakatsuki Takeshi","rarity":82,"aliases":["Takeshi Wakatsuki"]},{"name":"Wally","rarity":55,"aliases":["Wally (Hajime no Ippo)"]},{"name":"Whis","rarity":65,"aliases":[]},{"name":"Wing","rarity":82,"aliases":[]},{"name":"Wolf Kanagushi","rarity":60,"aliases":[]},{"name":"Yamato Nekomata","rarity":55,"aliases":[]},{"name":"Yamcha","rarity":28,"aliases":[]},{"name":"Yasha Ape","rarity":55,"aliases":[]},{"name":"Yasutora Sado","rarity":30,"aliases":["Chad"]},{"name":"Yoruichi Shihouin","rarity":30,"aliases":["Yoruichi Shihoin"]},{"name":"Yuji Itadori","rarity":30,"aliases":["Yuuji Itadori"]},{"name":"Yujiro Hanma","rarity":30,"aliases":["Yuujirou Hanma"]},{"name":"Yuri","rarity":60,"aliases":["Yuri (Megalo Box)"]},{"name":"Yusuke Oda","rarity":55,"aliases":[]},{"name":"Yusuke Urameshi","rarity":30,"aliases":["Yusuke"]},{"name":"Zamasu","rarity":65,"aliases":[]},{"name":"Zeno Zoldyck","rarity":82,"aliases":[]},{"name":"Zushi","rarity":82,"aliases":[]},{"name":"Kenshiro","rarity":15,"aliases":[]},{"name":"Manjiro Sano","rarity":20,"aliases":["Mikey"]},{"name":"Raoh","rarity":30,"aliases":[]},{"name":"Ken Ryuguji","rarity":30,"aliases":["Draken"]},{"name":"Jotaro Kujo","rarity":35,"aliases":["Jotaro"]},{"name":"Chun-Li","rarity":40,"aliases":[]},{"name":"Koby","rarity":30,"aliases":["Coby"]},{"name":"Ken Masters","rarity":50,"aliases":[]}]},
 {"id":"timed-v4-descent-9-fantasy-world","anime":"mixed","category":"Any anime","text":"Name any anime set mainly in a fantasy world.","note":"Most of the story takes place in a fantasy world","since":"2026-11-28","descent":"title","conceptId":"nov28-fantasy-world","top":"Frieren: Beyond Journey's End","answers":[{"name":"7th Time Loop: The Villainess Enjoys a Carefree Life Married to Her Worst Enemy!","rarity":82,"aliases":[]},{"name":"Akame ga Kill!","rarity":30,"aliases":[]},{"name":"Am I Actually the Strongest?","rarity":65,"aliases":[]},{"name":"Arifureta Season 2","rarity":65,"aliases":[]},{"name":"Arifureta Season 3","rarity":65,"aliases":[]},{"name":"Ascendance of a Bookworm","rarity":82,"aliases":[]},{"name":"Ascendance of a Bookworm Season 2","rarity":82,"aliases":[]},{"name":"Ascendance of a Bookworm Season 3","rarity":82,"aliases":[]},{"name":"Attack on Titan","rarity":30,"aliases":[]},{"name":"Attack on Titan Season 2","rarity":82,"aliases":[]},{"name":"Attack on Titan Season 3","rarity":82,"aliases":[]},{"name":"Attack on Titan: The Final Season","rarity":82,"aliases":[]},{"name":"Banished from the Hero's Party, I Decided to Live a Quiet Life in the Countryside","rarity":82,"aliases":[]},{"name":"Banished from the Hero's Party, I Decided to Live a Quiet Life in the Countryside Season 2","rarity":82,"aliases":[]},{"name":"Beast Tamer","rarity":82,"aliases":[]},{"name":"Berserk","rarity":30,"aliases":["Berserk (2016)","Berserk (2017)"]},{"name":"Berserk: The Golden Age Arc III - The Advent","rarity":82,"aliases":[]},{"name":"Berserk: The Golden Age Arc II - The Battle for Doldrey","rarity":82,"aliases":[]},{"name":"Berserk: The Golden Age Arc I - The Egg of the King","rarity":82,"aliases":[]},{"name":"Black Clover","rarity":30,"aliases":[]},{"name":"Black Clover: Sword of the Wizard King","rarity":82,"aliases":[]},{"name":"Boruto: Naruto Next Generations","rarity":82,"aliases":[]},{"name":"By the Grace of the Gods","rarity":82,"aliases":[]},{"name":"By the Grace of the Gods Season 2","rarity":82,"aliases":[]},{"name":"Campfire Cooking in Another World with My Absurd Skill","rarity":82,"aliases":[]},{"name":"Campfire Cooking in Another World with My Absurd Skill Season 2","rarity":82,"aliases":[]},{"name":"Castle in the Sky","rarity":30,"aliases":[]},{"name":"Cautious Hero: The Hero Is Overpowered but Overly Cautious","rarity":82,"aliases":[]},{"name":"Chaika - The Coffin Princess","rarity":82,"aliases":[]},{"name":"Chaika - The Coffin Princess: Avenging Battle","rarity":82,"aliases":[]},{"name":"Children of the Whales","rarity":65,"aliases":[]},{"name":"Children Who Chase Lost Voices","rarity":82,"aliases":[]},{"name":"Chillin' in Another World Level 2 Super Cheat Powers","rarity":82,"aliases":[]},{"name":"Claymore","rarity":82,"aliases":[]},{"name":"Death March to the Parallel World Rhapsody","rarity":82,"aliases":[]},{"name":"Didn't I Say to Make My Abilities Average in the Next Life?!","rarity":82,"aliases":[]},{"name":"Doctor Elise: The Royal Lady with the Lamp","rarity":82,"aliases":[]},{"name":"Dragon Crisis!","rarity":65,"aliases":[]},{"name":"Dragon Quest: Legend of the Hero Abel","rarity":82,"aliases":[]},{"name":"Dragon Quest: The Adventure of Dai","rarity":30,"aliases":["Dragon Quest: The Adventure of Dai (1991)","Dragon Quest: The Adventure of Dai (2020)","Dragon Quest","Dai no Daibouken"]},{"name":"Dragon Quest: The Legend of Abel","rarity":65,"aliases":[]},{"name":"Dragon Quest: Your Story","rarity":82,"aliases":[]},{"name":"Dungeon Meshi","rarity":34,"aliases":["Delicious in Dungeon"]},{"name":"Escaflowne: The Movie","rarity":65,"aliases":[]},{"name":"Fairy Tail","rarity":30,"aliases":["Fairy Tail (2014)"]},{"name":"Fairy Tail: 100 Years Quest","rarity":82,"aliases":[]},{"name":"Fairy Tail: Dragon Cry","rarity":82,"aliases":[]},{"name":"Fairy Tail: Final Series","rarity":82,"aliases":[]},{"name":"Fairy Tail: Phoenix Priestess","rarity":82,"aliases":[]},{"name":"Farming Life in Another World","rarity":82,"aliases":[]},{"name":"Four Knights of the Apocalypse","rarity":82,"aliases":[]},{"name":"Four Knights of the Apocalypse Season 2","rarity":82,"aliases":[]},{"name":"Frieren: Beyond Journey's End","rarity":0,"aliases":["Sousou no Frieren"]},{"name":"Fullmetal Alchemist","rarity":30,"aliases":[]},{"name":"Fullmetal Alchemist: Brotherhood","rarity":30,"aliases":[]},{"name":"Fullmetal Alchemist: The Sacred Star of Milos","rarity":82,"aliases":[]},{"name":"Goblin Slayer","rarity":30,"aliases":[]},{"name":"Goblin Slayer: Goblin's Crown","rarity":82,"aliases":[]},{"name":"Goblin Slayer II","rarity":82,"aliases":[]},{"name":"Granblue Fantasy The Animation","rarity":82,"aliases":["Granblue Fantasy"]},{"name":"Granblue Fantasy The Animation: Extra 2","rarity":82,"aliases":[]},{"name":"Granblue Fantasy The Animation Season 2","rarity":82,"aliases":[]},{"name":"Grimgar: Ashes and Illusions","rarity":65,"aliases":["Hai to Gensou no Grimgar"]},{"name":"Grimoire of Zero","rarity":82,"aliases":[]},{"name":"Guin Saga","rarity":65,"aliases":[]},{"name":"Hakumei and Mikochi","rarity":82,"aliases":[]},{"name":"Howl's Moving Castle","rarity":30,"aliases":[]},{"name":"How Not to Summon a Demon Lord","rarity":82,"aliases":[]},{"name":"I'm in Love with the Villainess","rarity":82,"aliases":[]},{"name":"I'm the Villainess, So I'm Taming the Final Boss","rarity":82,"aliases":[]},{"name":"In Another World With My Smartphone","rarity":82,"aliases":[]},{"name":"In Another World With My Smartphone 2","rarity":82,"aliases":[]},{"name":"In the Land of Leadale","rarity":82,"aliases":[]},{"name":"Isekai Cheat Magician","rarity":65,"aliases":[]},{"name":"I Shall Survive Using Potions!","rarity":65,"aliases":[]},{"name":"Is It Wrong to Try to Pick Up Girls in a Dungeon?","rarity":30,"aliases":["DanMachi"]},{"name":"Is It Wrong to Try to Pick Up Girls in a Dungeon? II","rarity":82,"aliases":[]},{"name":"Is It Wrong to Try to Pick Up Girls in a Dungeon? III","rarity":82,"aliases":[]},{"name":"Is It Wrong to Try to Pick Up Girls in a Dungeon? IV","rarity":82,"aliases":[]},{"name":"I've Been Killing Slimes for 300 Years and Maxed Out My Level","rarity":82,"aliases":[]},{"name":"I've Been Killing Slimes for 300 Years and Maxed Out My Level Season 2","rarity":82,"aliases":[]},{"name":"KonoSuba: An Explosion on This Wonderful World!","rarity":53,"aliases":[]},{"name":"KonoSuba: God's Blessing on This Wonderful World!","rarity":30,"aliases":["Konosuba"]},{"name":"KonoSuba: God's Blessing on This Wonderful World! 2","rarity":53,"aliases":[]},{"name":"KonoSuba: God's Blessing on This Wonderful World! 3","rarity":53,"aliases":[]},{"name":"KonoSuba: Legend of Crimson","rarity":53,"aliases":[]},{"name":"Little Witch Academia","rarity":82,"aliases":["Little Witch Academia (TV)"]},{"name":"Log Horizon","rarity":30,"aliases":[]},{"name":"Log Horizon 2","rarity":65,"aliases":[]},{"name":"Log Horizon: Destruction of the Round Table","rarity":65,"aliases":[]},{"name":"Made in Abyss","rarity":34,"aliases":[]},{"name":"Made in Abyss: Dawn of the Deep Soul","rarity":34,"aliases":[]},{"name":"Made in Abyss: The Golden City of the Scorching Sun","rarity":34,"aliases":[]},{"name":"Magi: Adventure of Sinbad","rarity":82,"aliases":[]},{"name":"Magi: The Kingdom of Magic","rarity":82,"aliases":[]},{"name":"Magi: The Labyrinth of Magic","rarity":30,"aliases":["Magi"]},{"name":"Mary and the Witch's Flower","rarity":82,"aliases":[]},{"name":"Moribito: Guardian of the Spirit","rarity":65,"aliases":["Seirei no Moribito"]},{"name":"Mushoku Tensei: Jobless Reincarnation","rarity":34,"aliases":["Mushoku Tensei","Jobless Reincarnation"]},{"name":"Mushoku Tensei: Jobless Reincarnation Part 2","rarity":53,"aliases":[]},{"name":"Mushoku Tensei: Jobless Reincarnation Season 2","rarity":53,"aliases":[]},{"name":"Mushoku Tensei: Jobless Reincarnation Season 2 Part 2","rarity":53,"aliases":[]},{"name":"My Next Life as a Villainess: All Routes Lead to Doom!","rarity":82,"aliases":[]},{"name":"My Next Life as a Villainess: All Routes Lead to Doom! X","rarity":82,"aliases":[]},{"name":"Naruto","rarity":30,"aliases":[]},{"name":"Naruto Shippuden","rarity":82,"aliases":[]},{"name":"No Game No Life","rarity":30,"aliases":[]},{"name":"No Game No Life: Zero","rarity":65,"aliases":[]},{"name":"One Piece","rarity":30,"aliases":[]},{"name":"One Piece Film: Red","rarity":82,"aliases":[]},{"name":"One Piece Film: Strong World","rarity":82,"aliases":[]},{"name":"One Piece Film: Z","rarity":82,"aliases":[]},{"name":"One Piece: Stampede","rarity":82,"aliases":[]},{"name":"Overlord","rarity":30,"aliases":[]},{"name":"Overlord II","rarity":65,"aliases":[]},{"name":"Overlord III","rarity":65,"aliases":[]},{"name":"Overlord IV","rarity":65,"aliases":[]},{"name":"Overlord: The Sacred Kingdom","rarity":65,"aliases":[]},{"name":"Parallel World Pharmacy","rarity":82,"aliases":[]},{"name":"Pokémon","rarity":30,"aliases":[]},{"name":"Pokémon Advanced Generation","rarity":82,"aliases":[]},{"name":"Pokémon Best Wishes!","rarity":82,"aliases":[]},{"name":"Pokémon Diamond and Pearl","rarity":82,"aliases":[]},{"name":"Pokémon Horizons","rarity":82,"aliases":[]},{"name":"Pokémon Journeys","rarity":82,"aliases":[]},{"name":"Pokémon Sun & Moon","rarity":82,"aliases":[]},{"name":"Pokémon XY","rarity":82,"aliases":[]},{"name":"Princess Connect! Re:Dive","rarity":82,"aliases":[]},{"name":"Princess Connect! Re:Dive Season 2","rarity":82,"aliases":[]},{"name":"Princess Mononoke","rarity":30,"aliases":[]},{"name":"Rage of Bahamut: Genesis","rarity":82,"aliases":["Shingeki no Bahamut Genesis"]},{"name":"Rage of Bahamut: Virgin Soul","rarity":82,"aliases":[]},{"name":"Reborn as a Vending Machine, I Now Wander the Dungeon","rarity":82,"aliases":[]},{"name":"Reborn as a Vending Machine, I Now Wander the Dungeon Season 2","rarity":82,"aliases":[]},{"name":"Record of Grancrest War","rarity":65,"aliases":[]},{"name":"Record of Lodoss War","rarity":82,"aliases":[]},{"name":"Record of Lodoss War: Chronicles of the Heroic Knight","rarity":82,"aliases":[]},{"name":"Reincarnated as a Sword","rarity":82,"aliases":[]},{"name":"Re:Monster","rarity":82,"aliases":[]},{"name":"Re:Zero - Starting Life in Another World","rarity":10,"aliases":["Re:Zero"]},{"name":"Re:Zero - Starting Life in Another World: Memory Snow","rarity":53,"aliases":[]},{"name":"Re:Zero - Starting Life in Another World Season 2","rarity":53,"aliases":[]},{"name":"Re:Zero - Starting Life in Another World Season 2 Part 2","rarity":53,"aliases":[]},{"name":"Re:Zero - Starting Life in Another World Season 3","rarity":53,"aliases":[]},{"name":"Re:Zero - Starting Life in Another World: The Frozen Bond","rarity":53,"aliases":[]},{"name":"Rokka: Braves of the Six Flowers","rarity":82,"aliases":[]},{"name":"Romeo x Juliet","rarity":82,"aliases":[]},{"name":"Rune Soldier Louie","rarity":82,"aliases":["Mahou Senshi Louie"]},{"name":"Saving 80,000 Gold in Another World for My Retirement","rarity":65,"aliases":[]},{"name":"Scrapped Princess","rarity":82,"aliases":[]},{"name":"Skeleton Knight in Another World","rarity":65,"aliases":[]},{"name":"Slayers","rarity":82,"aliases":[]},{"name":"Slayers Evolution-R","rarity":82,"aliases":[]},{"name":"Slayers Excellent","rarity":65,"aliases":[]},{"name":"Slayers Gorgeous","rarity":65,"aliases":[]},{"name":"Slayers Great","rarity":65,"aliases":[]},{"name":"Slayers Next","rarity":82,"aliases":[]},{"name":"Slayers Premium","rarity":65,"aliases":[]},{"name":"Slayers Revolution","rarity":82,"aliases":[]},{"name":"Slayers Try","rarity":82,"aliases":[]},{"name":"Snow White with the Red Hair","rarity":82,"aliases":["Akagami no Shirayuki-hime"]},{"name":"Snow White with the Red Hair Season 2","rarity":82,"aliases":[]},{"name":"Somali and the Forest Spirit","rarity":82,"aliases":[]},{"name":"Sorcerous Stabber Orphen","rarity":82,"aliases":[]},{"name":"Sorcerous Stabber Orphen: Battle of Kimluck","rarity":82,"aliases":[]},{"name":"Sorcerous Stabber Orphen: Chaos in Urbanrama","rarity":82,"aliases":[]},{"name":"Spirited Away","rarity":30,"aliases":[]},{"name":"Sunday Without God","rarity":65,"aliases":[]},{"name":"Suppose a Kid from the Last Dungeon Boonies Moved to a Starter Town","rarity":82,"aliases":[]},{"name":"Sword Art Online: Alicization","rarity":65,"aliases":[]},{"name":"Sword Art Online: Alicization - War of Underworld","rarity":65,"aliases":[]},{"name":"Sword Art Online: Alicization - War of Underworld Part 2","rarity":65,"aliases":[]},{"name":"Sword Art Online: Progressive - Aria of a Starless Night","rarity":65,"aliases":[]},{"name":"Sword Art Online: Progressive - Scherzo of Deep Night","rarity":65,"aliases":[]},{"name":"Sword Oratoria","rarity":82,"aliases":[]},{"name":"Tales of Eternia","rarity":65,"aliases":[]},{"name":"Tales of Phantasia: The Animation","rarity":65,"aliases":[]},{"name":"Tales of Symphonia the Animation","rarity":65,"aliases":[]},{"name":"Tales of the Abyss","rarity":65,"aliases":[]},{"name":"Tales of Vesperia: The First Strike","rarity":65,"aliases":[]},{"name":"Tales of Zestiria the X","rarity":65,"aliases":[]},{"name":"Tales of Zestiria the X Season 2","rarity":65,"aliases":[]},{"name":"Tearmoon Empire","rarity":82,"aliases":[]},{"name":"That Time I Got Reincarnated as a Slime","rarity":30,"aliases":[]},{"name":"That Time I Got Reincarnated as a Slime: Scarlet Bond","rarity":65,"aliases":[]},{"name":"That Time I Got Reincarnated as a Slime Season 2","rarity":65,"aliases":[]},{"name":"That Time I Got Reincarnated as a Slime Season 2 Part 2","rarity":65,"aliases":[]},{"name":"That Time I Got Reincarnated as a Slime Season 3","rarity":65,"aliases":[]},{"name":"The 8th Son? Are You Kidding Me?","rarity":82,"aliases":[]},{"name":"The Ancient Magus' Bride","rarity":30,"aliases":["Ancient Magus Bride","Mahoutsukai no Yome"]},{"name":"The Ancient Magus' Bride Season 2","rarity":82,"aliases":[]},{"name":"The Ancient Magus' Bride Season 2 Part 2","rarity":82,"aliases":[]},{"name":"The Ancient Magus' Bride: Those Awaiting a Star","rarity":82,"aliases":[]},{"name":"The Aristocrat's Otherworldly Adventure","rarity":65,"aliases":[]},{"name":"The Aristocrat's Otherworldly Adventure: Serving Gods Who Go Too Far","rarity":82,"aliases":[]},{"name":"The Banished Former Hero Lives as He Pleases","rarity":82,"aliases":[]},{"name":"The Beast Player Erin","rarity":82,"aliases":[]},{"name":"The Boy and the Beast","rarity":82,"aliases":[]},{"name":"The Chaika: The Coffin Princess","rarity":65,"aliases":[]},{"name":"The Dawn of the Witch","rarity":82,"aliases":[]},{"name":"The Demon Sword Master of Excalibur Academy","rarity":82,"aliases":[]},{"name":"The Do-Over Damsel Conquers the Dragon Emperor","rarity":82,"aliases":[]},{"name":"The Eminence in Shadow","rarity":82,"aliases":[]},{"name":"The Eminence in Shadow 2nd Season","rarity":82,"aliases":[]},{"name":"The Executioner and Her Way of Life","rarity":82,"aliases":[]},{"name":"The Familiar of Zero","rarity":82,"aliases":[]},{"name":"The Familiar of Zero F","rarity":82,"aliases":[]},{"name":"The Familiar of Zero: Knight of the Twin Moons","rarity":82,"aliases":[]},{"name":"The Familiar of Zero: Princesses no Rondo","rarity":82,"aliases":[]},{"name":"The Familiar of Zero Season 2","rarity":65,"aliases":[]},{"name":"The Familiar of Zero Season 3","rarity":65,"aliases":[]},{"name":"The Familiar of Zero Season 4","rarity":65,"aliases":[]},{"name":"The Faraway Paladin","rarity":82,"aliases":[]},{"name":"The Faraway Paladin Season 2","rarity":65,"aliases":[]},{"name":"The Faraway Paladin: The Lord of Rust Mountains","rarity":82,"aliases":[]},{"name":"The Fruit of Evolution: Before I Knew It, My Life Had It Made","rarity":82,"aliases":[]},{"name":"The Fruit of Evolution Season 2","rarity":82,"aliases":[]},{"name":"The Genius Prince's Guide to Raising a Nation Out of Debt","rarity":82,"aliases":[]},{"name":"The Great Cleric","rarity":82,"aliases":[]},{"name":"The Healing Magic in Another World","rarity":65,"aliases":[]},{"name":"The Heroic Legend of Arslan","rarity":82,"aliases":["Arslan Senki"]},{"name":"The Heroic Legend of Arslan: Dust Storm Dance","rarity":82,"aliases":[]},{"name":"The Hidden Dungeon Only I Can Enter","rarity":65,"aliases":[]},{"name":"The Iceblade Sorcerer Shall Rule the World","rarity":65,"aliases":[]},{"name":"The Legend of the Legendary Heroes","rarity":82,"aliases":["Densetsu no Yuusha no Densetsu"]},{"name":"The Magical Revolution of the Reincarnated Princess and the Genius Young Lady","rarity":82,"aliases":[]},{"name":"The Master of Ragnarok & Blesser of Einherjar","rarity":82,"aliases":[]},{"name":"The Most Heretical Last Boss Queen: From Villainess to Savior","rarity":82,"aliases":[]},{"name":"The New Gate","rarity":82,"aliases":[]},{"name":"The Reincarnation of the Strongest Exorcist in Another World","rarity":82,"aliases":[]},{"name":"The Rising of the Shield Hero","rarity":30,"aliases":["Shield Hero","Rising of the Shield Hero"]},{"name":"The Rising of the Shield Hero Season 2","rarity":65,"aliases":[]},{"name":"The Rising of the Shield Hero Season 3","rarity":65,"aliases":[]},{"name":"The Rising of the Shield Hero Season 4","rarity":65,"aliases":[]},{"name":"The Sacred Blacksmith","rarity":82,"aliases":[]},{"name":"The Saint's Magic Power Is Omnipotent","rarity":82,"aliases":[]},{"name":"The Saint's Magic Power Is Omnipotent Season 2","rarity":82,"aliases":[]},{"name":"The Seven Deadly Sins","rarity":30,"aliases":["Seven Deadly Sins","Nanatsu no Taizai"]},{"name":"The Seven Deadly Sins: Cursed by Light","rarity":82,"aliases":[]},{"name":"The Seven Deadly Sins: Dragon's Judgement","rarity":82,"aliases":[]},{"name":"The Seven Deadly Sins: Prisoners of the Sky","rarity":82,"aliases":[]},{"name":"The Seven Deadly Sins: Revival of the Commandments","rarity":82,"aliases":[]},{"name":"The Seven Deadly Sins: Wrath of the Gods","rarity":82,"aliases":[]},{"name":"The Slime Diaries","rarity":65,"aliases":[]},{"name":"The Story of Saiunkoku","rarity":82,"aliases":["Saiunkoku Monogatari"]},{"name":"The Story of Saiunkoku Second Series","rarity":82,"aliases":[]},{"name":"The Strongest Sage with the Weakest Crest","rarity":65,"aliases":[]},{"name":"The Strongest Tank's Labyrinth Raids","rarity":82,"aliases":[]},{"name":"The Tower of Druaga: The Aegis of Uruk","rarity":65,"aliases":[]},{"name":"The Tower of Druaga: The Sword of Uruk","rarity":65,"aliases":[]},{"name":"The Twelve Kingdoms","rarity":65,"aliases":["Juuni Kokuki"]},{"name":"The Unwanted Undead Adventurer","rarity":82,"aliases":[]},{"name":"The Vexations of a Shut-In Vampire Princess","rarity":65,"aliases":[]},{"name":"The Vision of Escaflowne","rarity":65,"aliases":["Tenkuu no Escaflowne"]},{"name":"The Weakest Tamer Began a Journey to Pick Up Trash","rarity":82,"aliases":[]},{"name":"The World is Still Beautiful","rarity":65,"aliases":[]},{"name":"The World's Finest Assassin Gets Reincarnated in Another World as an Aristocrat","rarity":82,"aliases":[]},{"name":"The Wrong Way to Use Healing Magic","rarity":82,"aliases":[]},{"name":"Villainess Level 99: I May Be the Hidden Boss but I'm Not the Demon Lord","rarity":82,"aliases":[]},{"name":"Wandering Witch: The Journey of Elaina","rarity":82,"aliases":[]},{"name":"Why Raeliana Ended Up at the Duke's Mansion","rarity":82,"aliases":[]},{"name":"Wise Man's Grandchild","rarity":82,"aliases":["Kenja no Mago"]},{"name":"Yona of the Dawn","rarity":30,"aliases":["Akatsuki no Yona"]},{"name":"Ranking of Kings","rarity":25,"aliases":["Ousama Ranking"]},{"name":"Sword Art Online","rarity":30,"aliases":["SAO"]},{"name":"Spice and Wolf","rarity":30,"aliases":[]},{"name":"Nausicaä of the Valley of the Wind","rarity":30,"aliases":["Nausicaa"]},{"name":"Mashle: Magic and Muscles","rarity":30,"aliases":["Mashle"]},{"name":"Tower of God","rarity":30,"aliases":["Kami no Tou"]},{"name":"Arifureta: From Commonplace to World's Strongest","rarity":40,"aliases":["Arifureta"]},{"name":"Tsukimichi -Moonlit Fantasy-","rarity":45,"aliases":["Tsukimichi"]},{"name":"Helck","rarity":50,"aliases":[]}]},
 {"id":"timed-v4-descent-9-medical-professionals","anime":"mixed","category":"Any anime","text":"Name any anime character who is a doctor or medical professional.","note":"Doctors, nurses, surgeons and other medical professionals","since":"2026-11-28","descent":"char","conceptId":"nov28-medical-professionals","top":"Tony Tony Chopper","answers":[{"name":"Akiko Yosano","rarity":74,"aliases":[]},{"name":"Akira Saitou","rarity":72,"aliases":["Akira Saitou (Ameku)"]},{"name":"Aladine","rarity":48,"aliases":["Aladdin"]},{"name":"Alpha","rarity":55,"aliases":["Alpha (One Piece)"]},{"name":"Ameku Takao","rarity":72,"aliases":["Dr. Ameku Takao"]},{"name":"Aoi Kanzaki","rarity":65,"aliases":[]},{"name":"Atago Niina","rarity":55,"aliases":[]},{"name":"Belladonna","rarity":55,"aliases":[]},{"name":"Biwako Sarutobi","rarity":55,"aliases":[]},{"name":"Black Jack","rarity":15,"aliases":["Kuroo Hazama","Doctor Kuroo Hazama"]},{"name":"Brock","rarity":30,"aliases":["Takeshi"]},{"name":"Bruno de Médicis","rarity":82,"aliases":[]},{"name":"Cassandra","rarity":55,"aliases":["Cassandra (One Piece)"]},{"name":"Chiyo","rarity":48,"aliases":[]},{"name":"Crocus","rarity":28,"aliases":[]},{"name":"Dieter","rarity":55,"aliases":["Dieter (Monster)"]},{"name":"Doc Q","rarity":28,"aliases":[]},{"name":"Doctor Hunt","rarity":55,"aliases":[]},{"name":"Dr. Akiba","rarity":72,"aliases":[]},{"name":"Dr. Becker","rarity":55,"aliases":[]},{"name":"Dr. Boyer","rarity":82,"aliases":[]},{"name":"Dr. Chin","rarity":55,"aliases":[]},{"name":"Dr. Chubachi","rarity":55,"aliases":[]},{"name":"Dr. Fujimiya","rarity":55,"aliases":[]},{"name":"Dr. Fuji","rarity":72,"aliases":["Dr. Fuji (Pokémon)"]},{"name":"Dr. Furumachi","rarity":55,"aliases":[]},{"name":"Dr. Gillen","rarity":55,"aliases":[]},{"name":"Dr. Hanamoto","rarity":55,"aliases":[]},{"name":"Dr. Heinemann","rarity":65,"aliases":[]},{"name":"Dr. Hesse","rarity":55,"aliases":["Dr. Hesse (Monster)"]},{"name":"Dr. Honma","rarity":65,"aliases":["Dr. Jotaro Honma"]},{"name":"Dr. Kanemaru","rarity":55,"aliases":[]},{"name":"Dr. Kazama","rarity":74,"aliases":[]},{"name":"Dr. Kiriko","rarity":65,"aliases":[]},{"name":"Dr. Mochizuki","rarity":55,"aliases":[]},{"name":"Dr. Nakayama","rarity":74,"aliases":[]},{"name":"Dr. Nishi","rarity":74,"aliases":[]},{"name":"Dr. Nishiyama","rarity":55,"aliases":[]},{"name":"Dr. Ohtsuka","rarity":55,"aliases":[]},{"name":"Dr. Proctor","rarity":65,"aliases":[]},{"name":"Dr. Robert","rarity":55,"aliases":["Dr. Robert (Monster)"]},{"name":"Dr. Sagawa","rarity":55,"aliases":[]},{"name":"Dr. Saruta","rarity":74,"aliases":[]},{"name":"Dr. Schuwald","rarity":55,"aliases":[]},{"name":"Dr. Takashi","rarity":55,"aliases":[]},{"name":"Dr. Takeuchi","rarity":55,"aliases":[]},{"name":"Dr. Tamotsu","rarity":72,"aliases":[]},{"name":"Dr. Uzaki","rarity":55,"aliases":[]},{"name":"Dr. Wolf","rarity":55,"aliases":["Dr. Wolf (Monster)"]},{"name":"Dr. Yamamoto","rarity":55,"aliases":[]},{"name":"Dwanger","rarity":55,"aliases":[]},{"name":"Eléonore Bonnefoi","rarity":82,"aliases":["Elen"]},{"name":"Elise de Clorance","rarity":72,"aliases":[]},{"name":"Époni","rarity":55,"aliases":[]},{"name":"Eva Heinemann","rarity":55,"aliases":[]},{"name":"Farma de Médicis","rarity":82,"aliases":[]},{"name":"Fumiko Yamaguchi","rarity":72,"aliases":[]},{"name":"Gerd","rarity":55,"aliases":["Gerd (One Piece)"]},{"name":"Gold-Toothed Doctor","rarity":65,"aliases":[]},{"name":"Graham de Fallon","rarity":72,"aliases":[]},{"name":"Grisha Yeager","rarity":65,"aliases":["Grisha Jaeger"]},{"name":"Hachigen Ushoda","rarity":55,"aliases":[]},{"name":"Hana Kurusu","rarity":55,"aliases":["Hana Kurusu (JJK)"]},{"name":"Hanataro Yamada","rarity":55,"aliases":["Hanatarou Yamada","Hanataro Yamada (4th Division)"]},{"name":"Hibiki Morishima","rarity":82,"aliases":[]},{"name":"Hiriluk","rarity":28,"aliases":["Dr. Hiriluk","Hiluluk","Dr. Hiluluk"]},{"name":"Hiroshi Irabu","rarity":72,"aliases":[]},{"name":"Hiroshi Suzuya","rarity":72,"aliases":[]},{"name":"Hogback","rarity":28,"aliases":["Dr. Hogback"]},{"name":"Homey","rarity":55,"aliases":[]},{"name":"Hongo","rarity":48,"aliases":[]},{"name":"Honner","rarity":55,"aliases":[]},{"name":"Ho","rarity":55,"aliases":["Ho (One Piece)"]},{"name":"Ino Yamanaka","rarity":48,"aliases":[]},{"name":"Isane Kotetsu","rarity":55,"aliases":["Isane Kotetsu (4th Division)"]},{"name":"Julius Reichwein","rarity":65,"aliases":["Dr. Reichwein"]},{"name":"Kabuto Yakushi","rarity":48,"aliases":[]},{"name":"Kanae Kocho","rarity":80,"aliases":[]},{"name":"Kana Fujii","rarity":82,"aliases":[]},{"name":"Karin Uzumaki","rarity":48,"aliases":[]},{"name":"Kenzo Tenma","rarity":30,"aliases":["Dr. Tenma"]},{"name":"Kiruko","rarity":55,"aliases":[]},{"name":"Kiyone Kotetsu","rarity":55,"aliases":[]},{"name":"Kiyo Terauchi","rarity":55,"aliases":[]},{"name":"Knox","rarity":65,"aliases":["Dr. Knox"]},{"name":"Kobato","rarity":48,"aliases":[]},{"name":"Kureha","rarity":28,"aliases":["Dr. Kureha"]},{"name":"Kurotsuru","rarity":55,"aliases":[]},{"name":"Kyudai Garaki","rarity":65,"aliases":["Daruma Ujiko"]},{"name":"Kyukyu","rarity":48,"aliases":[]},{"name":"Loid Forger","rarity":65,"aliases":["Twilight"]},{"name":"Luomen","rarity":82,"aliases":[]},{"name":"Maomao","rarity":30,"aliases":[]},{"name":"Marco","rarity":28,"aliases":[]},{"name":"Masked Deuce","rarity":55,"aliases":[]},{"name":"Mayumi","rarity":72,"aliases":["Mayumi (Kuuchuu Buranko)"]},{"name":"Mikhail","rarity":72,"aliases":["Mikhail (Doctor Elise)"]},{"name":"Miyagi","rarity":48,"aliases":[]},{"name":"Mr. Jaeger","rarity":65,"aliases":["Dr. Jaeger"]},{"name":"Muchana","rarity":55,"aliases":[]},{"name":"Muret","rarity":55,"aliases":[]},{"name":"Nafk","rarity":55,"aliases":[]},{"name":"Naho Takada","rarity":55,"aliases":[]},{"name":"Nako","rarity":55,"aliases":[]},{"name":"Nemu Kurotsuchi","rarity":55,"aliases":[]},{"name":"Nightin","rarity":55,"aliases":[]},{"name":"Nono Yakushi","rarity":48,"aliases":["Yakushi Nono"]},{"name":"Nurse Joy","rarity":30,"aliases":["Joy","Nurse Joy (Orange Islands)"]},{"name":"Orihime Inoue","rarity":55,"aliases":[]},{"name":"Pierre","rarity":82,"aliases":[]},{"name":"Pinoko","rarity":55,"aliases":["Pinoko (Black Jack)"]},{"name":"Potsun","rarity":48,"aliases":[]},{"name":"Ramune","rarity":82,"aliases":[]},{"name":"Recovery Girl","rarity":30,"aliases":["Chiyo Shuzenji"]},{"name":"Reimi Itsushiro","rarity":82,"aliases":[]},{"name":"Retsu Unohana","rarity":30,"aliases":["Yachiru Unohana","Retsu Unohana (healer)"]},{"name":"Ria Karasuma","rarity":82,"aliases":[]},{"name":"Rin Nohara","rarity":48,"aliases":[]},{"name":"Sakura Haruno","rarity":20,"aliases":[]},{"name":"Sarbay","rarity":55,"aliases":[]},{"name":"Seinosuke Yamada","rarity":55,"aliases":[]},{"name":"Shinobu Kocho","rarity":25,"aliases":["Shinobu Kochou"]},{"name":"Shizune","rarity":30,"aliases":[]},{"name":"Shoko Ieiri","rarity":30,"aliases":[]},{"name":"Suirei","rarity":82,"aliases":[]},{"name":"Sumi Nakahara","rarity":55,"aliases":[]},{"name":"Tamayo","rarity":30,"aliases":["Tamayo (Demon Slayer)"]},{"name":"Tate","rarity":55,"aliases":["Tate (One Piece)"]},{"name":"Tegata Ringana","rarity":55,"aliases":[]},{"name":"Tenjiro Kirinji","rarity":55,"aliases":["Tenjirou Kirinji","Tenjiro Kirinji (hot spring healer)"]},{"name":"Tim Marcoh","rarity":30,"aliases":["Dr. Marcoh"]},{"name":"Tonton","rarity":55,"aliases":["Tonton (Naruto)"]},{"name":"Tony Tony Chopper","rarity":0,"aliases":["Chopper"]},{"name":"Trafalgar D. Water Law","rarity":20,"aliases":["Trafalgar Law"]},{"name":"Tristan","rarity":48,"aliases":[]},{"name":"Tsunade","rarity":15,"aliases":[]},{"name":"Uryu Ishida","rarity":55,"aliases":[]},{"name":"Whitejack","rarity":55,"aliases":[]},{"name":"Yokan","rarity":55,"aliases":["Yokan (One Piece)"]},{"name":"Yulien Childe","rarity":72,"aliases":[]},{"name":"Yushiro","rarity":30,"aliases":["Yushirou","Yushiro (Demon Slayer)"]},{"name":"Yuu Takanashi","rarity":74,"aliases":[]},{"name":"Zabal","rarity":55,"aliases":[]},{"name":"Leorio Paradinight","rarity":20,"aliases":["Leorio"]},{"name":"Franken Stein","rarity":30,"aliases":["Stein","Dr. Stein"]},{"name":"Cheadle Yorkshire","rarity":40,"aliases":["Cheadle"]},{"name":"Faust VIII","rarity":40,"aliases":["Faust"]}]},
 {"id":"timed-v4-descent-9-superhuman-strength","anime":"mixed","category":"Any anime","text":"Name any anime character with superhuman strength.","note":"Physically far stronger than any normal human","since":"2026-11-28","descent":"char","conceptId":"nov28-superhuman-strength","top":"Saitama","answers":[{"name":"Achilles","rarity":82,"aliases":[]},{"name":"Acnologia","rarity":82,"aliases":[]},{"name":"Adam Dudley","rarity":82,"aliases":[]},{"name":"Agito Kanoh","rarity":82,"aliases":[]},{"name":"Ainz Ooal Gown","rarity":82,"aliases":[]},{"name":"Akaza","rarity":30,"aliases":[]},{"name":"Choji Akimichi","rarity":65,"aliases":["Akimichi Choji","Chouji Akimichi"]},{"name":"Akimichi Choza","rarity":82,"aliases":["Chouza Akimichi"]},{"name":"Akisame Koetsuji","rarity":82,"aliases":[]},{"name":"Albedo","rarity":30,"aliases":[]},{"name":"Alex Louis Armstrong","rarity":82,"aliases":[]},{"name":"All For One","rarity":68,"aliases":[]},{"name":"All Might","rarity":30,"aliases":["Toshinori Yagi"]},{"name":"Alphonse Elric","rarity":82,"aliases":[]},{"name":"Amai Mask","rarity":67,"aliases":[]},{"name":"Android 16","rarity":48,"aliases":[]},{"name":"Android 17","rarity":10,"aliases":[]},{"name":"Android 18","rarity":10,"aliases":[]},{"name":"Annie Leonhart","rarity":82,"aliases":[]},{"name":"Aoi Todo","rarity":30,"aliases":["Aoi Toudou"]},{"name":"Apachai Hopachai","rarity":82,"aliases":[]},{"name":"Aramaki","rarity":63,"aliases":[]},{"name":"Arlong","rarity":63,"aliases":[]},{"name":"Armin Arlert","rarity":82,"aliases":[]},{"name":"Armored Gorilla","rarity":67,"aliases":[]},{"name":"Arthur Pendragon","rarity":82,"aliases":[]},{"name":"Artoria Pendragon","rarity":82,"aliases":["Saber"]},{"name":"Asta","rarity":30,"aliases":[]},{"name":"Atomic Samurai","rarity":67,"aliases":[]},{"name":"Atsushi Suedo","rarity":82,"aliases":[]},{"name":"Aura Bella Fiora","rarity":82,"aliases":[]},{"name":"Baek Seungchul","rarity":82,"aliases":[]},{"name":"Baki Hanma","rarity":25,"aliases":[]},{"name":"Bakuzan","rarity":67,"aliases":[]},{"name":"Ban","rarity":30,"aliases":[]},{"name":"Bang","rarity":30,"aliases":["Silver Fang"]},{"name":"Bankotsu","rarity":82,"aliases":[]},{"name":"Bara","rarity":65,"aliases":[]},{"name":"Bardock","rarity":65,"aliases":[]},{"name":"Bartholomew Kuma","rarity":82,"aliases":[]},{"name":"Bartolomeo","rarity":63,"aliases":[]},{"name":"Basil Hawkins","rarity":63,"aliases":[]},{"name":"Beast King","rarity":67,"aliases":[]},{"name":"Beerus","rarity":30,"aliases":[]},{"name":"Bellamy","rarity":82,"aliases":[]},{"name":"Benimaru","rarity":82,"aliases":[]},{"name":"Berserker of Black","rarity":82,"aliases":["Frankenstein"]},{"name":"Bertholdt Hoover","rarity":82,"aliases":[]},{"name":"Big Mom","rarity":30,"aliases":["Charlotte Linlin"]},{"name":"Biscuit Krueger","rarity":82,"aliases":["Bisky"]},{"name":"Biscuit Oliva","rarity":82,"aliases":[]},{"name":"Black Maria","rarity":63,"aliases":[]},{"name":"Black Sperm","rarity":67,"aliases":[]},{"name":"Boa Hancock","rarity":82,"aliases":[]},{"name":"Bomb","rarity":82,"aliases":[]},{"name":"Bonolenov Ndongo","rarity":65,"aliases":[]},{"name":"Boros","rarity":30,"aliases":[]},{"name":"Borsalino","rarity":82,"aliases":["Kizaru"]},{"name":"Brain Unglaus","rarity":82,"aliases":[]},{"name":"Brogy","rarity":82,"aliases":[]},{"name":"Broly","rarity":30,"aliases":[]},{"name":"Brook","rarity":82,"aliases":[]},{"name":"Brovada","rarity":65,"aliases":[]},{"name":"Buhara","rarity":65,"aliases":[]},{"name":"Burgess Jesus","rarity":82,"aliases":["Jesus Burgess"]},{"name":"Byakuya Kuchiki","rarity":82,"aliases":[]},{"name":"Cabba","rarity":65,"aliases":[]},{"name":"Canary","rarity":65,"aliases":[]},{"name":"Caribou","rarity":63,"aliases":[]},{"name":"Carnage Kabuto","rarity":67,"aliases":[]},{"name":"Carrion","rarity":82,"aliases":[]},{"name":"Caulifla","rarity":65,"aliases":[]},{"name":"Cavendish","rarity":63,"aliases":[]},{"name":"Cell","rarity":30,"aliases":[]},{"name":"Centichoro","rarity":67,"aliases":[]},{"name":"Charlotte Amande","rarity":63,"aliases":[]},{"name":"Charlotte Brulee","rarity":63,"aliases":[]},{"name":"Charlotte Compote","rarity":63,"aliases":[]},{"name":"Charlotte Cracker","rarity":82,"aliases":[]},{"name":"Charlotte Daifuku","rarity":63,"aliases":[]},{"name":"Charlotte Galette","rarity":63,"aliases":[]},{"name":"Charlotte Katakuri","rarity":82,"aliases":[]},{"name":"Charlotte Mont-d'Or","rarity":63,"aliases":[]},{"name":"Charlotte Moscato","rarity":63,"aliases":[]},{"name":"Charlotte Opera","rarity":63,"aliases":[]},{"name":"Charlotte Oven","rarity":63,"aliases":[]},{"name":"Charlotte Perospero","rarity":63,"aliases":[]},{"name":"Charlotte Smoothie","rarity":63,"aliases":[]},{"name":"Charlotte Snack","rarity":63,"aliases":[]},{"name":"Cheetu","rarity":65,"aliases":[]},{"name":"Chi-Chi","rarity":48,"aliases":[]},{"name":"Chiharu Shiba","rarity":82,"aliases":[]},{"name":"Chopper","rarity":82,"aliases":[]},{"name":"Choso","rarity":65,"aliases":[]},{"name":"Choze","rarity":67,"aliases":[]},{"name":"Chrollo Lucilfer","rarity":65,"aliases":[]},{"name":"Chu","rarity":82,"aliases":["Chuu"]},{"name":"Cocytus","rarity":82,"aliases":[]},{"name":"Colt","rarity":65,"aliases":[]},{"name":"Coribou","rarity":63,"aliases":[]},{"name":"Cosmo Imai","rarity":82,"aliases":[]},{"name":"Crocodile","rarity":82,"aliases":[]},{"name":"Cu Chulainn","rarity":82,"aliases":["Lancer"]},{"name":"Dabi","rarity":68,"aliases":[]},{"name":"Dagon","rarity":65,"aliases":[]},{"name":"Daki","rarity":82,"aliases":[]},{"name":"Dante Zogratis","rarity":82,"aliases":[]},{"name":"Darkshine","rarity":67,"aliases":[]},{"name":"Deep Sea King","rarity":67,"aliases":[]},{"name":"Dellinger","rarity":63,"aliases":[]},{"name":"Demiurge","rarity":82,"aliases":[]},{"name":"Diablo","rarity":82,"aliases":[]},{"name":"Diamante","rarity":63,"aliases":[]},{"name":"Diane","rarity":30,"aliases":[]},{"name":"Dio Brando","rarity":30,"aliases":["DIO"]},{"name":"Doberman","rarity":63,"aliases":[]},{"name":"Doma","rarity":82,"aliases":[]},{"name":"Don Chinjao","rarity":82,"aliases":[]},{"name":"Don Krieg","rarity":63,"aliases":[]},{"name":"Donquixote Doflamingo","rarity":82,"aliases":[]},{"name":"Donquixote Rosinante","rarity":63,"aliases":[]},{"name":"Doppo Orochi","rarity":82,"aliases":[]},{"name":"Dorian","rarity":82,"aliases":[]},{"name":"Dorry","rarity":82,"aliases":[]},{"name":"Edgeshot","rarity":68,"aliases":[]},{"name":"Edward Newgate","rarity":30,"aliases":["Whitebeard"]},{"name":"Eijiro Kirishima","rarity":30,"aliases":["Kirishima"]},{"name":"Elder Centipede","rarity":67,"aliases":[]},{"name":"Elfman Strauss","rarity":82,"aliases":[]},{"name":"Elizabeth Liones","rarity":82,"aliases":[]},{"name":"Elsa Granhiert","rarity":82,"aliases":[]},{"name":"Endeavor","rarity":68,"aliases":[]},{"name":"Enel","rarity":82,"aliases":[]},{"name":"Envy","rarity":82,"aliases":[]},{"name":"Eraser Head","rarity":68,"aliases":[]},{"name":"Eren Yeager","rarity":82,"aliases":[]},{"name":"Erza Scarlet","rarity":82,"aliases":[]},{"name":"Escanor","rarity":30,"aliases":[]},{"name":"Esidisi","rarity":82,"aliases":[]},{"name":"Estarossa","rarity":82,"aliases":[]},{"name":"Eustass Kid","rarity":82,"aliases":[]},{"name":"Falco Grice","rarity":82,"aliases":[]},{"name":"Fat Gum","rarity":82,"aliases":["Taishiro Toyomitsu"]},{"name":"Feitan Portor","rarity":65,"aliases":[]},{"name":"Fisher Tiger","rarity":63,"aliases":[]},{"name":"Flashy Flash","rarity":67,"aliases":[]},{"name":"Flutter","rarity":65,"aliases":[]},{"name":"Franklin Bordeau","rarity":65,"aliases":[]},{"name":"Franky","rarity":30,"aliases":[]},{"name":"Frieza","rarity":10,"aliases":["Freeza"]},{"name":"Fuegoleon Vermillion","rarity":82,"aliases":[]},{"name":"Fuhrer Ugly","rarity":67,"aliases":[]},{"name":"Fumikage Tokoyami","rarity":68,"aliases":[]},{"name":"Future Trunks","rarity":48,"aliases":[]},{"name":"Gaara","rarity":30,"aliases":[]},{"name":"Gaia","rarity":82,"aliases":[]},{"name":"Gajeel Redfox","rarity":82,"aliases":[]},{"name":"Gang Orca","rarity":68,"aliases":[]},{"name":"Gaolang Wongsawat","rarity":82,"aliases":[]},{"name":"Garfiel Tinsel","rarity":82,"aliases":[]},{"name":"Garou","rarity":30,"aliases":[]},{"name":"Garp","rarity":30,"aliases":["Monkey D. Garp"]},{"name":"Gawain","rarity":82,"aliases":[]},{"name":"Gazef Stronoff","rarity":82,"aliases":[]},{"name":"Gazel Dwargo","rarity":82,"aliases":[]},{"name":"Geld","rarity":82,"aliases":[]},{"name":"Genos","rarity":30,"aliases":[]},{"name":"Genryusai Yamamoto","rarity":82,"aliases":[]},{"name":"Genthru","rarity":65,"aliases":[]},{"name":"Gerd","rarity":63,"aliases":[]},{"name":"Gigantomachia","rarity":68,"aliases":[]},{"name":"Gildarts Clive","rarity":82,"aliases":[]},{"name":"Gilgamesh","rarity":82,"aliases":[]},{"name":"Giyu Tomioka","rarity":82,"aliases":[]},{"name":"Gladius","rarity":63,"aliases":[]},{"name":"Gluttony","rarity":82,"aliases":[]},{"name":"Gohan","rarity":28,"aliases":["Son Gohan"]},{"name":"Goki Shibukawa","rarity":82,"aliases":["Gouki Shibukawa"]},{"name":"Goku","rarity":10,"aliases":["Son Goku"]},{"name":"Goku Black","rarity":65,"aliases":[]},{"name":"Goldberg","rarity":63,"aliases":[]},{"name":"Golden Sperm","rarity":67,"aliases":[]},{"name":"Gon Freecss","rarity":82,"aliases":[]},{"name":"Goreinu","rarity":65,"aliases":[]},{"name":"Goten","rarity":48,"aliases":[]},{"name":"Gotoh","rarity":65,"aliases":[]},{"name":"Gouketsu","rarity":67,"aliases":[]},{"name":"Gowther","rarity":82,"aliases":[]},{"name":"Gran Torino","rarity":82,"aliases":["Sorahiko Torino"]},{"name":"Gray Fullbuster","rarity":82,"aliases":[]},{"name":"Greed","rarity":82,"aliases":[]},{"name":"Grimmjow Jaegerjaquez","rarity":82,"aliases":[]},{"name":"Groribas","rarity":67,"aliases":[]},{"name":"Gyomei Himejima","rarity":30,"aliases":[]},{"name":"Gyutaro","rarity":82,"aliases":[]},{"name":"Hack","rarity":82,"aliases":[]},{"name":"Hajime Kashimo","rarity":65,"aliases":[]},{"name":"Hajrudin","rarity":63,"aliases":[]},{"name":"Hakurou","rarity":82,"aliases":[]},{"name":"Hanabi Hyuga","rarity":65,"aliases":[]},{"name":"Hanami","rarity":65,"aliases":[]},{"name":"Han Daewi","rarity":82,"aliases":["Daewi Han"]},{"name":"Hantengu","rarity":82,"aliases":[]},{"name":"Hanzo","rarity":65,"aliases":[]},{"name":"Haruo Kono","rarity":82,"aliases":[]},{"name":"Hashirama Senju","rarity":82,"aliases":[]},{"name":"Hatchan","rarity":63,"aliases":[]},{"name":"Hatsumi Sen","rarity":82,"aliases":[]},{"name":"Hawk Mama","rarity":82,"aliases":[]},{"name":"Hayato Furinji","rarity":82,"aliases":[]},{"name":"Helmeppo","rarity":63,"aliases":[]},{"name":"Heracles","rarity":82,"aliases":[]},{"name":"Hiashi Hyuga","rarity":65,"aliases":[]},{"name":"Hidan","rarity":82,"aliases":[]},{"name":"Hiei","rarity":82,"aliases":[]},{"name":"High-End Nomu","rarity":68,"aliases":[]},{"name":"Himiko Toga","rarity":68,"aliases":[]},{"name":"Hinata Hyuga","rarity":65,"aliases":["Hinata Hyuuga"]},{"name":"Hisoka Morow","rarity":65,"aliases":[]},{"name":"Hit","rarity":48,"aliases":[]},{"name":"Hody Jones","rarity":63,"aliases":[]},{"name":"Ichigo Kurosaki","rarity":82,"aliases":[]},{"name":"Ideo","rarity":63,"aliases":[]},{"name":"Ikalgo","rarity":65,"aliases":[]},{"name":"Ikkaku Madarame","rarity":82,"aliases":[]},{"name":"Illumi Zoldyck","rarity":65,"aliases":[]},{"name":"Inosuke Hashibira","rarity":82,"aliases":[]},{"name":"Inumaki Toge","rarity":65,"aliases":[]},{"name":"Inuyasha","rarity":82,"aliases":[]},{"name":"Iskandar","rarity":82,"aliases":[]},{"name":"Issho","rarity":63,"aliases":[]},{"name":"Itsuka Kendo","rarity":68,"aliases":[]},{"name":"Izuku Midoriya","rarity":10,"aliases":["Deku"]},{"name":"Jack","rarity":82,"aliases":[]},{"name":"Jack Hanma","rarity":82,"aliases":[]},{"name":"Jakotsu","rarity":82,"aliases":[]},{"name":"Jaku Kaioh","rarity":82,"aliases":[]},{"name":"Jarul","rarity":63,"aliases":[]},{"name":"Jellal Fernandes","rarity":82,"aliases":[]},{"name":"Jewelry Bonney","rarity":63,"aliases":[]},{"name":"Jin","rarity":82,"aliases":[]},{"name":"Jinbe","rarity":30,"aliases":["Jimbei"]},{"name":"Jin Mori","rarity":82,"aliases":["Mori Jin"]},{"name":"Jiraiya","rarity":82,"aliases":[]},{"name":"Jiren","rarity":30,"aliases":[]},{"name":"Jogo","rarity":65,"aliases":[]},{"name":"Jonathan Joestar","rarity":82,"aliases":[]},{"name":"Jorul","rarity":63,"aliases":[]},{"name":"Julius Juukulius","rarity":82,"aliases":[]},{"name":"Julius Reinhold","rarity":82,"aliases":[]},{"name":"Jun Guevara","rarity":82,"aliases":["Jun Gebaru"]},{"name":"Jun Sekibayashi","rarity":82,"aliases":[]},{"name":"Juvia Lockser","rarity":82,"aliases":[]},{"name":"Kaguya Otsutsuki","rarity":82,"aliases":["Ootsutsuki Kaguya"]},{"name":"Kai Chisaki","rarity":68,"aliases":[]},{"name":"Kaido","rarity":30,"aliases":["Kaidou"]},{"name":"Kakashi Hatake","rarity":82,"aliases":[]},{"name":"Kaku","rarity":82,"aliases":[]},{"name":"Kaku Kaioh","rarity":82,"aliases":[]},{"name":"Kakuzu","rarity":82,"aliases":[]},{"name":"Kale","rarity":65,"aliases":[]},{"name":"Kalluto Zoldyck","rarity":65,"aliases":[]},{"name":"Kamui Woods","rarity":68,"aliases":[]},{"name":"Kaneda Suekichi","rarity":82,"aliases":[]},{"name":"Kang Manseok","rarity":82,"aliases":[]},{"name":"Kaoru Hanayama","rarity":82,"aliases":[]},{"name":"Karate Island King","rarity":63,"aliases":[]},{"name":"Karna","rarity":82,"aliases":[]},{"name":"Kars","rarity":30,"aliases":[]},{"name":"Kashii","rarity":63,"aliases":[]},{"name":"Kastro","rarity":82,"aliases":[]},{"name":"Katsuki Bakugo","rarity":82,"aliases":["Bakugou"]},{"name":"Katsumi Orochi","rarity":82,"aliases":[]},{"name":"Kazuma Kuwabara","rarity":82,"aliases":[]},{"name":"Kenichi Shirahama","rarity":82,"aliases":[]},{"name":"Kenjaku","rarity":65,"aliases":[]},{"name":"Kenny Ackerman","rarity":82,"aliases":[]},{"name":"Kenpachi Zaraki","rarity":25,"aliases":[]},{"name":"Kensei Ma","rarity":82,"aliases":[]},{"name":"Kensei Muguruma","rarity":82,"aliases":[]},{"name":"Kento Nanami","rarity":65,"aliases":[]},{"name":"Kiba Inuzuka","rarity":65,"aliases":[]},{"name":"Kikyo Zoldyck","rarity":65,"aliases":[]},{"name":"Killer","rarity":82,"aliases":[]},{"name":"Killer Bee","rarity":82,"aliases":[]},{"name":"Killua Zoldyck","rarity":82,"aliases":[]},{"name":"King","rarity":82,"aliases":["Alber"]},{"name":"King Bradley","rarity":82,"aliases":[]},{"name":"Kinji Hakari","rarity":65,"aliases":[]},{"name":"Kiozan Takeru","rarity":82,"aliases":[]},{"name":"Kirara","rarity":82,"aliases":[]},{"name":"Kisame Hoshigaki","rarity":82,"aliases":[]},{"name":"Knuckle Bine","rarity":82,"aliases":[]},{"name":"Knuckleduster","rarity":82,"aliases":[]},{"name":"Koala","rarity":82,"aliases":[]},{"name":"Koby","rarity":82,"aliases":[]},{"name":"Koga","rarity":82,"aliases":["Kouga"]},{"name":"Kokushibo","rarity":82,"aliases":[]},{"name":"Komamura Sajin","rarity":82,"aliases":[]},{"name":"Krillin","rarity":28,"aliases":["Kuririn"]},{"name":"Kurapika","rarity":65,"aliases":[]},{"name":"Kuro","rarity":63,"aliases":[]},{"name":"Kuroki Gensai","rarity":82,"aliases":[]},{"name":"Kuroobi","rarity":63,"aliases":[]},{"name":"Kuzan","rarity":82,"aliases":["Aokiji"]},{"name":"Kyojuro Rengoku","rarity":82,"aliases":[]},{"name":"Lancelot","rarity":82,"aliases":[]},{"name":"Lan Fan","rarity":82,"aliases":[]},{"name":"Lao G","rarity":82,"aliases":[]},{"name":"Lara Tybur","rarity":82,"aliases":[]},{"name":"Laxus Dreyar","rarity":82,"aliases":[]},{"name":"Leol","rarity":65,"aliases":[]},{"name":"Leorio Paradinight","rarity":65,"aliases":[]},{"name":"Levi Ackerman","rarity":30,"aliases":[]},{"name":"Licht","rarity":82,"aliases":[]},{"name":"Liebe","rarity":82,"aliases":[]},{"name":"Ling Yao","rarity":82,"aliases":[]},{"name":"Luck Voltia","rarity":82,"aliases":[]},{"name":"Lupusregina Beta","rarity":82,"aliases":[]},{"name":"Machi Komacine","rarity":65,"aliases":[]},{"name":"Machvise","rarity":63,"aliases":[]},{"name":"Madara Uchiha","rarity":82,"aliases":[]},{"name":"Mael","rarity":82,"aliases":[]},{"name":"Magna Swing","rarity":82,"aliases":[]},{"name":"Mahito","rarity":65,"aliases":[]},{"name":"Majin Buu","rarity":30,"aliases":[]},{"name":"Makarov Dreyar","rarity":82,"aliases":[]},{"name":"Maki Zenin","rarity":30,"aliases":[]},{"name":"Marco","rarity":82,"aliases":[]},{"name":"Mare Bello Fiore","rarity":82,"aliases":[]},{"name":"Mashirao Ojiro","rarity":82,"aliases":["Tailman"]},{"name":"Mashiro Kuna","rarity":82,"aliases":[]},{"name":"Master Roshi","rarity":28,"aliases":["Kame Sennin"]},{"name":"Mechamaru","rarity":65,"aliases":[]},{"name":"Mei Mei","rarity":65,"aliases":[]},{"name":"Melegor","rarity":65,"aliases":[]},{"name":"Meliodas","rarity":30,"aliases":[]},{"name":"Melzargard","rarity":67,"aliases":[]},{"name":"Menchi","rarity":65,"aliases":[]},{"name":"Menthuthuyoupi","rarity":65,"aliases":[]},{"name":"Mereoleona Vermillion","rarity":82,"aliases":[]},{"name":"Merlin","rarity":82,"aliases":[]},{"name":"Meruem","rarity":30,"aliases":[]},{"name":"Metal Bat","rarity":30,"aliases":[]},{"name":"Metal Lee","rarity":65,"aliases":[]},{"name":"Mezo Shoji","rarity":68,"aliases":[]},{"name":"Might Duy","rarity":82,"aliases":["Might Dai"]},{"name":"Might Guy","rarity":30,"aliases":["Maito Gai"]},{"name":"Mikasa Ackerman","rarity":30,"aliases":[]},{"name":"Mikazuchi Rei","rarity":82,"aliases":[]},{"name":"Milim Nava","rarity":82,"aliases":[]},{"name":"Mina Ashido","rarity":68,"aliases":[]},{"name":"Minato Namikaze","rarity":82,"aliases":[]},{"name":"Mirajane Strauss","rarity":82,"aliases":[]},{"name":"Mirio Togata","rarity":82,"aliases":["Lemillion"]},{"name":"Mirko","rarity":30,"aliases":["Rumi Usagiyama"]},{"name":"Mitsuri Kanroji","rarity":30,"aliases":[]},{"name":"Miu Furinji","rarity":82,"aliases":[]},{"name":"Mohammad Alai Jr.","rarity":82,"aliases":[]},{"name":"Mokichi Robinson","rarity":82,"aliases":[]},{"name":"Momonga","rarity":63,"aliases":[]},{"name":"Monkey D. Luffy","rarity":10,"aliases":["Luffy"]},{"name":"Mordred","rarity":82,"aliases":[]},{"name":"Morel Mackernasey","rarity":65,"aliases":[]},{"name":"Mosquito Girl","rarity":67,"aliases":[]},{"name":"Mt. Lady","rarity":68,"aliases":[]},{"name":"Muichiro Tokito","rarity":82,"aliases":[]},{"name":"Muscular","rarity":82,"aliases":[]},{"name":"Muteba Gizenga","rarity":82,"aliases":[]},{"name":"Muzan Kibutsuji","rarity":82,"aliases":[]},{"name":"Nacht Faust","rarity":82,"aliases":[]},{"name":"Nana Shimura","rarity":82,"aliases":[]},{"name":"Naobito Zenin","rarity":82,"aliases":[]},{"name":"Nappa","rarity":65,"aliases":[]},{"name":"Naraku","rarity":82,"aliases":[]},{"name":"Naruto Uzumaki","rarity":10,"aliases":[]},{"name":"Natsu Dragneel","rarity":30,"aliases":["Natsu"]},{"name":"Natsu Tanimoto","rarity":82,"aliases":["Hermit"]},{"name":"Neferpitou","rarity":65,"aliases":[]},{"name":"Neji Hyuga","rarity":65,"aliases":["Neji Hyuuga"]},{"name":"Nejire Hado","rarity":68,"aliases":[]},{"name":"Netero","rarity":30,"aliases":["Isaac Netero"]},{"name":"Nezuko Kamado","rarity":82,"aliases":[]},{"name":"Nnoitra Gilga","rarity":82,"aliases":[]},{"name":"Nobunaga Hazama","rarity":65,"aliases":[]},{"name":"Noelle Silva","rarity":82,"aliases":[]},{"name":"Nomu","rarity":68,"aliases":[]},{"name":"Nyan","rarity":67,"aliases":[]},{"name":"Obito Uchiha","rarity":82,"aliases":[]},{"name":"Ochaco Uraraka","rarity":68,"aliases":[]},{"name":"Ohma Tokita","rarity":82,"aliases":["Tokita Ohma"]},{"name":"Oimo","rarity":63,"aliases":[]},{"name":"Onigumo","rarity":63,"aliases":[]},{"name":"Orochi","rarity":67,"aliases":[]},{"name":"Orochimaru","rarity":82,"aliases":[]},{"name":"Page One","rarity":63,"aliases":[]},{"name":"Palm Siberia","rarity":65,"aliases":[]},{"name":"Pan","rarity":48,"aliases":[]},{"name":"Panda","rarity":82,"aliases":[]},{"name":"Pandora's Actor","rarity":82,"aliases":[]},{"name":"Park Ilpyo","rarity":82,"aliases":["Ilpyo Park"]},{"name":"Phinks Magcub","rarity":82,"aliases":[]},{"name":"Pica","rarity":63,"aliases":[]},{"name":"Piccolo","rarity":28,"aliases":[]},{"name":"Pickle","rarity":82,"aliases":[]},{"name":"Pieck Finger","rarity":82,"aliases":[]},{"name":"Platinum Sperm","rarity":67,"aliases":[]},{"name":"Porco Galliard","rarity":82,"aliases":[]},{"name":"Psykos-Orochi","rarity":67,"aliases":[]},{"name":"Puri-Puri Prisoner","rarity":82,"aliases":[]},{"name":"Queen","rarity":82,"aliases":[]},{"name":"Raditz","rarity":65,"aliases":[]},{"name":"Raian Kure","rarity":82,"aliases":[]},{"name":"Ram","rarity":82,"aliases":[]},{"name":"Rammot","rarity":65,"aliases":[]},{"name":"Rando","rarity":82,"aliases":[]},{"name":"Ranga","rarity":82,"aliases":[]},{"name":"Rappa Kendo","rarity":82,"aliases":["Kendo Rappa"]},{"name":"Razor","rarity":65,"aliases":[]},{"name":"Redestro","rarity":68,"aliases":[]},{"name":"Reiner Braun","rarity":82,"aliases":[]},{"name":"Reinhard van Astrea","rarity":82,"aliases":[]},{"name":"Rem","rarity":30,"aliases":[]},{"name":"Renji Abarai","rarity":82,"aliases":[]},{"name":"Retsu Kaioh","rarity":82,"aliases":[]},{"name":"Rihito","rarity":82,"aliases":["Lihito"]},{"name":"Rikido Sato","rarity":68,"aliases":[]},{"name":"Rimuru Tempest","rarity":82,"aliases":[]},{"name":"Rinku","rarity":82,"aliases":[]},{"name":"Rob Lucci","rarity":82,"aliases":[]},{"name":"Rock Lee","rarity":30,"aliases":[]},{"name":"Rogue Cheney","rarity":82,"aliases":[]},{"name":"Roronoa Zoro","rarity":10,"aliases":[]},{"name":"Rui","rarity":82,"aliases":[]},{"name":"Rukia Kuchiki","rarity":82,"aliases":[]},{"name":"Ryomen Sukuna","rarity":82,"aliases":[]},{"name":"Ryu Ishigori","rarity":65,"aliases":[]},{"name":"Ryukou Yanagi","rarity":82,"aliases":[]},{"name":"Ryukyu","rarity":68,"aliases":[]},{"name":"Ryuto Asamiya","rarity":82,"aliases":["Odin"]},{"name":"Sabo","rarity":82,"aliases":[]},{"name":"Sage Centipede","rarity":67,"aliases":[]},{"name":"Sai","rarity":82,"aliases":[]},{"name":"Saitama","rarity":0,"aliases":[]},{"name":"Sakazuki","rarity":30,"aliases":["Akainu"]},{"name":"Sakura Haruno","rarity":65,"aliases":[]},{"name":"Sanemi Shinazugawa","rarity":82,"aliases":[]},{"name":"Sanji Vinsmoke","rarity":30,"aliases":["Sanji"]},{"name":"Santana","rarity":82,"aliases":[]},{"name":"Sasaki","rarity":63,"aliases":[]},{"name":"Sasuke Uchiha","rarity":82,"aliases":[]},{"name":"Satoru Gojo","rarity":82,"aliases":[]},{"name":"Scratchmen Apoo","rarity":63,"aliases":[]},{"name":"Sebas Tian","rarity":82,"aliases":[]},{"name":"Seishu Akoya","rarity":82,"aliases":["Akoya Seishu"]},{"name":"Sengoku","rarity":63,"aliases":[]},{"name":"Senor Pink","rarity":63,"aliases":[]},{"name":"Sensui Shinobu","rarity":82,"aliases":[]},{"name":"Sentomaru","rarity":82,"aliases":[]},{"name":"Sesshomaru","rarity":82,"aliases":[]},{"name":"Setsuna Kiryu","rarity":82,"aliases":[]},{"name":"Setsuna Tokage","rarity":68,"aliases":[]},{"name":"Shaiapouf","rarity":65,"aliases":[]},{"name":"Shalltear Bloodfallen","rarity":82,"aliases":[]},{"name":"Shanks","rarity":30,"aliases":[]},{"name":"Shion","rarity":30,"aliases":[]},{"name":"Shio Sakaki","rarity":82,"aliases":[]},{"name":"Shira","rarity":65,"aliases":[]},{"name":"Shizuku Murasaki","rarity":65,"aliases":[]},{"name":"Shogo Kitsukawa","rarity":82,"aliases":["Berserker"]},{"name":"Shoot McMahon","rarity":65,"aliases":[]},{"name":"Shoto Todoroki","rarity":68,"aliases":[]},{"name":"Siegfried","rarity":82,"aliases":[]},{"name":"Sikorsky","rarity":82,"aliases":[]},{"name":"Silva Zoldyck","rarity":82,"aliases":[]},{"name":"Sloth","rarity":82,"aliases":[]},{"name":"Smoker","rarity":82,"aliases":[]},{"name":"Soi Fon","rarity":82,"aliases":["Sui-Feng"]},{"name":"Sosuke Aizen","rarity":82,"aliases":[]},{"name":"Souei","rarity":82,"aliases":[]},{"name":"Spartacus","rarity":82,"aliases":[]},{"name":"Spec","rarity":82,"aliases":[]},{"name":"Speed-o'-Sound Sonic","rarity":82,"aliases":[]},{"name":"Spider Demon Father","rarity":82,"aliases":["Father Spider Demon"]},{"name":"Spinner","rarity":68,"aliases":[]},{"name":"Stain","rarity":68,"aliases":[]},{"name":"Stansen","rarity":63,"aliases":[]},{"name":"Sting Eucliffe","rarity":82,"aliases":[]},{"name":"Straizo","rarity":82,"aliases":[]},{"name":"Sub","rarity":65,"aliases":[]},{"name":"Suiryu","rarity":67,"aliases":[]},{"name":"Suiryu's mentor","rarity":67,"aliases":[]},{"name":"Superalloy Darkshine","rarity":82,"aliases":[]},{"name":"Surume","rarity":63,"aliases":[]},{"name":"Tamaki Amajiki","rarity":68,"aliases":[]},{"name":"Tanjiro Kamado","rarity":82,"aliases":[]},{"name":"Tanktop Black Hole","rarity":67,"aliases":[]},{"name":"Tanktop Master","rarity":82,"aliases":[]},{"name":"Tanktop Tiger","rarity":67,"aliases":[]},{"name":"Tashigi","rarity":63,"aliases":[]},{"name":"Tengen Uzui","rarity":82,"aliases":[]},{"name":"Tenya Iida","rarity":82,"aliases":["Ingenium"]},{"name":"Tetsutetsu Tetsutetsu","rarity":82,"aliases":[]},{"name":"Tien Shinhan","rarity":28,"aliases":["Tenshinhan"]},{"name":"Tobirama Senju","rarity":82,"aliases":[]},{"name":"Toguro Younger","rarity":82,"aliases":["Younger Toguro"]},{"name":"Toji Fushiguro","rarity":65,"aliases":[]},{"name":"Tomura Shigaraki","rarity":68,"aliases":[]},{"name":"Toppo","rarity":48,"aliases":[]},{"name":"Toshiro Hitsugaya","rarity":82,"aliases":[]},{"name":"Trafalgar Law","rarity":63,"aliases":[]},{"name":"Trebol","rarity":63,"aliases":[]},{"name":"Trunks","rarity":48,"aliases":[]},{"name":"Tsezguerra","rarity":65,"aliases":[]},{"name":"Tsunade","rarity":30,"aliases":[]},{"name":"Tsuru","rarity":63,"aliases":[]},{"name":"Tsuyu Asui","rarity":68,"aliases":[]},{"name":"Twice","rarity":68,"aliases":[]},{"name":"Ulquiorra Cifer","rarity":82,"aliases":[]},{"name":"Ulti","rarity":63,"aliases":[]},{"name":"Urouge","rarity":82,"aliases":[]},{"name":"Uub","rarity":48,"aliases":[]},{"name":"Uvogin","rarity":30,"aliases":[]},{"name":"Vaccine Man","rarity":67,"aliases":[]},{"name":"Vander Decken IX","rarity":63,"aliases":[]},{"name":"Vanica Zogratis","rarity":82,"aliases":[]},{"name":"Vegeta","rarity":10,"aliases":[]},{"name":"Veldora Tempest","rarity":82,"aliases":[]},{"name":"Vergo","rarity":63,"aliases":[]},{"name":"Vetto","rarity":82,"aliases":[]},{"name":"Videl","rarity":48,"aliases":[]},{"name":"Vlad King","rarity":68,"aliases":[]},{"name":"Wadatsumi","rarity":63,"aliases":[]},{"name":"Wakatsuki Takeshi","rarity":82,"aliases":["Takeshi Wakatsuki"]},{"name":"Wamuu","rarity":82,"aliases":[]},{"name":"Watchdog Man","rarity":67,"aliases":[]},{"name":"Welfin","rarity":65,"aliases":[]},{"name":"Wendy Marvell","rarity":82,"aliases":[]},{"name":"Whis","rarity":65,"aliases":[]},{"name":"Who's-Who","rarity":63,"aliases":[]},{"name":"Wilhelm van Astrea","rarity":82,"aliases":[]},{"name":"William Vangeance","rarity":82,"aliases":[]},{"name":"Wing","rarity":82,"aliases":[]},{"name":"X Drake","rarity":63,"aliases":[]},{"name":"Yamcha","rarity":28,"aliases":[]},{"name":"Yami Sukehiro","rarity":82,"aliases":[]},{"name":"Yammy Llargo","rarity":82,"aliases":[]},{"name":"Yasutora Sado","rarity":82,"aliases":["Chad"]},{"name":"Ymir","rarity":82,"aliases":[]},{"name":"Yoroizuka Saw Paing","rarity":82,"aliases":["Saw Paing"]},{"name":"Yoruichi Shihoin","rarity":55,"aliases":["Yoruichi Shihouin"]},{"name":"Yuji Itadori","rarity":30,"aliases":["Yuuji Itadori"]},{"name":"Yujiro Hanma","rarity":30,"aliases":["Yuujirou Hanma"]},{"name":"Yuki Tsukumo","rarity":65,"aliases":[]},{"name":"Yuno","rarity":82,"aliases":[]},{"name":"Yusuke Urameshi","rarity":82,"aliases":[]},{"name":"Yuta Okkotsu","rarity":65,"aliases":[]},{"name":"Zamasu","rarity":65,"aliases":[]},{"name":"Zaryusu Shasha","rarity":82,"aliases":[]},{"name":"Zazan","rarity":65,"aliases":[]},{"name":"Zeke Yeager","rarity":82,"aliases":[]},{"name":"Zeldris","rarity":82,"aliases":[]},{"name":"Zenitsu Agatsuma","rarity":82,"aliases":[]},{"name":"Zenon Zogratis","rarity":82,"aliases":[]},{"name":"Zeno Zoldyck","rarity":82,"aliases":[]},{"name":"Zeref Dragneel","rarity":82,"aliases":[]},{"name":"Zombieman","rarity":67,"aliases":[]},{"name":"Zushi","rarity":82,"aliases":[]},{"name":"Kenshiro","rarity":15,"aliases":[]},{"name":"Kagura","rarity":25,"aliases":[]},{"name":"Raoh","rarity":25,"aliases":[]},{"name":"Ryuko Matoi","rarity":35,"aliases":["Ryuko"]},{"name":"Power","rarity":40,"aliases":[]},{"name":"Denji","rarity":40,"aliases":[]},{"name":"Satsuki Kiryuin","rarity":40,"aliases":["Satsuki"]},{"name":"Yamato","rarity":40,"aliases":[]},{"name":"Tsukasa Shishio","rarity":40,"aliases":["Tsukasa"]}]},
 {"id":"timed-v4-descent-9-time-travel","anime":"mixed","category":"Any anime","text":"Name any anime where time travel is central to the story.","note":"Travelling through time drives the plot","since":"2026-11-28","descent":"title","conceptId":"nov28-time-travel","top":"Steins;Gate","answers":[{"name":"16bit Sensation: Another Layer","rarity":82,"aliases":[]},{"name":"7th Time Loop: The Villainess Enjoys a Carefree Life Married to Her Worst Enemy!","rarity":82,"aliases":[]},{"name":"A Returner's Magic Should Be Special","rarity":80,"aliases":[]},{"name":"A Time Machine for You","rarity":65,"aliases":[]},{"name":"Buddy Complex","rarity":82,"aliases":[]},{"name":"Buddy Complex: Into the Skies of Tomorrow","rarity":82,"aliases":[]},{"name":"Butlers: Chitose Momotose Monogatari","rarity":55,"aliases":[]},{"name":"Butlers: Chitose Momotose Monogatari OVA","rarity":55,"aliases":[]},{"name":"Charlotte","rarity":55,"aliases":[]},{"name":"Charlotte Special","rarity":55,"aliases":[]},{"name":"Doraemon","rarity":10,"aliases":["Doraemon (2005)"]},{"name":"Doraemon: Nobita and the Birth of Japan","rarity":65,"aliases":[]},{"name":"Doraemon: Nobita and the Birth of Japan 2016","rarity":55,"aliases":[]},{"name":"Doraemon: Nobita and the Island of Miracles","rarity":55,"aliases":[]},{"name":"Doraemon: Nobita and the Kingdom of Clouds","rarity":55,"aliases":[]},{"name":"Doraemon: Nobita and the New Steel Troops","rarity":55,"aliases":[]},{"name":"Doraemon: Nobita and the Steel Troops","rarity":55,"aliases":[]},{"name":"Doraemon: Nobita in the Wan-Nyan Spacetime Odyssey","rarity":55,"aliases":[]},{"name":"Doraemon: Nobita's Art World Tales","rarity":55,"aliases":[]},{"name":"Doraemon: Nobita's Chronicle of the Moon Exploration","rarity":55,"aliases":[]},{"name":"Doraemon: Nobita's Dinosaur","rarity":65,"aliases":[]},{"name":"Doraemon: Nobita's Drifts in the Universe","rarity":55,"aliases":[]},{"name":"Doraemon: Nobita's Earth Symphony","rarity":55,"aliases":[]},{"name":"Doraemon: Nobita's Great Adventure in the Antarctic Kachi Kochi","rarity":55,"aliases":[]},{"name":"Doraemon: Nobita's Great Adventure in the South Seas","rarity":55,"aliases":[]},{"name":"Doraemon: Nobita's Great Demon","rarity":55,"aliases":[]},{"name":"Doraemon: Nobita's Little Star Wars","rarity":55,"aliases":[]},{"name":"Doraemon: Nobita's Little Star Wars 2021","rarity":55,"aliases":[]},{"name":"Doraemon: Nobita's New Dinosaur","rarity":65,"aliases":[]},{"name":"Doraemon: Nobita's New Great Adventure into the Underworld","rarity":55,"aliases":[]},{"name":"Doraemon: Nobita's Parallel Visit to the West","rarity":55,"aliases":[]},{"name":"Doraemon: Nobita's Secret Gadget Museum","rarity":55,"aliases":[]},{"name":"Doraemon: Nobita's Sky Utopia","rarity":55,"aliases":[]},{"name":"Doraemon: Nobita's Three Visionary Swordsmen","rarity":55,"aliases":[]},{"name":"Doraemon: Nobita's Treasure Island","rarity":55,"aliases":[]},{"name":"Erased","rarity":15,"aliases":["Boku dake ga Inai Machi"]},{"name":"Fireworks","rarity":82,"aliases":["Uchiage Hanabi, Shita kara Miru ka? Yoko kara Miru ka?"]},{"name":"Gyakuten Ippatsuman","rarity":55,"aliases":["Time Bokan Series: Gyakuten Ippatsuman"]},{"name":"Haibara's Teenage New Game+","rarity":65,"aliases":[]},{"name":"Hello World","rarity":82,"aliases":[]},{"name":"Higurashi: When They Cry","rarity":30,"aliases":["Higurashi no Naku Koro ni","Higurashi"]},{"name":"Higurashi: When They Cry Gou","rarity":65,"aliases":[]},{"name":"Higurashi: When They Cry Kai","rarity":65,"aliases":[]},{"name":"Higurashi: When They Cry Sotsu","rarity":65,"aliases":[]},{"name":"I'll Become a Villainess Who Goes Down in History","rarity":80,"aliases":[]},{"name":"I'm the Villainess, So I'm Taming the Final Boss","rarity":80,"aliases":[]},{"name":"Inuyasha","rarity":30,"aliases":[]},{"name":"InuYasha: Affections Touching Across Time","rarity":55,"aliases":[]},{"name":"InuYasha: Fire on the Mystic Island","rarity":55,"aliases":[]},{"name":"InuYasha: Kanketsu-hen","rarity":55,"aliases":[]},{"name":"InuYasha: Swords of an Honorable Ruler","rarity":55,"aliases":[]},{"name":"InuYasha: The Castle Beyond the Looking Glass","rarity":55,"aliases":[]},{"name":"Inuyasha: The Final Act","rarity":53,"aliases":[]},{"name":"Island","rarity":55,"aliases":["Island (2018)"]},{"name":"Itadakiman","rarity":55,"aliases":["Time Bokan Series: Itadakiman"]},{"name":"Kaito Kiramekiman","rarity":55,"aliases":["Time Bokan Series: Kaito Kiramekiman"]},{"name":"Kamisama Hajimemashita: Kako-hen","rarity":65,"aliases":[]},{"name":"Kono Yo no Hate de Koi wo Utau Shoujo YU-NO","rarity":80,"aliases":["YU-NO: A Girl Who Chants Love at the Bound of This World"]},{"name":"Link Click","rarity":55,"aliases":[]},{"name":"Link Click: Bridon Arc","rarity":65,"aliases":[]},{"name":"Link Click Episode 5.5","rarity":55,"aliases":[]},{"name":"Link Click Memories","rarity":65,"aliases":[]},{"name":"Link Click: Premonition","rarity":55,"aliases":[]},{"name":"Link Click Season 2","rarity":55,"aliases":[]},{"name":"Link Click Season 3","rarity":65,"aliases":[]},{"name":"Link Click: Waypoint","rarity":65,"aliases":[]},{"name":"Link Click: Yingdu Chapter","rarity":55,"aliases":[]},{"name":"MAO","rarity":65,"aliases":["MAO (2026)"]},{"name":"Meiji Tokyo Renka","rarity":82,"aliases":[]},{"name":"Mirai","rarity":55,"aliases":["Mirai no Mirai","Mirai (2018)"]},{"name":"Natsu e no Tobira","rarity":55,"aliases":["Natsu e no Tobira (To Summer)"]},{"name":"Natsu no Arashi!","rarity":65,"aliases":[]},{"name":"Natsu no Arashi! Akinai-chuu","rarity":65,"aliases":[]},{"name":"New Saga","rarity":65,"aliases":[]},{"name":"Noein: To Your Other Self","rarity":55,"aliases":["Noein: Mou Hitori no Kimi e"]},{"name":"Norn9: Norn+Nonet","rarity":55,"aliases":[]},{"name":"Norn9: Norn+Nonet Recap","rarity":55,"aliases":[]},{"name":"Occult Academy","rarity":55,"aliases":["Seikimatsu Occult Gakuin","Occult Academy: Seikimatsu Occult Gakuin"]},{"name":"Orange","rarity":30,"aliases":[]},{"name":"Otasukeman","rarity":55,"aliases":["Time Bokan Series: Otasukeman"]},{"name":"Pokémon 4Ever: Celebi - Voice of the Forest","rarity":65,"aliases":[]},{"name":"Pokémon: Arceus and the Jewel of Life","rarity":65,"aliases":[]},{"name":"Puella Magi Madoka Magica","rarity":30,"aliases":["Madoka Magica","Madoka"]},{"name":"Puella Magi Madoka Magica the Movie Part 1: Beginnings","rarity":65,"aliases":[]},{"name":"Puella Magi Madoka Magica the Movie Part 2: Eternal","rarity":65,"aliases":[]},{"name":"Punch Line","rarity":82,"aliases":[]},{"name":"Remake Our Life!","rarity":82,"aliases":["Bokutachi no Remake"]},{"name":"Revisions","rarity":82,"aliases":[]},{"name":"Rewrite","rarity":80,"aliases":[]},{"name":"Rewrite 2nd Season Moon and Terra","rarity":80,"aliases":[]},{"name":"Re:Zero Frozen Bonds","rarity":55,"aliases":[]},{"name":"Re:Zero Memory Snow","rarity":55,"aliases":[]},{"name":"Re:Zero Season 4","rarity":65,"aliases":[]},{"name":"Re:Zero - Starting Life in Another World","rarity":10,"aliases":["Re:Zero"]},{"name":"Re:Zero - Starting Life in Another World OVA","rarity":55,"aliases":[]},{"name":"Re:Zero - Starting Life in Another World Season 2","rarity":53,"aliases":[]},{"name":"Re:Zero - Starting Life in Another World Season 2 Part 2","rarity":53,"aliases":[]},{"name":"Re:Zero - Starting Life in Another World Season 3","rarity":53,"aliases":[]},{"name":"Re:Zero: The Prophecy of the Throne","rarity":55,"aliases":[]},{"name":"Ryuukyuu Timeline","rarity":65,"aliases":[]},{"name":"Ryuukyuu Timeline 2","rarity":65,"aliases":[]},{"name":"Sagrada Reset","rarity":82,"aliases":["Sakurada Reset"]},{"name":"Sengoku Collection","rarity":65,"aliases":[]},{"name":"Sengoku Otome: Momoiro Paradox","rarity":65,"aliases":[]},{"name":"Sentimental Death Loop","rarity":65,"aliases":[]},{"name":"Sora wa Akai Kawa no Hotori","rarity":65,"aliases":[]},{"name":"Stand by Me Doraemon","rarity":65,"aliases":[]},{"name":"Stand by Me Doraemon 2","rarity":65,"aliases":[]},{"name":"Star Detective Precure!","rarity":65,"aliases":[]},{"name":"Steins;Gate","rarity":0,"aliases":[]},{"name":"Steins;Gate 0","rarity":34,"aliases":[]},{"name":"Steins;Gate 0: Episode 23","rarity":55,"aliases":[]},{"name":"Steins;Gate 0 Specials","rarity":55,"aliases":[]},{"name":"Steins;Gate Episode 23","rarity":55,"aliases":[]},{"name":"Steins;Gate: Kyoukaimenjou no Missing Link","rarity":55,"aliases":[]},{"name":"Steins;Gate: Oukoubakko no Poriomania","rarity":55,"aliases":[]},{"name":"Steins;Gate: Soumei Eichi no Cognitive Computing","rarity":55,"aliases":[]},{"name":"Steins;Gate: The Movie - Load Region of Déjà Vu","rarity":34,"aliases":[]},{"name":"Summertime Rendering","rarity":30,"aliases":[]},{"name":"Takopi's Original Sin","rarity":82,"aliases":["Takopi no Genzai"]},{"name":"Tanetsumi no Uta","rarity":65,"aliases":[]},{"name":"Terminator Zero","rarity":65,"aliases":[]},{"name":"The Ambition of Oda Nobuna","rarity":65,"aliases":["Oda Nobuna no Yabou"]},{"name":"The Disappearance of Haruhi Suzumiya","rarity":40,"aliases":["Suzumiya Haruhi no Shoushitsu","Disappearance of Haruhi Suzumiya"]},{"name":"The Do-Over Damsel Conquers the Dragon Emperor","rarity":65,"aliases":[]},{"name":"The Girl Who Leapt Through Time","rarity":25,"aliases":["Toki wo Kakeru Shoujo"]},{"name":"The Great Sage Ryddel and the Hands of Time","rarity":65,"aliases":[]},{"name":"The Most Heretical Last Boss Queen","rarity":80,"aliases":[]},{"name":"The Regression of Great Sage Riddle","rarity":65,"aliases":[]},{"name":"Thermae Romae","rarity":65,"aliases":["Thermae Romae (2012)"]},{"name":"Thermae Romae Novae","rarity":65,"aliases":["Thermae Romae Novae (2022)"]},{"name":"Thermae Romae OVA","rarity":80,"aliases":[]},{"name":"The Tatami Time Machine Blues","rarity":53,"aliases":["Yojouhan Time Machine Blues"]},{"name":"The Tunnel to Summer, the Exit of Goodbyes","rarity":82,"aliases":[]},{"name":"Time Bokan","rarity":65,"aliases":[]},{"name":"Time Bokan 24","rarity":65,"aliases":[]},{"name":"Time Bokan: Royal Revival","rarity":55,"aliases":[]},{"name":"Time Bokan Series: Yattodetaman","rarity":55,"aliases":[]},{"name":"Time Bokan Series: Zenderman","rarity":55,"aliases":[]},{"name":"Time Bokan: The Villains' Strike Back","rarity":65,"aliases":[]},{"name":"Time Bokan: Time Travel Tondekeman!","rarity":55,"aliases":["Time Travel Tondekeman!"]},{"name":"Time Stranger","rarity":55,"aliases":["Toki no Tabibito: Time Stranger"]},{"name":"Time Travel Girl: Mari, Waka, and the 8 Scientists","rarity":65,"aliases":["Time Travel Shoujo"]},{"name":"Toki wa Meguru: Tokyo Station","rarity":55,"aliases":[]},{"name":"Tokyo Revengers","rarity":15,"aliases":[]},{"name":"Tokyo Revengers: Christmas Showdown","rarity":53,"aliases":[]},{"name":"Tokyo Revengers: Santen Sensou-hen","rarity":55,"aliases":[]},{"name":"Tokyo Revengers: Seiya Kessen-hen","rarity":55,"aliases":[]},{"name":"Tokyo Revengers: Tenjiku Arc","rarity":53,"aliases":[]},{"name":"Tokyo Revengers: Tenjiku-hen","rarity":55,"aliases":[]},{"name":"Tokyo Revengers: War of the Three Titans Arc","rarity":65,"aliases":[]},{"name":"T.P. Bon","rarity":82,"aliases":["Time Patrol Bon"]},{"name":"T.P. BON 1989 Special","rarity":80,"aliases":[]},{"name":"T.P. BON Movie","rarity":80,"aliases":[]},{"name":"T.P. Bon Season 2","rarity":82,"aliases":[]},{"name":"Turkey! Time to Strike","rarity":65,"aliases":[]},{"name":"Vivy: Fluorite Eye's Song","rarity":30,"aliases":[]},{"name":"Why Raeliana Ended Up at the Duke's Mansion","rarity":80,"aliases":[]},{"name":"Yashahime: Princess Half-Demon","rarity":53,"aliases":[]},{"name":"Yashahime: Princess Half-Demon Season 2","rarity":53,"aliases":[]},{"name":"Yatterman","rarity":55,"aliases":["Yatterman (1977)","Yatterman (2008)"]},{"name":"Yatterman Night","rarity":55,"aliases":[]},{"name":"Your Name","rarity":30,"aliases":["Kimi no Na wa."]},{"name":"YU-NO Special","rarity":80,"aliases":[]},{"name":"Zipang","rarity":65,"aliases":[]}]},
 {"id":"timed-v4-descent-9-robots-androids","anime":"mixed","category":"Any anime","text":"Name any anime character who is a robot or android.","note":"Robots, androids and other artificial beings","since":"2026-11-28","descent":"char","conceptId":"nov28-robots-androids","top":"Android 18","answers":[{"name":"11B","rarity":65,"aliases":[]},{"name":"21O","rarity":65,"aliases":["Operator 21O"]},{"name":"2B","rarity":30,"aliases":["YoRHa No.2 Type B"]},{"name":"4S","rarity":65,"aliases":[]},{"name":"6O","rarity":65,"aliases":["Operator 6O"]},{"name":"9S","rarity":30,"aliases":["YoRHa No.9 Type S"]},{"name":"A2","rarity":30,"aliases":["YoRHa Type A No.2"]},{"name":"Adam","rarity":65,"aliases":[]},{"name":"Aibi","rarity":74,"aliases":["Aibi (Time of Eve)"]},{"name":"Akiko","rarity":82,"aliases":[]},{"name":"Alpha Hatsuseno","rarity":82,"aliases":[]},{"name":"AnchoR","rarity":82,"aliases":[]},{"name":"Android 13","rarity":28,"aliases":[]},{"name":"Android 14","rarity":28,"aliases":[]},{"name":"Android 15","rarity":48,"aliases":[]},{"name":"Android 16","rarity":28,"aliases":[]},{"name":"Android 17","rarity":10,"aliases":["Lapis"]},{"name":"Android 18","rarity":0,"aliases":["Lazuli"]},{"name":"Android 19","rarity":28,"aliases":[]},{"name":"Android 20","rarity":28,"aliases":["Dr. Gero"]},{"name":"Android 8","rarity":28,"aliases":["Eighter"]},{"name":"Andy","rarity":82,"aliases":[]},{"name":"Antonio","rarity":82,"aliases":[]},{"name":"Arale Norimaki","rarity":20,"aliases":[]},{"name":"Arcbeetle","rarity":67,"aliases":[]},{"name":"Astraea","rarity":82,"aliases":[]},{"name":"Astro Boy","rarity":15,"aliases":["Atom"]},{"name":"Atlas","rarity":82,"aliases":[]},{"name":"Blackbeetle","rarity":67,"aliases":[]},{"name":"Bloodberry","rarity":82,"aliases":[]},{"name":"Braiking Boss","rarity":82,"aliases":[]},{"name":"Brando","rarity":65,"aliases":[]},{"name":"Brass","rarity":67,"aliases":["Brass (Medabots)"]},{"name":"Brau 1589","rarity":82,"aliases":[]},{"name":"Canti","rarity":75,"aliases":[]},{"name":"Caramel Man 001","rarity":67,"aliases":[]},{"name":"Caramel Man 002","rarity":67,"aliases":[]},{"name":"Caramel Man 003","rarity":67,"aliases":[]},{"name":"Caramel Man 004","rarity":67,"aliases":[]},{"name":"Caramel Man 005","rarity":67,"aliases":[]},{"name":"Casshern","rarity":82,"aliases":[]},{"name":"Cell","rarity":30,"aliases":[]},{"name":"Chaos","rarity":82,"aliases":[]},{"name":"Cherry","rarity":82,"aliases":[]},{"name":"Chi","rarity":30,"aliases":["Chii"]},{"name":"Chie","rarity":82,"aliases":[]},{"name":"Cobalt","rarity":82,"aliases":[]},{"name":"Commander White","rarity":65,"aliases":[]},{"name":"Constance","rarity":82,"aliases":[]},{"name":"Denkou","rarity":82,"aliases":[]},{"name":"Devola","rarity":65,"aliases":[]},{"name":"Dio","rarity":82,"aliases":[]},{"name":"Director Alpha Koumiishi","rarity":82,"aliases":[]},{"name":"Dita","rarity":82,"aliases":[]},{"name":"Doraemon","rarity":10,"aliases":[]},{"name":"Dorakus","rarity":67,"aliases":[]},{"name":"Dora-med III","rarity":65,"aliases":[]},{"name":"Dorami","rarity":53,"aliases":[]},{"name":"Dora-ni-kov","rarity":65,"aliases":[]},{"name":"Dora-rinho","rarity":65,"aliases":[]},{"name":"Dora-the-Kid","rarity":65,"aliases":[]},{"name":"Drossel von Flügel","rarity":82,"aliases":[]},{"name":"Elizabeth","rarity":74,"aliases":["Elizabeth (Vivy)"]},{"name":"El Matadora","rarity":65,"aliases":[]},{"name":"Engels","rarity":65,"aliases":[]},{"name":"Epsilon","rarity":82,"aliases":[]},{"name":"Estella","rarity":74,"aliases":["Estella (Vivy)"]},{"name":"Eve","rarity":65,"aliases":[]},{"name":"Fido","rarity":74,"aliases":["Fido (86)"]},{"name":"Flanders","rarity":82,"aliases":[]},{"name":"Flandre","rarity":82,"aliases":[]},{"name":"Francesca","rarity":82,"aliases":[]},{"name":"Freya","rarity":82,"aliases":[]},{"name":"Fuchikoma","rarity":82,"aliases":[]},{"name":"Gaburoon","rarity":82,"aliases":[]},{"name":"Gamma 1","rarity":48,"aliases":[]},{"name":"Gamma 2","rarity":48,"aliases":[]},{"name":"Gedächtnis","rarity":82,"aliases":[]},{"name":"Gesicht","rarity":65,"aliases":[]},{"name":"Giru","rarity":48,"aliases":["Gill"]},{"name":"God Emperor","rarity":67,"aliases":["God Emperor (Medabots)"]},{"name":"Grace","rarity":74,"aliases":["Grace (Vivy)"]},{"name":"Gre-chan","rarity":82,"aliases":[]},{"name":"Grenda-san","rarity":82,"aliases":[]},{"name":"Haro","rarity":82,"aliases":[]},{"name":"Helena","rarity":82,"aliases":[]},{"name":"Heracles","rarity":65,"aliases":[]},{"name":"Iggy","rarity":82,"aliases":[]},{"name":"Ikaros","rarity":30,"aliases":[]},{"name":"Isla","rarity":74,"aliases":["Isla (Plastic Memories)"]},{"name":"Jackass","rarity":65,"aliases":[]},{"name":"Kilobot","rarity":67,"aliases":[]},{"name":"Koji","rarity":82,"aliases":[]},{"name":"Kokone Takatsu","rarity":82,"aliases":[]},{"name":"Korosuke","rarity":82,"aliases":[]},{"name":"Kotoko","rarity":82,"aliases":[]},{"name":"Kouka","rarity":82,"aliases":[]},{"name":"Krosserdog","rarity":67,"aliases":[]},{"name":"Lacia","rarity":82,"aliases":[]},{"name":"Leda","rarity":82,"aliases":[]},{"name":"Lily","rarity":65,"aliases":[]},{"name":"Lime","rarity":82,"aliases":[]},{"name":"Logicoma","rarity":82,"aliases":[]},{"name":"Logikoma","rarity":75,"aliases":[]},{"name":"Luchs","rarity":82,"aliases":[]},{"name":"Lyuze","rarity":82,"aliases":[]},{"name":"Marcia","rarity":82,"aliases":[]},{"name":"Maruko Maruko","rarity":82,"aliases":[]},{"name":"Matsumoto","rarity":74,"aliases":["Matsumoto (Vivy)"]},{"name":"Mega-Emperor","rarity":67,"aliases":[]},{"name":"Metabee","rarity":67,"aliases":[]},{"name":"Methode","rarity":82,"aliases":[]},{"name":"Mini-Dora","rarity":53,"aliases":[]},{"name":"Mira Yurizaki","rarity":82,"aliases":[]},{"name":"Mont Blanc","rarity":65,"aliases":[]},{"name":"Neutranurse","rarity":67,"aliases":[]},{"name":"North No. 2","rarity":65,"aliases":[]},{"name":"Nymph","rarity":82,"aliases":[]},{"name":"Obotchaman","rarity":48,"aliases":[]},{"name":"Olivia","rarity":82,"aliases":[]},{"name":"Ophelia","rarity":74,"aliases":["Ophelia (Vivy)"]},{"name":"Ouji","rarity":82,"aliases":[]},{"name":"Panther","rarity":82,"aliases":[]},{"name":"Pascal","rarity":65,"aliases":[]},{"name":"Peppercat","rarity":67,"aliases":[]},{"name":"Pero","rarity":82,"aliases":[]},{"name":"Pino","rarity":82,"aliases":[]},{"name":"Pluto","rarity":82,"aliases":[]},{"name":"Pod 042","rarity":65,"aliases":[]},{"name":"Pod 153","rarity":65,"aliases":[]},{"name":"Popola","rarity":65,"aliases":[]},{"name":"QT","rarity":82,"aliases":[]},{"name":"R. Dorothy Wayneright","rarity":75,"aliases":[]},{"name":"Reg","rarity":82,"aliases":[]},{"name":"Rina","rarity":82,"aliases":[]},{"name":"Ringo","rarity":82,"aliases":[]},{"name":"Ritsu","rarity":82,"aliases":["Autonomously Thinking Fixed Artillery"]},{"name":"Robita","rarity":65,"aliases":["Robita (Phoenix)"]},{"name":"Rokusho","rarity":67,"aliases":[]},{"name":"RyuZU","rarity":82,"aliases":[]},{"name":"Sahad","rarity":65,"aliases":["Sahad (Pluto)"]},{"name":"Saikachis","rarity":67,"aliases":[]},{"name":"Saki","rarity":74,"aliases":["Saki (Plastic Memories)"]},{"name":"Sammy","rarity":74,"aliases":["Sammy (Time of Eve)"]},{"name":"Saturnus","rarity":82,"aliases":[]},{"name":"Sergeant Metallic","rarity":48,"aliases":["Major Metallitron"]},{"name":"Setoro","rarity":74,"aliases":["Setoro (Time of Eve)"]},{"name":"Sherry","rarity":82,"aliases":[]},{"name":"Shion Ashimori","rarity":82,"aliases":[]},{"name":"Snowdrop","rarity":82,"aliases":[]},{"name":"Sora","rarity":74,"aliases":["Sora (Plastic Memories)"]},{"name":"Sumilidon","rarity":67,"aliases":[]},{"name":"Sumomo","rarity":82,"aliases":["Plum"]},{"name":"Super Android 17","rarity":48,"aliases":[]},{"name":"Tachikoma","rarity":30,"aliases":["Tachikomas"]},{"name":"Tex","rarity":74,"aliases":["Tex (Time of Eve)"]},{"name":"The Puppet Master","rarity":82,"aliases":["Project 2501"]},{"name":"Tigris","rarity":82,"aliases":[]},{"name":"Tima","rarity":82,"aliases":[]},{"name":"Uchikoma","rarity":82,"aliases":[]},{"name":"Uran","rarity":65,"aliases":["Uran (Astro Boy)"]},{"name":"Vivy","rarity":30,"aliases":["Diva"]},{"name":"Wang Dora","rarity":65,"aliases":[]},{"name":"Warbandit","rarity":67,"aliases":[]},{"name":"Yuzuki","rarity":82,"aliases":[]},{"name":"Zack","rarity":74,"aliases":["Zack (Plastic Memories)"]},{"name":"Z-chan","rarity":82,"aliases":[]},{"name":"Zima","rarity":82,"aliases":[]},{"name":"Genos","rarity":15,"aliases":[]},{"name":"Franky","rarity":30,"aliases":[]},{"name":"Motoko Kusanagi","rarity":30,"aliases":["Motoko","Major Kusanagi"]},{"name":"Bartholomew Kuma","rarity":35,"aliases":["Kuma"]},{"name":"Mechamaru","rarity":35,"aliases":["Kokichi Muta"]},{"name":"Metal Knight","rarity":40,"aliases":[]},{"name":"Alita","rarity":40,"aliases":["Gally"]},{"name":"Mazinger Z","rarity":40,"aliases":[]},{"name":"Mega Man","rarity":40,"aliases":["Rockman"]},{"name":"Roboco","rarity":40,"aliases":[]},{"name":"Batou","rarity":30,"aliases":[]},{"name":"Tetsujin 28","rarity":45,"aliases":["Gigantor"]},{"name":"Giant Robo","rarity":45,"aliases":[]},{"name":"Drive Knight","rarity":45,"aliases":[]},{"name":"Atri","rarity":45,"aliases":[]},{"name":"Chachamaru Karakuri","rarity":50,"aliases":["Chachamaru"]},{"name":"Mechazawa","rarity":50,"aliases":[]},{"name":"Pacifista","rarity":50,"aliases":[]}]},
]);
if(typeof module!=='undefined')module.exports=questions;else root.PowerLevelDescentQuestions=questions;
})(globalThis);
