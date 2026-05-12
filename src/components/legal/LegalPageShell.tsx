type LegalPageShellProps = {
  title: string;
  lastUpdated: string;
  children: React.ReactNode;
};

export function LegalPageShell({ title, lastUpdated, children }: LegalPageShellProps) {
  return (
    <main className="mx-auto w-full max-w-3xl flex-1 space-y-6 px-4 py-10">
      <header className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight text-slate-100">{title}</h1>
        <p className="text-sm text-slate-500">{lastUpdated}</p>
      </header>
      <article className="site-card space-y-8 text-sm leading-relaxed text-slate-300">{children}</article>
    </main>
  );
}

type LegalSectionProps = {
  title: string;
  paragraphs: string[];
};

export function LegalSection({ title, paragraphs }: LegalSectionProps) {
  return (
    <section className="space-y-3">
      <h2 className="text-lg font-semibold text-slate-100">{title}</h2>
      <div className="space-y-3">
        {paragraphs.map((p, i) => (
          <p key={i}>{p}</p>
        ))}
      </div>
    </section>
  );
}
