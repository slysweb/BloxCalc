import { gamesBySlug } from '@/config/games/registry';
import type { GameConfig } from '@/config/games/types';
import { cache } from 'react';

export type { GameCode, GameConfig, GameFaqEntry } from '@/config/games/types';
export type GameRecord = GameConfig;

export function getGameSlugs(): string[] {
  return Object.keys(gamesBySlug);
}

export const getGameBySlug = cache((slug: string): GameConfig | null => {
  return gamesBySlug[slug] ?? null;
});
