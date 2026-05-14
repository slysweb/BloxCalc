export type GameCode = { code: string; reward?: string };

export type GameFaqEntry = { question: string; answer: string };

export type GameGuideSection = { heading: string; paragraphs: string[] };

export type GameConfig = {
  slug: string;
  name: string;
  description: string;
  codes: GameCode[];
  faq: GameFaqEntry[];
  /** Optional long-form hub copy (codes + calculator still live above/below as usual). */
  guideSections?: GameGuideSection[];
};
