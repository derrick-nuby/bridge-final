"use client"

import { useState, useEffect, useRef } from "react"

interface UseCameraOptions {
  width?: number
  height?: number
}

export function useCamera({ width = 1280, height = 720 }: UseCameraOptions = {}) {
  const videoRef = useRef<HTMLVideoElement | null>(null)
  const streamRef = useRef<MediaStream | null>(null)
  const [isActive, setIsActive] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          width: { ideal: width },
          height: { ideal: height },
        },
      })

      if (videoRef.current) {
        videoRef.current.srcObject = stream
      }

      streamRef.current = stream
      setIsActive(true)
      setError(null)

      return true
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to access camera")
      setIsActive(false)
      return false
    }
  }

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop())
      streamRef.current = null
    }

    if (videoRef.current) {
      videoRef.current.srcObject = null
    }

    setIsActive(false)
  }

  const captureFrame = () => {
    if (!videoRef.current || !isActive) return null

    const canvas = document.createElement("canvas")
    canvas.width = videoRef.current.videoWidth
    canvas.height = videoRef.current.videoHeight

    const ctx = canvas.getContext("2d")
    if (!ctx) return null

    ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height)

    return {
      dataUrl: canvas.toDataURL("image/jpeg"),
      width: canvas.width,
      height: canvas.height,
    }
  }

  useEffect(() => {
    return () => {
      stopCamera()
    }
  }, [])

  return {
    videoRef,
    isActive,
    error,
    startCamera,
    stopCamera,
    captureFrame,
  }
}

