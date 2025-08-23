"use client"

import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight, Play, Pause } from "lucide-react"
import { ParsedContent } from "@/lib/markdown-parser"

interface CarouselSlide {
  id: number
  title: string
  subtitle: string
  description: string
  image: string
  cta: {
    text: string
    href: string
  }
}

interface CarouselProps {
  slides: CarouselSlide[]
}

export default function Carousel({ slides }: ParsedContent) {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  
  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying) return

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [isAutoPlaying, slides.length])

  const goToSlide = (index: number) => {
    setCurrentSlide(index)
  }

  const goToPrevious = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
  }

  const goToNext = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length)
  }

  const toggleAutoPlay = () => {
    setIsAutoPlaying(!isAutoPlaying)
  }

  if (!slides || slides.length === 0) {
    return (
      <div className="w-full h-[70vh] min-h-[500px] bg-gray-800 rounded-lg flex items-center justify-center">
        <p className="text-white">No slides available</p>
      </div>
    )
  }

  return (
    <div className="relative w-full h-[70vh] min-h-[500px] overflow-hidden rounded-lg">
      {/* Slides */}
      <div className="relative w-full h-full">
        {slides.map((slide:any, id: number) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              id === currentSlide ? "opacity-100" : "opacity-0"
            }`}
          >
            {/* Background Image */}
            <div className="absolute inset-0">
              <img src={slide.image || "/placeholder.svg"} alt={slide.title} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent" />
            </div>

            {/* Content */}
            <div className="relative z-10 flex items-center h-full px-6 sm:px-12 lg:px-16">
              <div className="max-w-2xl">
                <p className="text-blue-400 font-medium text-lg mb-2">{slide.subtitle}</p>
                <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-4 leading-tight">
                  {slide.title}
                </h2>
                <p className="text-xl text-gray-200 mb-8 leading-relaxed">{slide.description}</p>
                <a
                  href={slide.ctaLink}
                  className="inline-flex items-center px-8 py-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors transform hover:scale-105"
                >
                  {slide.ctaText}
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={goToPrevious}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-3 bg-black/30 hover:bg-black/50 text-white rounded-full transition-colors backdrop-blur-sm"
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>

      <button
        onClick={goToNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-3 bg-black/30 hover:bg-black/50 text-white rounded-full transition-colors backdrop-blur-sm"
        aria-label="Next slide"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Slide Indicators */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex space-x-3">
        {slides.map((slide:any) => (
          <button
            key={slide.id}
            onClick={() => goToSlide(slide.id)}
            className={`w-3 h-3 rounded-full transition-colors ${
              slide.id === currentSlide ? "bg-blue-500" : "bg-white/50 hover:bg-white/70"
            }`}
            aria-label={`Go to slide ${slide.id + 1}`}
          />
        ))}
      </div>

      {/* Auto-play Control */}
      <button
        onClick={toggleAutoPlay}
        className="absolute top-4 right-4 z-20 p-2 bg-black/30 hover:bg-black/50 text-white rounded-full transition-colors backdrop-blur-sm"
        aria-label={isAutoPlaying ? "Pause slideshow" : "Play slideshow"}
      >
        {isAutoPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
      </button>

      {/* Progress Bar */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-black/30 z-20">
        <div
          className="h-full bg-blue-500 transition-all duration-300 ease-out"
          style={{ width: `${((currentSlide + 1) / slides.length) * 100}%` }}
        />
      </div>
    </div>
  )
}
