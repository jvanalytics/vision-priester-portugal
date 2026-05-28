interface Props {
  finalBalance: number;
  totalContributed: number;
  yearsToRetirement: number;
  retirementAge: number;
}

const eur = new Intl.NumberFormat("pt-PT", {
  style: "currency",
  currency: "EUR",
  maximumFractionDigits: 0,
});

export function ProjectedBalance({
  finalBalance,
  totalContributed,
  yearsToRetirement,
  retirementAge,
}: Props) {
  const gains = Math.max(0, finalBalance - totalContributed);

  return (
    <section className="border-b border-border px-10 py-10">
      <div className="text-[11px] uppercase tracking-wider text-muted-foreground font-medium">
        Projected balance at age {retirementAge}
      </div>
      <div className="mt-3 text-6xl md:text-7xl font-semibold tracking-tight tabular-nums text-foreground">
        {eur.format(Math.round(finalBalance))}
      </div>

      <div className="mt-8 grid grid-cols-3 gap-px bg-border border border-border rounded-md overflow-hidden max-w-2xl">
        <Stat label="Horizon" value={`${yearsToRetirement} yrs`} />
        <Stat label="Contributed" value={eur.format(Math.round(totalContributed))} />
        <Stat label="Growth" value={eur.format(Math.round(gains))} />
      </div>
    </section>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-card px-4 py-3">
      <div className="text-[10px] uppercase tracking-wider text-muted-foreground">{label}</div>
      <div className="mt-1 text-sm font-medium tabular-nums text-foreground">{value}</div>
    </div>
  );
}
