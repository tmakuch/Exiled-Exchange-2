import { FONT_SIZE, RARITY, RGBA, BASE_TYPES } from "./vars";
import { type IFilter, type IRawFilter } from "./IFilter";
import parseRawFilters from "../utils/parseRawFilters";

export default function getFilters(extraFilters: Array<IRawFilter>): Array<IFilter> {
  return [
    {
      name: "Defaults",
      modifiers: {
        SetFontSize: FONT_SIZE.T1,
      },
      continue: true,
    },
    // Targeted loot (those filters are meant to stop further execution, so make sure they set all you want)
    ...parseRawFilters(extraFilters),
    // Runes, Charms, Trials, Jewels
    {
      name: "Runes",
      identifiers: {
        Class: "Socketable",
        BaseType: "Rune",
      },
      modifiers: {
        SetTextColor: RGBA.CYAN_GREENISH(),
        PlayEffect: "Cyan Temp",
        MinimapIcon: "2 Cyan Triangle",
      },
    },
    {
      name: "Soul Cores",
      identifiers: {
        Class: "Socketable",
        BaseType: "Soul Core",
      },
      modifiers: {
        SetTextColor: RGBA.CYAN_GREENISH(),
        SetBorderColor: RGBA.CYAN_GREENISH(),
        PlayEffect: "Cyan Temp",
        MinimapIcon: "1 Cyan Triangle",
      },
    },
    {
      name: "Timeless Jewel",
      identifiers: {
        Class: "Socketable",
        BaseType: "Timeless",
      },
      modifiers: {
        SetTextColor: RGBA.WHITE(),
        SetBorderColor: RGBA.WHITE(),
        SetBackgroundColor: RGBA.BLUE_LIGHT(),
        PlayEffect: "Blue",
        MinimapIcon: "0 Blue Triangle",
      },
    },
    {
      name: "Trial Coins",
      identifiers: {
        Class: ["Trial Coins", "Inscribed Ultimatum"],
      },
      modifiers: {
        SetTextColor: RGBA.GREEN(),
        SetBorderColor: RGBA.GREEN_BLUEISH(200),
        MinimapIcon: "2 Green Square",
      },
    },
    {
      name: "Jewels Rare",
      identifiers: {
        Class: "Jewels",
        Rarity: RARITY.RARE,
      },
      modifiers: {
        SetTextColor: RGBA.YELLOW(),
        SetBorderColor: RGBA.YELLOW_LIGHT(),
        SetBackgroundColor: RGBA.YELLOW_DARK(225),
        MinimapIcon: "2 Yellow Diamond",
      },
    },
    {
      name: "Jewels Magic",
      identifiers: {
        Class: "Jewels",
        Rarity: [RARITY.NORMAL, RARITY.MAGIC],
      },
      modifiers: {
        SetTextColor: RGBA.BLUE(),
        SetBorderColor: RGBA.BLUE(),
        SetBackgroundColor: RGBA.BLUE_NAVY(),
        MinimapIcon: "2 Blue Diamond",
      },
    },
    {
      name: "Relics",
      identifiers: {
        Class: "Relic",
      },
      modifiers: {
        SetTextColor: RGBA.PINK(),
        SetBorderColor: RGBA.PINK(200),
        MinimapIcon: "2 Pink Triangle",
        PlayEffect: "Pink	Temp",
      },
    },
    // Skill Gems
    {
      name: "Cut Gems",
      identifiers: {
        Class: ["Skill Gems", "Support Gems"],
      },
      modifiers: {
        SetFontSize: Math.floor(FONT_SIZE.T1 * 1.1),
        SetTextColor: RGBA.CYAN(200),
        SetBorderColor: RGBA.CYAN(200),
        SetBackgroundColor: "0 0 0",
        PlayEffect: "Cyan",
        MinimapIcon: "0 Cyan Circle",
      },
    },
    {
      name: "Skill Gems",
      identifiers: {
        BaseType: "Uncut Skill Gem",
      },
      modifiers: {
        SetFontSize: Math.floor(FONT_SIZE.T1 * 1.1),
        SetTextColor: RGBA.CYAN(200),
        SetBorderColor: RGBA.RED(200),
        SetBackgroundColor: RGBA.RED_DARK(220),
        PlayEffect: "Red",
        MinimapIcon: "2 Cyan Circle",
      },
    },
    {
      name: "Support Gems",
      identifiers: {
        BaseType: "Uncut Support Gem",
      },
      modifiers: {
        SetFontSize: Math.floor(FONT_SIZE.T1 * 1.1),
        SetTextColor: RGBA.CYAN(200),
        SetBorderColor: RGBA.BLUE(200),
        SetBackgroundColor: RGBA.BLUE_DARK(),
        PlayEffect: "Green",
        MinimapIcon: "2 Cyan Circle",
      },
    },
    {
      name: "Spirit Gems",
      identifiers: {
        BaseType: "Uncut Spirit Gem",
      },
      modifiers: {
        SetFontSize: Math.floor(FONT_SIZE.T1 * 1.1),
        SetTextColor: RGBA.CYAN(200),
        SetBorderColor: RGBA.YELLOW(220),
        SetBackgroundColor: RGBA.YELLOW_DARK(220),
        PlayEffect: "Yellow",
        MinimapIcon: "2 Cyan Circle",
      },
    },
    // Currency
    {
      name: "Scroll of Wisdom",
      hide: true,
      identifiers: {
        BaseType: "Scroll of Wisdom",
      },
    },
    {
      name: "Currency t5",
      identifiers: {
        Class: "Stackable Currency",
        BaseType: [
          "Divine Orb",
          "Mirror of Kalandra",
          "Perfect Jeweller's Orb",
        ],
      },
      modifiers: {
        SetFontSize: FONT_SIZE.T3,
        SetTextColor: RGBA.RED(),
        SetBorderColor: RGBA.RED(),
        SetBackgroundColor: RGBA.WHITE(),
        PlayAlertSound: "6 300",
        CustomAlertSoundOptional: `"exiled_exchange_2_filter_data/rare_drop.mp3"`,
        PlayEffect: "Red",
        MinimapIcon: "0 Red Star",
      },
    },
    {
      name: "Currency t4",
      identifiers: {
        Class: "Stackable Currency",
        BaseType: ["Orb of Annulment", "Orb of Chance", "Gemcutter's Prism"],
      },
      modifiers: {
        SetFontSize: FONT_SIZE.T2,
        SetTextColor: RGBA.BLACK(),
        SetBorderColor: RGBA.BLACK(),
        SetBackgroundColor: RGBA.ORANGE(),
        PlayEffect: "Yellow",
        MinimapIcon: "0 Orange Circle",
      },
    },
    {
      name: "Currency t3",
      identifiers: {
        Class: "Stackable Currency",
        BaseType: [
          "Exalted Orb",
          "Chaos Orb",
          "Vaal Orb",
          "Orb of Alchemy",
          "Glassblower's Bauble",
          "Lesser Jeweller's Orb",
          "Greater Jeweller's Orb",
        ],
      },
      modifiers: {
        SetFontSize: FONT_SIZE.T2,
        SetTextColor: RGBA.BLACK(),
        SetBorderColor: RGBA.BLACK(),
        SetBackgroundColor: RGBA.EXALT(),
        PlayEffect: "White",
        MinimapIcon: "2 Orange Circle",
      },
    },
    {
      name: "Currency t2",
      identifiers: {
        Class: "Stackable Currency",
        BaseType: ["Regal Orb", "Artificer's Orb", "Exotic"],
      },
      modifiers: {
        SetTextColor: RGBA.BLACK(),
        SetBorderColor: RGBA.BLACK(),
        SetBackgroundColor: RGBA.YELLOW({ g: 159 }),
        PlayEffect: "White",
        MinimapIcon: "2 Yellow Circle",
      },
    },
    {
      name: "Currency t1",
      identifiers: {
        Class: "Stackable Currency",
        BaseType: [
          "Orb of Transmutation",
          "Orb of Augmentation",
          "Orb of Alteration",
          "Armourer's Scrap",
          "Blacksmith's Whetstone",
          "Arcanist's Etcher",
        ],
      },
      modifiers: {
        SetTextColor: RGBA.BLACK(),
        SetBorderColor: RGBA.BLACK(),
        SetBackgroundColor: RGBA.BEIGE(),
        MinimapIcon: "2 White Circle",
      },
    },
    {
      name: "Shards t2",
      identifiers: {
        Class: "Stackable Currency",
        BaseType: ["Transmutation Shard", "Artificer's Shard"],
      },
      modifiers: {
        SetFontSize: Math.floor(FONT_SIZE.T1 * 1.2),
        SetBackgroundColor: RGBA.BLACK({ r: 20, g: 20, a: 200 }),
      },
    },
    {
      name: "Shards t1",
      identifiers: {
        Class: "Stackable Currency",
        BaseType: ["Regal Shard", "Chance Shard"],
      },
      modifiers: {
        SetBorderColor: RGBA.BEIGE_PLAIN(),
      },
    },
    {
      name: "Essence t2",
      identifiers: {
        Class: "Stackable Currency",
        BaseType: "Greater Essence of",
      },
      modifiers: {
        SetFontSize: Math.floor(FONT_SIZE.T1 * 1.2),
        SetTextColor: RGBA.WHITE(),
        SetBorderColor: RGBA.BLACK(),
        SetBackgroundColor: RGBA.GREEN({ r: 125, g: 160, b: 125 }),
        PlayEffect: "Green",
        MinimapIcon: "1 Green Diamond",
      },
    },
    {
      name: "Essence t1",
      identifiers: {
        Class: "Stackable Currency",
        BaseType: "Essence of",
      },
      modifiers: {
        SetTextColor: RGBA.BLACK(),
        SetBorderColor: RGBA.BLACK(),
        SetBackgroundColor: RGBA.GREEN({ r: 125, g: 160, b: 125 }),
        PlayEffect: "Green Temp",
        MinimapIcon: "2 Green Diamond",
      },
    },
    {
      name: "Waystones",
      identifiers: {
        BaseType: "Waystone",
      },
      modifiers: {
        SetTextColor: RGBA.GREY(),
        SetBorderColor: RGBA.GREY(),
        PlayAlertSound: "3 200",
        PlayEffect: "Grey",
        MinimapIcon: "1 Grey Square",
      },
      continue: true,
    },
    {
      name: "Waystones",
      identifiers: {
        BaseType: [
          BASE_TYPES.WAYSTONE.T1,
          BASE_TYPES.WAYSTONE.T2,
          BASE_TYPES.WAYSTONE.T3,
          BASE_TYPES.WAYSTONE.T4,
          BASE_TYPES.WAYSTONE.T5,
          BASE_TYPES.WAYSTONE.T6,
          BASE_TYPES.WAYSTONE.T7,
          BASE_TYPES.WAYSTONE.T8,
          BASE_TYPES.WAYSTONE.T9,
          BASE_TYPES.WAYSTONE.T10,
          BASE_TYPES.WAYSTONE.T11,
        ],
      },
    },
    {
      name: "Waystones",
      identifiers: {
        BaseType: [
          BASE_TYPES.WAYSTONE.T12,
          BASE_TYPES.WAYSTONE.T13,
          BASE_TYPES.WAYSTONE.T14,
          BASE_TYPES.WAYSTONE.T15,
          BASE_TYPES.WAYSTONE.T16,
        ],
      },
      modifiers: {
        SetFontSize: Math.floor(FONT_SIZE.T1 * 1.4),
        SetTextColor: RGBA.WHITE(),
        SetBorderColor: RGBA.WHITE(),
        PlayAlertSound: "4 300",
        PlayEffect: "White",
        MinimapIcon: "1 White Square",
      },
    },
    {
      name: "Delirium and Omens",
      identifiers: {
        Class: "Currency",
        BaseType: ["Distilled", "Catalyst", "Omen"],
      },
      modifiers: {
        SetFontSize: FONT_SIZE.T2,
        SetTextColor: RGBA.ORANGE_LIGHT(),
        SetBorderColor: RGBA.ORANGE_LIGHT(),
        SetBackgroundColor: RGBA.ORANGE_DARK(),
        PlayEffect: "White",
        MinimapIcon: "2 White Circle",
      },
    },
    {
      name: "Fragments and Logbooks",
      identifiers: {
        BaseType: [
          "Expedition Logbook",
          " Fragment",
          "Breachstone",
          "Simulacrum",
          " Tablet",
          "Cowardly Fate",
          "Deadly Fate",
          "Victorious Fate",
        ],
      },
      modifiers: {
        SetFontSize: FONT_SIZE.T2,
        SetTextColor: RGBA.PINK_LIGHT(),
        SetBorderColor: RGBA.PINK_LIGHT(),
        SetBackgroundColor: RGBA.PURPLE(),
      },
    },
    {
      name: "Splinters",
      identifiers: {
        Class: "Currency",
        BaseType: ["Simulacrum Splinter", "Breach Splinter", " Artifact"],
      },
      modifiers: {
        SetFontSize: FONT_SIZE.T2,
        SetTextColor: RGBA.ORANGE_LIGHT(),
        SetBorderColor: RGBA.ORANGE_LIGHT(),
      },
    },
    // Gold and Trial Keys
    {
      name: "Gold",
      identifiers: {
        BaseType: "Gold",
      },
      modifiers: {
        SetFontSize: FONT_SIZE.T0,
      },
      continue: true,
    },
    {
      name: "Gold (big stack)",
      identifiers: {
        BaseType: "Gold",
        StackSize: ">= 500",
      },
      modifiers: {
        SetBorderColor: RGBA.BLACK(),
        SetBackgroundColor: RGBA.BLACK(180),
        PlayEffect: "Yellow Temp",
      },
    },
    {
      name: "Any Key",
      identifiers: {
        BaseType: ["Bronze Key", "Silver Key", "Gold Key"],
      },
      modifiers: {
        SetTextColor: RGBA.GREEN({ g: 205 }),
        SetBackgroundColor: RGBA.BLACK(240),
      },
      continue: true,
    },
    {
      name: "Bronze Key",
      identifiers: {
        BaseType: "Bronze Key",
      },
      modifiers: {
        SetBorderColor: RGBA.ORANGE({ g: 127 }),
      },
    },
    {
      name: "Silver Key",
      identifiers: {
        BaseType: "Silver Key",
      },
      modifiers: {
        SetBorderColor: RGBA.GREY_LIGHT(),
      },
    },
    {
      name: "Gold Key",
      identifiers: {
        BaseType: "Gold Key",
      },
      modifiers: {
        SetBorderColor: RGBA.YELLOW(),
      },
    },
    // Rarities
    {
      name: "Uniques",
      identifiers: {
        Rarity: RARITY.UNIQUE,
      },
      modifiers: {
        SetFontSize: FONT_SIZE.T2,
        SetTextColor: RGBA.BLACK(),
        SetBorderColor: RGBA.BROWN(),
        SetBackgroundColor: RGBA.ORANGE({ r: 175 }),
        PlayAlertSound: "1 300",
        PlayEffect: "Brown",
        MinimapIcon: "1 Brown Star",
      },
    },
    {
      name: "Rares",
      identifiers: {
        Rarity: RARITY.RARE,
      },
      modifiers: {
        SetFontSize: Math.floor(FONT_SIZE.T1 * 1.2),
      },
      continue: true,
    },
    // Sockets
    {
      name: "has sockets",
      identifiers: {
        Sockets: "> 0",
      },
      modifiers: {
        SetBorderColor: RGBA.WHITE(),
      },
      continue: true,
    },
    // Quality
    {
      name: "has quality >0",
      identifiers: {
        Quality: "> 0",
      },
      modifiers: {
        SetBorderColor: RGBA.WHITE(),
      },
      continue: true,
    },
    // Specific items markers
    {
      name: "Rings, Amulets & Belts",
      identifiers: {
        Class: ["Rings", "Amulets", "Belts"],
      },
      modifiers: {
        SetBorderColor: RGBA.RED(),
      },
      continue: true,
    },
    // Safety Features
    {
      name: "unknown currency",
      identifiers: {
        Class: "Currency",
      },
      modifiers: {
        SetTextColor: RGBA.BEIGE(),
        SetBorderColor: RGBA.BEIGE(),
        SetBackgroundColor: RGBA.ORANGE_DARK(),
      },
    },
    { name: "Catch filter for unknowns and continues"}
  ];
};
