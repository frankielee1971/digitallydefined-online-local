export const agentSchema = {
  "superpower_summary": "string",

  "persona_alignment": {
    "strengths": ["string"],
    "weaknesses": ["string"],
    "preferred_content_style": "string",
    "preferred_business_model": "string",
    "confidence_level": "number",
    "experience_level": "string"
  },

  "market_analysis": {
    "trend_score": "number",
    "competition_score": "number",
    "demand_score": "number",
    "niche_opportunities": ["string"],
    "risk_factors": ["string"],
    "validation_steps": ["string"]
  },

  "recommended_digital_assets": [
    {
      "asset_type": "string",
      "why_it_fits": "string",
      "difficulty": "string",
      "estimated_time": "string",
      "monetization_model": "string",
      "required_skills": ["string"],
      "starter_prompts": ["string"]
    }
  ],

  "content_format_recommendations": {
    "primary_format": "string",
    "secondary_formats": ["string"],
    "automation_opportunities": ["string"],
    "distribution_channels": ["string"]
  },

  "personalized_roadmap": [
    {
      "step": "string",
      "description": "string",
      "tools_needed": ["string"],
      "estimated_time": "string",
      "success_metric": "string",
      "dependencies": ["string"]
    }
  ],

  "next_best_action": {
    "action": "string",
    "reason": "string",
    "expected_outcome": "string",
    "time_required": "string"
  }
};
