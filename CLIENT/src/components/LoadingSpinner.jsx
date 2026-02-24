"use client"

import { motion } from "framer-motion"

export default function LoadingSpinner({text}) {
  return (
    <motion.div className="m-40 flex flex-col items-center justify-center" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <motion.div
        className="w-12 h-12 border-4 border-[var(--primary)]/30 border-t-[var(--primary)] rounded-full"
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
      />
      <p className="mt-5">{text}</p>
    </motion.div>
  )
}
