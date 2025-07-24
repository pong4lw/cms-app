// components/ui/MotionWrapper.tsx
import { motion } from "framer-motion"
import { PropsWithChildren } from "react"

export default function MotionWrapper({ children }: PropsWithChildren) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
    >
      {children}
    </motion.div>
  )
}
