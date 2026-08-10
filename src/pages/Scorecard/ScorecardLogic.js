const CRITERIA = [
  {
    key: 'demand',
    label: 'Local or niche demand',
    description: 'People are already searching for this service or product.',
    weight: 0.3,
  },
  {
    key: 'competition',
    label: 'Manageable competition',
    description: 'The market is not saturated with well-funded competitors.',
    weight: 0.2,
  },
  {
    key: 'monetization',
    label: 'Clear monetization path',
    description: 'You can see at least three ways to generate revenue.',
    weight: 0.2,
  },
  {
    key: 'sustainability',
    label: 'Sustainability',
    description: 'Demand is likely to remain stable or grow over the next 3 years.',
    weight: 0.15,
  },
  {
    key: 'ease',
    label: 'Ease of execution',
    description: 'You can build a minimum version without advanced skills or large teams.',
    weight: 0.1,
  },
  {
    key: 'privacyFit',
    label: 'Privacy fit',
    description: 'This niche can be served without requiring on-camera presence.',
    weight: 0.05,
  },
];

export function scoreNiche(scores = {}) {
  let total = 0;
  let weighted = 0;

  for (const criterion of CRITERIA) {
    const raw = Number(scores[criterion.key] || 0);
    const clamped = Math.min(10, Math.max(0, raw));
    total += clamped;
    weighted += clamped * criterion.weight;
  }

  const maxPossible = 10 * CRITERIA.length;
  const pct = weighted / 10;

  if (pct >= 0.8) return { tier: 'A', pct, weighted, total, maxPossible };
  if (pct >= 0.6) return { tier: 'B', pct, weighted, total, maxPossible };
  if (pct >= 0.4) return { tier: 'C', pct, weighted, total, maxPossible };
  return { tier: 'D', pct, weighted, total, maxPossible };
}

export function tierCopy(tier) {
  switch (tier) {
    case 'A':
      return {
        title: 'Strong opportunity',
        body: 'This niche shows strong demand, clear monetization, and manageable competition. Prioritize validation and build a minimum asset quickly.',
      };
    case 'B':
      return {
        title: 'Worth testing',
        body: 'This niche has promise, but at least one criterion needs a closer look. Validate demand before investing heavily.',
      };
    case 'C':
      return {
        title: 'Needs more research',
        body: 'The score is mixed. Spend more time on competition and monetization before building.',
      };
    case 'D':
      return {
        title: 'High risk or low signal',
        body: 'This niche currently lacks enough demand, monetization clarity, or sustainability. Revisit only if you have a clear strategic edge.',
      };
    default:
      return { title: '', body: '' };
  }
}

export { CRITERIA };
export default CRITERIA;
