// Frozen v3 anime-only question bank. Editorial rarity is independent of combat power.
const POWER_LEVEL_SERIES=[{"id":"bleach","name":"Bleach"},{"id":"naruto","name":"Naruto"},{"id":"onepiece","name":"One Piece"},{"id":"hxh","name":"Hunter × Hunter"},{"id":"tokyoghoul","name":"Tokyo Ghoul"},{"id":"mha","name":"My Hero Academia"},{"id":"blackclover","name":"Black Clover"},{"id":"demonslayer","name":"Demon Slayer"},{"id":"aot","name":"Attack on Titan"}];
const POWER_LEVEL_QUESTIONS=[
  {
    "id": "timed-v3-bleach",
    "anime": "bleach",
    "category": "Bleach",
    "text": "Bleach — Name one of Isshin and Masaki Kurosaki’s three children.",
    "note": "Early-series family",
    "answers": [
      {
        "name": "Ichigo Kurosaki",
        "rarity": 10,
        "aliases": [
          "Ichigo",
          "Kurosaki Ichigo"
        ],
        "note": "Early-series family"
      },
      {
        "name": "Karin Kurosaki",
        "rarity": 70,
        "aliases": [
          "Karin",
          "Kurosaki Karin"
        ],
        "note": "Early-series family"
      },
      {
        "name": "Yuzu Kurosaki",
        "rarity": 100,
        "aliases": [
          "Yuzu",
          "Kurosaki Yuzu"
        ],
        "note": "Early-series family"
      }
    ]
  },
  {
    "id": "timed-v3-naruto",
    "anime": "naruto",
    "category": "Naruto",
    "text": "Naruto — Name one of the original Team 7 members, including its teacher, when Kakashi first forms the team.",
    "note": "Original series",
    "answers": [
      {
        "name": "Naruto Uzumaki",
        "rarity": 0,
        "aliases": [
          "Naruto",
          "Uzumaki Naruto"
        ],
        "note": "Original series"
      },
      {
        "name": "Sasuke Uchiha",
        "rarity": 20,
        "aliases": [
          "Sasuke",
          "Uchiha Sasuke"
        ],
        "note": "Original series"
      },
      {
        "name": "Sakura Haruno",
        "rarity": 70,
        "aliases": [
          "Sakura",
          "Haruno Sakura"
        ],
        "note": "Original series"
      },
      {
        "name": "Kakashi Hatake",
        "rarity": 40,
        "aliases": [
          "Kakashi",
          "Hatake Kakashi"
        ],
        "note": "Original series"
      }
    ]
  },
  {
    "id": "timed-v3-onepiece",
    "anime": "onepiece",
    "category": "One Piece",
    "text": "One Piece — Name a Straw Hat who joins the crew during the East Blue saga, including the captain.",
    "note": "East Blue saga",
    "answers": [
      {
        "name": "Monkey D. Luffy",
        "rarity": 0,
        "aliases": [
          "Luffy"
        ],
        "note": "East Blue saga"
      },
      {
        "name": "Roronoa Zoro",
        "rarity": 20,
        "aliases": [
          "Zoro",
          "Zoro Roronoa"
        ],
        "note": "East Blue saga"
      },
      {
        "name": "Nami",
        "rarity": 55,
        "aliases": [],
        "note": "East Blue saga"
      },
      {
        "name": "Usopp",
        "rarity": 100,
        "aliases": [],
        "note": "East Blue saga"
      },
      {
        "name": "Sanji",
        "rarity": 35,
        "aliases": [
          "Vinsmoke Sanji"
        ],
        "note": "East Blue saga"
      }
    ]
  },
  {
    "id": "timed-v3-hxh",
    "anime": "hxh",
    "category": "Hunter × Hunter",
    "text": "Hunter × Hunter — Name one of Silva and Kikyo Zoldyck’s five children.",
    "note": "Spoilers: 2011 anime, Election arc",
    "answers": [
      {
        "name": "Killua Zoldyck",
        "rarity": 10,
        "aliases": [
          "Killua",
          "Zoldyck Killua"
        ],
        "note": "Spoilers: 2011 anime, Election arc"
      },
      {
        "name": "Illumi Zoldyck",
        "rarity": 35,
        "aliases": [
          "Illumi",
          "Zoldyck Illumi"
        ],
        "note": "Spoilers: 2011 anime, Election arc"
      },
      {
        "name": "Alluka Zoldyck",
        "rarity": 55,
        "aliases": [
          "Alluka",
          "Zoldyck Alluka"
        ],
        "note": "Spoilers: 2011 anime, Election arc"
      },
      {
        "name": "Kalluto Zoldyck",
        "rarity": 85,
        "aliases": [
          "Kalluto",
          "Zoldyck Kalluto"
        ],
        "note": "Spoilers: 2011 anime, Election arc"
      },
      {
        "name": "Milluki Zoldyck",
        "rarity": 100,
        "aliases": [
          "Milluki",
          "Zoldyck Milluki"
        ],
        "note": "Spoilers: 2011 anime, Election arc"
      }
    ]
  },
  {
    "id": "timed-v3-tokyoghoul",
    "anime": "tokyoghoul",
    "category": "Tokyo Ghoul",
    "text": "Tokyo Ghoul — Name one of the four original Quinx investigators assigned under Haise Sasaki, excluding Haise.",
    "note": "Spoilers: Tokyo Ghoul :re opening",
    "answers": [
      {
        "name": "Kuki Urie",
        "rarity": 25,
        "aliases": [
          "Urie",
          "Urie Kuki"
        ],
        "note": "Spoilers: Tokyo Ghoul :re opening"
      },
      {
        "name": "Tooru Mutsuki",
        "rarity": 50,
        "aliases": [
          "Mutsuki",
          "Toru Mutsuki",
          "Mutsuki Tooru"
        ],
        "note": "Spoilers: Tokyo Ghoul :re opening"
      },
      {
        "name": "Ginshi Shirazu",
        "rarity": 80,
        "aliases": [
          "Shirazu",
          "Shirazu Ginshi"
        ],
        "note": "Spoilers: Tokyo Ghoul :re opening"
      },
      {
        "name": "Saiko Yonebayashi",
        "rarity": 100,
        "aliases": [
          "Saiko",
          "Yonebayashi Saiko"
        ],
        "note": "Spoilers: Tokyo Ghoul :re opening"
      }
    ]
  },
  {
    "id": "timed-v3-mha",
    "anime": "mha",
    "category": "My Hero Academia",
    "text": "My Hero Academia — Name one of U.A.’s Big Three introduced in season 3.",
    "note": "Season 3",
    "answers": [
      {
        "name": "Mirio Togata",
        "rarity": 10,
        "aliases": [
          "Mirio",
          "Lemillion",
          "Togata Mirio"
        ],
        "note": "Season 3"
      },
      {
        "name": "Tamaki Amajiki",
        "rarity": 60,
        "aliases": [
          "Tamaki",
          "Suneater",
          "Amajiki Tamaki"
        ],
        "note": "Season 3"
      },
      {
        "name": "Nejire Hado",
        "rarity": 100,
        "aliases": [
          "Nejire",
          "Nejire Chan",
          "Hado Nejire"
        ],
        "note": "Season 3"
      }
    ]
  },
  {
    "id": "timed-v3-blackclover",
    "anime": "blackclover",
    "category": "Black Clover",
    "text": "Black Clover — Name one of the three Silva siblings who belong to the Silver Eagles at the start of the anime (not Noelle).",
    "note": "Early-series squads",
    "answers": [
      {
        "name": "Nozel Silva",
        "rarity": 20,
        "aliases": [
          "Nozel",
          "Silva Nozel"
        ],
        "note": "Early-series squads"
      },
      {
        "name": "Solid Silva",
        "rarity": 80,
        "aliases": [
          "Solid",
          "Silva Solid"
        ],
        "note": "Early-series squads"
      },
      {
        "name": "Nebra Silva",
        "rarity": 100,
        "aliases": [
          "Nebra",
          "Silva Nebra"
        ],
        "note": "Early-series squads"
      }
    ]
  },
  {
    "id": "timed-v3-demonslayer",
    "anime": "demonslayer",
    "category": "Demon Slayer",
    "text": "Demon Slayer — Name one of the nine active Hashira at Tanjiro’s first Hashira meeting in season 1.",
    "note": "Season 1 meeting",
    "answers": [
      {
        "name": "Giyu Tomioka",
        "rarity": 10,
        "aliases": [
          "Giyu",
          "Giyuu Tomioka",
          "Tomioka Giyu"
        ],
        "note": "Season 1 meeting"
      },
      {
        "name": "Shinobu Kocho",
        "rarity": 20,
        "aliases": [
          "Shinobu",
          "Kocho Shinobu"
        ],
        "note": "Season 1 meeting"
      },
      {
        "name": "Kyojuro Rengoku",
        "rarity": 0,
        "aliases": [
          "Rengoku",
          "Kyojuro",
          "Rengoku Kyojuro"
        ],
        "note": "Season 1 meeting"
      },
      {
        "name": "Tengen Uzui",
        "rarity": 30,
        "aliases": [
          "Tengen",
          "Uzui",
          "Uzui Tengen"
        ],
        "note": "Season 1 meeting"
      },
      {
        "name": "Mitsuri Kanroji",
        "rarity": 45,
        "aliases": [
          "Mitsuri",
          "Kanroji Mitsuri"
        ],
        "note": "Season 1 meeting"
      },
      {
        "name": "Muichiro Tokito",
        "rarity": 55,
        "aliases": [
          "Muichiro",
          "Tokito Muichiro"
        ],
        "note": "Season 1 meeting"
      },
      {
        "name": "Sanemi Shinazugawa",
        "rarity": 65,
        "aliases": [
          "Sanemi",
          "Shinazugawa Sanemi"
        ],
        "note": "Season 1 meeting"
      },
      {
        "name": "Gyomei Himejima",
        "rarity": 85,
        "aliases": [
          "Gyomei",
          "Himejima Gyomei"
        ],
        "note": "Season 1 meeting"
      },
      {
        "name": "Obanai Iguro",
        "rarity": 100,
        "aliases": [
          "Obanai",
          "Iguro Obanai"
        ],
        "note": "Season 1 meeting"
      }
    ]
  },
  {
    "id": "timed-v3-aot",
    "anime": "aot",
    "category": "Attack on Titan",
    "text": "Attack on Titan — Name a member of Levi’s original Special Operations Squad in season 1, including Levi and Eren.",
    "note": "Season 1 Female Titan arc",
    "answers": [
      {
        "name": "Levi Ackerman",
        "rarity": 0,
        "aliases": [
          "Levi",
          "Ackerman Levi"
        ],
        "note": "Season 1 Female Titan arc"
      },
      {
        "name": "Eren Yeager",
        "rarity": 10,
        "aliases": [
          "Eren",
          "Eren Jaeger",
          "Yeager Eren"
        ],
        "note": "Season 1 Female Titan arc"
      },
      {
        "name": "Petra Ral",
        "rarity": 50,
        "aliases": [
          "Petra",
          "Ral Petra"
        ],
        "note": "Season 1 Female Titan arc"
      },
      {
        "name": "Oluo Bozado",
        "rarity": 80,
        "aliases": [
          "Oluo",
          "Oruo Bozad",
          "Bozado Oluo"
        ],
        "note": "Season 1 Female Titan arc"
      },
      {
        "name": "Eld Jinn",
        "rarity": 90,
        "aliases": [
          "Eld",
          "Eld Gin",
          "Jinn Eld"
        ],
        "note": "Season 1 Female Titan arc"
      },
      {
        "name": "Gunther Schultz",
        "rarity": 100,
        "aliases": [
          "Gunther",
          "Gunter Schultz",
          "Schultz Gunther"
        ],
        "note": "Season 1 Female Titan arc"
      }
    ]
  }
];
if(typeof module!=="undefined")module.exports=POWER_LEVEL_QUESTIONS;
