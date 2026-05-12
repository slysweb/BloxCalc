/**
 * Fixed-size placeholders for Google AdSense (or other) slots.
 * Replace inner content with your ad unit snippet when ready.
 */
export function AdSlotTop() {
  return (
    <div
      id="AD-Slot-Top"
      aria-label="AD-Slot-Top"
      role="complementary"
      className="mx-auto mb-6 flex h-[90px] w-full max-w-[728px] items-center justify-center rounded-xl border border-dashed border-slate-700 bg-slate-900/40 text-xs text-slate-500 shadow-inner"
    >
      <span>AD-Slot-Top · 728×90</span>
    </div>
  );
}

export function AdSlotSidebar() {
  return (
    <div
      id="AD-Slot-Sidebar"
      aria-label="Google AdSense medium rectangle placeholder"
      role="complementary"
      className="flex h-[250px] w-[300px] max-w-full flex-col items-center justify-center rounded-xl border border-dashed border-slate-700 bg-slate-900/40 p-2 text-center text-xs text-slate-500 shadow-inner"
    >
      <span>
        Google AdSense
        <br />
        300×250
      </span>
    </div>
  );
}
