/**
 * Build the JSON payload sent to the Digital Superpower agent.
 *
 * The deployed backend (supabase/functions/hermes/index.ts) expects the
 * raw quiz answers shape:  { q1: 'builder', q2: 'creator', ... q7: 'strategist' }
 * where each value is one of: builder | creator | educator | strategist | connector.
 *
 * This mirrors what the active quiz (src/pages/Quiz/DigitalSuperpowerQuiz.jsx)
 * sends to the `intelligence` / `agent.*` actions via callSupabaseEdge().
 */
export function buildQuizJson(answers) {
  // answers is already { q1: 'builder', ... }; the backend derives everything else.
  return { answers };
}

export default buildQuizJson;
