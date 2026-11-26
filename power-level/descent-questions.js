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
if(typeof module!=='undefined')module.exports=questions;else root.PowerLevelDescentQuestions=questions;
})(globalThis);
