import { ExternalLink, Github, Calendar } from "lucide-react"
import { readMarkdownFile } from "@/lib/markdown-parser"

export default function Projects() {
  const projectsContent = readMarkdownFile("projects.md")
  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-blue-900">
      <div className="max-w-6xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-6">
            {projectsContent.header?.title || "Our Projects"}
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            {projectsContent.header?.subtitle ||
              "A collection of projects I've worked on, showcasing different technologies and problem-solving approaches."}
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid lg:grid-cols-2 gap-8">
          {projectsContent.projects.map((project:any) => (
            <div key={project.id} className="bg-gray-800/50 rounded-lg border border-blue-500/20 hover:border-blue-500/40 transition-all duration-300 overflow-hidden group">
              {/* Project Image */}
              <div className="relative overflow-hidden">
                <img
                  src={project.image || "/placeholder.svg"}
                  alt={project.title}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              </div>

              {/* Project Content */}
              <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-xl font-bold text-white">{project.title}</h3>
                  <div className="flex items-center text-sm text-gray-400">
                    <Calendar className="h-4 w-4 mr-1" />
                    {project.date}
                  </div>
                </div>

                <p className="text-gray-300 mb-4 line-clamp-3">{project.description}</p>

                {/* Technologies */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.technologies.map((tech: string) => (
                    <span
                      key={tech}
                      className="px-3 py-1 bg-blue-600/20 text-blue-400 text-sm rounded-full border border-blue-500/30"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Project Links */}
                <div className="flex space-x-4">
                  <a
                    href={project.liveUrl}
                    className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Live Demo
                  </a>
                  <a
                    href={project.githubUrl}
                    className="flex items-center px-4 py-2 border border-blue-500 text-blue-400 rounded-lg hover:bg-blue-500/10 transition-colors"
                  >
                    <Github className="h-4 w-4 mr-2" />
                    Code
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center mt-16">
          <div className="bg-gray-800/50 p-8 rounded-lg border border-blue-500/20">
            <h2 className="text-2xl font-bold text-white mb-4">
              {projectsContent.cta_section?.title || "Interested in Working Together?"}
            </h2>
            <p className="text-gray-300 mb-6">
              {projectsContent.cta_section?.description ||
                "I'm always open to discussing new opportunities and interesting projects."}
            </p>
            <a
              href={projectsContent.cta_section?.button?.split(" | ")[1] || "/about"}
              className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
            >
              {projectsContent.cta_section?.button?.split(" | ")[0] || "Get in Touch"}
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
