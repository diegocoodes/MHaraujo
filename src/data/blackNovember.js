// Campaign data stays separate from the regular plans and their WhatsApp messages.
export const blackNovemberCampaign = {
  enabled: true,
  plannedActivationDate: "2026-11-07",
};

export const blackNovemberPlans = [
  {
    id: "basico",
    name: "Básico",
    periods: [
      { name: "Trimestral", original: 500, promotional: 400, discount: 20 },
      { name: "Semestral", original: 800, promotional: 600, discount: 25 },
      { name: "Anual", original: 1300, promotional: 910, discount: 30, bestValue: true },
    ],
  },
  {
    id: "intermediario",
    name: "Intermediário",
    periods: [
      { name: "Trimestral", original: 700, promotional: 560, discount: 20 },
      { name: "Semestral", original: 1120, promotional: 840, discount: 25 },
      { name: "Anual", original: 1620, promotional: 1134, discount: 30, bestValue: true },
    ],
  },
  {
    id: "premium",
    name: "Premium",
    periods: [
      { name: "Trimestral", original: 910, promotional: 728, discount: 20 },
      { name: "Semestral", original: 1620, promotional: 1215, discount: 25 },
      { name: "Anual", original: 2100, promotional: 1470, discount: 30, bestValue: true },
    ],
  },
];

const priceFormatter = new Intl.NumberFormat("pt-BR", { maximumFractionDigits: 0 });

export const formatCampaignPrice = (value) => `R$ ${priceFormatter.format(value)}`;

export function createCampaignWhatsAppUrl(plan, period) {
  const message = `Olá, Matheus! Vim pela Black November do site e tenho interesse no Plano ${plan.name} ${period.name}, por ${formatCampaignPrice(period.promotional)}. Pode me explicar os próximos passos?`;
  return `https://wa.me/558183047273?text=${encodeURIComponent(message)}`;
}
