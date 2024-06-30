"use client";

import { motion } from "framer-motion";

export default function Transition({
  children,
  delay
}: {
  children: React.ReactNode;
  delay:number;
}) {
  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ ease: "easeInOut", duration: 0.75 , delay: delay}}
    >
      {children}
    </motion.div>
  );
}
