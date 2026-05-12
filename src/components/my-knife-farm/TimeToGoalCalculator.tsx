'use client';

import { MY_KNIFE_FARM_ZONES } from '@/config/my-knife-farm/zones';
import { useTranslations } from 'next-intl';
import { useMemo, useState } from 'react';

function parseNumber(raw: string): number | null {
  const trimmed = raw.trim();
  if (trimmed === '') {
    return null;
  }
  const n = Number(trimmed.replace(/,/g, ''));
  return Number.isFinite(n) ? n : null;
}

function formatDuration(totalSeconds: number): string {
  if (!Number.isFinite(totalSeconds) || totalSeconds < 0) {
    return '—';
  }
  const s = Math.max(1, Math.ceil(totalSeconds));
  if (s < 60) {
    return `${s}s`;
  }
  const m = Math.floor(s / 60);
  const rs = s % 60;
  if (s < 3600) {
    return `${m}m ${rs}s`;
  }
  const h = Math.floor(s / 3600);
  const rm = Math.floor((s % 3600) / 60);
  if (s < 86400) {
    return `${h}h ${rm}m`;
  }
  const d = Math.floor(s / 86400);
  const rh = Math.floor((s % 86400) / 3600);
  return `${d}d ${rh}h`;
}

export function TimeToGoalCalculator() {
  const t = useTranslations('MyKnifeFarm');
  const [cashInput, setCashInput] = useState('');
  const [cpsInput, setCpsInput] = useState('');

  const currentCash = parseNumber(cashInput);
  const cps = parseNumber(cpsInput);
  const cashValid = currentCash !== null && currentCash >= 0;
  const cpsValid = cps !== null && cps > 0;

  const upcomingZones = useMemo(() => {
    if (!cashValid || currentCash === null) {
      return [];
    }
    return [...MY_KNIFE_FARM_ZONES]
      .filter((z) => z.cashGoal > 0 && currentCash < z.cashGoal)
      .sort((a, b) => a.cashGoal - b.cashGoal);
  }, [cashValid, currentCash]);

  return (
    <section aria-labelledby="ttg-heading" className="site-card mt-8 space-y-4">
      <h2 id="ttg-heading" className="text-lg font-semibold text-slate-100">
        {t('ttgHeading')}
      </h2>
      <p className="max-w-3xl text-sm leading-relaxed text-slate-400">{t('ttgIntro')}</p>

      <div className="flex flex-wrap items-end gap-4">
        <label className="flex min-w-[12rem] flex-1 flex-col gap-1.5 text-sm font-semibold text-slate-300">
          <span>{t('ttgCurrentCash')}</span>
          <input
            type="text"
            inputMode="decimal"
            placeholder={t('ttgPlaceholderCash')}
            value={cashInput}
            onChange={(e) => setCashInput(e.target.value)}
            className="site-field"
          />
        </label>
        <label className="flex min-w-[12rem] flex-1 flex-col gap-1.5 text-sm font-semibold text-slate-300">
          <span>{t('ttgCashPerSecond')}</span>
          <input
            type="text"
            inputMode="decimal"
            placeholder={t('ttgPlaceholderCps')}
            value={cpsInput}
            onChange={(e) => setCpsInput(e.target.value)}
            className="site-field"
          />
        </label>
      </div>

      {!cashValid ? (
        <p className="text-sm text-slate-500">{t('ttgNeedValidCash')}</p>
      ) : upcomingZones.length === 0 ? (
        <p className="text-sm text-slate-500">{t('ttgAllCashGatesMet')}</p>
      ) : (
        <>
          {!cpsValid ? (
            <p className="text-sm text-slate-500">{t('ttgNeedValidCps')}</p>
          ) : null}
          <div className="site-table-wrap max-w-3xl">
            <table className="site-table">
              <thead>
                <tr>
                  <th scope="col">{t('ttgColZone')}</th>
                  <th scope="col">{t('ttgColCashGate')}</th>
                  <th scope="col" className="th-num">
                    {t('ttgColRemaining')}
                  </th>
                  <th scope="col" className="th-num">
                    {t('ttgColTime')}
                  </th>
                </tr>
              </thead>
              <tbody>
                {upcomingZones.map((z) => {
                  const remaining = z.cashGoal - (currentCash as number);
                  const seconds = cpsValid && cps !== null ? remaining / cps : NaN;
                  const timeLabel = cpsValid && Number.isFinite(seconds) ? formatDuration(seconds) : '—';
                  return (
                    <tr key={z.id}>
                      <td className="font-semibold text-slate-100">{z.name}</td>
                      <td>{z.cashRequirement}</td>
                      <td className="td-num tabular-nums">${remaining.toLocaleString()}</td>
                      <td className="td-num tabular-nums">{timeLabel}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </>
      )}
    </section>
  );
}
