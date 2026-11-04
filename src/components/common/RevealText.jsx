import { Children, cloneElement, isValidElement, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

const tags = { h1: motion.h1, h2: motion.h2, h3: motion.h3, p: motion.p };

function getText(children) {
  return Children.toArray(children)
    .map((child) => isValidElement(child) ? getText(child.props.children) : String(child))
    .join("");
}

const normalizeWord = (word) => word.replace(/[^\p{L}\p{N}#]/gu, "").toLocaleLowerCase("pt-BR");

export default function RevealText({ as = "h2", children, className = "", active, delay = 0, highlight = [], ...props }) {
  const reduceMotion = useReducedMotion();
  const [entered, setEntered] = useState(false);
  const Tag = tags[as] || motion.h2;
  const highlightedWords = new Set(highlight.map(normalizeWord));
  let wordIndex = 0;
  const wordVariants = {
    hidden: { opacity: 0, y: "110%" },
    visible: (index) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, delay: delay + Math.min(index * 0.045, 0.36), ease: [0.16, 1, 0.3, 1] },
    }),
  };

  const renderWords = (nodes, prefix = "text") => Children.map(nodes, (child, childIndex) => {
    if (typeof child === "string" || typeof child === "number") {
      return String(child).split(/(\s+)/).map((part, index) => {
        if (!part || /^\s+$/.test(part)) return part;
        const highlighted = highlightedWords.has(normalizeWord(part));
        if (reduceMotion && !highlighted) return part;
        return (
          <span key={`${prefix}-${childIndex}-${index}`} className={`reveal-word${highlighted ? " reveal-word-highlight" : ""}`} aria-hidden="true">
            {reduceMotion ? (
              <span className="reveal-word-content">{part}</span>
            ) : (
              <motion.span className="reveal-word-content" variants={wordVariants} custom={wordIndex++}>{part}</motion.span>
            )}
          </span>
        );
      });
    }
    return isValidElement(child)
      ? cloneElement(child, {}, renderWords(child.props.children, `${prefix}-${childIndex}`))
      : child;
  });

  if (reduceMotion) {
    const StaticTag = as;
    return <StaticTag {...props} className={`${className} reveal-text`} aria-label={getText(children)} data-revealed="true">{renderWords(children)}</StaticTag>;
  }

  return (
    <Tag
      {...props}
      className={`${className} reveal-text`}
      aria-label={getText(children)}
      data-revealed={active === undefined ? entered : active}
      initial="hidden"
      animate={active === undefined ? undefined : active ? "visible" : "hidden"}
      whileInView={active === undefined ? "visible" : undefined}
      viewport={{ once: true, amount: 0.2, margin: "0px 0px -20px 0px" }}
      onViewportEnter={() => setEntered(true)}
    >
      {renderWords(children)}
    </Tag>
  );
}
