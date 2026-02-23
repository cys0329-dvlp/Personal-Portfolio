import { motion } from "motion/react";
import { ReactNode } from "react";

const animations = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -10 },
};

export default function AnimatedPage({ children, className = "" }: { children: ReactNode, className?: string }) {
  return (
    <motion.div
      variants={animations}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 0.4, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
