import { createWhatsAppUrl, whatsappMessages } from "../../data/siteData";
import { motion } from "framer-motion";
import { fadeUp } from "../../animations/fadeUp";

export default function Footer({ navLinks }) {
  const currentYear = new Date().getFullYear();

  return (
    <footer id="contato" className="footer">
      <motion.div className="container footer-shell" variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.15 }}>
        <div className="footer-brand-block">
          <a href="#topo" className="footer-brand" aria-label="Voltar ao topo">
            <img src="/images/hero-logo-matheus.png" alt="Logo Matheus Araújo" className="footer-logo" />
            <div className="footer-brand-copy">
              <strong>Matheus Araújo</strong>
              <span>Personal Trainer • Hipertrofia e Emagrecimento</span>
            </div>
          </a>

          <p className="footer-text">
            Acompanhamento com treino, estratégia e constância para evolução real no físico e na rotina.
          </p>
        </div>

        <nav className="footer-nav" aria-label="Links do rodapé">
          {navLinks.map((item) => (
            <a key={item.href} href={item.href}>
              {item.label}
            </a>
          ))}
        </nav>

        <div className="footer-meta">
          <a className="btn footer-cta" href={createWhatsAppUrl(whatsappMessages.contato)} target="_blank" rel="noreferrer">
            Falar no WhatsApp
          </a>
          <p>© {currentYear} Matheus Araújo · Personal Trainer</p>
        </div>
      </motion.div>
    </footer>
  );
}
