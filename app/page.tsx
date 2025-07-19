import { ArrowRight, Code, Palette, Zap } from "lucide-react"
import Link from "next/link"
import Carousel from "@/components/carousel"
import { readMarkdownFile } from "@/lib/markdown-parser"

export default function Home() {
  const homeContent = readMarkdownFile("home.md")
  const carouselSlides = readMarkdownFile("carousel.md")

  // Fallback content
  const headerContent = homeContent.header || {}
  const featuresContent = homeContent.features_section || {}
  const ctaContent = homeContent.cta_section || {}
  const features = [
    {
      icon: Code,
      title: featuresContent.feature_1_title || "Clean Code",
      description:
        featuresContent.feature_1_description ||
        "Writing maintainable, scalable, and efficient code that stands the test of time.",
    },
    {
      icon: Palette,
      title: featuresContent.feature_2_title || "Design Focus",
      description:
        featuresContent.feature_2_description ||
        "Creating beautiful, intuitive interfaces that provide exceptional user experiences.",
    },
    {
      icon: Zap,
      title: featuresContent.feature_3_title || "Performance",
      description:
        featuresContent.feature_3_description ||
        "Optimizing applications for speed, accessibility, and seamless user interactions.",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-blue-900">
      {/* Hero Carousel */}
      <section className="relative px-4 py-8 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <Carousel slides={carouselSlides} />
        </div>
      </section>

      {/* Features Section */}
      <section className="px-4 py-16 sm:px-6 lg:px-8 mt-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-white mb-12">
            {featuresContent.title || "What I Bring to the Table"}
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const IconComponent = feature.icon
              return (
                <div
                  key={index}
                  className="bg-gray-800/50 p-6 rounded-lg border border-blue-500/20 hover:border-blue-500/40 transition-colors"
                >
                  <IconComponent className="h-12 w-12 text-blue-400 mb-4" />
                  <h3 className="text-xl font-semibold text-white mb-3">{feature.title}</h3>
                  <p className="text-gray-300">{feature.description}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-6">{ctaContent.title || "Ready to Start a Project?"}</h2>
          <p className="text-xl text-gray-300 mb-8">
            {ctaContent.description || "Let's collaborate and bring your ideas to life."}
          </p>
          <Link
            href={ctaContent.button?.split(" | ")[1] || "/blog"}
            className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-medium rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all transform hover:scale-105"
          >
            {ctaContent.button?.split(" | ")[0] || "Read My Blog"}
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </div>
      </section>
    </div>
  )
}
