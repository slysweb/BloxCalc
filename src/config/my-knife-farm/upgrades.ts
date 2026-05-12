/** Illustrative upgrade rows — replace with datamined values when available. */
export type UpgradeSpec = {
  id: string;
  name: string;
  /** Purchase price (same as legacy “cost”). */
  basePrice: number;
  /**
   * Additive income multiplier gain used for smart ROI: basePrice / multiplierIncrease.
   * Interpret as the bump to your global cash multiplier from this tier (game-specific).
   */
  multiplierIncrease: number;
  /** Added cash per second (legacy payback table on ROI page). */
  cashPerSecDelta: number;
};

export const MY_KNIFE_FARM_UPGRADES: UpgradeSpec[] = [
  { id: 'belt-1', name: 'Conveyor speed I', basePrice: 250, multiplierIncrease: 0.02, cashPerSecDelta: 3 },
  { id: 'belt-2', name: 'Conveyor speed II', basePrice: 900, multiplierIncrease: 0.055, cashPerSecDelta: 7 },
  { id: 'slot-1', name: 'Knife slot +1', basePrice: 500, multiplierIncrease: 0.04, cashPerSecDelta: 5 },
  { id: 'slot-2', name: 'Knife slot +2', basePrice: 2200, multiplierIncrease: 0.08, cashPerSecDelta: 12 },
  { id: 'merge-1', name: 'Merge luck (small)', basePrice: 1500, multiplierIncrease: 0.025, cashPerSecDelta: 4 },
  { id: 'merge-2', name: 'Merge luck (medium)', basePrice: 6500, multiplierIncrease: 0.09, cashPerSecDelta: 18 },
  { id: 'cash-1', name: 'Global cash x1.1', basePrice: 4000, multiplierIncrease: 0.1, cashPerSecDelta: 15 },
  { id: 'cash-2', name: 'Global cash x1.25', basePrice: 18000, multiplierIncrease: 0.2, cashPerSecDelta: 40 },
  { id: 'crate-1', name: 'Crate open speed', basePrice: 3200, multiplierIncrease: 0.03, cashPerSecDelta: 6 },
  { id: 'crate-2', name: 'Rare weight +', basePrice: 12000, multiplierIncrease: 0.06, cashPerSecDelta: 10 },
];
