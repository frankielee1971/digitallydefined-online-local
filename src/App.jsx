import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import StartHere from './pages/StartHere';
import Quiz from './pages/Quiz/DigitalSuperpowerQuiz';
import NicheDiscovery from './pages/Tools/NicheDiscovery';
import RoadmapGenerator from './pages/Tools/RoadmapGenerator';
import WealthCalculator from './pages/Calculator/TenXROICalculator';
import FreedomCalculator from './pages/Calculator/FreedomNumberCalculator';
import RetirementGapCalculator from './pages/Calculator/RetirementGapCalculator';
import Scorecard from './pages/Scorecard/NicheProfitabilityScorecard';
import Products from './pages/Products';
import Pricing from './pages/Pricing';
import About from './pages/About';
import Contact from './pages/Contact';
import Tools from './pages/Tools';
import Automation from './pages/Automation';
import ComingSoon from './pages/ComingSoon';
import SiteLayout from './components/Layout/SiteLayout';

function ExternalRedirect({ to }) {
  useEffect(() => {
    window.location.href = to;
  }, [to]);
  return null;
}

function MentorTopicWrapper({ topic, children }) {
  return <SiteLayout mentorTopic={topic}>{children}</SiteLayout>;
}

function App() {
  return (
    <Routes>
      {/* Coming Soon Page - Temporary */}
      <Route path="/" element={<MentorTopicWrapper topic="home"><ComingSoon /></MentorTopicWrapper>} />
      
      {/* Main Flow - Commented out for now */}
      {/* <Route path="/" element={<MentorTopicWrapper topic="home"><Home /></MentorTopicWrapper>} /> */}
      <Route path="/start-here" element={<MentorTopicWrapper topic="start-here"><StartHere /></MentorTopicWrapper>} />
      <Route path="/automation" element={<MentorTopicWrapper topic="automation"><Automation /></MentorTopicWrapper>} />

      {/* Quiz Flow */}
      <Route path="/quiz" element={<MentorTopicWrapper topic="quiz"><Quiz /></MentorTopicWrapper>} />

      {/* Tools Flow */}
      <Route path="/tools" element={<MentorTopicWrapper topic="tools"><Tools /></MentorTopicWrapper>} />
      <Route path="/tools/niche" element={<MentorTopicWrapper topic="tools"><NicheDiscovery /></MentorTopicWrapper>} />
      <Route path="/tools/roadmap" element={<MentorTopicWrapper topic="quiz"><RoadmapGenerator /></MentorTopicWrapper>} />
      <Route path="/tools/scorecard" element={<MentorTopicWrapper topic="scorecard"><Scorecard /></MentorTopicWrapper>} />
      <Route path="/tools/calculator" element={<MentorTopicWrapper topic="roi"><WealthCalculator /></MentorTopicWrapper>} />

      {/* Calculators */}
      <Route path="/scorecard" element={<MentorTopicWrapper topic="scorecard"><Scorecard /></MentorTopicWrapper>} />
      <Route path="/roi" element={<MentorTopicWrapper topic="roi"><WealthCalculator /></MentorTopicWrapper>} />
      <Route path="/freedom" element={<MentorTopicWrapper topic="freedom"><FreedomCalculator /></MentorTopicWrapper>} />
      <Route path="/gap" element={<MentorTopicWrapper topic="retirement-gap"><RetirementGapCalculator /></MentorTopicWrapper>} />

      {/* Info Pages */}
      <Route path="/products" element={<MentorTopicWrapper topic="products"><Products /></MentorTopicWrapper>} />
      <Route path="/pricing" element={<MentorTopicWrapper topic="pricing"><Pricing /></MentorTopicWrapper>} />
      <Route path="/about" element={<MentorTopicWrapper topic="about"><About /></MentorTopicWrapper>} />
      <Route path="/contact" element={<MentorTopicWrapper topic="contact"><Contact /></MentorTopicWrapper>} />

      {/* Dashboard */}
      <Route path="/dashboard" element={<ExternalRedirect to="https://dashboard.digitallydefined.online" />} />

      {/* Fallback */}
      <Route path="*" element={<MentorTopicWrapper topic="home"><ComingSoon /></MentorTopicWrapper>} />
    </Routes>
  );
}

export default App;
