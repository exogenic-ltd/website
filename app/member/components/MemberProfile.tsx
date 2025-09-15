import { readMarkdownFile } from "@/lib/markdown-parser"
import {
  Mail,
  ExternalLink,
  GraduationCap,
  Briefcase,
  Award,
  BookOpen,
  Users,
  Globe,
  Calendar,
  Building,
  FileText,
  TrendingUp,
  Star,
  Settings,
  Lightbulb,
  Presentation,
  Projector,
} from "lucide-react"
import ProfilePhoto from "./ProfilePhoto";


export default function MemberProfile(profileName: any) {
  const profile = readMarkdownFile(`/team-members/${profileName.profileName}.md`);

  if (!profile) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8 text-white text-center">
        <h1 className="text-4xl font-bold mb-4">Project Not Found</h1>
        <p className="text-xl text-gray-400">Could not load details for project: {profileName.profileName}</p>
      </div>
    );
  }


  return (
    <div>
      <div className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="text-center mb-16">
          {/* Profile Photo */}
          {
            profile.profileImageUrl &&
            <div className="mb-8">
              <ProfilePhoto src={profile.profileImageUrl || "/placeholder.svg"} alt={profile.fullName} size="xl" className="mb-6" />
            </div>
          }
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">{profile.title}</h1>
          <h2 className="text-2xl text-blue-400 mb-6">{profile.fullName}</h2>
          {/* Contact Links */}
          {profile.contact?.affiliation &&
            <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">{profile.contact?.affiliation}</p>
          }
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            {profile.contact &&
              <a
                href={`mailto:${profile.contact.email}`}
                className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Mail className="h-4 w-4 mr-2" />
                Email
              </a>
            }
            {profile.contact?.links?.map((link: any, index: number) => (
              <div key={index} className="border-l-2 border-blue-500/30 pl-4">
                <a
                  href={`${link.url}`}
                  className="flex items-center px-4 py-2 border border-blue-500 text-blue-400 rounded-lg hover:bg-blue-500/10 transition-colors"
                >
                  <ExternalLink className="h-4 w-4 mr-2" />
                  {link.name}
                </a>
              </div>
            ))}
          </div>
        </div>

        {/* Research Metrics */}
        <div className="grid md:grid-cols-4 gap-6 mb-16">
          {profile.researchOutputs &&
            <><div className="bg-gray-800/50 p-6 rounded-lg border border-blue-500/20 text-center">
              <TrendingUp className="h-8 w-8 text-blue-400 mx-auto mb-3" />
              <div className="text-3xl font-bold text-white mb-1">{profile.researchOutputs.googleScholar.citations}</div>
              <div className="text-gray-300">Citations</div>
            </div><div className="bg-gray-800/50 p-6 rounded-lg border border-blue-500/20 text-center">
                <Star className="h-8 w-8 text-blue-400 mx-auto mb-3" />
                <div className="text-3xl font-bold text-white mb-1">{profile.researchOutputs.googleScholar.hIndex}</div>
                <div className="text-gray-300">H-Index</div>
              </div></>
          }
          {
            profile.researchOutputs &&
            <div className="bg-gray-800/50 p-6 rounded-lg border border-blue-500/20 text-center">
              <FileText className="h-8 w-8 text-blue-400 mx-auto mb-3" />
              <div className="text-3xl font-bold text-white mb-1">
                {profile.researchOutputs.publications.journalPapers}
              </div>
              <div className="text-gray-300">Journal Papers</div>
            </div>
          }
          {
            profile.supervisionAndEvaluation &&
            <div className="bg-gray-800/50 p-6 rounded-lg border border-blue-500/20 text-center">
              <Users className="h-8 w-8 text-blue-400 mx-auto mb-3" />
              <div className="text-3xl font-bold text-white mb-1">
                {profile.supervisionAndEvaluation.completedSupervisions.phd}
              </div>
              <div className="text-gray-300">PhD Supervised</div>
            </div>
          }
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          <div className="space-y-8">
            {/* Academic Qualifications */}
            {profile.academicQualifications &&
              <div className="bg-gray-800/50 p-8 rounded-lg border border-blue-500/20">
                <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
                  <GraduationCap className="h-6 w-6 text-blue-400 mr-3" />
                  Academic Qualifications
                </h3>
                <div className="space-y-4">
                  {profile.academicQualifications.map((qual: any, index: number) => (
                    <div key={index} className="border-l-2 border-blue-500/30 pl-4">
                      <div className="text-lg font-semibold text-white">{qual.degree}</div>
                      <div className="text-blue-400">{qual.field}</div>
                      <div className="text-gray-300">{qual.university}</div>
                      <div className="text-blue-400">{qual.institution}</div>
                      <div className="text-sm text-gray-400">{qual.years}</div>
                      {qual.level && <div className="text-sm text-gray-400">{qual.level}</div>}
                    </div>
                  ))}
                </div>
              </div>
            }

            {/* Research Interests */}
            {profile.researchInterests &&
              <div className="bg-gray-800/50 p-8 rounded-lg border border-blue-500/20">
                <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
                  <BookOpen className="h-6 w-6 text-blue-400 mr-3" />
                  Research Interests
                </h3>
                <div className="flex flex-wrap gap-3">
                  {profile.researchInterests?.map((interest: string, index: number) => (
                    <span
                      key={index}
                      className="px-4 py-2 bg-blue-600/20 text-blue-400 rounded-full border border-blue-500/30"
                    >
                      {interest}
                    </span>
                  ))}
                </div>
              </div>
            }

            {/* Projects and Research */}
            {profile.projectsAndResearch &&
              <div className="bg-gray-800/50 p-8 rounded-lg border border-blue-500/20">
                <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
                  <Lightbulb className="h-6 w-6 text-blue-400 mr-3" />
                  Projects & Research
                </h3>
                <div className="space-y-6">
                  {profile.projectsAndResearch.map((project: any, index: number) => (
                    <div key={index} className="border-l-2 border-blue-500/30 pl-4">
                      <div className="text-lg font-semibold text-white mb-2">{project.title}</div>
                      <div className="text-blue-400 mb-1">{project.institution}</div>
                      <div className="text-sm text-gray-400 mb-3">{project.years || project.year}</div>
                      <ul className="space-y-1">
                        {project.details?.map((detail: string, index: number) => (
                          <li key={index} className="text-gray-300 text-sm flex items-start">
                            <div className="w-1.5 h-1.5 bg-blue-400 rounded-full mr-2 mt-2 flex-shrink-0"></div>
                            {detail}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            }

            {/* Awards */}
            {
              profile.awards &&
              <div className="bg-gray-800/50 p-8 rounded-lg border border-blue-500/20">
                <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
                  <Award className="h-6 w-6 text-blue-400 mr-3" />
                  Awards & Recognition
                </h3>
                <div className="space-y-4">
                  {profile.awards.map((award: any, index: number) => (
                    <div key={index} className="border-l-2 border-blue-500/30 pl-4">
                      <div className="text-lg font-semibold text-white">{award.name}</div>
                      {award.details && <div className="text-gray-300">{award.details}</div>}
                      {award.institution && <div className="text-blue-400">{award.institution}</div>}
                      <div className="text-sm text-gray-400">{award.years}</div>
                    </div>
                  ))}
                </div>
              </div>
            }

            {/* Research Collaborations */}
            {
              profile.researchCollaborations &&
              <div className="bg-gray-800/50 p-8 rounded-lg border border-blue-500/20">
                <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
                  <Globe className="h-6 w-6 text-blue-400 mr-3" />
                  Research Collaborations
                </h3>
                <div className="space-y-2">
                  {profile.researchCollaborations.map((collaboration: string, index: number) => (
                    <div key={index} className="text-gray-300 flex items-center">
                      <div className="w-2 h-2 bg-blue-400 rounded-full mr-3"></div>
                      {collaboration}
                    </div>
                  ))}
                </div>
              </div>
            }

            {profile.extracurriculars &&
              <div className="bg-gray-800/50 p-8 rounded-lg border border-blue-500/20">
                <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
                  <Projector className="h-6 w-6 text-blue-400 mr-3" />
                  Extra Curriculars
                </h3>
                <div className="space-y-2">
                  {profile.extracurriculars?.map((collaboration: string, index: number) => (
                    <div key={index} className="text-gray-300 flex items-center">
                      <div className="w-2 h-2 bg-blue-400 rounded-full mr-3"></div>
                      {collaboration}
                    </div>
                  ))}
                </div>
              </div>
            }

          </div>

          {/* Right Column */}
          <div className="space-y-8">
            {/* Career Progression */}
            {profile.careerProgression &&
              <div className="bg-gray-800/50 p-8 rounded-lg border border-blue-500/20">
                <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
                  <Briefcase className="h-6 w-6 text-blue-400 mr-3" />
                  Career Progression
                </h3>
                <div className="space-y-4 max-h-96 overflow-y-auto">
                  {profile.careerProgression?.map((position: any, index: number) => (
                    <div key={index} className="border-l-2 border-blue-500/30 pl-4">
                      <div className="text-lg font-semibold text-white">{position.role}</div>
                      {position.department && <div className="text-blue-400">{position.department}</div>}
                      {position.institution && <div className="text-gray-300">{position.institution}</div>}
                      <div className="text-sm text-gray-400">{position.years}</div>
                    </div>
                  ))}
                </div>
              </div>
            }

            {profile.skillsAndCertifications &&
              <>
                {/* Skills & Certifications */}
                <div className="bg-gray-800/50 p-8 rounded-lg border border-blue-500/20">
                  <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
                    <Settings className="h-6 w-6 text-blue-400 mr-3" />
                    Skills & Certifications
                  </h3>
                  <div className="space-y-6">
                    {profile.skillsAndCertifications.languages &&
                      <div>
                        <h4 className="text-lg font-semibold text-blue-400 mb-3">Programming Languages</h4>
                        <div className="flex flex-wrap gap-2">
                          {profile.skillsAndCertifications.languages.map((lang: string, index: number) => (
                            <span
                              key={index}
                              className="px-3 py-1 bg-blue-600/20 text-blue-400 text-sm rounded-full border border-blue-500/30"
                            >
                              {lang}
                            </span>
                          ))}
                        </div>
                      </div>
                    }
                    {profile.skillsAndCertifications.designAndSimulation &&
                      <div>
                        <h4 className="text-lg font-semibold text-blue-400 mb-3">Research & Simulation</h4>
                        <div className="flex flex-wrap gap-2">
                          {profile.skillsAndCertifications.designAndSimulation?.map((skill: string, index: number) => (
                            <span
                              key={index}
                              className="px-3 py-1 bg-green-600/20 text-green-400 text-sm rounded-full border border-green-500/30"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                    }
                    {profile.skillsAndCertifications.other &&
                      <div>
                        <h4 className="text-lg font-semibold text-blue-400 mb-3">Other</h4>
                        <div className="flex flex-wrap gap-2">
                          {profile.skillsAndCertifications.other?.map((skill: string, index: number) => (
                            <span
                              key={index}
                              className="px-3 py-1 bg-purple-600/20 text-purple-400 text-sm rounded-full border border-purple-500/30"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                    }
                    {profile.skillsAndCertifications.analysisTools &&
                      <div>
                        <h4 className="text-lg font-semibold text-blue-400 mb-3">Analysis Tools</h4>
                        <div className="flex flex-wrap gap-2">
                          {profile.skillsAndCertifications.analysisTools?.map((tool: string, index: number) => (
                            <span
                              key={index}
                              className="px-3 py-1 bg-orange-600/20 text-orange-400 text-sm rounded-full border border-orange-500/30"
                            >
                              {tool}
                            </span>
                          ))}
                        </div>
                      </div>
                    }
                    {profile.skillsAndCertifications.communication &&
                      <div>
                        <h4 className="text-lg font-semibold text-blue-400 mb-3">Communication</h4>
                        <div className="flex flex-wrap gap-2">
                          {profile.skillsAndCertifications.communication?.map((cert: string, index: number) => (
                            <span
                              key={index}
                              className="px-3 py-1 bg-yellow-600/20 text-yellow-400 text-sm rounded-full border border-yellow-500/30"
                            >
                              {cert}
                            </span>
                          ))}
                        </div>
                      </div>
                    }
                  </div>
                </div>
              </>
            }

            {/* Conference Participation */}
            {profile.conferences &&
              <div className="bg-gray-800/50 p-8 rounded-lg border border-blue-500/20">
                <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
                  <Presentation className="h-6 w-6 text-blue-400 mr-3" />
                  Conference Participation
                </h3>
                <div className="space-y-4">
                  {profile.conferences.map((conf: any, index: number) => (
                    <div key={index} className="border-l-2 border-blue-500/30 pl-4">
                      <div className="text-lg font-semibold text-white">{conf?.name}</div>
                      <div className="text-blue-400">{conf?.institution}</div>
                      <div className="text-sm text-gray-400 mb-2">{conf?.year}</div>
                      <ul className="space-y-1">
                        {conf.details?.map((detail: string, index: number) => (
                          <li key={index} className="text-gray-300 text-sm flex items-start">
                            <div className="w-1.5 h-1.5 bg-blue-400 rounded-full mr-2 mt-2 flex-shrink-0"></div>
                            {detail}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            }

            {/* Research Outputs */}
            {profile.researchOutputs &&
              <div className="bg-gray-800/50 p-8 rounded-lg border border-blue-500/20">
                <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
                  <FileText className="h-6 w-6 text-blue-400 mr-3" />
                  Research Outputs
                </h3>
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-400">
                      {profile.researchOutputs.publications.conferencePapers}
                    </div>
                    <div className="text-sm text-gray-300">Conference Papers</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-400">
                      {profile.researchOutputs.publications.bookChapters}
                    </div>
                    <div className="text-sm text-gray-300">Book Chapters</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-400">{profile.researchOutputs.patents.granted}</div>
                    <div className="text-sm text-gray-300">Patents Granted</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-400">{profile.researchOutputs.patents.pending}</div>
                    <div className="text-sm text-gray-300">Patents Pending</div>
                  </div>
                </div>
              </div>
            }

            {/* Research Grants */}
            {profile.researchGrants &&
              <div className="bg-gray-800/50 p-8 rounded-lg border border-blue-500/20">
                <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
                  <Building className="h-6 w-6 text-blue-400 mr-3" />
                  Research Grants
                </h3>
                <div className="space-y-4">
                  <div>
                    <div className="text-lg font-semibold text-white">International</div>
                    <div className="text-blue-400 font-medium">{profile.researchGrants.international.amount}</div>
                    <div className="text-gray-300 text-sm">{profile.researchGrants.international.details}</div>
                  </div>
                  <div>
                    <div className="text-lg font-semibold text-white">National</div>
                    <div className="text-blue-400 font-medium">{profile.researchGrants.national.amount}</div>
                    <div className="text-gray-300 text-sm">{profile.researchGrants.national.details}</div>
                  </div>
                  <div>
                    <div className="text-lg font-semibold text-white">University Level</div>
                    <div className="text-gray-300 text-sm">{profile.researchGrants.universityLevel.details}</div>
                  </div>
                </div>
              </div>
            }

            {/* Keynotes and Speeches */}
            {profile.keynotesAndSpeeches &&
              <div className="bg-gray-800/50 p-8 rounded-lg border border-blue-500/20">
                <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
                  <Calendar className="h-6 w-6 text-blue-400 mr-3" />
                  Keynotes & Speeches
                </h3>
                <div className="text-center mb-4">
                  <div className="text-3xl font-bold text-blue-400">{profile.keynotesAndSpeeches.total}</div>
                  <div className="text-gray-300">Total Presentations ({profile.keynotesAndSpeeches.years})</div>
                </div>
                <div className="space-y-2">
                  <div className="text-sm font-semibold text-white mb-2">Highlights:</div>
                  {profile.keynotesAndSpeeches.highlights.map((highlight: string, index: number) => (
                    <div key={index} className="text-gray-300 text-sm flex items-center">
                      <div className="w-1.5 h-1.5 bg-blue-400 rounded-full mr-2"></div>
                      {highlight}
                    </div>
                  ))}
                </div>
              </div>
            }
          </div>
        </div>

        {/* Full Width Sections */}

        <div className="mt-16 space-y-8">
          {/* Supervision and Evaluation */}

          {profile.supervisionAndEvaluation &&
            <div className="bg-gray-800/50 p-8 rounded-lg border border-blue-500/20">
              <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
                <Users className="h-6 w-6 text-blue-400 mr-3" />
                Supervision & Evaluation
              </h3>
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h4 className="text-lg font-semibold text-blue-400 mb-4">Completed Supervisions</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-white">
                        {profile.supervisionAndEvaluation.completedSupervisions.phd}
                      </div>
                      <div className="text-sm text-gray-300">PhD</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-white">
                        {profile.supervisionAndEvaluation.completedSupervisions.mphil}
                      </div>
                      <div className="text-sm text-gray-300">MPhil</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-white">
                        {profile.supervisionAndEvaluation.completedSupervisions.msc}
                      </div>
                      <div className="text-sm text-gray-300">MSc</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-white">
                        {profile.supervisionAndEvaluation.completedSupervisions.undergraduate}
                      </div>
                      <div className="text-sm text-gray-300">Undergraduate</div>
                    </div>
                  </div>
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-blue-400 mb-4">Ongoing Projects</h4>
                  <div className="space-y-2">
                    {profile.supervisionAndEvaluation.ongoingProjects.map((project: string, index: any) => (
                      <div key={index} className="text-gray-300 flex items-center">
                        <div className="w-2 h-2 bg-blue-400 rounded-full mr-3"></div>
                        {project}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          }


          {/* Editorial and Review Activities */}
          {profile.editorialAndReviewActivities &&
            <div className="bg-gray-800/50 p-8 rounded-lg border border-blue-500/20">
              <h3 className="text-2xl font-bold text-white mb-6">Editorial & Review Activities</h3>
              <div className="grid md:grid-cols-3 gap-8">
                <div>
                  <h4 className="text-lg font-semibold text-blue-400 mb-4">Editorial Boards</h4>
                  <div className="space-y-2">
                    {profile.editorialAndReviewActivities.editorialBoards.map((board: string, index: number) => (
                      <div key={index} className="text-gray-300 text-sm">
                        {board}
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-blue-400 mb-4">Associate Editor</h4>
                  <div className="space-y-2">
                    {profile.editorialAndReviewActivities.associateEditor.map((role: string, index: number) => (
                      <div key={index} className="text-gray-300 text-sm">
                        {role}
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-blue-400 mb-4">Reviewer</h4>
                  <div className="text-gray-300 text-sm">{profile.editorialAndReviewActivities.reviewer}</div>
                </div>
              </div>
            </div>
          }
        </div>
      </div>
    </div>
  )
}
