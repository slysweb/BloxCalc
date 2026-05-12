'use client';

import { MY_KNIFE_FARM_UPGRADES } from '@/config/my-knife-farm/upgrades';
import { useTranslations } from 'next-intl';
import { useMemo } from 'react';

type SmartRow = {
  id: string;
  name: string;
  basePrice: number;
  multiplierIncrease: number;
  roi: number;
};

function formatMoney(n: number): string {
  if (n >= 1_000_000) {
    return `$${(n / 1_000_000).toFixed(2)}M`;
  }
  if (n >= 1_000) {
    return `$${(n / 1_000).toFixed(2)}k`;
  }
  return `$${n.toLocaleString()}`;
}

function formatRoi(roi: number): string {
  if (!Number.isFinite(roi)) {
    return '—';
  }
  return roi.toLocaleString(undefined, { maximumFractionDigits: 1 });
}

export function SmartUpgradeList() {
  const t = useTranslations('MyKnifeFarm');

  const { rows, bestId } = useMemo(() => {
    const mapped: SmartRow[] = MY_KNIFE_FARM_UPGRADES.map((u) => ({
      id: u.id,
      name: u.name,
      basePrice: u.basePrice,
      multiplierIncrease: u.multiplierIncrease,
      roi:
        u.multiplierIncrease > 0 ? u.basePrice / u.multiplierIncrease : Number.POSITIVE_INFINITY,
    }));
    const rows = [...mapped].sort((a, b) => {
      if (a.roi !== b.roi) {
        return a.roi - b.roi;
      }
      return a.id.localeCompare(b.id);
    });
    const bestId =
      rows.length > 0 && Number.isFinite(rows[0].roi) ? rows[0].id : null;
    return { rows, bestId };
  }, []);

  return (
    <section aria-labelledby="smart-upgrade-heading" className="site-card space-y-4">
      <h2 id="smart-upgrade-heading" className="text-lg font-semibold text-slate-100">
        {t('smartHeading')}
      </h2>
      <p className="max-w-3xl text-sm leading-relaxed text-slate-400">{t('smartIntro')}</p>

      <div className="site-table-wrap">
        <table className="site-table">
          <thead>
            <tr>
              <th scope="col">{t('smartColUpgrade')}</th>
              <th scope="col" className="th-num">
                {t('smartColBasePrice')}
              </th>
              <th scope="col" className="th-num">
                {t('smartColMultIncrease')}
              </th>
              <th scope="col" className="th-num">
                {t('smartColRoi')}
              </th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => {
              const isBest = row.id === bestId && Number.isFinite(row.roi);
              return (
                <tr
                  key={row.id}
                  className={isBest ? 'bg-emerald-500/[0.08]' : undefined}
                >
                  <td className={isBest ? 'font-semibold text-slate-100' : undefined}>
                    {row.name}
                    {isBest ? (
                      <span className="ml-2 align-middle text-[0.65rem] font-bold uppercase tracking-wider text-emerald-300">
                        {t('smartBestValue')}
                      </span>
                    ) : null}
                  </td>
                  <td className="td-num tabular-nums">{formatMoney(row.basePrice)}</td>
                  <td className="td-num tabular-nums text-emerald-300/90">
                    +{row.multiplierIncrease.toFixed(3)}
                  </td>
                  <td className="td-num tabular-nums">{formatRoi(row.roi)}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <p className="text-xs text-slate-500">{t('smartFootnote')}</p>
    </section>
  );
}
