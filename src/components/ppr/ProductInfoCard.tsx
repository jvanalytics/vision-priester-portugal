import type { PPRProduct } from "@/lib/ppr-products";

interface Props {
  product: PPRProduct;
  grossReturn: number;
}

export function ProductInfoCard({ product, grossReturn }: Props) {
  const net = grossReturn - product.fee;
  const rows: Array<[string, string]> = [
    ["ISIN", product.isin],
    ["Manager", product.manager],
    ["Management fee", `${(product.fee * 100).toFixed(2)}%`],
    ["Gross return", `${(grossReturn * 100).toFixed(2)}%`],
    ["Net return", `${(net * 100).toFixed(2)}%`],
  ];

  return (
    <section className="px-10 py-8 border-b border-border">
      <div className="rounded-md border border-border bg-card/40 overflow-hidden">
        <div className="px-5 py-4 border-b border-border flex items-start justify-between gap-4">
          <div className="min-w-0">
            <div className="text-[11px] uppercase tracking-wider text-muted-foreground font-medium">
              Selected product
            </div>
            <h2 className="mt-1 text-base font-semibold text-foreground truncate">
              {product.name}
            </h2>
          </div>
          <div className="shrink-0 text-right">
            <div className="text-[10px] uppercase tracking-wider text-muted-foreground">Net</div>
            <div className="text-sm font-medium tabular-nums text-foreground">
              {(net * 100).toFixed(2)}%
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 divide-y md:divide-y-0 md:divide-x divide-border">
          {rows.map(([label, value]) => (
            <div key={label} className="px-5 py-3">
              <div className="text-[10px] uppercase tracking-wider text-muted-foreground">
                {label}
              </div>
              <div className="mt-1 text-xs font-medium tabular-nums text-foreground truncate">
                {value}
              </div>
            </div>
          ))}
        </div>

        <div className="px-5 py-4 border-t border-border">
          <p className="text-xs leading-relaxed text-muted-foreground">{product.description}</p>
        </div>
      </div>
    </section>
  );
}
