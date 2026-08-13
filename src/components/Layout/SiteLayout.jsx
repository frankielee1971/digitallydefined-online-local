import React from 'react';
import BrandNav from '../BrandNav';
import BrandFooter from '../BrandFooter';
import MentorWidget from '../MentorWidget';
import { useAutoOpenMentor } from '../../hooks/useAutoOpenMentor';

export default function Layout({ children, mentorTopic, systemPrompt, toolState }) {
  const autoOpenCount = useAutoOpenMentor();

  return (
    <div className="site-shell">
      <BrandNav />
      <main className="site-main">{children}</main>
      <BrandFooter />
      <MentorWidget topic={mentorTopic} systemPrompt={systemPrompt} toolState={toolState} autoOpenCount={autoOpenCount} />
    </div>
  );
}
