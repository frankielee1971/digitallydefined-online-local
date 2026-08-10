export function renderRoadmap(roadmapJson) {
  const {
    superpower_summary,
    market_analysis,
    recommended_digital_assets,
    personalized_roadmap
  } = roadmapJson;

  return {
    header: superpower_summary,
    trendScore: market_analysis?.trend_score,
    competitionScore: market_analysis?.competition_score,
    demandScore: market_analysis?.demand_score,
    opportunities: market_analysis?.niche_opportunities || [],
    assets: recommended_digital_assets || [],
    steps: personalized_roadmap || []
  };
}
