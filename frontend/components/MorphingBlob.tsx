'use client'

import { motion } from 'framer-motion'

interface MorphingBlobProps {
  className?: string
  gradient?: string
  size?: number
}

export default function MorphingBlob({ 
  className = '', 
  gradient = 'from-purple-500 via-pink-500 to-cyan-500',
  size = 400 
}: MorphingBlobProps) {
  return (
    <motion.div
      className={`absolute ${className} morphing-blob opacity-20 blur-3xl`}
      style={{
        width: size,
        height: size,
        background: `linear-gradient(135deg, rgba(255, 255, 255, 0.1), rgba(224, 231, 255, 0.08), rgba(196, 181, 253, 0.06))`,
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

