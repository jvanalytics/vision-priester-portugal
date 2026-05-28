import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { PPRProductSelect } from "@/components/ppr/PPRProductSelect";


export interface SimulatorInputs {
  currentAge: number;
  retirementAge: number;
  initialInvestment: number;
  monthlyContribution: number;
  productId: string;
}


interface Props {
  values: SimulatorInputs;
  onChange: (next: SimulatorInputs) => void;
  netReturn: number;
}


interface FieldProps {
  id: keyof SimulatorInputs;
  label: string;
  value: number;
  suffix?: string;
  min?: number;
  max?: number;
  step?: number;
  onChange: (n: number) => void;
}

function Field({ id, label, value, suffix, min, max, step, onChange }: FieldProps) {
  return (
    <div className="space-y-2">
      <Label
        htmlFor={id}
        className="text-[11px] uppercase tracking-wider text-muted-foreground font-medium"
      >
        {label}
      </Label>
      <div className="relative">
        <Input
          id={id}
          type="number"
          inputMode="decimal"
          value={Number.isFinite(value) ? value : ""}
          min={min}
          max={max}
          step={step}
          onChange={(e) => {
            const v = e.target.valueAsNumber;
            onChange(Number.isFinite(v) ? v : 0);
          }}
          className="h-10 rounded-md bg-secondary/40 border-border text-foreground tabular-nums pr-9 focus-visible:ring-1 focus-visible:ring-ring"
        />
        {suffix && (
          <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-xs text-muted-foreground">
            {suffix}
          </span>
        )}
      </div>
    </div>
  );
}

export function InputsSidebar({ values, onChange, netReturn }: Props) {
  const update = <K extends keyof SimulatorInputs>(key: K, v: number) =>
    onChange({ ...values, [key]: v });

  return (
    <aside className="w-80 shrink-0 border-r border-border bg-card/30 h-screen sticky top-0 flex flex-col">
      <div className="px-6 py-5 border-b border-border">
        <div className="flex items-center gap-2">
          <div className="h-2 w-2 rounded-full bg-foreground" />
          <h1 className="text-sm font-semibold tracking-tight">PPR Vision</h1>
        </div>
        <p className="mt-1 text-xs text-muted-foreground">Retirement simulator</p>
      </div>

      <div className="flex-1 overflow-y-auto px-6 py-6 space-y-6">
        <div>
          <h2 className="text-[11px] uppercase tracking-wider text-muted-foreground font-medium mb-3">
            PPR Product
          </h2>
          <PPRProductSelect
            value={values.productId}
            onChange={(id) => onChange({ ...values, productId: id })}
          />
        </div>

        <div>
          <h2 className="text-[11px] uppercase tracking-wider text-muted-foreground font-medium mb-4">
            Parameters
          </h2>
          <div className="space-y-4">
            <Field
              id="currentAge"
              label="Current Age"
              value={values.currentAge}
              min={18}
              max={100}
              step={1}
              suffix="yrs"
              onChange={(v) => update("currentAge", v)}
            />
            <Field
              id="retirementAge"
              label="Retirement Age"
              value={values.retirementAge}
              min={values.currentAge + 1}
              max={100}
              step={1}
              suffix="yrs"
              onChange={(v) => update("retirementAge", v)}
            />
            <Field
              id="initialInvestment"
              label="Initial Investment"
              value={values.initialInvestment}
              min={0}
              step={100}
              suffix="€"
              onChange={(v) => update("initialInvestment", v)}
            />
            <Field
              id="monthlyContribution"
              label="Monthly Contribution"
              value={values.monthlyContribution}
              min={0}
              step={25}
              suffix="€"
              onChange={(v) => update("monthlyContribution", v)}
            />
          </div>
        </div>

        <div className="pt-4 border-t border-border">
          <div className="flex items-center justify-between text-xs">
            <span className="text-muted-foreground">Net annual return</span>
            <span className="tabular-nums text-foreground">{(netReturn * 100).toFixed(2)}%</span>
          </div>
          <p className="mt-2 text-[11px] leading-relaxed text-muted-foreground">
            Gross 4.00% minus the selected fund's management fee. Compounded monthly. Excludes PPR
            tax benefits.
          </p>
        </div>
      </div>
    </aside>
  );
}
