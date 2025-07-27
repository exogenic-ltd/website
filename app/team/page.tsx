import { ExternalLink, Calendar } from "lucide-react"
import { readMarkdownFile } from "@/lib/markdown-parser"
export default function Team() {
    const teamsContent = readMarkdownFile("team.md");

    const getTeamMemberData = () => {
        let teamMemberData: any[];
        teamMemberData = [];
        if (teamsContent) {
            teamsContent.members.forEach((member: any) => {
                try {
                    if(member){
                        let teamMemberDetails = readMarkdownFile(`/team-members/${member.name}.md`);
                        teamMemberData.push(teamMemberDetails);
                    }
                } catch (e) {
                    console.log(e);
                }
            });
        }

        return teamMemberData;
    }

    const teamMembers = getTeamMemberData();

    return (
        <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-blue-900">
            <div className="max-w-6xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="text-center mb-16">
                    <h1 className="text-4xl sm:text-5xl font-bold text-white mb-6">
                        {teamsContent?.header?.title || "Our members"}
                    </h1>
                    <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                        {teamsContent?.header?.subtitle ||
                            "A collection of members I've worked on, showcasing different technologies and problem-solving approaches."}
                    </p>
                </div>

                {/* members Grid */}
                <div className="grid lg:grid-cols-3 gap-8">
                    {teamMembers?.map((member: any) => (
                        <div key={member.id} className="bg-gray-800/50 rounded-lg border border-blue-500/20 hover:border-blue-500/40 transition-all duration-300 overflow-hidden group">
                            {/* member Image */}
                            <div className="relative overflow-hidden">
                                <img
                                    src={member.image || "/placeholder.svg"}
                                    alt={member.title}
                                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                            </div>

                            {/* member Content */}
                            <div className="p-6">
                                <div className="flex items-center justify-between mb-3">
                                    <h3 className="text-xl font-bold text-white">{member.title}</h3>
                                </div>
                                {member.contact?.affiliation && 
                                    <p className="text-gray-300 mb-4 line-clamp-3">{member.contact.affiliation}</p>
                                }
                            
                                {/* Technologies */}
                                <div className="flex flex-wrap gap-2 mb-6">
                                    {member.academicQualifications?.map((qualification: any) => (
                                        <span
                                            key={qualification.id}
                                            className="px-3 py-1 bg-blue-600/20 text-blue-400 text-sm rounded-full border border-blue-500/30"
                                        >
                                            {qualification.degree}
                                        </span>
                                    ))}
                                </div>

                                {/* member Links */}
                                <div className="flex space-x-4">
                                    {member.firstName &&
                                        <a
                                            href={`/member?name=${member.firstName}`}
                                            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                                        >
                                            <ExternalLink className="h-4 w-4 mr-2" />
                                            Profile
                                        </a>
                                    }
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* CTA Section */}
                <div className="text-center mt-16">
                    <div className="bg-gray-800/50 p-8 rounded-lg border border-blue-500/20">
                        <h2 className="text-2xl font-bold text-white mb-4">
                            {teamsContent?.cta_section?.title || "Interested in Working Together?"}
                        </h2>
                        <p className="text-gray-300 mb-6">
                            {teamsContent?.cta_section?.description ||
                                "I'm always open to discussing new opportunities and interesting members."}
                        </p>
                        <a
                            href={teamsContent?.cta_section?.button?.split(" | ")[1] || "/about"}
                            className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
                        >
                            {teamsContent?.cta_section?.button?.split(" | ")[0] || "Get in Touch"}
                        </a>
                    </div>
                </div>
            </div>
        </div>
    )
}
