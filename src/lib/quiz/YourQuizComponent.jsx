import { buildQuizJson } from '@/lib/quiz/buildQuizJson';

const quizJSON = buildQuizJson(formState);
callAgent('digital-superpower-quiz', quizJSON);
