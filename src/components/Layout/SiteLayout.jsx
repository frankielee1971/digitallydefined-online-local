import React from 'react';
import BrandNav from '../BrandNav';
import BrandFooter from '../BrandFooter';
import MentorWidget from '../MentorWidget';
import { useAutoOpenMentor } from '../../hooks/useAutoOpenMentor';

/**
 * SiteLayout
 * Wraps every page and injects Hermes with safe, validated props.
 *
 * Improvements:
 * - Validates systemPrompt (prevents blank pages)
 * - Provides fallback prompts
 * - Ensures mentorTopic is always a valid string
 * - Passes enriched toolState safely
 * - Prevents Hermes from loading with null/undefined values
 */

export default function Layout({ children, mentorTopic, systemPrompt, toolState }) {
  const autoOpenCount = useAutoOpenMentor();

  // Ensure mentorTopic is always a valid string
  const safeTopic = typeof mentorTopic === 'string' && mentorTopic.length > 0
    ? mentorTopic
    : 'default';

  // Ensure systemPrompt is always a valid string
  const safePrompt =
    typeof systemPrompt === 'string' && systemPrompt.trim().length > 0
      ? systemPrompt
      : `
You are Hermes, the AI mentor for DigitallyDefined.
Provide helpful, specific, practical guidance based on the user's current page.
Never be vague. Never use hype. Never say a niche is “definitely profitable.”
Use “signals of demand,” “worth validating,” and “shows potential.”
`;

  // Ensure toolState is always an object
  const safeToolState = toolState && typeof toolState === 'object'
    ? toolState
    : {};

  return (
    <div className="site-shell">
      <BrandNav />

      <main className="site-main">
        {children}
      </main>

      <BrandFooter />

      <MentorWidget
        topic={safeTopic}
        systemPrompt={safePrompt}
        toolState={safeToolState}
        autoOpenCount={autoOpenCount}
      />
    </div>
  );
}
