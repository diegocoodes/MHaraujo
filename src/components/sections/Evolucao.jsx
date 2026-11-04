import { motion } from "framer-motion";
import { fadeUp } from "../../animations/fadeUp";
import { createWhatsAppUrl, resultados, whatsappMessages } from "../../data/siteData";
import BeforeAfterSlider from "../common/BeforeAfterSlider";
import RevealText from "../common/RevealText";

export default function Evolucao() {
  return (
    <section id="evolucao" className="section evolucao-section">
      <div className="container panel panel-gradient">
        <motion.div custom={0} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="center-head">
          <p className="eyebrow">PROVAS REAIS</p>
          <RevealText className="section-title center" highlight={["Reais"]}>RESULTADOS REAIS DO #TEAMMA</RevealText>
          <p className="section-text center">Transformações construídas com método, consistência e acompanhamento real.</p>
        </motion.div>

        <div className="result-grid">
          {resultados.map((item, index) => (
            <motion.article
              key={item.nome}
              className="result-card"
              custom={index}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <div className="result-image-wrap">
                <BeforeAfterSlider item={item} demonstrate={index === 0} />
                <span className="result-tag">{item.categoria}</span>
              </div>
              <div className="result-info">
                {item.detalhesPendentes ? (
                  <>
                    <h3 className="result-pending-title">Mais uma transformação real</h3>
                    <p className="result-pending-copy">Nome e detalhes da evolução serão adicionados em breve.</p>
                  </>
                ) : (
                  <>
                    <h3>{item.nome}</h3>
                    <strong>{item.resultado}</strong>
                    <p>{item.descricao}</p>
                    <span>{item.formato}</span>
                    <small>{item.prova}</small>
                  </>
                )}
              </div>
            </motion.article>
          ))}
        </div>

        <motion.div custom={4} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="results-cta">
          <p>Pronto para construir sua evolução?</p>
          <a className="btn btn-primary btn-big" href={createWhatsAppUrl(whatsappMessages.evolucao)} target="_blank" rel="noreferrer">
            COMEÇAR MINHA EVOLUÇÃO
          </a>
          <small>Resultados individuais podem variar conforme rotina, constância e acompanhamento.</small>
        </motion.div>
      </div>
    </section>
  );
}
