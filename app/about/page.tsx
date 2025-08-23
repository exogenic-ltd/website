import { Calendar, MapPin, Mail, Github, Linkedin, ClipboardList, Users, PhoneCall, GraduationCap } from "lucide-react"
import { readMarkdownFile } from "@/lib/markdown-parser"

export default function About() {
  const aboutContent = readMarkdownFile("about.md")

  const skills = {
    frontend: aboutContent.skills?.frontend || [
      "React & Next.js",
      "TypeScript",
      "Tailwind CSS",
      "HTML5 & CSS3",
    ],
    backend: aboutContent.skills?.backend || ["Node.js", "Express.js", "PostgreSQL", "MongoDB"],
    tools: aboutContent.skills?.tools || ["Git & GitHub", "Docker", "AWS", "Vercel"],
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-blue-900">
      <div className="max-w-4xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-6">
            {aboutContent.header?.title || "About"}
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            {aboutContent.header?.subtitle ||
              "Passionate developer with a love for creating innovative solutions and beautiful user experiences."}
          </p>
        </div>

        {/* Profile Section */}
        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          <div>
            <div className="bg-gray-800/50 p-8 rounded-lg border border-blue-500/20">
              <h2 className="text-2xl font-bold text-white mb-6">Company Overview</h2>
              <div className="space-y-4 text-gray-300">
                {(aboutContent.content || "Default story content")
                  .split("\n\n")
                  .map((paragraph: string, index: number) => (
                    <p key={index}>{paragraph}</p>
                  ))}
              </div>
            </div>
          </div>

          <div className="space-y-6">
            {/* Contact Info */}
            <div className="bg-gray-800/50 p-6 rounded-lg border border-blue-500/20">
              <h3 className="text-xl font-semibold text-white mb-4">Get in Touch</h3>
              <div className="space-y-3">
                <div className="flex items-center text-gray-300">
                  <Mail className="h-5 w-5 text-blue-400 mr-3" />
                  <span>{aboutContent.contactInfo?.email || "hello@example.com"}</span>
                </div>
                {/* <div className="flex items-center text-gray-300">
                  <MapPin className="h-5 w-5 text-blue-400 mr-3" />
                  <span>{aboutContent.contactInfo?.location || "San Francisco, CA"}</span>
                </div>
                <div className="flex items-center text-gray-300">
                  <Calendar className="h-5 w-5 text-blue-400 mr-3" />
                  <span>{aboutContent.contactInfo?.status || "Available for new projects"}</span>
                </div> */}
              </div>
            </div>

            {/* Social Links */}
            <div className="bg-gray-800/50 p-6 rounded-lg border border-blue-500/20">
              <h3 className="text-xl font-semibold text-white mb-4">Connect With Us </h3>
              <div className="flex space-x-4">
                {/* <a
                  href={aboutContent.social_links?.github || "#"}
                  className="flex items-center justify-center w-12 h-12 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <Github className="h-6 w-6" />
                </a> */}
                <a
                  href={aboutContent.socialLinks?.linkedin || "#"}
                  className="flex items-center justify-center w-12 h-12 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <Linkedin className="h-6 w-6" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {aboutContent.team &&
          <div className="bg-gray-800/50 p-8 rounded-lg border border-blue-500/20">
            <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
              Our Team
            </h3>
            <h4 className="text-2xl font-bold text-blue-400 mb-6 flex items-center">
              <Users className="h-6 w-6 text-blue-400 mr-3" />
              Members
            </h4>
            <div className="space-y-4">
              {aboutContent.team.members?.map((member: any) => (
                <div key={member.id} className="border-l-2 grid border-blue-500/30 pl-4">
                  <div className="text-md text-white">{member.name}</div>
                  <div className="text-sm text-gray-400 p-2">{member.description}</div>
                  {member.email && <><div className="text-sm text-gray-300 flex p-2"><Mail className="text-sm" /><p className="pl-2">{member.email}</p></div></>}
                  {member.contactNo && <><div className="text-sm text-blue-400 flex p-2"><PhoneCall className="text-sm" /><p className="pl-2">{member.contactNo}</p></div></>}
                </div>
              ))}
            </div>
            <h4 className="text-2xl pt-8 font-bold text-blue-400 mb-6 flex items-center">
              <GraduationCap className="h-6 w-6 text-blue-400 mr-3" />
              AdvisoryBoard
            </h4>
            <div className="space-y-4">
              {aboutContent.team.advisoryBoard?.map((member: any) => (
                <div key={member.id} className="border-l-2 grid p-1 border-blue-500/30 pl-4">
                  <div className="text-lg font-semibold text-white">{member.name}</div>
                  {member.email && <><div className="text-sm text-gray-300 flex p-2"><Mail className="text-sm" /><p className="pl-2">{member.email}</p></div></>}
                  {member.contactNo && <><div className="text-sm text-blue-400 flex p-2"><PhoneCall className="text-sm" /><p className="pl-2">{member.contactNo}</p></div></>}
                  <div className="text-sm text-gray-400">{member.description}</div>
                </div>
              ))}
            </div>
            <h4 className="text-2xl font-bold pt-8 text-blue-400 mb-8 flex items-center">
              <ClipboardList className="h-6 w-6 text-blue-400 mr-4" />
              Partnerships
            </h4>
            <div className="grid md:grid-cols-2 gap-6">
              {aboutContent.partners?.map((partner: any) => (
                <div key={partner.id} className="bg-gray-700/30 p-6 rounded-lg border border-blue-500/10">
                  <h4 className="text-xl font-semibold text-white mb-2">{partner.name}</h4>
                  <p className="text-gray-300">{partner.description}</p>
                </div>
              ))}
            </div>
          </div>
        }
      </div>
    </div>
  )
}
