export type EntityType = "card" | "relic" | "potion" | "enemy";

// Lookup by lowercased name
export const ENTITY_MAP: Record<string, EntityType> = {
  // ── Silent Cards ──────────────────────────────────────────────────────────
  accelerant: "card",
  accelerate: "card",
  acceleration: "card",
  acrobatics: "card",
  adrenaline: "card",
  afterimage: "card",
  accuracy: "card",
  "accuracy+": "card",
  backflip: "card",
  "blade dance": "card",
  blur: "card",
  "bouncing flask": "card",
  "bubble bubble": "card",
  "bullet time": "card",
  burst: "card",
  "calculated gamble": "card",
  catalyst: "card",
  "cloak and dagger": "card",
  "corrosive wave": "card",
  "dagger spray": "card",
  "deadly poison": "card",
  decay: "card",
  "dodge and roll": "card",
  "echoing slash": "card",
  envenom: "card",
  "escape plan": "card",
  "fan of knives": "card",
  finisher: "card",
  flechettes: "card",
  "follow through": "card",
  footwork: "card",
  "infinite blades": "card",
  "knife trap": "card",
  "leading strike": "card",
  "leading strikes": "card",
  "master planner": "card",
  neutralize: "card",
  "noxious fumes": "card",
  outbreak: "card",
  "piercing wail": "card",
  pinpoint: "card",
  "poisoned stab": "card",
  prepared: "card",
  reflex: "card",
  ricochet: "card",
  stratagem: "card",
  strangle: "card",
  "sucker punch": "card",
  sly: "card",
  tactician: "card",
  tender: "card",
  "tools of the trade": "card",
  tracking: "card",
  "up my sleeve": "card",
  "waste away": "card",
  // Status / curse cards
  beckon: "card",
  "frantic escape": "card",
  infection: "card",
  dazed: "card",
  disintegration: "card",
  "mind rot": "card",
  shiv: "card",
  // Colorless
  abrasive: "card",
  expose: "card",
  survivor: "card",

  // ── Relics ────────────────────────────────────────────────────────────────
  akabeko: "relic",
  "bag of marbles": "relic",
  "bag of preparation": "relic",
  chandelier: "relic",
  "gambling chip": "relic",
  girya: "relic",
  "helical dart": "relic",
  kunai: "relic",
  kusarigama: "relic",
  nunchaku: "relic",
  "ring of the snake": "relic",
  shuriken: "relic",
  "snecko skull": "relic",
  "tough bandages": "relic",

  // ── Potions ───────────────────────────────────────────────────────────────
  "bronze skin": "potion",
  "cunning potion": "potion",
  "energy potion": "potion",
  "gambler's brew": "potion",
  "glowwater potion": "potion",
  "super hot cocoa": "potion",
  "very hot cocoa": "potion",

  // ── Enemies ───────────────────────────────────────────────────────────────
  // Overgrowth
  brydonis: "enemy",
  byrdonis: "enemy",
  "phrog parasite": "enemy",
  "bygone effigy": "enemy",
  "ceremonial beast": "enemy",
  "kin priest": "enemy",
  vantom: "enemy",
  // Underdocks
  "skulking colony": "enemy",
  "shulking colony": "enemy",
  "phantasmal gardener": "enemy",
  "pantasmal gardner": "enemy",
  "terror eel": "enemy",
  "waterfall giant": "enemy",
  "soul fysh": "enemy",
  "lagavulin matriarch": "enemy",
  // Act 2
  "infested prism": "enemy",
  decimillipede: "enemy",
  entomancer: "enemy",
  "hunter killer": "enemy",
  "kaiser crab": "enemy",
  "the insatiable": "enemy",
  "knowledge demon": "enemy",
  // Act 3
  knights: "enemy",
  "mecha knight": "enemy",
  "soul nexus": "enemy",
  "the doormaker": "enemy",
  "test subject": "enemy",
  queen: "enemy",
};

export function getEntityType(name: string): EntityType | null {
  return ENTITY_MAP[name.toLowerCase().trim()] ?? null;
}

/**
 * Attempts to build a wiki.gg card image URL.
 * The wiki doesn't have a guaranteed filename convention for STS2 yet,
 * so this tries the most common pattern — callers should handle onError.
 */
export function getCardImageUrl(cardName: string): string {
  const titleCase = cardName
    .trim()
    .split(/\s+/)
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join("_");
  return `https://slaythespire.wiki.gg/wiki/Special:FilePath/${titleCase}_(Slay_the_Spire_2).png`;
}
