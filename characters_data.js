/* =====================================================================
   SHONEN SPIN — ANIME ROSTER BUILDER
   Character + spin-pool database
   ---------------------------------------------------------------------
   Instead of one pool per anime, every anime is split into several
   themed SPIN POOLS (e.g. "Straw Hat Pirates", "Pirate Legends",
   "East Blue Rookies"). The reel lands on a pool. ELITE pools are rare
   (low spin weight); WEAK pools are common (high weight) — so you'll
   often be forced to draft weaker fighters or burn a skip. That's what
   keeps a dream team hard to assemble.

   Character: { n:name, e:epithet, pool:poolId, p:power(0-100), r:[roles] }
   (series `s` is derived from the pool, and drives team synergy.)
   Role ids: ace, right, striker, tactician, support, anchor, wildcard
   ===================================================================== */

/* ---- The 7 anime (used for color + synergy + the legend) ---- */
const SERIES = [
  { id: "onepiece",   name: "One Piece",        color: "#ff4d4d" },
  { id: "naruto",     name: "Naruto",           color: "#ff9f1c" },
  { id: "jjk",        name: "Jujutsu Kaisen",   color: "#8e44ad" },
  { id: "mha",        name: "My Hero Academia", color: "#2ecc71" },
  { id: "demonslayer",name: "Demon Slayer",     color: "#16a085" },
  { id: "blackclover",name: "Black Clover",     color: "#3498db" },
  { id: "tokyoghoul", name: "Tokyo Ghoul",      color: "#c0392b" }
];

/* ---- Spin pools. tier: elite | core | weak.  weight = spin odds
        (weak pools are common, elite pools rare). ---- */
const POOLS = [
  // ONE PIECE (6 crews)
  { id:"op-straw",    name:"Straw Hat Pirates",   series:"onepiece",   tier:"core",  weight:0.85 },
  { id:"op-legends",  name:"Pirate Legends",      series:"onepiece",   tier:"elite", weight:0.4 },
  { id:"op-emperors", name:"Yonko Commanders",    series:"onepiece",   tier:"elite", weight:0.4 },
  { id:"op-worstgen", name:"Worst Generation",    series:"onepiece",   tier:"core",  weight:0.85 },
  { id:"op-gov",      name:"Admirals & Warlords", series:"onepiece",   tier:"elite", weight:0.4 },
  { id:"op-grunts",   name:"East Blue & Rookies", series:"onepiece",   tier:"weak",  weight:1.45 },
  // NARUTO (6)
  { id:"nar-leaf",    name:"Leaf Village Jonin",  series:"naruto",     tier:"core",  weight:0.85 },
  { id:"nar-legends", name:"Legendary Shinobi",   series:"naruto",     tier:"elite", weight:0.4 },
  { id:"nar-akatsuki",name:"Akatsuki",            series:"naruto",     tier:"elite", weight:0.45 },
  { id:"nar-kage",    name:"The Five Kage",       series:"naruto",     tier:"core",  weight:0.8 },
  { id:"nar-sand",    name:"Sand & Mist",         series:"naruto",     tier:"core",  weight:0.85 },
  { id:"nar-academy", name:"Academy & Genin",     series:"naruto",     tier:"weak",  weight:1.45 },
  // JUJUTSU KAISEN (3)
  { id:"jjk-sorc",    name:"Jujutsu Sorcerers",   series:"jjk",        tier:"core",  weight:0.9 },
  { id:"jjk-special", name:"Special Grades",      series:"jjk",        tier:"elite", weight:0.45 },
  { id:"jjk-students",name:"First-Years",         series:"jjk",        tier:"weak",  weight:1.4 },
  // MY HERO ACADEMIA (4)
  { id:"mha-pros",    name:"Pro Heroes",          series:"mha",        tier:"elite", weight:0.6 },
  { id:"mha-1a",      name:"Class 1-A",           series:"mha",        tier:"core",  weight:1.0 },
  { id:"mha-1b",      name:"Class 1-B",           series:"mha",        tier:"core",  weight:1.0 },
  { id:"mha-side",    name:"Sidekicks & Students",series:"mha",        tier:"weak",  weight:1.35 },
  // DEMON SLAYER (3)
  { id:"ds-hashira",  name:"The Hashira",         series:"demonslayer",tier:"elite", weight:0.7 },
  { id:"ds-corps",    name:"Slayer Corps",        series:"demonslayer",tier:"core",  weight:1.1 },
  { id:"ds-fodder",   name:"Rookies & Kakushi",   series:"demonslayer",tier:"weak",  weight:1.4 },
  // BLACK CLOVER (6 squads)
  { id:"bc-captains", name:"Magic Knight Captains",series:"blackclover",tier:"elite",weight:0.45 },
  { id:"bc-bulls",    name:"Black Bulls",         series:"blackclover",tier:"core",  weight:0.9 },
  { id:"bc-goldendawn",name:"Golden Dawn",        series:"blackclover",tier:"core",  weight:0.85 },
  { id:"bc-squads",   name:"Royal Magic Squads",  series:"blackclover",tier:"core",  weight:0.9 },
  { id:"bc-devils",   name:"Dark Triad & Devils", series:"blackclover",tier:"elite", weight:0.45 },
  { id:"bc-rookies",  name:"Junior Knights",      series:"blackclover",tier:"weak",  weight:1.35 },
  // TOKYO GHOUL (2 — few spins: "Ghouls vs Doves")
  { id:"tg-ghouls",   name:"Ghouls · Aogiri",     series:"tokyoghoul", tier:"core",  weight:0.65 },
  { id:"tg-doves",    name:"Doves · CCG",         series:"tokyoghoul", tier:"core",  weight:0.65 }
];

/* ---- Team roles. 8 slots total. ---- */
const ROLE_DEFS = {
  ace:       { name: "Ace",        blurb: "The leader & heaviest hitter. Powers up the whole squad.", icon: "★" },
  right:     { name: "Right Hand", blurb: "The rival / second. Huge duo bonus when same series as the Ace.", icon: "✦" },
  striker:   { name: "Striker",    blurb: "Pure offense. Brings the damage.", icon: "✸" },
  tactician: { name: "Tactician",  blurb: "The brains. Wins fights before they start.", icon: "◆" },
  support:   { name: "Support",    blurb: "Healing, buffs & utility that keep the team standing.", icon: "✚" },
  anchor:    { name: "Anchor",     blurb: "The wall. Soaks hits nobody else survives.", icon: "⬣" },
  wildcard:  { name: "Wildcard",   blurb: "A flex slot — anybody dangerous can fill it.", icon: "✹" }
};

const SLOTS = [
  { id: "ace",       role: "ace"       },
  { id: "right",     role: "right"     },
  { id: "striker1",  role: "striker"   },
  { id: "striker2",  role: "striker"   },
  { id: "tactician", role: "tactician" },
  { id: "support",   role: "support"   },
  { id: "anchor",    role: "anchor"    },
  { id: "wildcard",  role: "wildcard"  }
];

/* =====================================================================
   CHARACTERS  (grouped by pool)
   ===================================================================== */
const CHARACTERS = [
  /* ===== ONE PIECE ===== */
  // Straw Hat Pirates (core)
  { n:"Monkey D. Luffy", e:"Gear 5 · Sun God Nika", pool:"op-straw", p:95, r:["ace","striker","wildcard"] },
  { n:"Roronoa Zoro",    e:"Pirate Hunter",         pool:"op-straw", p:89, r:["right","striker","anchor"] },
  { n:"Sanji",           e:"Black Leg",             pool:"op-straw", p:84, r:["striker","support","wildcard"] },
  { n:"Jinbe",           e:"Knight of the Sea",     pool:"op-straw", p:82, r:["anchor","striker","support"] },
  { n:"Nico Robin",      e:"Devil Child",           pool:"op-straw", p:74, r:["tactician","support"] },
  { n:"Franky",          e:"Cyborg",                pool:"op-straw", p:70, r:["anchor","support"] },
  { n:"Nami",            e:"Cat Burglar",           pool:"op-straw", p:60, r:["tactician","support"] },
  { n:"Brook",           e:"Soul King",             pool:"op-straw", p:54, r:["striker","support","wildcard"] },
  { n:"Usopp",           e:"God Usopp",             pool:"op-straw", p:46, r:["tactician","support","wildcard"] },
  { n:"Tony Tony Chopper",e:"Cotton Candy Lover",   pool:"op-straw", p:44, r:["support","wildcard"] },
  // Pirate Legends (elite)
  { n:"Shanks",          e:"Red-Haired Emperor",    pool:"op-legends", p:93, r:["ace","right","wildcard"] },
  { n:"Silvers Rayleigh",e:"Dark King",             pool:"op-legends", p:88, r:["right","tactician","anchor"] },
  { n:"Trafalgar Law",   e:"Surgeon of Death",      pool:"op-legends", p:83, r:["tactician","support","striker"] },
  { n:"Portgas D. Ace",  e:"Fire Fist",             pool:"op-legends", p:81, r:["striker","wildcard"] },
  { n:"Marco",           e:"The Phoenix",           pool:"op-legends", p:80, r:["support","striker","anchor"] },
  { n:"Boa Hancock",     e:"Pirate Empress",        pool:"op-legends", p:80, r:["striker","wildcard"] },
  // Marines & Rookies (weak)
  { n:"Smoker",          e:"White Hunter",          pool:"op-grunts", p:64, r:["anchor","striker"] },
  { n:"Tashigi",         e:"Marine Swordsman",      pool:"op-grunts", p:48, r:["striker","wildcard"] },
  { n:"Buggy",           e:"The Clown",             pool:"op-grunts", p:44, r:["tactician","wildcard"] },
  { n:"Bellamy",         e:"The Hyena",             pool:"op-grunts", p:42, r:["striker","wildcard"] },
  { n:"Coby",            e:"Marine Prodigy",        pool:"op-grunts", p:40, r:["support","wildcard"] },
  { n:"Mr. 3 (Galdino)", e:"Wax-Wax Man",           pool:"op-grunts", p:36, r:["tactician","support"] },
  { n:"Helmeppo",        e:"Marine Rookie",         pool:"op-grunts", p:28, r:["wildcard"] },

  /* ===== NARUTO ===== */
  // Leaf Village Jonin (core)
  { n:"Naruto Uzumaki",  e:"Baryon Mode Hokage",    pool:"nar-leaf", p:94, r:["ace","striker","wildcard"] },
  { n:"Sasuke Uchiha",   e:"Rinnegan Avenger",      pool:"nar-leaf", p:92, r:["right","striker","tactician"] },
  { n:"Might Guy",       e:"Eighth Gate",           pool:"nar-leaf", p:85, r:["striker","anchor"] },
  { n:"Kakashi Hatake",  e:"Copy Ninja",            pool:"nar-leaf", p:80, r:["tactician","striker","support"] },
  { n:"Tsunade",         e:"Legendary Sannin",      pool:"nar-leaf", p:76, r:["support","anchor","striker"] },
  { n:"Gaara",           e:"Kazekage",              pool:"nar-leaf", p:75, r:["anchor","support"] },
  { n:"Rock Lee",        e:"Hidden Lotus",          pool:"nar-leaf", p:66, r:["striker","wildcard"] },
  // Legendary Shinobi (elite)
  { n:"Hashirama Senju", e:"God of Shinobi",        pool:"nar-legends", p:90, r:["ace","anchor","support"] },
  { n:"Minato Namikaze", e:"Yellow Flash",          pool:"nar-legends", p:86, r:["ace","striker","tactician"] },
  { n:"Itachi Uchiha",   e:"Clan Slayer",           pool:"nar-legends", p:84, r:["tactician","striker","wildcard"] },
  { n:"Tobirama Senju",  e:"Second Hokage",         pool:"nar-legends", p:82, r:["tactician","striker","wildcard"] },
  { n:"Killer Bee",      e:"Eight-Tails Jinchuriki",pool:"nar-legends", p:79, r:["striker","anchor"] },
  { n:"Jiraiya",         e:"Toad Sage",             pool:"nar-legends", p:78, r:["tactician","support","striker"] },
  // Academy & Genin (weak)
  { n:"Shikamaru Nara",  e:"Shadow Strategist",     pool:"nar-academy", p:58, r:["tactician","support"] },
  { n:"Choji Akimichi",  e:"Human Boulder",         pool:"nar-academy", p:48, r:["anchor","striker"] },
  { n:"Hinata Hyuga",    e:"Gentle Fist",           pool:"nar-academy", p:46, r:["striker","support"] },
  { n:"Kiba Inuzuka",    e:"Fang Over Fang",        pool:"nar-academy", p:44, r:["striker","wildcard"] },
  { n:"Konohamaru",      e:"Naruto's Student",      pool:"nar-academy", p:42, r:["striker","wildcard"] },
  { n:"Tenten",          e:"Weapons Mistress",      pool:"nar-academy", p:40, r:["striker","support"] },
  { n:"Ino Yamanaka",    e:"Mind Transfer",         pool:"nar-academy", p:38, r:["support","tactician"] },

  /* ===== JUJUTSU KAISEN ===== */
  // Jujutsu Sorcerers (core)
  { n:"Satoru Gojo",     e:"The Honored One",       pool:"jjk-sorc", p:96, r:["ace","anchor","wildcard"] },
  { n:"Yuji Itadori",    e:"Sukuna's Vessel",       pool:"jjk-sorc", p:83, r:["striker","wildcard"] },
  { n:"Megumi Fushiguro",e:"Ten Shadows",           pool:"jjk-sorc", p:78, r:["tactician","striker","support"] },
  { n:"Maki Zenin",      e:"Heavenly Restriction",  pool:"jjk-sorc", p:77, r:["striker","anchor","wildcard"] },
  { n:"Kento Nanami",    e:"Ratio Technique",       pool:"jjk-sorc", p:74, r:["striker","anchor"] },
  { n:"Aoi Todo",        e:"Boogie Woogie",         pool:"jjk-sorc", p:72, r:["support","striker","tactician"] },
  { n:"Nobara Kugisaki", e:"Straw Doll",            pool:"jjk-sorc", p:66, r:["striker","wildcard"] },
  // Special Grades (elite)
  { n:"Yuta Okkotsu",    e:"Special Grade",         pool:"jjk-special", p:88, r:["ace","right","striker"] },
  { n:"Suguru Geto",     e:"Cursed Spirit Manip.",  pool:"jjk-special", p:84, r:["tactician","striker","right"] },
  { n:"Kenjaku",         e:"Body Thief",            pool:"jjk-special", p:83, r:["tactician","wildcard"] },
  { n:"Kinji Hakari",    e:"Jackpot",               pool:"jjk-special", p:81, r:["anchor","striker"] },
  { n:"Toji Fushiguro",  e:"The Sorcerer Killer",   pool:"jjk-special", p:80, r:["striker","wildcard"] },
  // First-Years (weak)
  { n:"Panda",           e:"Cursed Corpse",         pool:"jjk-students", p:55, r:["anchor","striker"] },
  { n:"Kokichi Muta",    e:"Mechamaru",             pool:"jjk-students", p:52, r:["striker","support"] },
  { n:"Toge Inumaki",    e:"Cursed Speech",         pool:"jjk-students", p:50, r:["support","tactician","wildcard"] },
  { n:"Momo Nishimiya",  e:"Broom Flight",          pool:"jjk-students", p:38, r:["support","wildcard"] },
  { n:"Kasumi Miwa",     e:"New Shadow Style",      pool:"jjk-students", p:36, r:["striker","wildcard"] },

  /* ===== MY HERO ACADEMIA ===== */
  // Pro Heroes (elite)
  { n:"All Might",       e:"Symbol of Peace",       pool:"mha-pros", p:89, r:["ace","anchor","striker"] },
  { n:"Endeavor",        e:"No. 1 Hero",            pool:"mha-pros", p:83, r:["striker","anchor"] },
  { n:"Mirko",           e:"Rabbit Hero",           pool:"mha-pros", p:76, r:["striker","anchor"] },
  { n:"Hawks",           e:"Wing Hero",             pool:"mha-pros", p:72, r:["tactician","striker","support"] },
  { n:"Eraser Head",     e:"Shota Aizawa",          pool:"mha-pros", p:68, r:["tactician","support","wildcard"] },
  { n:"Best Jeanist",    e:"Fiber Master",          pool:"mha-pros", p:60, r:["support","tactician"] },
  // Class 1-A (core)
  { n:"Izuku Midoriya",  e:"Deku · One For All",    pool:"mha-1a", p:86, r:["ace","striker","wildcard"] },
  { n:"Katsuki Bakugo",  e:"Dynamight",             pool:"mha-1a", p:82, r:["right","striker","tactician"] },
  { n:"Shoto Todoroki",  e:"Half-Cold Half-Hot",    pool:"mha-1a", p:80, r:["striker","support","wildcard"] },
  { n:"Mirio Togata",    e:"Lemillion",             pool:"mha-1a", p:76, r:["anchor","striker","support"] },
  { n:"Eijiro Kirishima",e:"Red Riot",              pool:"mha-1a", p:60, r:["anchor","striker"] },
  { n:"Tsuyu Asui",      e:"Froppy",                pool:"mha-1a", p:58, r:["support","wildcard"] },
  { n:"Tenya Iida",      e:"Ingenium",              pool:"mha-1a", p:56, r:["striker","wildcard"] },
  { n:"Ochaco Uraraka",  e:"Uravity",               pool:"mha-1a", p:50, r:["support","wildcard"] },
  // Sidekicks & Students (weak)
  { n:"Mezo Shoji",      e:"Tentacole",             pool:"mha-side", p:48, r:["anchor","support"] },
  { n:"Denki Kaminari",  e:"Chargebolt",            pool:"mha-side", p:46, r:["striker","wildcard"] },
  { n:"Hanta Sero",      e:"Cellophane",            pool:"mha-side", p:44, r:["wildcard","support"] },
  { n:"Yuga Aoyama",     e:"Can't Stop Twinkling",  pool:"mha-side", p:40, r:["striker","wildcard"] },
  { n:"Minoru Mineta",   e:"Grape Juice",           pool:"mha-side", p:28, r:["wildcard"] },

  /* ===== DEMON SLAYER ===== */
  // The Hashira (elite)
  { n:"Gyomei Himejima", e:"Stone Hashira",         pool:"ds-hashira", p:84, r:["anchor","striker","ace"] },
  { n:"Sanemi Shinazugawa",e:"Wind Hashira",        pool:"ds-hashira", p:80, r:["striker","right"] },
  { n:"Giyu Tomioka",    e:"Water Hashira",         pool:"ds-hashira", p:78, r:["striker","anchor"] },
  { n:"Kyojuro Rengoku", e:"Flame Hashira",         pool:"ds-hashira", p:77, r:["ace","striker","support"] },
  { n:"Muichiro Tokito", e:"Mist Hashira",          pool:"ds-hashira", p:75, r:["striker","tactician"] },
  { n:"Obanai Iguro",    e:"Serpent Hashira",       pool:"ds-hashira", p:74, r:["striker","tactician"] },
  { n:"Mitsuri Kanroji", e:"Love Hashira",          pool:"ds-hashira", p:73, r:["striker","support"] },
  { n:"Tengen Uzui",     e:"Sound Hashira",         pool:"ds-hashira", p:72, r:["striker","anchor"] },
  { n:"Shinobu Kocho",   e:"Insect Hashira",        pool:"ds-hashira", p:64, r:["support","tactician"] },
  // Slayer Corps (core)
  { n:"Tanjiro Kamado",  e:"Sun Breathing",         pool:"ds-corps", p:76, r:["ace","striker","wildcard"] },
  { n:"Zenitsu Agatsuma",e:"Thunder Breathing",     pool:"ds-corps", p:72, r:["striker","wildcard"] },
  { n:"Inosuke Hashibira",e:"Beast Breathing",      pool:"ds-corps", p:68, r:["striker","wildcard"] },
  { n:"Kanao Tsuyuri",   e:"Flower Breathing",      pool:"ds-corps", p:62, r:["striker","wildcard"] },
  { n:"Nezuko Kamado",   e:"Demon Sister",          pool:"ds-corps", p:58, r:["striker","support","wildcard"] },
  { n:"Genya Shinazugawa",e:"Gun Slayer",           pool:"ds-corps", p:52, r:["striker","anchor"] },
  // Rookies & Kakushi (weak)
  { n:"Murata",          e:"Veteran Slayer",        pool:"ds-fodder", p:34, r:["wildcard","striker"] },
  { n:"Goto",            e:"Kakushi Corps",         pool:"ds-fodder", p:32, r:["anchor","wildcard"] },
  { n:"Aoi Kanzaki",     e:"Butterfly Estate",      pool:"ds-fodder", p:30, r:["support"] },
  { n:"Kiyo Terauchi",   e:"Estate Attendant",      pool:"ds-fodder", p:26, r:["support","wildcard"] },

  /* ===== BLACK CLOVER ===== */
  // Magic Knight Captains (elite)
  { n:"Julius Novachrono",e:"Wizard King",          pool:"bc-captains", p:88, r:["ace","tactician","wildcard"] },
  { n:"Yami Sukehiro",   e:"Black Bull Captain",    pool:"bc-captains", p:85, r:["ace","striker","anchor"] },
  { n:"Mereoleona Vermillion",e:"Hellfire",         pool:"bc-captains", p:84, r:["striker","anchor"] },
  { n:"Nozel Silva",     e:"Silver Eagle Captain",  pool:"bc-captains", p:76, r:["striker","tactician"] },
  { n:"Fuegoleon Vermillion",e:"Crimson Lion",      pool:"bc-captains", p:75, r:["anchor","striker","support"] },
  { n:"Nacht Faust",     e:"Shadow Magic",          pool:"bc-captains", p:72, r:["tactician","support","wildcard"] },
  // Black Bulls & Rivals (core)
  { n:"Yuno",            e:"Golden Dawn · Spirit",  pool:"bc-bulls", p:83, r:["right","striker","wildcard"] },
  { n:"Asta",            e:"Anti-Magic",            pool:"bc-bulls", p:82, r:["ace","striker","anchor"] },
  { n:"Noelle Silva",    e:"Valkyrie Dress",        pool:"bc-bulls", p:74, r:["support","striker","anchor"] },
  { n:"Luck Voltia",     e:"Lightning Magic",       pool:"bc-bulls", p:58, r:["striker","wildcard"] },
  { n:"Vanessa Enoteca", e:"Red Thread of Fate",    pool:"bc-bulls", p:52, r:["support","tactician"] },
  { n:"Gauche Adlai",    e:"Mirror Magic",          pool:"bc-bulls", p:50, r:["striker","tactician"] },
  { n:"Magna Swing",     e:"Fireball Magic",        pool:"bc-bulls", p:46, r:["striker","wildcard"] },
  // Junior Knights (weak)
  { n:"Charmy Pappitson",e:"Cotton & Food Magic",   pool:"bc-rookies", p:54, r:["support","striker"] },
  { n:"Henry Legolant",  e:"Recombination Magic",   pool:"bc-rookies", p:48, r:["anchor"] },
  { n:"Grey",            e:"Transformation Magic",   pool:"bc-rookies", p:42, r:["support","wildcard"] },
  { n:"Finral Roulacase",e:"Spatial Magic",         pool:"bc-rookies", p:40, r:["support","tactician","wildcard"] },
  { n:"Gordon Agrippa",  e:"Curse-Warding Magic",   pool:"bc-rookies", p:38, r:["support","tactician"] },

  /* ===== TOKYO GHOUL ===== */
  // Ghouls · Aogiri (core)
  { n:"Ken Kaneki",      e:"One-Eyed King",         pool:"tg-ghouls", p:85, r:["ace","striker","anchor"] },
  { n:"Renji Yomo",      e:"Raven",                 pool:"tg-ghouls", p:70, r:["anchor","striker"] },
  { n:"Ayato Kirishima", e:"Black Rabbit",          pool:"tg-ghouls", p:68, r:["striker","wildcard"] },
  { n:"Tatara",          e:"Aogiri Executive",      pool:"tg-ghouls", p:66, r:["striker","anchor"] },
  { n:"Touka Kirishima", e:"Rabbit",                pool:"tg-ghouls", p:66, r:["striker","support"] },
  // Doves · CCG (core)
  { n:"Kishou Arima",    e:"Reaper of the CCG",     pool:"tg-doves", p:83, r:["right","striker","tactician"] },
  { n:"Juuzou Suzuya",   e:"Rei",                   pool:"tg-doves", p:72, r:["striker","wildcard"] },
  { n:"Koutarou Amon",   e:"CCG Investigator",      pool:"tg-doves", p:63, r:["anchor","tactician","support"] },
  { n:"Take Hirako",     e:"Squad Leader",          pool:"tg-doves", p:60, r:["striker","tactician"] },
  { n:"Akira Mado",      e:"CCG Investigator",      pool:"tg-doves", p:54, r:["tactician","support"] },

  /* ===== ONE PIECE — added crews ===== */
  // Yonko Commanders (elite)
  { n:"Charlotte Katakuri",e:"Sweet Commander",     pool:"op-emperors", p:85, r:["right","striker","tactician"] },
  { n:"King",            e:"The Wildfire",          pool:"op-emperors", p:82, r:["striker","anchor"] },
  { n:"Ben Beckman",     e:"Red Hair's Right Hand", pool:"op-emperors", p:80, r:["right","tactician","anchor"] },
  { n:"Queen",           e:"The Plague",            pool:"op-emperors", p:76, r:["anchor","striker","support"] },
  { n:"Charlotte Smoothie",e:"Sweet Commander",     pool:"op-emperors", p:70, r:["striker","support"] },
  { n:"Yasopp",          e:"Red Hair Sniper",       pool:"op-emperors", p:64, r:["striker","wildcard"] },
  // Worst Generation (core)
  { n:"Eustass Kid",     e:"Captain",               pool:"op-worstgen", p:80, r:["ace","striker","anchor"] },
  { n:"Killer",          e:"Massacre Soldier",      pool:"op-worstgen", p:68, r:["striker","right"] },
  { n:"X Drake",         e:"Red Flag",              pool:"op-worstgen", p:64, r:["striker","anchor"] },
  { n:"Basil Hawkins",   e:"The Magician",          pool:"op-worstgen", p:60, r:["tactician","striker"] },
  { n:"Capone Bege",     e:"Gang",                  pool:"op-worstgen", p:56, r:["anchor","tactician"] },
  { n:"Jewelry Bonney",  e:"The Glutton",           pool:"op-worstgen", p:54, r:["support","tactician","wildcard"] },
  { n:"Scratchmen Apoo", e:"The Roar of the Sea",   pool:"op-worstgen", p:52, r:["tactician","wildcard"] },
  // Admirals & Warlords (elite)
  { n:"Dracule Mihawk",  e:"World's Strongest Swordsman",pool:"op-gov", p:88, r:["ace","right","striker"] },
  { n:"Monkey D. Garp",  e:"The Hero",              pool:"op-gov", p:86, r:["anchor","striker","ace"] },
  { n:"Kizaru (Borsalino)",e:"Admiral",             pool:"op-gov", p:85, r:["striker","wildcard"] },
  { n:"Aokiji (Kuzan)",  e:"Former Admiral",        pool:"op-gov", p:84, r:["anchor","striker"] },
  { n:"Fujitora (Issho)",e:"Admiral",               pool:"op-gov", p:82, r:["anchor","tactician","striker"] },
  { n:"Donquixote Doflamingo",e:"Heavenly Yaksha",  pool:"op-gov", p:80, r:["striker","tactician","wildcard"] },
  { n:"Rob Lucci",       e:"CP0",                   pool:"op-gov", p:76, r:["striker","anchor"] },
  { n:"Crocodile",       e:"Desert King",           pool:"op-gov", p:72, r:["tactician","striker"] },

  /* ===== NARUTO — added groups ===== */
  // Akatsuki (elite)
  { n:"Pain (Nagato)",   e:"Six Paths",             pool:"nar-akatsuki", p:86, r:["ace","tactician","striker"] },
  { n:"Obito Uchiha",    e:"Masked Man",            pool:"nar-akatsuki", p:85, r:["right","striker","tactician"] },
  { n:"Kisame Hoshigaki",e:"Tailless Tailed Beast", pool:"nar-akatsuki", p:78, r:["anchor","striker"] },
  { n:"Sasori",          e:"of the Red Sand",       pool:"nar-akatsuki", p:72, r:["tactician","striker"] },
  { n:"Deidara",         e:"Explosive Art",         pool:"nar-akatsuki", p:70, r:["striker","wildcard"] },
  { n:"Kakuzu",          e:"Five Hearts",           pool:"nar-akatsuki", p:68, r:["anchor","tactician"] },
  { n:"Konan",           e:"Angel of God",          pool:"nar-akatsuki", p:66, r:["support","striker"] },
  // The Five Kage (core)
  { n:"A (Fourth Raikage)",e:"Lightning Shadow",    pool:"nar-kage", p:80, r:["striker","anchor"] },
  { n:"Onoki",           e:"Fence-Sitter",          pool:"nar-kage", p:74, r:["tactician","striker","support"] },
  { n:"Mei Terumi",      e:"Fifth Mizukage",        pool:"nar-kage", p:70, r:["striker","support"] },
  { n:"Mu",              e:"Second Tsuchikage",     pool:"nar-kage", p:66, r:["tactician","wildcard"] },
  { n:"Gengetsu Hozuki", e:"Second Mizukage",       pool:"nar-kage", p:64, r:["tactician","support"] },
  // Sand & Mist (core)
  { n:"Kimimaro",        e:"Kaguya Clan",           pool:"nar-sand", p:62, r:["striker","anchor"] },
  { n:"Zabuza Momochi",  e:"Demon of the Mist",     pool:"nar-sand", p:60, r:["striker","anchor"] },
  { n:"Temari",          e:"Wind Fan",              pool:"nar-sand", p:58, r:["striker","support"] },
  { n:"Haku",            e:"Ice Mirrors",           pool:"nar-sand", p:56, r:["striker","support","wildcard"] },
  { n:"Chiyo",           e:"Puppet Elder",          pool:"nar-sand", p:54, r:["support","tactician"] },
  { n:"Kankuro",         e:"Puppet Master",         pool:"nar-sand", p:52, r:["tactician","wildcard"] },

  /* ===== BLACK CLOVER — added squads ===== */
  // Golden Dawn (core)
  { n:"William Vangeance",e:"Golden Dawn Captain",  pool:"bc-goldendawn", p:80, r:["ace","tactician","support"] },
  { n:"Langris Vaude",   e:"Spatial Magic",         pool:"bc-goldendawn", p:64, r:["striker","tactician"] },
  { n:"Klaus Lunettes",  e:"Steel Magic",           pool:"bc-goldendawn", p:56, r:["tactician","support"] },
  { n:"Mimosa Vermillion",e:"Plant Healing Magic",  pool:"bc-goldendawn", p:54, r:["support"] },
  { n:"Alecdora Sandler",e:"Sand Magic",            pool:"bc-goldendawn", p:52, r:["striker","wildcard"] },
  // Royal Magic Squads (core)
  { n:"Dorothy Unsworth",e:"Dream Magic",           pool:"bc-squads", p:76, r:["tactician","support","wildcard"] },
  { n:"Jack the Ripper", e:"Severing Magic",        pool:"bc-squads", p:74, r:["striker","wildcard"] },
  { n:"Charlotte Roselei",e:"Briar Magic",          pool:"bc-squads", p:72, r:["striker","anchor","support"] },
  { n:"Rill Boismortier",e:"Picture Magic",         pool:"bc-squads", p:70, r:["striker","wildcard"] },
  { n:"Kaiser Granvorka",e:"Vortex Magic",          pool:"bc-squads", p:60, r:["anchor","striker"] },
  // Dark Triad & Devils (elite)
  { n:"Zenon Zogratis",  e:"Dark Triad",            pool:"bc-devils", p:83, r:["striker","tactician"] },
  { n:"Dante Zogratis",  e:"Dark Triad",            pool:"bc-devils", p:82, r:["anchor","striker","ace"] },
  { n:"Vanica Zogratis", e:"Dark Triad",            pool:"bc-devils", p:78, r:["striker","wildcard"] },
  { n:"Vetto",           e:"Despair Disaster",      pool:"bc-devils", p:72, r:["anchor","striker"] },
  { n:"Rhya",            e:"Imitation Magic",       pool:"bc-devils", p:64, r:["tactician","wildcard"] },

  /* ===== MY HERO ACADEMIA — Class 1-B ===== */
  { n:"Itsuka Kendo",    e:"Battle Fist",           pool:"mha-1b", p:54, r:["striker","support","anchor"] },
  { n:"Tetsutetsu Tetsutetsu",e:"Real Steel",       pool:"mha-1b", p:56, r:["anchor","striker"] },
  { n:"Hitoshi Shinso",  e:"Brainwashing",          pool:"mha-1b", p:52, r:["tactician","support","wildcard"] },
  { n:"Ibara Shiozaki",  e:"Vines",                 pool:"mha-1b", p:50, r:["support","anchor"] },
  { n:"Neito Monoma",    e:"Copy",                  pool:"mha-1b", p:48, r:["tactician","wildcard"] },
  { n:"Juzo Honenuki",   e:"Softening",             pool:"mha-1b", p:46, r:["tactician","anchor"] }
];

/* ---- derive each character's series (s) from its pool, for synergy ---- */
const POOL_SERIES = Object.fromEntries(POOLS.map(p=>[p.id, p.series]));
CHARACTERS.forEach(c=>{ c.s = POOL_SERIES[c.pool]; });

/* =====================================================================
   THE VILLAIN GAUNTLET — the worst villain from each series.
   ===================================================================== */
const VILLAINS = [
  { n:"Sukuna",      e:"King of Curses",        s:"jjk",        p:97 },
  { n:"Madara Uchiha",e:"Ghost of the Uchiha",  s:"naruto",     p:95 },
  { n:"Kaido",       e:"Strongest Creature",    s:"onepiece",   p:94 },
  { n:"Lucifero",    e:"Highest-Ranked Devil",  s:"blackclover",p:92 },
  { n:"All For One",  e:"Symbol of Fear",       s:"mha",        p:91 },
  { n:"Muzan Kibutsuji", e:"Demon King",        s:"demonslayer",p:90 },
  { n:"Eto Yoshimura",e:"One-Eyed Owl",         s:"tokyoghoul", p:84 }
];

/* Expose to window + node (for the simulator) */
if (typeof window !== "undefined") {
  window.SERIES = SERIES;
  window.POOLS = POOLS;
  window.ROLE_DEFS = ROLE_DEFS;
  window.SLOTS = SLOTS;
  window.CHARACTERS = CHARACTERS;
  window.VILLAINS = VILLAINS;
}
if (typeof module !== "undefined" && module.exports) {
  module.exports = { SERIES, POOLS, ROLE_DEFS, SLOTS, CHARACTERS, VILLAINS };
}
