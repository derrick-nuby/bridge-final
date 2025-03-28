"use client"

import { motion } from "framer-motion"

interface FaceOverlayBoxProps {
  face: {
    id: number
    name: string
    confidence: number
    box: {
      x: number
      y: number
      width: number
      height: number
    }
  }
}

export function FaceOverlayBox({ face }: FaceOverlayBoxProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      transition={{ duration: 0.3 }}
      className="absolute pointer-events-none"
      style={{
        left: `${face.box.x}px`,
        top: `${face.box.y}px`,
        width: `${face.box.width}px`,
        height: `${face.box.height}px`,
      }}
    >
      <div className="w-full h-full border-2 border-green-500 rounded-md" />
      <div className="absolute -bottom-8 left-0 right-0 bg-green-500 text-white text-xs py-1 px-2 rounded-md text-center">
        {face.name} ({(face.confidence * 100).toFixed(1)}%)
      </div>
    </motion.div>
  )
}

