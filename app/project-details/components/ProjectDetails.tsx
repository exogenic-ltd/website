import { readMarkdownFile } from "@/lib/markdown-parser"
import {
  Zap, 
  MapPin, 
  Lightbulb, 
  FlaskConical, 
  Hand, 
  DollarSign, 
  Rocket, 
  Users, 
  ClipboardList, 
  Target, 
  Wrench,
  Calendar, 
} from "lucide-react"

export default function ProjectDetails(projectName: any) {
  const project = readMarkdownFile(`/projects/${projectName.projectName}.md`);
  
  if (!project) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8 text-white text-center">
        <h1 className="text-4xl font-bold mb-4">Project Not Found</h1>
        <p className="text-xl text-gray-400">Could not load details for project: {projectName.projectName}</p>
      </div>
    );
  }

  return (
    <div>
      <div className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">{project.title}</h1>
          {project.overview?.tagline && (
            <p className="text-xl text-blue-400 max-w-3xl mx-auto mb-8">{project.overview.tagline}</p>
          )}
        </div>

        {/* Technical Specifications Section */}
        {project.technicalSpecifications && (
          <div className="bg-gray-800/50 p-8 rounded-lg border border-blue-500/20 mb-12">
            <h2 className="text-3xl font-bold text-white mb-8 flex items-center">
              <ClipboardList className="h-8 w-8 text-blue-400 mr-4" />
              Technical Specifications
            </h2>
            {project.technicalSpecifications.map((specGroup: any, groupIndex: number) => (
              <div key={groupIndex} className="mb-8 last:mb-0">
                {specGroup.heading && (
                  <h3 className="text-2xl font-semibold text-blue-400 mb-4">{specGroup.heading}</h3>
                )}
                <div className="grid md:grid-cols-2 gap-6">
                  {specGroup.features?.map((feature: any, featureIndex: number) => (
                    <div key={featureIndex} className="bg-gray-700/30 p-6 rounded-lg border border-blue-500/10">
                      <h4 className="text-xl font-semibold text-white mb-2">{feature.name}</h4>
                      <p className="text-gray-300">{feature.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Key Features Section */}
        {project.keyFeatures && (
          <div className="bg-gray-800/50 p-8 rounded-lg border border-blue-500/20 mb-12">
            <h2 className="text-3xl font-bold text-white mb-8 flex items-center">
              <Lightbulb className="h-8 w-8 text-blue-400 mr-4" />
              Key Features
            </h2>
            {project.keyFeatures.tagline && (
              <p className="text-xl text-gray-300 text-center mb-8">{project.keyFeatures.tagline}</p>
            )}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {project.keyFeatures.features?.map((feature: any, index: number) => (
                <div key={index} className="bg-gray-700/30 p-6 rounded-lg border border-blue-500/10 text-center">
                  {/* You can map icons here based on feature.icon or feature.name */}
                  {feature.icon === '🎯' && <Target className="h-8 w-8 text-blue-400 mx-auto mb-3" />}
                  {feature.icon === '💪' && <Hand className="h-8 w-8 text-blue-400 mx-auto mb-3" />}
                  {feature.icon === '🔧' && <Wrench className="h-8 w-8 text-blue-400 mx-auto mb-3" />}
                  {feature.icon === '⚡' && <Zap className="h-8 w-8 text-blue-400 mx-auto mb-3" />}
                  {feature.icon === '🌍' && <MapPin className="h-8 w-8 text-blue-400 mx-auto mb-3" />}
                  <h3 className="text-xl font-semibold text-white mb-2">{feature.name}</h3>
                  <p className="text-gray-300">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Development Status Section */}
        {project.developmentStatus && (
          <div className="bg-gray-800/50 p-8 rounded-lg border border-blue-500/20 mb-12">
            <h2 className="text-3xl font-bold text-white mb-8 flex items-center">
              <FlaskConical className="h-8 w-8 text-blue-400 mr-4" />
              Development Status
            </h2>
            {project.developmentStatus.tagline && (
              <h3 className="text-2xl font-semibold text-blue-400 mb-4">{project.developmentStatus.tagline}</h3>
            )}
            <div className="space-y-8">
              {project.developmentStatus.milestones?.map((milestone: any, index: number) => (
                <div key={index} className="border-l-4 border-blue-500 pl-6 py-2">
                  <div className="flex items-center text-blue-400 mb-2">
                    <Calendar className="h-5 w-5 mr-2" />
                    <span className="text-lg font-semibold">{milestone.year}:</span>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">{milestone.status}</h3>
                  <ul className="list-disc list-inside text-gray-300 space-y-1">
                    {milestone.details?.map((detail: string, detailIndex: number) => (
                      <li key={detailIndex}>{detail}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Pricing & Availability Section */}
        {project.pricingAndAvailability && (
          <div className="bg-gray-800/50 p-8 rounded-lg border border-blue-500/20 mb-12">
            <h2 className="text-3xl font-bold text-white mb-8 flex items-center">
              <DollarSign className="h-8 w-8 text-blue-400 mr-4" />
              Pricing & Availability
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-2xl font-semibold text-blue-400 mb-4">Accessible Pricing</h3>
                {project.pricingAndAvailability.accessiblePricing && (
                  <>
                    <p className="text-white text-xl mb-2">
                      <span className="font-bold">{project.pricingAndAvailability.accessiblePricing.product}:</span>{" "}
                      {project.pricingAndAvailability.accessiblePricing.price}
                    </p>
                    <ul className="list-disc list-inside text-gray-300 space-y-1">
                      {project.pricingAndAvailability.accessiblePricing.advantages?.map((advantage: string, index: number) => (
                        <li key={index}>{advantage}</li>
                      ))}
                    </ul>
                  </>
                )}
              </div>
              <div>
                <h3 className="text-2xl font-semibold text-blue-400 mb-4">Compare with Alternatives</h3>
                {project.pricingAndAvailability.compareWithAlternatives?.map((alt: any, index: number) => (
                  <p key={index} className="text-gray-300 mb-2">
                    <span className="font-semibold">{alt.name}:</span> {alt.price}
                  </p>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Impact Goals Section */}
        {project.impactGoals && (
          <div className="bg-gray-800/50 p-8 rounded-lg border border-blue-500/20 mb-12">
            <h2 className="text-3xl font-bold text-white mb-8 flex items-center">
              <Rocket className="h-8 w-8 text-blue-400 mr-4" />
              Impact Goals
            </h2>
            {project.impactGoals.tagline && (
              <h3 className="text-xl font-semibold text-blue-400 mb-4">{project.impactGoals.subheading}</h3>
            )}
            <ul className="list-disc list-inside text-gray-300 space-y-2 text-lg">
              {project.impactGoals.goals?.map((aim: string, index: number) => (
                <li key={index}>{aim}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Get Involved Section */}
        {project.getInvolved && (
          <div className="bg-gray-800/50 p-8 rounded-lg border border-blue-500/20 text-center">
            <h2 className="text-3xl font-bold text-white mb-6">
              <Users className="h-8 w-8 text-blue-400 mx-auto mb-4" />
              {project.getInvolved.tagline}
            </h2>
            <p className="text-xl text-gray-300 mb-8">{project.getInvolved.callToAction}</p>
            {/* Add contact form or specific links if available in the Markdown project in the future */}
          </div>
        )}

      </div>
    </div>
  )
}