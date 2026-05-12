import type { ZoneRow } from '@/config/my-knife-farm/zones';

export type ZonesSeoSummaryTableProps = {
  zones: ZoneRow[];
  heading: string;
  caption: string;
  colZone: string;
  colMinCash: string;
  colUnlock: string;
  colDrops: string;
  colCrates: string;
};

function formatMinCash(cashGoal: number): string {
  if (cashGoal <= 0) {
    return '$0';
  }
  return `$${cashGoal.toLocaleString('en-US')}`;
}

/** Bottom-of-page summary table: caption, scope, and numeric cash for crawlers. */
export function ZonesSeoSummaryTable({
  zones,
  heading,
  caption,
  colZone,
  colMinCash,
  colUnlock,
  colDrops,
  colCrates,
}: ZonesSeoSummaryTableProps) {
  return (
    <section aria-labelledby="zones-seo-summary-heading" className="mt-10 space-y-4">
      <h2 id="zones-seo-summary-heading" className="text-xl font-semibold text-slate-100">
        {heading}
      </h2>
      <div className="site-table-wrap">
        <table className="site-table" id="my-knife-farm-zones-seo-summary">
          <caption>{caption}</caption>
          <thead>
            <tr>
              <th scope="col">{colZone}</th>
              <th scope="col" className="th-num">
                {colMinCash}
              </th>
              <th scope="col">{colUnlock}</th>
              <th scope="col">{colDrops}</th>
              <th scope="col">{colCrates}</th>
            </tr>
          </thead>
          <tbody>
            {zones.map((z) => (
              <tr key={`seo-${z.id}`}>
                <th scope="row">{z.name}</th>
                <td className="td-num tabular-nums">
                  <data value={String(z.cashGoal)}>{formatMinCash(z.cashGoal)}</data>
                </td>
                <td>{z.keyOrUnlock ?? '—'}</td>
                <td>{z.notableDrops}</td>
                <td>{z.crateKnifeOdds}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
