import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { createWhatsAppUrl, whatsappMessages } from "../../data/siteData";
import "./Header.css";

const menuItemVariants = {
  closed: { opacity: 0, x: 22 },
  open: { opacity: 1, x: 0 },
};

export default function Header({ navLinks }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeHref, setActiveHref] = useState("");
  const menuButtonRef = useRef(null);
  const menuRef = useRef(null);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 50);
    const onResize = () => {
      if (window.innerWidth >= 1024) setMenuOpen(false);
    };

    window.addEventListener("scroll", onScroll);
    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  useEffect(() => {
    const sections = navLinks
      .map(({ href }) => document.querySelector(href))
      .filter(Boolean);

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleSection = entries.find((entry) => entry.isIntersecting);
        if (visibleSection) setActiveHref(`#${visibleSection.target.id}`);
      },
      { rootMargin: "-25% 0px -65%", threshold: 0 },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [navLinks]);

  useEffect(() => {
    if (!menuOpen) return undefined;

    const onKeyDown = (event) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
        return;
      }

      if (event.key !== "Tab" || !menuRef.current) return;

      const focusableElements = [...menuRef.current.querySelectorAll("a[href], button:not([disabled])")];
      const firstElement = focusableElements[0];
      const lastElement = focusableElements.at(-1);

      if (event.shiftKey && document.activeElement === firstElement) {
        event.preventDefault();
        lastElement?.focus();
      } else if (!event.shiftKey && document.activeElement === lastElement) {
        event.preventDefault();
        firstElement?.focus();
      }
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);
    const focusTimer = window.setTimeout(() => menuRef.current?.querySelector("button")?.focus(), 80);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
      window.clearTimeout(focusTimer);
      menuButtonRef.current?.focus({ preventScroll: true });
    };
  }, [menuOpen]);

  return (
    <>
    <header className={`header ${isScrolled ? "scrolled" : ""}`}>
      <div className="container nav-shell">
        <a href="#topo" className="brand" aria-label="Ir para o topo">
          <img src="/images/hero-logo-matheus.png" alt="Logo MA" className="brand-logo" />
        </a>

        <nav className="desktop-nav" aria-label="Navegação principal">
          {navLinks.map((item) => (
            <a key={item.href} href={item.href} aria-current={activeHref === item.href ? "page" : undefined}>
              {item.label}
            </a>
          ))}
        </nav>

        <a className="btn desktop-cta header-cta" href={createWhatsAppUrl(whatsappMessages.evolucao)} target="_blank" rel="noreferrer">
          QUERO COMEÇAR
        </a>

        <button
          ref={menuButtonRef}
          className="hamburger"
          type="button"
          aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
          aria-expanded={menuOpen}
          aria-controls="mobile-navigation"
          onClick={() => setMenuOpen((prev) => !prev)}
        >
          <span />
          <span />
          <span />
        </button>
      </div>
    </header>

      {createPortal(
      <AnimatePresence>
        {menuOpen && (
          <>
            <motion.button
              className="mobile-menu-backdrop"
              type="button"
              aria-label="Fechar menu"
              tabIndex={-1}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: reduceMotion ? 0 : 0.24 }}
              onClick={() => setMenuOpen(false)}
            />

            <motion.aside
              ref={menuRef}
              id="mobile-navigation"
              className="mobile-menu"
              role="dialog"
              aria-modal="true"
              aria-labelledby="mobile-menu-title"
              initial={{ x: reduceMotion ? 0 : "105%", opacity: reduceMotion ? 1 : 0.6 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: reduceMotion ? 0 : "105%", opacity: 0 }}
              transition={reduceMotion ? { duration: 0 } : { type: "spring", stiffness: 330, damping: 34 }}
            >
              <div className="mobile-menu-header">
                <a href="#topo" className="mobile-menu-brand" aria-label="Voltar ao início" onClick={() => setMenuOpen(false)}>
                  <img src="/images/hero-logo-matheus.png" alt="" className="mobile-menu-logo" />
                  <span>
                    <strong>Matheus Araújo</strong>
                    <small>Personal Trainer</small>
                  </span>
                </a>
                <button className="mobile-menu-close" type="button" aria-label="Fechar menu" onClick={() => setMenuOpen(false)}>
                  <span />
                  <span />
                </button>
              </div>

              <div className="mobile-menu-intro">
                <span className="mobile-menu-kicker">Navegação</span>
                <h2 id="mobile-menu-title">Onde você quer chegar?</h2>
              </div>

              <motion.nav
                className="mobile-menu-nav"
                aria-label="Navegação mobile"
                initial="closed"
                animate="open"
                variants={{ open: { transition: { delayChildren: reduceMotion ? 0 : 0.1, staggerChildren: reduceMotion ? 0 : 0.055 } } }}
              >
                {navLinks.map((item) => (
                  <motion.a
                    key={item.href}
                    href={item.href}
                    aria-current={activeHref === item.href ? "page" : undefined}
                    variants={menuItemVariants}
                    transition={{ duration: reduceMotion ? 0 : 0.3, ease: "easeOut" }}
                    onClick={() => setMenuOpen(false)}
                  >
                    <span className="mobile-menu-label">{item.label}</span>
                    <span className="mobile-menu-arrow" aria-hidden="true">→</span>
                  </motion.a>
                ))}
              </motion.nav>

              <div className="mobile-menu-footer">
                <p><span aria-hidden="true" /> Atendimento online e presencial</p>
                <a className="btn btn-primary mobile-menu-cta" href={createWhatsAppUrl(whatsappMessages.evolucao)} target="_blank" rel="noreferrer" onClick={() => setMenuOpen(false)}>
                  <span>Começar agora</span>
                  <span aria-hidden="true">↗</span>
                </a>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>,
      document.body,
      )}
    </>
  );
}
