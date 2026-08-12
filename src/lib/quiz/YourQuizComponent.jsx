/**
 * YourQuizComponent — Example / superseded draft
 *
 * NOTE: The LIVE Digital Superpower Quiz is `src/pages/Quiz/DigitalSuperpowerQuiz.jsx`
 * (wired up in src/App.jsx at route "/quiz"). This file is left here as a
 * reference snippet showing how to connect quiz answers to the AI agent.
 *
 * The deployed backend (`supabase/functions/hermes/index.ts`) drives the
 * full flow for you. From the quiz page it sends three calls:
 *   1) callSupabaseEdge('intelligence', { userId, answers })
 *   2) callAgent('roadmap', { name, superpower, answers, profile, goal })
 *   3) callSupabaseEdge('quiz.complete', { name, email, superpower, answers, roadmap, source })
 * Below is the equivalent minimal wiring.
 */
import { callAgent } from '../../lib/buzz-agents';

/**
 * Send the user's quiz answers (+ name/email) to the Digital Superpower
 * agent and get back a personalized roadmap.
 * @param {{ answers: Record<string,string>, name: string, email: string }} payload
 */
export async function runDigiSuperpowerQuiz(payload) {
  const { answers, name, email } = payload;

  // The agent interprets the quiz (JSON schema prompting) and builds a roadmap.
  const { data } = await callAgent('digital-superpower-quiz', {
    answers,
    name,
    email,
    goal: 'Build faceless digital real estate that supports retirement',
  });

  return data; // { superpowerName, superpowerDescription, recommendedPathways, steps, estimatedTime, tools, nextAction }
}

export default runDigiSuperpowerQuiz;
