'use client';

import { Link } from '@/i18n/navigation';
import {
  DEFAULT_KICK_DISTANCE_PER_POWER,
  KALB_WEIGHT_ROWS,
  KALB_ZONE_ROWS,
} from '@/config/kick-a-lucky-block';
import { useLocale, useTranslations } from 'next-intl';
import { useCallback, useMemo, useState } from 'react';

type KickALuckyBlockCalculatorProps = {
  gameSlug: string;
};

function parseNonNegNumber(raw: string): number | null {
  const trimmed = raw.trim().replace(/,/g, '');
  if (trimmed === '') return null;
  const n = Number(trimmed);
  if (!Number.isFinite(n) || n < 0) return null;
  return n;
}

function parsePositiveFloat(raw: string): number | null {
  const trimmed = raw.trim().replace(/,/g, '');
  if (trimmed === '') return null;
  const n = Number(trimmed);
  if (!Number.isFinite(n) || n <= 0) return null;
  return n;
}

export function KickALuckyBlockCalculator({ gameSlug }: KickALuckyBlockCalculatorProps) {
  const t = useTranslations('KickALuckyBlockCalculator');
  const locale = useLocale();
  const [powerRaw, setPowerRaw] = useState('');
  const [multRaw, setMultRaw] = useState(String(DEFAULT_KICK_DISTANCE_PER_POWER));

  const power = useMemo(() => parseNonNegNumber(powerRaw), [powerRaw]);
  const multiplier = useMemo(() => parsePositiveFloat(multRaw), [multRaw]);
  const fmt = useCallback((n: number) => n.toLocaleString(locale, { maximumFractionDigits: 2 }), [locale]);

  const reset = useCallback(() => {
    setPowerRaw('');
    setMultRaw(String(DEFAULT_KICK_DISTANCE_PER_POWER));
  }, []);

  const estimatedDistance =
    power != null && multiplier != null ? power * multiplier : null;

  const weightsSorted = useMemo(
    () => [...KALB_WEIGHT_ROWS].sort((a, b) => a.cost / a.powerGain - b.cost / b.powerGain),
    [],
  );

  return (
    <div className="space-y-8">
      {/*
        占位说明（曾用 placeholderBannerTitle / placeholderBannerBody）已按产品要求从页面隐藏；
        维护说明见 src/config/kick-a-lucky-block/placeholder-data.ts 文件头注释。
      */}

      <section className="site-card space-y-4" aria-labelledby="kalb-inputs-heading">
        <h2 id="kalb-inputs-heading" className="text-lg font-semibold text-slate-100">
          {t('sectionInputsTitle')}
        </h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="block space-y-2">
            <span className="text-sm font-medium text-slate-200">{t('labelCurrentPower')}</span>
            <input
              className="site-field"
              inputMode="decimal"
              autoComplete="off"
              placeholder={t('placeholderPower')}
              value={powerRaw}
              onChange={(e) => setPowerRaw(e.target.value)}
              aria-label={t('labelCurrentPower')}
            />
          </label>
          <label className="block space-y-2">
            <span className="text-sm font-medium text-slate-200">{t('labelDistanceMultiplier')}</span>
            <input
              className="site-field"
              inputMode="decimal"
              autoComplete="off"
              placeholder={t('placeholderMultiplier')}
              value={multRaw}
              onChange={(e) => setMultRaw(e.target.value)}
              aria-label={t('labelDistanceMultiplier')}
            />
          </label>
        </div>
        <p className="m-0 text-xs text-slate-500">{t('hintPower')}</p>
        <div className="flex flex-wrap gap-3">
          <button type="button" className="site-btn site-btn-sm" onClick={reset}>
            {t('reset')}
          </button>
          <Link
            href={`/${gameSlug}/zones`}
            className="inline-flex items-center justify-center rounded-lg border border-slate-600 bg-slate-900/60 px-4 py-2 text-sm font-semibold text-slate-100 transition-colors hover:border-emerald-500/40 hover:text-emerald-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-400"
          >
            {t('linkZonesPage')}
          </Link>
        </div>
      </section>

      {power != null && multiplier != null && estimatedDistance != null ? (
        <section className="site-card space-y-2" aria-labelledby="kalb-kick-heading">
          <h2 id="kalb-kick-heading" className="text-lg font-semibold text-slate-100">
            {t('sectionKickTitle')}
          </h2>
          <p className="m-0 text-sm text-slate-300">
            <span className="font-medium text-slate-100">{t('kickDistanceLabel')} </span>
            <span className="tabular-nums text-emerald-200">{fmt(estimatedDistance)}</span>
            <span className="text-slate-500"> {t('kickDistanceUnits')}</span>
          </p>
          <p className="m-0 text-xs leading-relaxed text-slate-500">{t('kickFormulaNote')}</p>
        </section>
      ) : null}

      <section className="site-card space-y-3" aria-labelledby="kalb-zones-heading">
        <h2 id="kalb-zones-heading" className="text-lg font-semibold text-slate-100">
          {t('sectionZonesTitle')}
        </h2>
        <div className="site-table-wrap">
          <table className="site-table">
            <thead>
              <tr>
                <th scope="col">{t('zonesColName')}</th>
                <th scope="col">{t('zonesColRequired')}</th>
                <th scope="col">{t('zonesColStatus')}</th>
                <th scope="col">{t('zonesColGap')}</th>
              </tr>
            </thead>
            <tbody>
              {KALB_ZONE_ROWS.map((z) => {
                const unlocked = power != null && power >= z.requiredPower;
                const gap =
                  power != null && z.requiredPower > 0
                    ? Math.max(0, z.requiredPower - power)
                    : null;
                return (
                  <tr key={z.id}>
                    <td className="font-medium text-slate-200">{z.name}</td>
                    <td className="tabular-nums text-slate-300">{fmt(z.requiredPower)}</td>
                    <td>
                      {power == null ? (
                        <span className="text-slate-500">{t('zonesEnterPower')}</span>
                      ) : unlocked ? (
                        <span className="text-emerald-300/95">{t('statusReady')}</span>
                      ) : (
                        <span className="text-amber-200/95">{t('statusLocked')}</span>
                      )}
                    </td>
                    <td className="tabular-nums text-slate-400">
                      {power == null || z.requiredPower === 0
                        ? '—'
                        : gap != null && gap > 0
                          ? fmt(gap)
                          : '0'}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <p className="m-0 text-xs text-slate-500">{t('zonesTableFoot')}</p>
      </section>

      <section className="site-card space-y-3" aria-labelledby="kalb-weights-heading">
        <h2 id="kalb-weights-heading" className="text-lg font-semibold text-slate-100">
          {t('sectionWeightsTitle')}
        </h2>
        <p className="m-0 text-sm text-slate-400">{t('weightsIntro')}</p>
        <div className="site-table-wrap">
          <table className="site-table">
            <thead>
              <tr>
                <th scope="col">{t('weightsColName')}</th>
                <th scope="col">{t('weightsColCost')}</th>
                <th scope="col">{t('weightsColGain')}</th>
                <th scope="col">{t('weightsColEfficiency')}</th>
              </tr>
            </thead>
            <tbody>
              {weightsSorted.map((w) => (
                <tr key={w.id}>
                  <td className="font-medium text-slate-200">{w.name}</td>
                  <td className="tabular-nums text-slate-300">{fmt(w.cost)}</td>
                  <td className="tabular-nums text-slate-300">+{fmt(w.powerGain)}</td>
                  <td className="tabular-nums text-slate-400">{fmt(w.cost / w.powerGain)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="m-0 text-xs text-slate-500">{t('weightsTableFoot')}</p>
      </section>

      <p className="m-0 text-xs leading-relaxed text-slate-500">{t('disclaimer')}</p>
    </div>
  );
}
