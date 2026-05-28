export interface PPRProduct {
  id: string;
  name: string;
  manager: string;
  isin: string;
  /** Annual management fee as a decimal (e.g. 0.0125 = 1.25%) */
  fee: number;
  description: string;
}

export const PPR_PRODUCTS: PPRProduct[] = [
  {
    id: "alves-ribeiro-ppr",
    name: "Alves Ribeiro PPR",
    manager: "Invest Gestão de Activos",
    isin: "PTYAR1IM0007",
    fee: 0.01,
    description:
      "Mixed-asset PPR with an equity bias, historically one of the top-performing Portuguese pension funds.",
  },
  {
    id: "stoik-ppr",
    name: "Stoik PPR / OICVM",
    manager: "Casa de Investimentos",
    isin: "PTYCI3IM0006",
    fee: 0.0125,
    description:
      "Value-investing PPR managed by Casa de Investimentos, focused on undervalued global equities.",
  },
  {
    id: "optimize-capital-reforma-ppr-agressivo",
    name: "Optimize Capital Reforma PPR Agressivo",
    manager: "Optimize Investment Partners",
    isin: "PTYOP2IM0003",
    fee: 0.015,
    description:
      "Aggressive allocation up to 100% equities, aimed at long horizons and higher growth potential.",
  },
  {
    id: "optimize-capital-reforma-ppr-moderado",
    name: "Optimize Capital Reforma PPR Moderado",
    manager: "Optimize Investment Partners",
    isin: "PTYOP1IM0004",
    fee: 0.0125,
    description: "Balanced allocation mixing equities and fixed income for moderate risk profiles.",
  },
  {
    id: "bpi-reforma-acoes-ppr",
    name: "BPI Reforma Acções PPR",
    manager: "BPI Gestão de Activos",
    isin: "PTYBPHIM0009",
    fee: 0.015,
    description: "Equity-heavy PPR from BPI, suited for investors with a long retirement horizon.",
  },
  {
    id: "bpi-reforma-seguranca-ppr",
    name: "BPI Reforma Segurança PPR",
    manager: "BPI Gestão de Activos",
    isin: "PTYBPGIM0000",
    fee: 0.0075,
    description: "Conservative PPR focused on capital preservation through fixed-income securities.",
  },
  {
    id: "santander-poupanca-prudente-ppr",
    name: "Santander Poupança Prudente PPR",
    manager: "Santander Asset Management",
    isin: "PTYSP3IM0008",
    fee: 0.01,
    description: "Prudent PPR with low equity exposure, geared toward stable long-term returns.",
  },
  {
    id: "caixa-reforma-activa-ppr",
    name: "Caixa Reforma Activa PPR",
    manager: "Caixa Gestão de Activos",
    isin: "PTYCXFIM0008",
    fee: 0.0125,
    description: "Dynamic PPR from Caixa Geral de Depósitos blending Portuguese and European assets.",
  },
  {
    id: "nb-ppr",
    name: "NB PPR",
    manager: "GNB Gestão de Activos",
    isin: "PTYBESIM0008",
    fee: 0.011,
    description:
      "Diversified PPR from Novo Banco's asset management arm with a balanced risk profile.",
  },
  {
    id: "golden-ppr",
    name: "Golden PPR",
    manager: "Real Vida Seguros",
    isin: "PTYGRVIM0001",
    fee: 0.009,
    description:
      "Capital-guaranteed PPR with a fixed minimum annual return, aimed at risk-averse savers.",
  },
];

export const DEFAULT_PPR_ID = PPR_PRODUCTS[0].id;

/** Gross market assumption before fees. */
export const GROSS_ANNUAL_RETURN = 0.04;
