import { motion } from "framer-motion";
import { fadeUp, textFade } from "../../animations/fadeUp";
import { createWhatsAppUrl, sobreSection, whatsappMessages } from "../../data/siteData";
import ImageWithFallback from "../common/ImageWithFallback";
import RevealText from "../common/RevealText";
import AnimatedStat from "../common/AnimatedStat";
import BrandWatermark from "../common/BrandWatermark";

const [studentCount, ...studentLabel] = sobreSection.tag.split(" ");
const studentStat = { value: studentCount, label: studentLabel.join(" ") };

export default function Sobre() {
  return (
    <section id="sobre" className="section">
      <div className="container panel panel-dark sports-panel">
        <BrandWatermark />
        <div className="sobre-grid">
          <motion.div custom={0} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="sobre-photo-wrap">
            <div className="sobre-photo-card animated-media-border">
              <ImageWithFallback src="/images/hero-mobile-matheus.png" alt="Matheus em sessão de treino" className="sobre-photo" />
            </div>
            <div className="sobre-tag"><AnimatedStat item={studentStat} /></div>
          </motion.div>

          <motion.div custom={2} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <p className="eyebrow">{sobreSection.eyebrow}</p>
            <RevealText className="section-title" highlight={["Araújo"]}>
              {sobreSection.titulo.map((linha) => (
                <span key={linha}>{linha}</span>
              ))}
              {sobreSection.destaque && <span className="neon">{sobreSection.destaque}</span>}
            </RevealText>

            <div className="sobre-copy">
              {sobreSection.paragrafos.map((paragrafo, index) => (
                <motion.p key={paragrafo} className="section-text" variants={textFade} custom={index} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }}>
                  {paragrafo}
                </motion.p>
              ))}
            </div>

            <a className="btn btn-primary sobre-cta" href={createWhatsAppUrl(whatsappMessages.evolucao)} target="_blank" rel="noreferrer">
              {sobreSection.botao}
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
