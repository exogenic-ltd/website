"use client"

import { useState } from "react"
import { User } from "lucide-react"

interface ProfilePhotoProps {
  src?: string
  alt: string
  size?: "sm" | "md" | "lg" | "xl"
  className?: string
}

const sizeClasses = {
  sm: "w-24 h-24",
  md: "w-32 h-32",
  lg: "w-48 h-48",
  xl: "w-64 h-64",
}

export default function ProfilePhoto({ src, alt, size = "lg", className = "" }: ProfilePhotoProps) {
  const [imageError, setImageError] = useState(false)
  const [imageLoading, setImageLoading] = useState(true)

  const handleImageError = () => {
    setImageError(true)
    setImageLoading(false)
  }

  const handleImageLoad = () => {
    setImageLoading(false)
  }

  return (
    <div className={`relative ${sizeClasses[size]} mx-auto ${className}`}>
      {/* Loading placeholder */}
      {imageLoading && (
        <div className="absolute inset-0 rounded-full bg-gray-700 animate-pulse flex items-center justify-center">
          <User className="w-1/3 h-1/3 text-gray-500" />
        </div>
      )}

      {/* Error fallback */}
      {imageError && (
        <div className="w-full h-full rounded-full bg-gradient-to-br from-gray-700 to-gray-800 border-4 border-blue-500/30 flex items-center justify-center">
          <User className="w-1/3 h-1/3 text-gray-400" />
        </div>
      )}

      {/* Actual image */}
      {src && !imageError && (
        <img
          src={src || "/placeholder.svg"}
          alt={alt}
          className={`w-full h-full object-cover rounded-full border-4 border-blue-500/30 shadow-2xl transition-opacity duration-300 ${
            imageLoading ? "opacity-0" : "opacity-100"
          }`}
          onError={handleImageError}
          onLoad={handleImageLoad}
        />
      )}

      {/* Gradient overlay */}
      <div className="absolute inset-0 rounded-full bg-gradient-to-t from-black/20 to-transparent"></div>

      {/* Glow effect */}
      <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-blue-600/20 to-blue-400/20 blur-sm -z-10"></div>
    </div>
  )
}
