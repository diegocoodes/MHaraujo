import { motion } from "framer-motion";
import { fadeUp, textFade } from "../../animations/fadeUp";
import { createWhatsAppUrl, whatsappMessages } from "../../data/siteData";
import RevealText from "../common/RevealText";

export default function Apresentacao() {
  return (
    <section className="section apresentacao-section" aria-labelledby="apresentacao-title">
      <div className="container panel presentation-panel sports-panel">
        <div className="presentation-grid">
          <motion.div
            className="presentation-copy"
            custom={0}
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <p className="eyebrow">CONHEÇA O MÉTODO</p>
            <RevealText id="apresentacao-title" className="section-title" highlight={["Propósito"]}>
              TREINO COM ESTRATÉGIA. <span className="neon">EVOLUÇÃO COM PROPÓSITO.</span>
            </RevealText>
            <motion.p className="section-text" variants={textFade} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }}>
              Aperte o play e conheça de perto a proposta do acompanhamento #TEAMMA: um processo individualizado, construído para a sua rotina e o seu objetivo.
            </motion.p>
            <a className="btn btn-primary presentation-cta" href={createWhatsAppUrl(whatsappMessages.contato)} target="_blank" rel="noreferrer">
              QUERO FAZER PARTE DO #TEAMMA
            </a>
          </motion.div>

          <motion.div
            className="presentation-video-shell animated-media-border"
            custom={2}
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <video
              className="presentation-video"
              controls
              playsInline
              preload="metadata"
              poster="/images/apresentacao-poster.jpg"
              aria-label="Vídeo de apresentação de Matheus Araújo e do acompanhamento Team MA"
            >
              <source src="/videios/apresentação.mp4" type="video/mp4" />
              Seu navegador não suporta a reprodução deste vídeo.
            </video>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
