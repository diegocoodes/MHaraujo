import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  blackNovemberPlans,
  createCampaignWhatsAppUrl,
  formatCampaignPrice,
} from "../../data/blackNovember";
import "./BlackNovemberModal.css";

function Arrow({ back = false }) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d={back ? "M19 12H5m6-6-6 6 6 6" : "M5 12h14m-6-6 6 6-6 6"} stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function BlackNovemberModal({ onOpenChange }) {
  const [isOpen, setIsOpen] = useState(true);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const dialogRef = useRef(null);
  const stepTitleRef = useRef(null);
  const pointerStartedOutside = useRef(false);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    onOpenChange?.(isOpen);
  }, [isOpen, onOpenChange]);

  useLayoutEffect(() => {
    if (!isOpen) return undefined;

    const dialog = dialogRef.current;
    const previouslyFocused = document.activeElement;
    const scrollPosition = { x: window.scrollX, y: window.scrollY };
    const body = document.body;
    const html = document.documentElement;
    const bodyProperties = ["position", "top", "left", "width", "overflow", "paddingRight"];
    const previousBodyStyles = Object.fromEntries(bodyProperties.map((property) => [property, body.style[property]]));
    const previousHtmlOverflow = html.style.overflow;
    const scrollbarWidth = window.innerWidth - html.clientWidth;

    dialog.showModal();

    // Fixed positioning also prevents background scrolling in mobile Safari.
    if (scrollbarWidth > 0) {
      body.style.paddingRight = `${parseFloat(window.getComputedStyle(body).paddingRight) + scrollbarWidth}px`;
    }
    Object.assign(body.style, {
      position: "fixed",
      top: `-${scrollPosition.y}px`,
      left: `-${scrollPosition.x}px`,
      width: "100%",
      overflow: "hidden",
    });
    html.style.overflow = "hidden";

    return () => {
      dialog.close();
      Object.assign(body.style, previousBodyStyles);
      html.style.overflow = previousHtmlOverflow;
      window.scrollTo({ left: scrollPosition.x, top: scrollPosition.y, behavior: "instant" });
      previouslyFocused?.focus?.({ preventScroll: true });
    };
  }, [isOpen]);

  const isOutside = (event) => {
    const rect = dialogRef.current.getBoundingClientRect();
    return event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom;
  };

  const changePlan = (plan) => {
    dialogRef.current.scrollTo({ top: 0, behavior: "instant" });
    setSelectedPlan(plan);
  };

  return createPortal(
    <dialog
      ref={dialogRef}
      className="bn-modal"
      aria-label="Black November — descontos progressivos"
      aria-describedby="bn-description"
      onCancel={(event) => {
        event.preventDefault();
        setIsOpen(false);
      }}
      onClose={(event) => {
        // Ignore a queued close event if StrictMode has already reopened it.
        if (!event.currentTarget.open) setIsOpen(false);
      }}
      onKeyDown={(event) => {
        if (event.key !== "Tab") return;

        const controls = [...dialogRef.current.querySelectorAll("button, a[href]")]
          .filter((element) => element.tabIndex !== -1 && element.getClientRects().length > 0);
        const first = controls[0];
        const last = controls.at(-1);

        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last?.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first?.focus();
        }
      }}
      onPointerDown={(event) => {
        pointerStartedOutside.current = isOutside(event);
      }}
      onClick={(event) => {
        if (pointerStartedOutside.current && isOutside(event)) setIsOpen(false);
        pointerStartedOutside.current = false;
      }}
    >
      <header className="bn-header">
        <span className="bn-brand">#TEAM<span>MA</span></span>
        <span className="bn-header-label">{selectedPlan ? "BLACK NOVEMBER" : "CONSULTORIA ONLINE"}</span>
        <button className="bn-close" type="button" aria-label="Fechar Black November" autoFocus onClick={() => setIsOpen(false)}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="m6 6 12 12M6 18 18 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </button>
      </header>

      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={selectedPlan?.id ?? "plans"}
          className="bn-step"
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={{
            hidden: { opacity: 0, y: reduceMotion ? 0 : 10 },
            visible: { opacity: 1, y: 0 },
            exit: { opacity: 0, y: reduceMotion ? 0 : -6 },
          }}
          transition={{ duration: reduceMotion ? 0 : 0.16, ease: "easeOut" }}
          onAnimationComplete={(phase) => {
            if (phase === "visible" && dialogRef.current?.open) stepTitleRef.current?.focus({ preventScroll: true });
          }}
        >
          {selectedPlan ? (
            <>
              <p className="bn-selected-plan">PLANO {selectedPlan.name}</p>
              <h2 ref={stepTitleRef} className="bn-period-title" tabIndex={-1}>ESCOLHA SEU PERÍODO</h2>
              <p id="bn-description" className="bn-description">Quanto maior o período, maior o seu desconto.</p>

              <div className="bn-periods">
                {selectedPlan.periods.map((period) => (
                  <a
                    key={period.name}
                    className={`bn-period${period.bestValue ? " bn-period-best" : ""}`}
                    href={createCampaignWhatsAppUrl(selectedPlan, period)}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${selectedPlan.name} ${period.name}. De ${formatCampaignPrice(period.original)} por ${formatCampaignPrice(period.promotional)}. ${period.discount}% OFF.${period.bestValue ? " Melhor economia." : ""} Falar com Matheus pelo WhatsApp.`}
                  >
                    <div className="bn-period-heading">
                      <h3>{period.name}</h3>
                      {period.bestValue && <span className="bn-best-badge">MELHOR ECONOMIA</span>}
                    </div>
                    <div className="bn-price">
                      <span className="bn-original">De <del>{formatCampaignPrice(period.original)}</del></span>
                      <span className="bn-promotional"><span>por</span> <strong>{formatCampaignPrice(period.promotional)}</strong></span>
                    </div>
                    <span className="bn-period-action">
                      <span className="bn-discount">{period.discount}% OFF</span>
                      <Arrow />
                    </span>
                  </a>
                ))}
              </div>
              <p className="bn-whatsapp-hint">Selecione um período para falar com Matheus no WhatsApp. <span className="sr-only">Abre em uma nova aba.</span></p>
            </>
          ) : (
            <>
              <h2 ref={stepTitleRef} className="bn-title" tabIndex={-1}>BLACK <span>NOVEMBER</span></h2>
              <h3 className="bn-subtitle">DESCONTOS PROGRESSIVOS</h3>
              <p id="bn-description" className="bn-description">Escolha seu plano e garanta <strong>até 30% OFF.</strong></p>

              <div className="bn-plans">
                {blackNovemberPlans.map((plan, index) => (
                  <button key={plan.id} className="bn-plan" style={{ "--bn-plan-index": index }} type="button" onClick={() => changePlan(plan)} aria-label={`Plano ${plan.name}`}>
                    <span className="bn-plan-number" aria-hidden="true">0{index + 1}</span>
                    <span className="bn-plan-name"><small>PLANO</small><strong>{plan.name}</strong></span>
                    <Arrow />
                  </button>
                ))}
              </div>
            </>
          )}
        </motion.div>
      </AnimatePresence>

      <footer className="bn-footer">
        {selectedPlan ? (
          <button className="bn-back" type="button" onClick={() => changePlan(null)}><Arrow back /> Voltar</button>
        ) : (
          <span className="bn-footer-label">ESCOLHA SEU PLANO</span>
        )}
        <span className="bn-steps" aria-label={`Etapa ${selectedPlan ? 2 : 1} de 2`}>
          <span className={!selectedPlan ? "bn-step-active" : ""}>01</span>
          <span className="bn-step-rule" aria-hidden="true" />
          <span className={selectedPlan ? "bn-step-active" : ""}>02</span>
        </span>
      </footer>
    </dialog>,
    document.body,
  );
}
