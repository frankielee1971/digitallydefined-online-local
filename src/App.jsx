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

function App() {
  return (
    <SiteLayout>
      <Routes>
        {/* Coming Soon Page - Temporary */}
        <Route path="/" element={<ComingSoon />} />
        
        {/* Main Flow - Commented out for now */}
        {/* <Route path="/" element={<Home />} /> */}
        <Route path="/start-here" element={<StartHere />} />
        <Route path="/automation" element={<Automation />} />

        {/* Quiz Flow */}
        <Route path="/quiz" element={<Quiz />} />

        {/* Tools Flow */}
        <Route path="/tools" element={<Tools />} />
        <Route path="/tools/niche" element={<NicheDiscovery />} />
        <Route path="/tools/roadmap" element={<RoadmapGenerator />} />
        <Route path="/tools/scorecard" element={<Scorecard />} />
        <Route path="/tools/calculator" element={<WealthCalculator />} />

        {/* Calculators */}
        <Route path="/scorecard" element={<Scorecard />} />
        <Route path="/roi" element={<WealthCalculator />} />
        <Route path="/freedom" element={<FreedomCalculator />} />
        <Route path="/gap" element={<RetirementGapCalculator />} />

        {/* Info Pages */}
        <Route path="/products" element={<Products />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />

        {/* Dashboard */}
        <Route path="/dashboard" element={<ExternalRedirect to="https://dashboard.digitallydefined.online" />} />

        {/* Fallback */}
        <Route path="*" element={<ComingSoon />} />
      </Routes>
    </SiteLayout>
  );
}

export default App;
