import adoptMe from './adopt-me.json';
import bloxFruits from './blox-fruits.json';
import kickALuckyBlock from './kick-a-lucky-block.json';
import slimeRng from './slime-rng.json';
import type { GameConfig } from '@/config/games/types';

const list = [bloxFruits, adoptMe, slimeRng, kickALuckyBlock] as const;

/** Ordered list mirroring registry imports — add new `*.json` games here. */
export const gamesList: GameConfig[] = list.map((doc) => doc as GameConfig);

export const gamesBySlug: Record<string, GameConfig> = Object.fromEntries(
  list.map((doc) => [doc.slug, doc as GameConfig]),
);

export function getGameJsonBySlug(slug: string): GameConfig | null {
  return gamesBySlug[slug] ?? null;
}
