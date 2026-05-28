export interface ProjectionInput {
  currentAge: number;
  retirementAge: number;
  initialInvestment: number;
  monthlyContribution: number;
  annualReturn?: number;
}

export interface ProjectionPoint {
  age: number;
  yearIndex: number;
  balance: number;
  contributed: number;
}

export interface ProjectionResult {
  points: ProjectionPoint[];
  finalBalance: number;
  totalContributed: number;
  yearsToRetirement: number;
}

export function projectGrowth({
  currentAge,
  retirementAge,
  initialInvestment,
  monthlyContribution,
  annualReturn = 0.04,
}: ProjectionInput): ProjectionResult {
  const years = Math.max(0, Math.floor(retirementAge - currentAge));
  const monthlyRate = Math.pow(1 + annualReturn, 1 / 12) - 1;

  let balance = Math.max(0, initialInvestment);
  let contributed = Math.max(0, initialInvestment);

  const points: ProjectionPoint[] = [
    { age: currentAge, yearIndex: 0, balance, contributed },
  ];

  for (let y = 1; y <= years; y++) {
    for (let m = 0; m < 12; m++) {
      balance = balance * (1 + monthlyRate) + monthlyContribution;
      contributed += monthlyContribution;
    }
    points.push({
      age: currentAge + y,
      yearIndex: y,
      balance,
      contributed,
    });
  }

  return {
    points,
    finalBalance: balance,
    totalContributed: contributed,
    yearsToRetirement: years,
  };
}
