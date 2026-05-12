'use client';

import type { GameCode } from '@/config/games/types';
import { useTranslations } from 'next-intl';
import { useCallback, useState } from 'react';

type LatestCodesProps = {
  codes: GameCode[];
};

export function LatestCodes({ codes }: LatestCodesProps) {
  const t = useTranslations('GameDetail');
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const copy = useCallback(async (code: string) => {
    try {
      await navigator.clipboard.writeText(code);
      setCopiedCode(code);
      window.setTimeout(() => setCopiedCode((current) => (current === code ? null : current)), 2000);
    } catch {
      setCopiedCode(null);
    }
  }, []);

  if (codes.length === 0) {
    return (
      <section
        id="latest-codes"
        aria-labelledby="latest-codes-heading"
        className="site-card mb-8 space-y-2"
      >
        <h2 id="latest-codes-heading" className="text-lg font-semibold text-slate-100">
          {t('latestCodesHeading')}
        </h2>
        <p className="m-0 text-sm leading-relaxed text-slate-400">{t('noActiveCodes')}</p>
      </section>
    );
  }

  return (
    <section id="latest-codes" aria-labelledby="latest-codes-heading" className="site-card mb-8 space-y-4">
      <h2 id="latest-codes-heading" className="text-lg font-semibold text-slate-100">
        {t('latestCodesHeading')}
      </h2>
      <ul className="m-0 flex list-none flex-col gap-3 p-0">
        {codes.map((row) => {
          const isCopied = copiedCode === row.code;
          return (
            <li
              key={row.code}
              className="flex flex-wrap items-center gap-3 rounded-lg border border-slate-800 bg-slate-950/40 px-4 py-3"
            >
              <code className="text-base font-semibold tabular-nums text-emerald-300">{row.code}</code>
              {row.reward ? (
                <span className="text-sm text-slate-400">{row.reward}</span>
              ) : null}
              <button
                type="button"
                onClick={() => copy(row.code)}
                className="site-btn site-btn-sm ml-auto shrink-0"
              >
                {isCopied ? t('copied') : t('clickToCopy')}
              </button>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
