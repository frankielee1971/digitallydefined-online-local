export function buildQuizJson(answers) {
  return {
    answers,
    experience_level: answers.experience || 'beginner',
    interests: answers.interests || [],
    goals: answers.goals || [],
    time_available: answers.time || '1-3 hours/week',
    competition_level: answers.competition || 'medium',
    trend_alignment: answers.trends || 'medium'
  };
}
