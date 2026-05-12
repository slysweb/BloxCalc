'use client';

import { MY_KNIFE_FARM_UPGRADES } from '@/config/my-knife-farm/upgrades';
import { useTranslations } from 'next-intl';
import { useMemo, useState } from 'react';

type RankedUpgrade = {
  id: string;
  name: string;
  cost: number;
  cashPerSecDelta: number;
  paybackSec: number;
  efficiency: number;
  affordable: boolean;
};

function formatPayback(seconds: number): string {
  if (!Number.isFinite(seconds) || seconds <= 0) {
    return '—';
  }
  if (seconds < 60) {
    return `${Math.round(seconds)}s`;
  }
  const m = Math.floor(seconds / 60);
  const s = Math.round(seconds % 60);
  return `${m}m ${s}s`;
}

function formatMoney(n: number): string {
  if (n >= 1_000_000) {
    return `$${(n / 1_000_000).toFixed(2)}M`;
  }
  if (n >= 1_000) {
    return `$${(n / 1_000).toFixed(2)}k`;
  }
  return `$${n.toLocaleString()}`;
}

export function UpgradeRoiCalculator() {
  const t = useTranslations('MyKnifeFarm');
  const [balanceInput, setBalanceInput] = useState('');
  const [onlyAffordable, setOnlyAffordable] = useState(false);

  const balance = balanceInput.trim() === '' ? null : Number(balanceInput.replace(/,/g, ''));
  const balanceValid = balance !== null && Number.isFinite(balance) && balance >= 0;
  const cashOnHand = balanceValid ? balance : null;

  const rows = useMemo(() => {
    const ranked: RankedUpgrade[] = MY_KNIFE_FARM_UPGRADES.map((u) => {
      const delta = u.cashPerSecDelta;
      const paybackSec = delta > 0 ? u.basePrice / delta : Number.POSITIVE_INFINITY;
      const efficiency = u.basePrice > 0 ? delta / u.basePrice : 0;
      const affordable = cashOnHand === null || u.basePrice <= cashOnHand;
      return {
        id: u.id,
        name: u.name,
        cost: u.basePrice,
        cashPerSecDelta: delta,
        paybackSec,
        efficiency,
        affordable,
      };
    });
    ranked.sort((a, b) => a.paybackSec - b.paybackSec);
    return ranked.filter((r) => (!onlyAffordable || cashOnHand === null ? true : r.affordable));
  }, [cashOnHand, onlyAffordable]);

  return (
    <section className="site-card mt-8 space-y-4" aria-label={t('breadcrumbRoi')}>
      <div className="flex flex-wrap items-end gap-4">
        <label className="flex min-w-[12rem] flex-1 flex-col gap-1.5 text-sm font-semibold text-slate-300">
          <span>{t('roiBalanceLabel')}</span>
          <input
            type="text"
            inputMode="decimal"
            placeholder={t('roiBalancePlaceholder')}
            value={balanceInput}
            onChange={(e) => setBalanceInput(e.target.value)}
            className="site-field"
          />
        </label>
        <label className="flex cursor-pointer items-center gap-2 text-sm text-slate-300">
          <input
            type="checkbox"
            className="size-4 rounded border-slate-600 bg-slate-900 text-emerald-500 focus:ring-emerald-500/30"
            checked={onlyAffordable}
            onChange={(e) => setOnlyAffordable(e.target.checked)}
            disabled={!balanceValid}
          />
          <span>{t('roiOnlyAffordable')}</span>
        </label>
      </div>

      <p className="text-sm text-slate-400">{t('roiIntro')}</p>

      <div className="site-table-wrap">
        <table className="site-table">
          <thead>
            <tr>
              <th scope="col">{t('roiColUpgrade')}</th>
              <th scope="col" className="th-num">
                {t('roiColCost')}
              </th>
              <th scope="col" className="th-num">
                {t('roiColDelta')}
              </th>
              <th scope="col" className="th-num">
                {t('roiColPayback')}
              </th>
              <th scope="col" className="th-num">
                {t('roiColEfficiency')}
              </th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr
                key={row.id}
                className={balanceValid && !row.affordable ? 'opacity-40' : undefined}
              >
                <td>
                  {row.name}
                  {balanceValid && !row.affordable ? (
                    <span className="ml-1.5 text-xs text-slate-500">({t('roiUnaffordable')})</span>
                  ) : null}
                </td>
                <td className="td-num font-medium tabular-nums">{formatMoney(row.cost)}</td>
                <td className="td-num font-medium tabular-nums text-emerald-300/90">
                  +{row.cashPerSecDelta}/s
                </td>
                <td className="td-num tabular-nums">{formatPayback(row.paybackSec)}</td>
                <td className="td-num tabular-nums">{(row.efficiency * 1000).toFixed(3)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="text-xs text-slate-500">{t('dataDisclaimer')}</p>
    </section>
  );
}
