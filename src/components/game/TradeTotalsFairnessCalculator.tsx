'use client';

import { useLocale, useTranslations } from 'next-intl';
import { useCallback, useMemo, useState } from 'react';

type TradeTotalsFairnessCalculatorProps = {
  namespace: 'AdoptMeCalculator' | 'BloxFruitsCalculator';
};

function parseValue(raw: string): number | null {
  const trimmed = raw.trim().replace(/,/g, '');
  if (trimmed === '') return null;
  const n = Number(trimmed);
  if (!Number.isFinite(n) || n < 0) return null;
  return n;
}

export function TradeTotalsFairnessCalculator({ namespace }: TradeTotalsFairnessCalculatorProps) {
  const t = useTranslations(namespace);
  const locale = useLocale();
  const [yours, setYours] = useState('');
  const [theirs, setTheirs] = useState('');

  const parsedYours = useMemo(() => parseValue(yours), [yours]);
  const parsedTheirs = useMemo(() => parseValue(theirs), [theirs]);

  const reset = useCallback(() => {
    setYours('');
    setTheirs('');
  }, []);

  const canCompare = parsedYours !== null && parsedTheirs !== null;
  const gap = canCompare ? parsedYours - parsedTheirs : null;
  const absGap = gap !== null ? Math.abs(gap) : null;
  const fmt = (n: number) => n.toLocaleString(locale);

  let verdictKey: 'equal' | 'youOver' | 'theyOver' | null = null;
  if (canCompare && gap !== null) {
    if (gap === 0) verdictKey = 'equal';
    else if (gap > 0) verdictKey = 'youOver';
    else verdictKey = 'theyOver';
  }

  return (
    <div className="site-card space-y-6">
      <p className="m-0 text-sm leading-relaxed text-slate-400">{t('intro')}</p>

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block space-y-2">
          <span className="text-sm font-medium text-slate-200">{t('labelYours')}</span>
          <input
            className="site-field"
            inputMode="decimal"
            autoComplete="off"
            placeholder={t('placeholderNumber')}
            value={yours}
            onChange={(e) => setYours(e.target.value)}
            aria-label={t('labelYours')}
          />
        </label>
        <label className="block space-y-2">
          <span className="text-sm font-medium text-slate-200">{t('labelTheirs')}</span>
          <input
            className="site-field"
            inputMode="decimal"
            autoComplete="off"
            placeholder={t('placeholderNumber')}
            value={theirs}
            onChange={(e) => setTheirs(e.target.value)}
            aria-label={t('labelTheirs')}
          />
        </label>
      </div>

      <p className="m-0 text-xs text-slate-500">{t('hint')}</p>

      <div className="flex flex-wrap gap-3">
        <button type="button" className="site-btn site-btn-sm" onClick={reset}>
          {t('reset')}
        </button>
      </div>

      {canCompare && gap !== null && absGap !== null ? (
        <div
          className="rounded-lg border border-slate-800 bg-slate-950/50 p-4"
          role="status"
          aria-live="polite"
        >
          <p className="m-0 text-sm text-slate-300">
            <span className="font-semibold text-slate-100">{t('gapLabel')}</span>{' '}
            <span className="tabular-nums text-emerald-200">{fmt(absGap)}</span>
          </p>
          {verdictKey === 'equal' ? (
            <p className="mt-2 m-0 text-sm text-slate-200">{t('verdictEqual')}</p>
          ) : null}
          {verdictKey === 'youOver' ? (
            <p className="mt-2 m-0 text-sm text-amber-200/95">{t('verdictYouOver', { amount: fmt(absGap) })}</p>
          ) : null}
          {verdictKey === 'theyOver' ? (
            <p className="mt-2 m-0 text-sm text-sky-200/95">{t('verdictTheyOver', { amount: fmt(absGap) })}</p>
          ) : null}
        </div>
      ) : null}

      <p className="m-0 border-t border-slate-800/80 pt-4 text-xs leading-relaxed text-slate-500">{t('disclaimer')}</p>
    </div>
  );
}
