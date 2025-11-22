'use client'

import { motion } from 'framer-motion'

interface MorphingBlobProps {
  className?: string
  gradient?: string
  size?: number
}

export default function MorphingBlob({ 
  className = '', 
  gradient = 'from-blue-600 via-blue-500 to-blue-400',
  size = 400 
}: MorphingBlobProps) {
  return (
    <motion.div
      className={`absolute ${className} morphing-blob opacity-8 blur-3xl`}
      style={{
        width: size,
        height: size,
        background: `linear-gradient(135deg, rgba(37, 99, 235, 0.06), rgba(59, 130, 246, 0.05), rgba(96, 165, 250, 0.04), rgba(37, 99, 235, 0.03))`,
      }}
      animate={{
        scale: [1, 1.2, 1],
        rotate: [0, 90, 0],
      }}
      transition={{
        duration: 20,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
    />
  )
}

