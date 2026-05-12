'use client';

import type { TrendingHub } from '@/config/home/trending-hubs';
import { Link } from '@/i18n/navigation';
import { motion } from 'framer-motion';
import { useMemo, useState } from 'react';

export type HomeRecentUpdate = {
  date: string;
  text: string;
};

export type HomePageCopy = {
  heroTagline: string;
  searchPlaceholder: string;
  searchAriaLabel: string;
  trendingHeading: string;
  recentUpdatesHeading: string;
  calculator: string;
  codes: string;
  noResults: string;
};

type HomePageClientProps = {
  trendingHubs: TrendingHub[];
  recentUpdates: HomeRecentUpdate[];
  copy: HomePageCopy;
};

function normalize(s: string) {
  return s.trim().toLowerCase();
}

export function HomePageClient({ trendingHubs, recentUpdates, copy }: HomePageClientProps) {
  const [query, setQuery] = useState('');

  const filtered = useMemo(() => {
    const q = normalize(query);
    if (!q) return trendingHubs;
    return trendingHubs.filter((h) => {
      const slugSpaced = normalize(h.id.replace(/-/g, ' '));
      return (
        normalize(h.name).includes(q) ||
        normalize(h.id).includes(q) ||
        slugSpaced.includes(q)
      );
    });
  }, [trendingHubs, query]);

  return (
    <div className="flex flex-1 flex-col">
      <section
        aria-labelledby="home-hero-tagline"
        className="relative overflow-hidden border-b border-emerald-950/40 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 px-4 pb-16 pt-10 sm:pb-20 sm:pt-14"
      >
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_90%_55%_at_50%_-15%,rgba(16,185,129,0.2),transparent)]"
        />
        <div className="relative mx-auto flex w-full max-w-4xl flex-col items-center">
          <p className="mb-6 text-xs font-semibold uppercase tracking-[0.22em] text-emerald-400/90">
            BloxCalc
          </p>

          <label htmlFor="home-game-search" className="sr-only">
            {copy.searchAriaLabel}
          </label>
          <div className="w-full max-w-3xl">
            <input
              id="home-game-search"
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={copy.searchPlaceholder}
              autoComplete="off"
              aria-label={copy.searchAriaLabel}
              className="site-field w-full rounded-2xl border-slate-600/80 bg-slate-900/95 py-5 pl-6 pr-6 text-center text-lg shadow-2xl shadow-black/30 placeholder:text-slate-500 focus:border-emerald-500/50 sm:text-xl md:py-6 md:text-2xl md:leading-snug"
            />
          </div>

          <h1
            id="home-hero-tagline"
            className="mt-8 max-w-3xl text-balance text-center text-xl font-semibold leading-snug tracking-tight text-slate-100 sm:text-2xl md:text-3xl"
          >
            {copy.heroTagline}
          </h1>
        </div>
      </section>

      <div className="mx-auto w-full max-w-6xl flex-1 space-y-14 px-4 py-12 lg:max-w-6xl">
        <section aria-labelledby="trending-heading" className="space-y-6">
          <h2 id="trending-heading" className="text-xl font-semibold text-slate-100 sm:text-2xl">
            {copy.trendingHeading}
          </h2>

          {filtered.length === 0 ? (
            <p className="rounded-xl border border-slate-800 bg-slate-900/40 px-4 py-10 text-center text-slate-400">
              {copy.noResults}
            </p>
          ) : (
            <ul className="m-0 grid list-none gap-5 p-0 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4">
              {filtered.map((hub) => (
                <li key={hub.id}>
                  <TrendingCard hub={hub} copy={copy} />
                </li>
              ))}
            </ul>
          )}
        </section>

        <section aria-labelledby="recent-updates-heading" className="site-card space-y-4">
          <h2 id="recent-updates-heading" className="text-xl font-semibold text-slate-100">
            {copy.recentUpdatesHeading}
          </h2>
          <ul className="m-0 list-none space-y-0 divide-y divide-slate-800/90 border border-slate-800/80 p-0">
            {recentUpdates.map((row, i) => (
              <li key={`${row.date}-${i}`} className="flex flex-col gap-1 px-4 py-3.5 sm:flex-row sm:items-baseline sm:gap-6 sm:py-4">
                <time
                  dateTime={row.date}
                  className="shrink-0 text-xs font-semibold uppercase tracking-wide text-emerald-500/90 tabular-nums sm:w-28 sm:text-sm"
                >
                  {row.date}
                </time>
                <p className="m-0 text-sm leading-relaxed text-slate-300 sm:flex-1">{row.text}</p>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
}

function TrendingCard({ hub, copy }: { hub: TrendingHub; copy: HomePageCopy }) {
  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: 'spring', stiffness: 380, damping: 28 }}
      whileHover={{
        y: -5,
        transition: { type: 'spring', stiffness: 420, damping: 22 },
      }}
      className="flex h-full flex-col rounded-xl border border-slate-800 bg-slate-900/55 p-5 shadow-xl shadow-black/25"
    >
      <div className="flex items-start gap-3">
        <span
          className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl border border-slate-700/80 bg-slate-950/80 text-2xl shadow-inner shadow-black/20"
          aria-hidden
        >
          {hub.icon}
        </span>
        <h3 className="pt-1 text-lg font-semibold leading-snug tracking-tight text-slate-100">
          <Link
            href={hub.hubHref}
            className="rounded-sm text-inherit transition-colors hover:text-emerald-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-400"
          >
            {hub.name}
          </Link>
        </h3>
      </div>
      <div className="mt-5 flex flex-1 flex-col gap-2">
        <Link href={hub.calculatorHref} className="site-btn w-full justify-center text-center">
          {copy.calculator}
        </Link>
        <Link
          href={hub.codesHref}
          className="inline-flex w-full items-center justify-center rounded-lg border border-emerald-500/45 bg-slate-950/50 px-4 py-2 text-sm font-semibold text-emerald-100 shadow-inner shadow-black/10 transition-colors hover:border-emerald-400/60 hover:bg-slate-900/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-400"
        >
          {copy.codes}
        </Link>
      </div>
    </motion.article>
  );
}
