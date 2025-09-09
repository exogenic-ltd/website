"use client"

import { Linkedin, Facebook, Instagram, ArrowUp } from "lucide-react"

const socialLinks = [
  { name: "LinkedIn", href: "https://www.linkedin.com/company/exogenic", icon: Linkedin },
  { name: "Facebook", href: "https://www.facebook.com/share/15QLLKgf41/", icon: Facebook },
  { name: "Instagram", href: "https://www.instagram.com/exogenic", icon: Instagram }
]

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <footer className="bg-gray-900 border-t border-blue-500/20">
      <div className="max-w-7xl mx-auto px-4 py-5 sm:px-6 lg:px-8">
        {/* Divider */}
          <div className="flex flex-col md:flex-row justify-between items-center">
            {/* Copyright */}
            <div className="text-gray-400 text-sm mb-4 md:mb-0">
              <p>&copy; {new Date().getFullYear()} EXOGENIC Pvt Ltd.</p>
            </div>

            {/* Social Links */}
            <div className="flex items-center space-x-4 mb-4 md:mb-0">
              {socialLinks.map((item) => {
                const IconComponent = item.icon
                return (
                  <a
                    key={item.name}
                    href={item.href}
                    className="text-gray-400 hover:text-blue-400 transition-colors"
                    aria-label={item.name}
                  >
                    <IconComponent className="h-5 w-5" />
                  </a>
                )
              })}
            </div>

            {/* Back to Top */}
            <button
              onClick={scrollToTop}
              className="flex items-center text-gray-400 hover:text-blue-400 transition-colors text-sm group"
              aria-label="Back to top"
            >
              <span className="mr-2">Back to top</span>
              <ArrowUp className="h-4 w-4 group-hover:-translate-y-1 transition-transform" />
            </button>
          </div>
        </div>

        {/* Additional Info */}
        {/* <div className="mt-8 pt-8 border-t border-gray-800">
          <div className="text-center">
            <p className="text-gray-500 text-xs">
              Built with ❤️ using Next.js, TypeScript, and Tailwind CSS. Deployed on AWS.
            </p>
          </div>
        </div> */}
    </footer>
  )
}
