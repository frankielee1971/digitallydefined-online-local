const QUESTIONS = [
  {
    key: 'q1',
    label: 'When you learn a new tool, what do you do first?',
    options: [
      { value: 'builder', label: 'Open it and start building something small' },
      { value: 'educator', label: 'Look for tutorials or guides before touching it' },
      { value: 'strategist', label: 'Check whether it fits a bigger workflow' },
      { value: 'creator', label: 'Think about how it could shape my content' },
      { value: 'connector', label: 'See if I can use it to help someone else' },
    ],
  },
  {
    key: 'q2',
    label: 'Which phrase sounds like a good Saturday?',
    options: [
      { value: 'builder', label: 'Tweaking a website or automation until it works' },
      { value: 'educator', label: 'Reading a deep-dive article or course module' },
      { value: 'strategist', label: 'Mapping next quarter\'s priorities on paper' },
      { value: 'creator', label: 'Writing, filming, or designing in private' },
      { value: 'connector', label: 'Checking in on my group or mentoring someone' },
    ],
  },
  {
    key: 'q3',
    label: 'Someone offers you a new project. You ask:',
    options: [
      { value: 'strategist', label: 'What is the outcome and timeline?' },
      { value: 'builder', label: 'What tools and assets already exist?' },
      { value: 'educator', label: 'Who else has done this and what can I learn?' },
      { value: 'creator', label: 'Who is the audience and what will they feel?' },
      { value: 'connector', label: 'Who else needs to be in the room?' },
    ],
  },
  {
    key: 'q4',
    label: 'Your ideal income model is:',
    options: [
      { value: 'builder', label: 'Owned assets that generate leads or rent' },
      { value: 'educator', label: 'Courses, templates, or teaching systems' },
      { value: 'strategist', label: 'Advisory or high-leverage planning work' },
      { value: 'creator', label: 'Content-driven products with automated delivery' },
      { value: 'connector', label: 'Community, referrals, or partner offers' },
    ],
  },
  {
    key: 'q5',
    label: 'Pick a risk tolerance statement:',
    options: [
      { value: 'strategist', label: 'I prefer planning over betting' },
      { value: 'builder', label: 'I will test small and scale what works' },
      { value: 'educator', label: 'I want proof before I commit' },
      { value: 'creator', label: 'I care more about autonomy than predictability' },
      { value: 'connector', label: 'I move forward when I know people are with me' },
    ],
  },
  {
    key: 'q6',
    label: 'Which workflow feels most natural?',
    options: [
      { value: 'builder', label: 'Build, measure, improve' },
      { value: 'educator', label: 'Research, document, share' },
      { value: 'strategist', label: 'Clarify, prioritize, delegate' },
      { value: 'creator', label: 'Ideate, draft, refine in private' },
      { value: 'connector', label: 'Listen, match needs, connect people' },
    ],
  },
  {
    key: 'q7',
    label: 'What does "success" actually mean to you?',
    options: [
      { value: 'builder', label: 'Assets that work while I am offline' },
      { value: 'educator', label: 'Clarity I can pass forward to others' },
      { value: 'strategist', label: 'A system that makes decisions easier' },
      { value: 'creator', label: 'Work that feels like mine, not performative' },
      { value: 'connector', label: 'A network that lifts everyone' },
    ],
  },
];

export const RESULT_TYPES = {
  creator: {
    title: 'The Creator',
    tagline: 'Private output. Public leverage.',
    description:
      'You think in content, story, and audience experience. Your superpower is turning insight into assets that keep working after you publish them.',
    recommendedFirstStep: 'Start with one automated content asset tied to a niche offer.',
    toolPreference: 'Content Planner, AI writing assistants, simple publishing pipelines',
  },
  builder: {
    title: 'The Builder',
    tagline: 'Systems first. Visibility later.',
    description:
      'You care about infrastructure, templates, and repeatable systems. Your superpower is making complex income paths simple enough to run without constant oversight.',
    recommendedFirstStep: 'Pick one rank-and-rent or digital asset model and map its workflow.',
    toolPreference: 'Niche Profitability Scorecard, 10x ROI Calculator, SOP builders',
  },
  educator: {
    title: 'The Educator',
    tagline: 'Clarity compounds.',
    description:
      'You learn deeply and want to translate that into trust. Your superpower is organizing what others find confusing into simple, proven paths.',
    recommendedFirstStep: 'Document one micro-system you already use and turn it into a checklist.',
    toolPreference: 'Workbook templates, PDF engines, email courses',
  },
  connector: {
    title: 'The Connector',
    tagline: 'Network effects beat noise.',
    description:
      'You see relationships, partnerships, and group dynamics. Your superpower is matching people, offers, and opportunities in ways that create shared wins.',
    recommendedFirstStep: 'Map one community or partner path inside your niche.',
    toolPreference: 'Community CTAs, referral systems, partnership trackers',
  },
  strategist: {
    title: 'The Strategist',
    tagline: 'Direction beats speed.',
    description:
      'You prioritize outcomes over activity. Your superpower is choosing the right model and cutting the rest, which prevents wasted effort.',
    recommendedFirstStep: 'Run the Niche Profitability Scorecard before building anything new.',
    toolPreference: 'Scorecards, revenue models, portfolio trackers',
  },
};

export function scoreQuiz(answers = {}) {
  const counts = {};
  for (const key of Object.keys(answers)) {
    const value = answers[key];
    if (!value) continue;
    counts[value] = (counts[value] || 0) + 1;
  }

  let topResult = 'builder';
  let topCount = 0;
  for (const [key, count] of Object.entries(counts)) {
    if (count > topCount) {
      topCount = count;
      topResult = key;
    }
  }

  return topResult;
}

export default QUESTIONS;
