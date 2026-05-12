/** Illustrative zone + crate data — replace with live patch notes when available. */
export type ZoneRow = {
  id: string;
  name: string;
  /** Cash threshold for this zone’s gate (same units as in-game cash). */
  cashGoal: number;
  cashRequirement: string;
  keyOrUnlock?: string;
  notableDrops: string;
  /** Free-text crate odds for SEO around knife rarity chances. */
  crateKnifeOdds: string;
};

export const MY_KNIFE_FARM_ZONES: ZoneRow[] = [
  {
    id: 'z1',
    name: 'Starter Yard',
    cashGoal: 0,
    cashRequirement: '$0 (spawn)',
    keyOrUnlock: '—',
    notableDrops: 'Common knives, tutorial crate',
    crateKnifeOdds: 'Common ~78%, Uncommon ~18%, Rare ~4% (illustrative)',
  },
  {
    id: 'z2',
    name: 'City Alley',
    cashGoal: 12_500,
    cashRequirement: '$12,500',
    keyOrUnlock: 'None',
    notableDrops: 'Uncommon table unlock, faster belt crate',
    crateKnifeOdds: 'Common ~70%, Uncommon ~22%, Rare ~7%, Epic ~1%',
  },
  {
    id: 'z3',
    name: 'Rooftop Run',
    cashGoal: 85_000,
    cashRequirement: '$85,000',
    keyOrUnlock: 'Green key (drops from Alley elites)',
    notableDrops: 'Epic shard bundles, AFK cash pad',
    crateKnifeOdds: 'Uncommon ~55%, Rare ~30%, Epic ~12%, Legendary ~3%',
  },
  {
    id: 'z4',
    name: 'Harbor Vault',
    cashGoal: 420_000,
    cashRequirement: '$420,000',
    keyOrUnlock: 'Harbor badge quest',
    notableDrops: 'Legendary crafting mats, key doubler buff',
    crateKnifeOdds: 'Rare ~45%, Epic ~35%, Legendary ~15%, Mythic ~5%',
  },
  {
    id: 'z5',
    name: 'Skyforge',
    cashGoal: 2_100_000,
    cashRequirement: '$2.1M',
    keyOrUnlock: '3× Gold keys',
    notableDrops: 'Mythic knives, merge speed relic',
    crateKnifeOdds: 'Epic ~40%, Legendary ~35%, Mythic ~20%, Secret ~5%',
  },
];
