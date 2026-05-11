import fs from 'fs';
import path from 'path';
import { cache } from 'react';

export type GameRecord = {
  slug: string;
  name: string;
  description: string;
};

const gamesDir = path.join(process.cwd(), 'data', 'games');

export function getGameSlugs(): string[] {
  const raw = fs.readFileSync(path.join(gamesDir, 'manifest.json'), 'utf-8');
  const manifest = JSON.parse(raw) as { slugs: string[] };
  return manifest.slugs;
}

export const getGameBySlug = cache((slug: string): GameRecord | null => {
  const filePath = path.join(gamesDir, `${slug}.json`);
  if (!fs.existsSync(filePath)) {
    return null;
  }
  const raw = fs.readFileSync(filePath, 'utf-8');
  return JSON.parse(raw) as GameRecord;
});
