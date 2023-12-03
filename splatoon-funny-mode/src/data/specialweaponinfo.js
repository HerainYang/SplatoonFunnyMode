const data = {
    0: { id: 0, title: "Baller", img_url: "https://cdn.wikimg.net/en/splatoonwiki/images/thumb/8/89/S2_Weapon_Special_Baller.png/32px-S2_Weapon_Special_Baller.png" },
    1: { id: 1, title: "Big Bubbler", img_url: "https://cdn.wikimg.net/en/splatoonwiki/images/thumb/e/ef/S3_Weapon_Special_Big_Bubbler.png/32px-S3_Weapon_Special_Big_Bubbler.png" },
    2: { id: 2, title: "Bomb Launcher", img_url: "https://cdn.wikimg.net/en/splatoonwiki/images/thumb/3/30/S2_Weapon_Special_Splat-Bomb_Launcher.png/32px-S2_Weapon_Special_Splat-Bomb_Launcher.png" },
    3: { id: 3, title: "Bomb Rush", img_url: "https://cdn.wikimg.net/en/splatoonwiki/images/thumb/0/02/S_Weapon_Special_Bomb_Rush_Splat_Bomb.png/32px-S_Weapon_Special_Bomb_Rush_Splat_Bomb.png" },
    4: { id: 4, title: "Booyah Bomb", img_url: "https://cdn.wikimg.net/en/splatoonwiki/images/thumb/0/00/S3_Weapon_Special_Booyah_Bomb.png/32px-S3_Weapon_Special_Booyah_Bomb.png" },
    5: { id: 5, title: "Bubble Blower", img_url: "https://cdn.wikimg.net/en/splatoonwiki/images/thumb/a/ad/S2_Weapon_Special_Bubble_Blower.png/32px-S2_Weapon_Special_Bubble_Blower.png" },
    6: { id: 6, title: "Bubbler", img_url: "https://cdn.wikimg.net/en/splatoonwiki/images/thumb/f/fc/S_Weapon_Special_Bubbler.png/32px-S_Weapon_Special_Bubbler.png" },
    7: { id: 7, title: "Crab Tank", img_url: "https://cdn.wikimg.net/en/splatoonwiki/images/thumb/8/88/S3_Weapon_Special_Crab_Tank.png/32px-S3_Weapon_Special_Crab_Tank.png" },
    8: { id: 8, title: "Echolocator", img_url: "https://cdn.wikimg.net/en/splatoonwiki/images/thumb/e/e5/S_Weapon_Special_Echolocator.png/32px-S_Weapon_Special_Echolocator.png" },
    9: { id: 9, title: "Ink Armor", img_url: "https://cdn.wikimg.net/en/splatoonwiki/images/thumb/9/93/S2_Weapon_Special_Ink_Armor.png/32px-S2_Weapon_Special_Ink_Armor.png" },
    10: { id: 10, title: "Ink Storm", img_url: "https://cdn.wikimg.net/en/splatoonwiki/images/thumb/6/69/S3_Weapon_Special_Ink_Storm.png/32px-S3_Weapon_Special_Ink_Storm.png" },
    11: { id: 11, title: "Ink Vac", img_url: "https://cdn.wikimg.net/en/splatoonwiki/images/thumb/c/cf/S3_Weapon_Special_Ink_Vac.png/32px-S3_Weapon_Special_Ink_Vac.png" },
    12: { id: 12, title: "Inkjet", img_url: "https://cdn.wikimg.net/en/splatoonwiki/images/thumb/8/80/S3_Weapon_Special_Inkjet.png/32px-S3_Weapon_Special_Inkjet.png" },
    13: { id: 13, title: "Inkstrike", img_url: "https://cdn.wikimg.net/en/splatoonwiki/images/thumb/e/e5/S_Weapon_Special_Inkstrike.png/32px-S_Weapon_Special_Inkstrike.png" },
    14: { id: 14, title: "Inkzooka", img_url: "https://cdn.wikimg.net/en/splatoonwiki/images/thumb/e/e1/S_Weapon_Special_Inkzooka.png/32px-S_Weapon_Special_Inkzooka.png" },
    15: { id: 15, title: "Killer Wail", img_url: "https://cdn.wikimg.net/en/splatoonwiki/images/thumb/b/b4/S_Weapon_Special_Killer_Wail.png/32px-S_Weapon_Special_Killer_Wail.png" },
    16: { id: 16, title: "Killer Wail 5.1", img_url: "https://cdn.wikimg.net/en/splatoonwiki/images/thumb/1/1a/S3_Weapon_Special_Killer_Wail_5.1.png/32px-S3_Weapon_Special_Killer_Wail_5.1.png" },
    17: { id: 17, title: "Kraken", img_url: "https://cdn.wikimg.net/en/splatoonwiki/images/thumb/c/c1/S_Weapon_Special_Kraken.png/32px-S_Weapon_Special_Kraken.png" },
    18: { id: 18, title: "Kraken Royale", img_url: "https://cdn.wikimg.net/en/splatoonwiki/images/thumb/c/c1/S3_Weapon_Special_Kraken_Royale.png/32px-S3_Weapon_Special_Kraken_Royale.png" },
    19: { id: 19, title: "Reefslider", img_url: "https://cdn.wikimg.net/en/splatoonwiki/images/thumb/1/10/S3_Weapon_Special_Reefslider.png/32px-S3_Weapon_Special_Reefslider.png" },
    20: { id: 20, title: "Splashdown", img_url: "https://cdn.wikimg.net/en/splatoonwiki/images/thumb/2/23/S3_Weapon_Special_Splashdown.png/32px-S3_Weapon_Special_Splashdown.png" },
    21: { id: 21, title: "Splattercolor Screen", img_url: "https://cdn.wikimg.net/en/splatoonwiki/images/thumb/5/5c/S3_Weapon_Special_Splattercolor_Screen.png/32px-S3_Weapon_Special_Splattercolor_Screen.png" },
    22: { id: 22, title: "Sting Ray", img_url: "https://cdn.wikimg.net/en/splatoonwiki/images/thumb/e/e6/S2_Weapon_Special_Sting_Ray.png/32px-S2_Weapon_Special_Sting_Ray.png" },
    23: { id: 23, title: "Super Chump", img_url: "https://cdn.wikimg.net/en/splatoonwiki/images/thumb/8/8c/S3_Weapon_Special_Super_Chump.png/32px-S3_Weapon_Special_Super_Chump.png" },
    24: { id: 24, title: "Tacticooler", img_url: "https://cdn.wikimg.net/en/splatoonwiki/images/thumb/c/c0/S3_Weapon_Special_Tacticooler.png/32px-S3_Weapon_Special_Tacticooler.png" },
    25: { id: 25, title: "Tenta Missiles", img_url: "https://cdn.wikimg.net/en/splatoonwiki/images/thumb/3/3b/S3_Weapon_Special_Tenta_Missiles.png/32px-S3_Weapon_Special_Tenta_Missiles.png" },
    26: { id: 26, title: "Triple Inkstrike", img_url: "https://cdn.wikimg.net/en/splatoonwiki/images/thumb/3/3a/S3_Weapon_Special_Triple_Inkstrike.png/32px-S3_Weapon_Special_Triple_Inkstrike.png" },
    27: { id: 27, title: "Triple Splashdown", img_url: "https://cdn.wikimg.net/en/splatoonwiki/images/thumb/b/b3/S3_Weapon_Special_Triple_Splashdown.png/32px-S3_Weapon_Special_Triple_Splashdown.png" },
    28: { id: 28, title: "Trizooka", img_url: "https://cdn.wikimg.net/en/splatoonwiki/images/thumb/9/93/S3_Weapon_Special_Trizooka.png/32px-S3_Weapon_Special_Trizooka.png" },
    29: { id: 29, title: "Ultra Stamp", img_url: "https://cdn.wikimg.net/en/splatoonwiki/images/thumb/7/70/S3_Weapon_Special_Ultra_Stamp.png/32px-S3_Weapon_Special_Ultra_Stamp.png" },
    30: { id: 30, title: "Wave Breaker", img_url: "https://cdn.wikimg.net/en/splatoonwiki/images/thumb/6/67/S3_Weapon_Special_Wave_Breaker.png/32px-S3_Weapon_Special_Wave_Breaker.png" },
    31: { id: 31, title: "Zipcaster", img_url: "https://cdn.wikimg.net/en/splatoonwiki/images/thumb/9/96/S3_Weapon_Special_Zipcaster.png/32px-S3_Weapon_Special_Zipcaster.png" },
}

export default data;