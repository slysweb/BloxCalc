import site from './site.json';
import type { GameCode, GameFaqEntry } from '@/config/games/types';

export type MyKnifeFarmGuideSection = {
  heading: string;
  paragraphs: string[];
};

export type MyKnifeFarmSite = {
  slug: string;
  name: string;
  description: string;
  codes: GameCode[];
  faq: GameFaqEntry[];
  guideSections: MyKnifeFarmGuideSection[];
};

export const myKnifeFarmSite = site as MyKnifeFarmSite;

export { MY_KNIFE_FARM_UPGRADES } from './upgrades';
export { MY_KNIFE_FARM_ZONES } from './zones';
