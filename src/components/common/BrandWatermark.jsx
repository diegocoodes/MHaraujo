import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";

export default function BrandWatermark() {
  const ref = useRef(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [-24, 24]);

  return (
    <div ref={ref} className="brand-watermark" aria-hidden="true">
      <motion.img src="/images/hero-logo-matheus.png" alt="" loading="lazy" decoding="async" style={{ y: reduceMotion ? 0 : y }} />
    </div>
  );
}
