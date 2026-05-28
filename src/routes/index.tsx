import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { InputsSidebar, type SimulatorInputs } from "@/components/ppr/InputsSidebar";
import { ProjectedBalance } from "@/components/ppr/ProjectedBalance";
import { ProjectionChart } from "@/components/ppr/ProjectionChart";
import { projectGrowth } from "@/lib/ppr-projection";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "PPR Vision Simulator — Project your Portuguese retirement savings" },
      {
        name: "description",
        content:
          "Simulate the growth of your Portuguese PPR with monthly compounding. Visualize capital projections from today to retirement.",
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
  });

  const projection = useMemo(
    () =>
      projectGrowth({
        currentAge: inputs.currentAge,
        retirementAge: Math.max(inputs.retirementAge, inputs.currentAge),
        initialInvestment: inputs.initialInvestment,
        monthlyContribution: inputs.monthlyContribution,
        annualReturn: 0.04,
      }),
    [inputs],
  );

  return (
    <div className="min-h-screen bg-background text-foreground flex">
      <InputsSidebar values={inputs} onChange={setInputs} />
      <main className="flex-1 min-w-0">
        <ProjectedBalance
          finalBalance={projection.finalBalance}
          totalContributed={projection.totalContributed}
          yearsToRetirement={projection.yearsToRetirement}
          retirementAge={Math.max(inputs.retirementAge, inputs.currentAge)}
        />
        <ProjectionChart points={projection.points} />
      </main>
    </div>
  );
}
