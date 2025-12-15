"use client";
import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { motion } from "framer-motion";
import Typography from "./typography";

export default function FAQ({
  faqs = [],
  className = "",
  questionVariant = "",
  answerVariant = "",
  ...props
}) {
  const [activeIndex, setActiveIndex] = useState(0);

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const containerVariants = {
    hidden: {},
    show: {
      transition: { staggerChildren: 0.15 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -80 },
    show: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] },
    },
  };

  return (
    <motion.div
      className={`faq-container ${className}`}
      variants={containerVariants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "0px 0px -100px 0px" }}
      {...props}
    >
      {(faqs || []).map((faq, index) => {
        const isActive = activeIndex === index;

        return (
          <motion.div
            key={index}
            variants={itemVariants}
            className={`faq-item ${isActive ? "active" : ""}`}
            onClick={() => toggleFAQ(index)}
          >
            {/* QUESTION */}
            <div className="faq-question">
              <Typography variant="h5" overrideVariant={questionVariant}>
                {faq.question}
              </Typography>

              <span className={`faq-icon ${isActive ? "rotate" : ""}`}>
                <ChevronDown size={20} />
              </span>
            </div>

            {/* ANSWER */}
            <div className={`faq-answer-wrapper ${isActive ? "open" : ""}`}>
              <Typography
                variant="body-4"
                overrideVariant={answerVariant}
                className="faq-answer"
              >
                {faq.answer}
              </Typography>
            </div>
          </motion.div>
        );
      })}
    </motion.div>
  );
}
