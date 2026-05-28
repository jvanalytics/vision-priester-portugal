import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { InputsSidebar, type SimulatorInputs } from "@/components/ppr/InputsSidebar";
import { ProjectedBalance } from "@/components/ppr/ProjectedBalance";
import { ProjectionChart } from "@/components/ppr/ProjectionChart";
import { ProductInfoCard } from "@/components/ppr/ProductInfoCard";
import { projectGrowth } from "@/lib/ppr-projection";
import {
  DEFAULT_PPR_ID,
  GROSS_ANNUAL_RETURN,
  PPR_PRODUCTS,
} from "@/lib/ppr-products";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "PPR Vision Simulator — Project your Portuguese retirement savings" },
      {
        name: "description",
        content:
          "Simulate the growth of your Portuguese PPR with monthly compounding and real fund fees. Visualize capital projections from today to retirement.",
      },
      { property: "og:title", content: "PPR Vision Simulator" },
      {
        property: "og:description",
        content: "Project your PPR balance year by year until retirement.",
      },
    ],
  }),
  component: Simulator,
});

function Simulator() {
  const [inputs, setInputs] = useState<SimulatorInputs>({
    currentAge: 30,
    retirementAge: 65,
    initialInvestment: 5000,
    monthlyContribution: 200,
    productId: DEFAULT_PPR_ID,
  });

  const product =
    PPR_PRODUCTS.find((p) => p.id === inputs.productId) ?? PPR_PRODUCTS[0];
  const netReturn = Math.max(0, GROSS_ANNUAL_RETURN - product.fee);

  const projection = useMemo(
    () =>
      projectGrowth({
        currentAge: inputs.currentAge,
        retirementAge: Math.max(inputs.retirementAge, inputs.currentAge),
        initialInvestment: inputs.initialInvestment,
        monthlyContribution: inputs.monthlyContribution,
        annualReturn: netReturn,
      }),
    [inputs, netReturn],
  );

  return (
    <div className="min-h-screen bg-background text-foreground flex">
      <InputsSidebar values={inputs} onChange={setInputs} netReturn={netReturn} />
      <main className="flex-1 min-w-0">
        <ProjectedBalance
          finalBalance={projection.finalBalance}
          totalContributed={projection.totalContributed}
          yearsToRetirement={projection.yearsToRetirement}
          retirementAge={Math.max(inputs.retirementAge, inputs.currentAge)}
        />
        <ProductInfoCard product={product} grossReturn={GROSS_ANNUAL_RETURN} />
        <ProjectionChart points={projection.points} />
      </main>
    </div>
  );
}
