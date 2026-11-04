import { useEffect, useState } from "react";
import { AnimatePresence, motion, MotionConfig } from "framer-motion";
import "./styles/global.css";
import "./styles/mediaBorders.css";
import "./styles/motion.css";
import "./styles/sportsVisuals.css";
import "./styles/shaderBackground.css";
import Intro from "./components/layout/Intro";
import LogoCursor from "./components/layout/LogoCursor";
import ScrollProgress from "./components/layout/ScrollProgress";
import Footer from "./components/layout/Footer";
import Header from "./components/layout/Header";
import WhatsAppButton from "./components/layout/WhatsAppButton";
import ErrorPage from "./components/common/ErrorPage";
import BlackNovemberModal from "./components/common/BlackNovemberModal";
import Hero from "./components/sections/Hero";
import Sobre from "./components/sections/Sobre";
import Apresentacao from "./components/sections/Apresentacao";
import Evolucao from "./components/sections/Evolucao";
import Planos from "./components/sections/Planos";
import SectionConnector from "./components/common/SectionConnector";
import { ShaderBackground } from "./components/ui/adisyon-shader";
import { navLinks } from "./data/siteData";
import { blackNovemberCampaign } from "./data/blackNovember";

export default function App() {
  const pathname = window.location.pathname.replace(/\/+$/, "") || "/";
  const errorCode = pathname === "/505" ? 505 : pathname !== "/" && pathname !== "/index.html" ? 404 : null;

  if (errorCode) {
    return <ErrorPage code={errorCode} />;
  }

  return <HomePage />;
}

function HomePage() {
  const [showIntro, setShowIntro] = useState(true);
  const [campaignOpen, setCampaignOpen] = useState(blackNovemberCampaign.enabled);
  const campaignVisible = blackNovemberCampaign.enabled && campaignOpen;

  useEffect(() => {
    const fallbackTimer = window.setTimeout(() => setShowIntro(false), 1800);
    return () => window.clearTimeout(fallbackTimer);
  }, []);

  return (
    <MotionConfig reducedMotion="user">
      <AnimatePresence>{showIntro && <Intro onComplete={() => window.setTimeout(() => setShowIntro(false), 350)} />}</AnimatePresence>
      <div className="site-background" aria-hidden="true">
        <ShaderBackground paused={showIntro || campaignVisible} />
      </div>
      <LogoCursor />
      <ScrollProgress />
      <motion.div className="site-shell" initial={{ opacity: 0 }} animate={{ opacity: showIntro ? 0 : 1 }} transition={{ duration: 0.55 }}>
        <Header navLinks={navLinks} />
        <main>
          <Hero ready={!showIntro && !campaignVisible} />
          <Sobre />
          <SectionConnector />
          <Apresentacao />
          <SectionConnector />
          <Evolucao />
          <SectionConnector />
          <Planos />
          <SectionConnector />
        </main>
        <Footer navLinks={navLinks} />
        <WhatsAppButton />
      </motion.div>
      {blackNovemberCampaign.enabled && <BlackNovemberModal onOpenChange={setCampaignOpen} />}
    </MotionConfig>
  );
}
