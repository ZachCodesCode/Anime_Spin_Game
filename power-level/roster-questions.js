// Frozen launch roster and independent editorial rarity ratings (0–100).
const POWER_LEVEL_QUESTIONS = [
  {
    "id": "roster-v1-op-straw",
    "anime": "onepiece",
    "category": "Straw Hat Pirates",
    "text": "Name a fighter in Shonen Spin’s “Straw Hat Pirates” draft pool.",
    "note": "Roster challenge: this refers to the site’s game grouping, not a complete canon faction. Browse the team builder’s pool guide to learn its roster.",
    "source": "characters_data.js — op-straw",
    "answers": [
      {
        "name": "Monkey D. Luffy",
        "aliases": [
          "Luffy",
          "Monkey D Luffy"
        ],
        "rarity": 0,
        "note": "Gear 5 · Sun God Nika"
      },
      {
        "name": "Roronoa Zoro",
        "aliases": [
          "Zoro",
          "Zoro Roronoa"
        ],
        "rarity": 10,
        "note": "Pirate Hunter"
      },
      {
        "name": "Sanji",
        "aliases": [],
        "rarity": 15,
        "note": "Black Leg"
      },
      {
        "name": "Jinbe",
        "aliases": [],
        "rarity": 55,
        "note": "Knight of the Sea"
      },
      {
        "name": "Nico Robin",
        "aliases": [
          "Robin Nico"
        ],
        "rarity": 35,
        "note": "Devil Child"
      },
      {
        "name": "Franky",
        "aliases": [],
        "rarity": 78,
        "note": "Cyborg"
      },
      {
        "name": "Nami",
        "aliases": [],
        "rarity": 25,
        "note": "Cat Burglar"
      },
      {
        "name": "Brook",
        "aliases": [],
        "rarity": 100,
        "note": "Soul King"
      },
      {
        "name": "Usopp",
        "aliases": [],
        "rarity": 65,
        "note": "God Usopp"
      },
      {
        "name": "Tony Tony Chopper",
        "aliases": [
          "Chopper"
        ],
        "rarity": 45,
        "note": "Cotton Candy Lover"
      }
    ]
  },
  {
    "id": "roster-v1-op-worstgen",
    "anime": "onepiece",
    "category": "Worst Generation",
    "text": "Name a fighter in Shonen Spin’s “Worst Generation” draft pool.",
    "note": "Roster challenge: this refers to the site’s game grouping, not a complete canon faction. Browse the team builder’s pool guide to learn its roster.",
    "source": "characters_data.js — op-worstgen",
    "answers": [
      {
        "name": "Eustass Kid",
        "aliases": [
          "Kid Eustass"
        ],
        "rarity": 10,
        "note": "Captain"
      },
      {
        "name": "Killer",
        "aliases": [],
        "rarity": 55,
        "note": "Massacre Soldier"
      },
      {
        "name": "X Drake",
        "aliases": [
          "Drake X"
        ],
        "rarity": 40,
        "note": "Red Flag"
      },
      {
        "name": "Basil Hawkins",
        "aliases": [
          "Hawkins Basil"
        ],
        "rarity": 75,
        "note": "The Magician"
      },
      {
        "name": "Capone Bege",
        "aliases": [
          "Bege Capone"
        ],
        "rarity": 90,
        "note": "Gang"
      },
      {
        "name": "Jewelry Bonney",
        "aliases": [
          "Bonney Jewelry"
        ],
        "rarity": 20,
        "note": "The Glutton"
      },
      {
        "name": "Scratchmen Apoo",
        "aliases": [
          "Apoo Scratchmen"
        ],
        "rarity": 100,
        "note": "The Roar of the Sea"
      }
    ]
  },
  {
    "id": "roster-v1-nar-akatsuki",
    "anime": "naruto",
    "category": "Akatsuki",
    "text": "Name a fighter in Shonen Spin’s “Akatsuki” draft pool.",
    "note": "Roster challenge: this refers to the site’s game grouping, not a complete canon faction. Browse the team builder’s pool guide to learn its roster.",
    "source": "characters_data.js — nar-akatsuki",
    "answers": [
      {
        "name": "Pain (Nagato)",
        "aliases": [
          "Pain",
          "Nagato",
          "(Nagato) Pain"
        ],
        "rarity": 5,
        "note": "Six Paths"
      },
      {
        "name": "Obito Uchiha",
        "aliases": [
          "Uchiha Obito"
        ],
        "rarity": 10,
        "note": "Masked Man"
      },
      {
        "name": "Kisame Hoshigaki",
        "aliases": [
          "Hoshigaki Kisame"
        ],
        "rarity": 45,
        "note": "Tailless Tailed Beast"
      },
      {
        "name": "Sasori",
        "aliases": [],
        "rarity": 65,
        "note": "of the Red Sand"
      },
      {
        "name": "Deidara",
        "aliases": [],
        "rarity": 35,
        "note": "Explosive Art"
      },
      {
        "name": "Kakuzu",
        "aliases": [],
        "rarity": 100,
        "note": "Five Hearts"
      },
      {
        "name": "Konan",
        "aliases": [],
        "rarity": 55,
        "note": "Angel of God"
      }
    ]
  },
  {
    "id": "roster-v1-nar-kage",
    "anime": "naruto",
    "category": "The Five Kage",
    "text": "Name a fighter in Shonen Spin’s “The Five Kage” draft pool.",
    "note": "Roster challenge: this refers to the site’s game grouping, not a complete canon faction. Browse the team builder’s pool guide to learn its roster.",
    "source": "characters_data.js — nar-kage",
    "answers": [
      {
        "name": "A (Fourth Raikage)",
        "aliases": [
          "A",
          "Fourth Raikage"
        ],
        "rarity": 30,
        "note": "Lightning Shadow"
      },
      {
        "name": "Onoki",
        "aliases": [],
        "rarity": 20,
        "note": "Fence-Sitter"
      },
      {
        "name": "Mei Terumi",
        "aliases": [
          "Terumi Mei"
        ],
        "rarity": 40,
        "note": "Fifth Mizukage"
      },
      {
        "name": "Mu",
        "aliases": [],
        "rarity": 100,
        "note": "Second Tsuchikage"
      },
      {
        "name": "Gengetsu Hozuki",
        "aliases": [
          "Hozuki Gengetsu"
        ],
        "rarity": 85,
        "note": "Second Mizukage"
      }
    ]
  },
  {
    "id": "roster-v1-jjk-students",
    "anime": "jjk",
    "category": "First-Years",
    "text": "Name a fighter in Shonen Spin’s “First-Years” draft pool.",
    "note": "Roster challenge: this refers to the site’s game grouping, not a complete canon faction. Browse the team builder’s pool guide to learn its roster.",
    "source": "characters_data.js — jjk-students",
    "answers": [
      {
        "name": "Panda",
        "aliases": [],
        "rarity": 10,
        "note": "Cursed Corpse"
      },
      {
        "name": "Kokichi Muta",
        "aliases": [
          "Mechamaru",
          "Muta Kokichi"
        ],
        "rarity": 65,
        "note": "Mechamaru"
      },
      {
        "name": "Toge Inumaki",
        "aliases": [
          "Inumaki Toge"
        ],
        "rarity": 20,
        "note": "Cursed Speech"
      },
      {
        "name": "Momo Nishimiya",
        "aliases": [
          "Nishimiya Momo"
        ],
        "rarity": 100,
        "note": "Broom Flight"
      },
      {
        "name": "Kasumi Miwa",
        "aliases": [
          "Miwa Kasumi"
        ],
        "rarity": 50,
        "note": "New Shadow Style"
      }
    ]
  },
  {
    "id": "roster-v1-jjk-zenin",
    "anime": "jjk",
    "category": "Zenin Clan",
    "text": "Name a fighter in Shonen Spin’s “Zenin Clan” draft pool.",
    "note": "Roster challenge: this refers to the site’s game grouping, not a complete canon faction. Browse the team builder’s pool guide to learn its roster.",
    "source": "characters_data.js — jjk-zenin",
    "answers": [
      {
        "name": "Naoya Zenin",
        "aliases": [
          "Zenin Naoya"
        ],
        "rarity": 20,
        "note": "Projection Sorcery"
      },
      {
        "name": "Naobito Zenin",
        "aliases": [
          "Zenin Naobito"
        ],
        "rarity": 40,
        "note": "Clan Head"
      },
      {
        "name": "Jinichi Zenin",
        "aliases": [
          "Zenin Jinichi"
        ],
        "rarity": 100,
        "note": "Hei Captain"
      },
      {
        "name": "Ogi Zenin",
        "aliases": [
          "Zenin Ogi"
        ],
        "rarity": 85,
        "note": "Flame Blade"
      },
      {
        "name": "Mai Zenin",
        "aliases": [
          "Zenin Mai"
        ],
        "rarity": 30,
        "note": "Construction"
      }
    ]
  },
  {
    "id": "roster-v1-mha-1a",
    "anime": "mha",
    "category": "Class 1-A",
    "text": "Name a fighter in Shonen Spin’s “Class 1-A” draft pool.",
    "note": "Roster challenge: this refers to the site’s game grouping, not a complete canon faction. Browse the team builder’s pool guide to learn its roster.",
    "source": "characters_data.js — mha-1a",
    "answers": [
      {
        "name": "Izuku Midoriya",
        "aliases": [
          "Deku",
          "Midoriya Izuku"
        ],
        "rarity": 0,
        "note": "Deku · One For All"
      },
      {
        "name": "Katsuki Bakugo",
        "aliases": [
          "Bakugo Katsuki"
        ],
        "rarity": 10,
        "note": "Dynamight"
      },
      {
        "name": "Shoto Todoroki",
        "aliases": [
          "Todoroki Shoto"
        ],
        "rarity": 15,
        "note": "Half-Cold Half-Hot"
      },
      {
        "name": "Mirio Togata",
        "aliases": [
          "Togata Mirio"
        ],
        "rarity": 45,
        "note": "Lemillion"
      },
      {
        "name": "Eijiro Kirishima",
        "aliases": [
          "Kirishima Eijiro"
        ],
        "rarity": 55,
        "note": "Red Riot"
      },
      {
        "name": "Tsuyu Asui",
        "aliases": [
          "Asui Tsuyu"
        ],
        "rarity": 65,
        "note": "Froppy"
      },
      {
        "name": "Tenya Iida",
        "aliases": [
          "Iida Tenya"
        ],
        "rarity": 100,
        "note": "Ingenium"
      },
      {
        "name": "Ochaco Uraraka",
        "aliases": [
          "Uraraka Ochaco"
        ],
        "rarity": 35,
        "note": "Uravity"
      }
    ]
  },
  {
    "id": "roster-v1-mha-1b",
    "anime": "mha",
    "category": "Class 1-B",
    "text": "Name a fighter in Shonen Spin’s “Class 1-B” draft pool.",
    "note": "Roster challenge: this refers to the site’s game grouping, not a complete canon faction. Browse the team builder’s pool guide to learn its roster.",
    "source": "characters_data.js — mha-1b",
    "answers": [
      {
        "name": "Itsuka Kendo",
        "aliases": [
          "Kendo Itsuka"
        ],
        "rarity": 30,
        "note": "Battle Fist"
      },
      {
        "name": "Tetsutetsu Tetsutetsu",
        "aliases": [
          "Tetsutetsu Tetsutetsu"
        ],
        "rarity": 55,
        "note": "Real Steel"
      },
      {
        "name": "Hitoshi Shinso",
        "aliases": [
          "Shinso Hitoshi"
        ],
        "rarity": 15,
        "note": "Brainwashing"
      },
      {
        "name": "Ibara Shiozaki",
        "aliases": [
          "Shiozaki Ibara"
        ],
        "rarity": 80,
        "note": "Vines"
      },
      {
        "name": "Neito Monoma",
        "aliases": [
          "Monoma Neito"
        ],
        "rarity": 40,
        "note": "Copy"
      },
      {
        "name": "Juzo Honenuki",
        "aliases": [
          "Honenuki Juzo"
        ],
        "rarity": 100,
        "note": "Softening"
      }
    ]
  },
  {
    "id": "roster-v1-ds-hashira",
    "anime": "demonslayer",
    "category": "The Hashira",
    "text": "Name a fighter in Shonen Spin’s “The Hashira” draft pool.",
    "note": "Roster challenge: this refers to the site’s game grouping, not a complete canon faction. Browse the team builder’s pool guide to learn its roster.",
    "source": "characters_data.js — ds-hashira",
    "answers": [
      {
        "name": "Gyomei Himejima",
        "aliases": [
          "Himejima Gyomei"
        ],
        "rarity": 55,
        "note": "Stone Hashira"
      },
      {
        "name": "Sanemi Shinazugawa",
        "aliases": [
          "Shinazugawa Sanemi"
        ],
        "rarity": 45,
        "note": "Wind Hashira"
      },
      {
        "name": "Giyu Tomioka",
        "aliases": [
          "Tomioka Giyu"
        ],
        "rarity": 10,
        "note": "Water Hashira"
      },
      {
        "name": "Kyojuro Rengoku",
        "aliases": [
          "Rengoku Kyojuro"
        ],
        "rarity": 0,
        "note": "Flame Hashira"
      },
      {
        "name": "Muichiro Tokito",
        "aliases": [
          "Tokito Muichiro"
        ],
        "rarity": 30,
        "note": "Mist Hashira"
      },
      {
        "name": "Obanai Iguro",
        "aliases": [
          "Iguro Obanai"
        ],
        "rarity": 100,
        "note": "Serpent Hashira"
      },
      {
        "name": "Mitsuri Kanroji",
        "aliases": [
          "Kanroji Mitsuri"
        ],
        "rarity": 35,
        "note": "Love Hashira"
      },
      {
        "name": "Tengen Uzui",
        "aliases": [
          "Uzui Tengen"
        ],
        "rarity": 20,
        "note": "Sound Hashira"
      },
      {
        "name": "Shinobu Kocho",
        "aliases": [
          "Kocho Shinobu"
        ],
        "rarity": 15,
        "note": "Insect Hashira"
      }
    ]
  },
  {
    "id": "roster-v1-ds-estate",
    "anime": "demonslayer",
    "category": "Butterfly Estate",
    "text": "Name a fighter in Shonen Spin’s “Butterfly Estate” draft pool.",
    "note": "Roster challenge: this refers to the site’s game grouping, not a complete canon faction. Browse the team builder’s pool guide to learn its roster.",
    "source": "characters_data.js — ds-estate",
    "answers": [
      {
        "name": "Tamayo",
        "aliases": [],
        "rarity": 10,
        "note": "Ally Demon Doctor"
      },
      {
        "name": "Kanae Kocho",
        "aliases": [
          "Kocho Kanae"
        ],
        "rarity": 40,
        "note": "Flower Hashira"
      },
      {
        "name": "Yushiro",
        "aliases": [],
        "rarity": 55,
        "note": "Blood Demon Art"
      },
      {
        "name": "Kiriya Ubuyashiki",
        "aliases": [
          "Ubuyashiki Kiriya"
        ],
        "rarity": 85,
        "note": "Corps Leader"
      },
      {
        "name": "Amane Ubuyashiki",
        "aliases": [
          "Ubuyashiki Amane"
        ],
        "rarity": 100,
        "note": "Estate Keeper"
      }
    ]
  },
  {
    "id": "roster-v1-bc-bulls",
    "anime": "blackclover",
    "category": "Black Bulls",
    "text": "Name a fighter in Shonen Spin’s “Black Bulls” draft pool.",
    "note": "Roster challenge: this refers to the site’s game grouping, not a complete canon faction. Browse the team builder’s pool guide to learn its roster.",
    "source": "characters_data.js — bc-bulls",
    "answers": [
      {
        "name": "Yuno",
        "aliases": [],
        "rarity": 10,
        "note": "Golden Dawn · Spirit"
      },
      {
        "name": "Asta",
        "aliases": [],
        "rarity": 0,
        "note": "Anti-Magic"
      },
      {
        "name": "Noelle Silva",
        "aliases": [
          "Silva Noelle"
        ],
        "rarity": 20,
        "note": "Valkyrie Dress"
      },
      {
        "name": "Luck Voltia",
        "aliases": [
          "Voltia Luck"
        ],
        "rarity": 45,
        "note": "Lightning Magic"
      },
      {
        "name": "Vanessa Enoteca",
        "aliases": [
          "Enoteca Vanessa"
        ],
        "rarity": 65,
        "note": "Red Thread of Fate"
      },
      {
        "name": "Gauche Adlai",
        "aliases": [
          "Adlai Gauche"
        ],
        "rarity": 100,
        "note": "Mirror Magic"
      },
      {
        "name": "Magna Swing",
        "aliases": [
          "Swing Magna"
        ],
        "rarity": 80,
        "note": "Fireball Magic"
      }
    ]
  },
  {
    "id": "roster-v1-bc-goldendawn",
    "anime": "blackclover",
    "category": "Golden Dawn",
    "text": "Name a fighter in Shonen Spin’s “Golden Dawn” draft pool.",
    "note": "Roster challenge: this refers to the site’s game grouping, not a complete canon faction. Browse the team builder’s pool guide to learn its roster.",
    "source": "characters_data.js — bc-goldendawn",
    "answers": [
      {
        "name": "William Vangeance",
        "aliases": [
          "Vangeance William"
        ],
        "rarity": 15,
        "note": "Golden Dawn Captain"
      },
      {
        "name": "Langris Vaude",
        "aliases": [
          "Vaude Langris"
        ],
        "rarity": 55,
        "note": "Spatial Magic"
      },
      {
        "name": "Klaus Lunettes",
        "aliases": [
          "Lunettes Klaus"
        ],
        "rarity": 80,
        "note": "Steel Magic"
      },
      {
        "name": "Mimosa Vermillion",
        "aliases": [
          "Vermillion Mimosa"
        ],
        "rarity": 25,
        "note": "Plant Healing Magic"
      },
      {
        "name": "Alecdora Sandler",
        "aliases": [
          "Sandler Alecdora"
        ],
        "rarity": 100,
        "note": "Sand Magic"
      }
    ]
  },
  {
    "id": "roster-v1-tg-quinx",
    "anime": "tokyoghoul",
    "category": "Quinx Squad",
    "text": "Name a fighter in Shonen Spin’s “Quinx Squad” draft pool.",
    "note": "Roster challenge: this refers to the site’s game grouping, not a complete canon faction. Browse the team builder’s pool guide to learn its roster.",
    "source": "characters_data.js — tg-quinx",
    "answers": [
      {
        "name": "Haise Sasaki",
        "aliases": [
          "Haise",
          "Sasaki Haise"
        ],
        "rarity": 5,
        "note": "Quinx Mentor"
      },
      {
        "name": "Kuki Urie",
        "aliases": [
          "Urie Kuki"
        ],
        "rarity": 30,
        "note": "Squad Leader"
      },
      {
        "name": "Ginshi Shirazu",
        "aliases": [
          "Shirazu Ginshi"
        ],
        "rarity": 70,
        "note": "Quinx Investigator"
      },
      {
        "name": "Tooru Mutsuki",
        "aliases": [
          "Mutsuki Tooru"
        ],
        "rarity": 45,
        "note": "Quinx Investigator"
      },
      {
        "name": "Saiko Yonebayashi",
        "aliases": [
          "Yonebayashi Saiko"
        ],
        "rarity": 100,
        "note": "Quinx Investigator"
      }
    ]
  },
  {
    "id": "roster-v1-tg-clowns",
    "anime": "tokyoghoul",
    "category": "The Clowns",
    "text": "Name a fighter in Shonen Spin’s “The Clowns” draft pool.",
    "note": "Roster challenge: this refers to the site’s game grouping, not a complete canon faction. Browse the team builder’s pool guide to learn its roster.",
    "source": "characters_data.js — tg-clowns",
    "answers": [
      {
        "name": "Uta",
        "aliases": [],
        "rarity": 10,
        "note": "No Face"
      },
      {
        "name": "Donato Porpora",
        "aliases": [
          "Porpora Donato"
        ],
        "rarity": 65,
        "note": "Priest Ghoul"
      },
      {
        "name": "Kaiko",
        "aliases": [],
        "rarity": 100,
        "note": "Pierrot"
      },
      {
        "name": "Nico",
        "aliases": [],
        "rarity": 80,
        "note": "Double Agent"
      },
      {
        "name": "Itori",
        "aliases": [],
        "rarity": 45,
        "note": "Helter Skelter"
      }
    ]
  }
];
if(typeof module!=="undefined") module.exports=POWER_LEVEL_QUESTIONS;
