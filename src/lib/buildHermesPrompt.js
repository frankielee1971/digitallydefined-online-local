/**
 * Hermes Prompt Builder (Upgraded for Hermes v2)
 * Provides page-aware, persona-aware, niche-aware system prompts
 * aligned with the new agents and enriched schema.
 */

import {
  buildGapPrompt,
  buildFreedomPrompt,
  buildQuizPrompt,
  buildScorecardPrompt,
  buildROIPrompt,
  buildToolsPrompt,
  buildPricingPrompt,
  buildAutomationPrompt,
  buildContactPrompt,
  buildRoadmapPrompt,
  buildMarketingPrompt
} from './buildHermesPromptParts';

// Re-export the page-specific prompt builders so consumers
// (e.g. MentorTopicWrapper) can import them directly from this module.
export {
  buildGapPrompt,
  buildFreedomPrompt,
  buildQuizPrompt,
  buildScorecardPrompt,
  buildROIPrompt,
  buildToolsPrompt,
  buildPricingPrompt,
  buildAutomationPrompt,
  buildContactPrompt,
  buildRoadmapPrompt,
  buildMarketingPrompt,
} from './buildHermesPromptParts';

/**
 * Main Hermes Prompt Builder
 * page = route name (e.g., "retirement-gap", "freedom", "scorecard")
 * toolState = calculator/quiz/scorecard context
 * pageContext = marketing page context
 */
export function buildHermesPrompt(page, toolState = {}, pageContext = {}) {
  switch (page) {
    case 'retirement-gap':
    case 'gap':
      return buildGapPrompt(toolState);

    case 'freedom':
      return buildFreedomPrompt(toolState);

    case 'quiz':
      return buildQuizPrompt(toolState);

    case 'scorecard':
      return buildScorecardPrompt(toolState);

    case 'roi':
      return buildROIPrompt(toolState);

    case 'tools':
      return buildToolsPrompt(toolState);

    case 'pricing':
      return buildPricingPrompt(toolState);

    case 'automation':
      return buildAutomationPrompt(toolState);

    case 'contact':
      return buildContactPrompt(toolState);

    case 'roadmap':
      return buildRoadmapPrompt(toolState);

    /**
     * ⭐ DEFAULT: Global marketing-site mentor
     * This covers:
     * - homepage
     * - about page
     * - blog pages
     * - landing pages
     * - any page without a dedicated prompt
     */
    default:
      return buildMarketingPrompt(pageContext);
  }
}
