import { motion } from "framer-motion";
import { fadeUp } from "../../animations/fadeUp";
import { createWhatsAppUrl, planos, planosSection, whatsappMessages } from "../../data/siteData";
import RevealText from "../common/RevealText";
import "./Planos.css";

export default function Planos() {
  return (
    <section id="planos" className="section plans-section" aria-labelledby="plans-title">
      <div className="container panel panel-dark plans-panel">
        <motion.div custom={0} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="plans-heading">
          <div className="plans-heading-copy">
            <p className="eyebrow">{planosSection.eyebrow}</p>
            <RevealText id="plans-title" className="section-title plans-title" highlight={["evolução"]}>{planosSection.titulo}</RevealText>
          </div>
          <p className="section-text plans-subtitle">{planosSection.subtitulo}</p>
        </motion.div>

        <div className="plan-grid">
          {planos.map((plano, index) => (
            <motion.article
              key={plano.numero}
              className={`plan-card plan-card-${plano.destaque}`}
              custom={index}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              aria-labelledby={`plan-title-${plano.numero}`}
            >
              <div className="plan-content">
                <div className="plan-card-meta">
                  <span className="plan-tier-index" aria-hidden="true">{plano.numero}</span>
                  {plano.selo ? (
                    <span className="popular-badge">{plano.selo}</span>
                  ) : (
                    <span className="plan-tier-bars" aria-hidden="true">
                      {[0, 1, 2].map((bar) => <i key={bar} className={bar <= index ? "active" : ""} />)}
                    </span>
                  )}
                </div>
                <h3 id={`plan-title-${plano.numero}`}>
                  <span className="plan-category">{plano.titulo.split(" ")[0]}</span>{" "}
                  <span className="plan-name">{plano.titulo.split(" ").slice(1).join(" ")}</span>
                </h3>
                <p className="plan-description">{plano.descricao}</p>

                <p className="plan-audience"><strong>Indicado para:</strong> {plano.interesse}</p>

                <div className="plan-block">
                  <span className="plan-block-title">O que oferece</span>
                  <ul className="plan-benefits">
                    {plano.beneficios.map((beneficio) => (
                      <li key={beneficio}>
                        <svg className="plan-check" width="16" height="16" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                          <path d="m5 10 3.2 3.2L15 6.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        <span>{beneficio}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <a
                  className={`btn plan-button ${plano.destaque === "popular" ? "plan-button-primary" : ""}`}
                  href={createWhatsAppUrl(plano.mensagemWhatsapp)}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={`${plano.botao}. Falar pelo WhatsApp.`}
                >
                  {plano.botao}
                  <svg className="plan-link-arrow" width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path d="M5 12h14m-6-6 6 6-6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </a>
              </div>
            </motion.article>
          ))}
        </div>

        <motion.div className="plans-cta" variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }}>
          <p>{planosSection.ctaTexto}</p>
          <a className="btn btn-primary btn-big" href={createWhatsAppUrl(whatsappMessages.planos)} target="_blank" rel="noreferrer">
            {planosSection.ctaBotao}
          </a>
        </motion.div>
      </div>
    </section>
  );
}
