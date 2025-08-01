"use client"

interface LogoGeometricProps {
  size?: "sm" | "md" | "lg"
  showText?: boolean
  className?: string
}

const sizeClasses = {
  sm: "w-6 h-6",
  md: "w-9 h-8",
  lg: "w-10 h-10",
}

const textSizeClasses = {
  sm: "text-lg",
  md: "text-xl",
  lg: "text-2xl",
}

export default function LogoGeometric({ size = "md", showText = true, className = "" }: LogoGeometricProps) {
  return (
    <div className={`flex items-center space-x-3 ${className}`}>
      {/* Geometric Logo */}
      <div className="relative">
        <img src="/logo.png" className={`${sizeClasses[size]}`} alt="Portfolio Logo" />
        {/* Glow effect */}
        <div className={`absolute inset-0 ${sizeClasses[size]} bg-blue-400/20 rounded-full blur-sm -z-10`}></div>
      </div>

      {/* Logo Text */}
      {showText && (
        <span className={`font-bold text-blue-400 hover:text-blue-300 transition-colors ${textSizeClasses[size]}`}>
          Exogenic <small>Pvt Ltd</small>
        </span>
      )}
    </div>
  )
}
