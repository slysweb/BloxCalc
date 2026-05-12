export type GameCode = { code: string; reward?: string };

export type GameFaqEntry = { question: string; answer: string };

export type GameConfig = {
  slug: string;
  name: string;
  description: string;
  codes: GameCode[];
  faq: GameFaqEntry[];
};
