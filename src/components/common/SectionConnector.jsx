import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useSpring } from "framer-motion";

const path = "M1 30H999";

export default function SectionConnector() {
  const ref = useRef(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 90%", "end 40%"] });
  const progress = useSpring(scrollYProgress, { stiffness: 160, damping: 30 });

  return (
    <div ref={ref} className="section-connector container" aria-hidden="true">
      <svg viewBox="0 0 1000 60" preserveAspectRatio="none" fill="none">
        <path d={path} className="connector-track" vectorEffect="non-scaling-stroke" />
        {reduceMotion ? (
          <path d={path} className="connector-accent" vectorEffect="non-scaling-stroke" />
        ) : (
          <motion.path d={path} className="connector-accent" style={{ pathLength: progress }} vectorEffect="non-scaling-stroke" />
        )}
      </svg>
    </div>
  );
}
