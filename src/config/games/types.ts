export type GameCode = { code: string; reward?: string };

export type GameFaqEntry = { question: string; answer: string };

export type GameGuideSection = { heading: string; paragraphs: string[] };

/** Per-game hub SEO overrides (literal strings; use for keyword-focused landing pages). */
export type GameHubSeo = {
  /** `metadata.title` segment before the site `title.template` suffix. */
  title: string;
  /** Visible main heading; defaults to `name` when omitted. */
  h1: string;
};

/** Optional `/[slug]/calculator` metadata and copy when the game is not a trade-totals calculator. */
export type GameCalculatorSeo = {
  metaTitle: string;
  metaDescription: string;
  lead: string;
  /** Main heading; defaults to `GameCalculator.heading` with `{game}`. */
  h1?: string;
};

export type GameConfig = {
  slug: string;
  name: string;
  description: string;
  codes: GameCode[];
  faq: GameFaqEntry[];
  /** Optional long-form hub copy (codes + calculator still live above/below as usual). */
  guideSections?: GameGuideSection[];
  /** Optional hub/calculator title & body overrides; `description` still powers hub meta + lead. */
  seo?: { hub?: GameHubSeo; calculator?: GameCalculatorSeo };
};
