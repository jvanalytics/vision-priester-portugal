
## PPR Vision Simulator — Plan

A single-page financial projection tool for Portuguese PPR (Plano Poupança Reforma) investments, with a Linear-inspired dark aesthetic.

### Design system (`src/styles.css`)
- Override tokens to a near-black palette: `--background` ~oklch(0.16 0 0), `--card` ~oklch(0.19 0 0), `--foreground` ~oklch(0.97 0 0), `--muted-foreground` ~oklch(0.65 0 0), `--border` ~oklch(0.27 0 0), `--primary` light gray for high contrast accents.
- Sharp borders (radius ~6px), 1px hairline dividers, subtle inner highlights.
- Typography: Inter (already web-safe) loaded via `<link>` in `__root.tsx` head; tabular-nums for numbers; tight tracking on the large balance figure.
- Force the app to render dark by adding `className="dark"` on `<html>` in `RootShell`.

### Layout
- `src/routes/index.tsx` becomes the simulator page.
  - Fixed left sidebar `w-80`, full height, `border-r border-border`, padded, scrollable.
  - Main content: `flex-1`, padded, with two stacked sections — the headline balance and the chart card.
- Update route `head()` with PPR Vision Simulator title + meta description.

### Components (`src/components/ppr/`)
- `InputsSidebar.tsx` — controlled numeric fields (Current Age, Retirement Age, Initial Investment €, Monthly Contribution €). Uses shadcn `Input` + `Label`, custom dark styling, € suffix where relevant, min/max sanity bounds.
- `ProjectedBalance.tsx` — large 5–6xl tabular-nums display, formatted via `Intl.NumberFormat('pt-PT', { style: 'currency', currency: 'EUR' })`, with small caption: years to retirement + total contributed.
- `ProjectionChart.tsx` — Recharts `LineChart` (Recharts already shadcn-standard via `chart.tsx`), single monochrome line, minimal axes, grid hairlines, dark tooltip.

### Calculation engine (`src/lib/ppr-projection.ts`)
- Pure function `projectGrowth({ currentAge, retirementAge, initialInvestment, monthlyContribution, annualReturn = 0.04 })`.
- Iterates year-by-year from currentAge to retirementAge. Monthly compounding:
  - monthlyRate = (1 + annualReturn)^(1/12) − 1
  - For each of 12 months: balance = balance * (1 + monthlyRate) + monthlyContribution
- Returns `Array<{ age, year, balance, contributed }>` plus final balance.
- Memoize result with `useMemo` keyed on inputs in the page component.

### State
- Local `useState` in `index.tsx` for the 4 inputs (defaults: 30 / 65 / 5000 / 200). No persistence, no backend.

### Out of scope (explicit)
- No tax modeling, no variable returns, no scenarios/comparison, no auth, no DB. The 4% return is hardcoded as a constant for now (easy to lift to a slider later).

### Files touched
- Edit: `src/styles.css`, `src/routes/__root.tsx`, `src/routes/index.tsx`
- Create: `src/lib/ppr-projection.ts`, `src/components/ppr/InputsSidebar.tsx`, `src/components/ppr/ProjectedBalance.tsx`, `src/components/ppr/ProjectionChart.tsx`
