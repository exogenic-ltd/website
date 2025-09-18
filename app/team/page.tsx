import { ExternalLink, Calendar } from "lucide-react"
import { readMarkdownFile } from "@/lib/markdown-parser"
import ProfilePhoto from "../member/components/ProfilePhoto";
import { constants } from "buffer";
import Constants from "@/components/constants";
export default function Team() {
    const teamsContent = readMarkdownFile("team.md");

    const getTeamMemberData = () => {
        let teamMemberData: any[];
        teamMemberData = [];
        if (teamsContent) {
            teamsContent.members.forEach((member: any) => {

                try {
                    if (member) {
                        let teamMemberDetails = readMarkdownFile(`/team-members/${member.name}.md`);

                        switch (member.category) {
                            case Constants.Founder:
                                teamMemberDetails.category = Constants.Founder;
                                break;
                            case Constants.Advisor:
                                teamMemberDetails.category = Constants.Advisor;
                                break;
                            default:
                                teamMemberDetails.category = Constants.TeamMember;
                        }

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
            <div className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="text-center mb-16">
                    <h1 className="text-4xl sm:text-5xl font-bold text-white mb-6">
                        {teamsContent?.header?.title || "Our members"}
                    </h1>
                    <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                        {teamsContent?.header?.subtitle ||
                            "Meet the Brains Behind ExoGenicMeet the Brains Behind the Innovations at Exogenic"}
                    </p>
                </div>

                {/* founder Grid */}
                <h3 className="text-2xl sm:text-3xl font-bold text-white mb-6">Founders</h3>
                <div className="grid lg:grid-cols-4 gap-8">
                    {teamMembers?.map((member: any) => (
                        member.category == Constants.Founder &&
                        <div key={member.id} className="bg-gray-800/50 rounded-lg border border-blue-500/20 hover:border-blue-500/40 transition-all duration-300 overflow-hidden group">
                            {/* member Image */}
                            <div className="p-4">
                                <ProfilePhoto src={member.profileImageUrl || "/placeholder.svg"} alt={member.title} size="lg" className="mb-6" />
                            </div>

                            {/* member Links */}
                            <div className="flex item-center px-14">
                                {member.firstName &&
                                    <a
                                        href={`/member?name=${member.firstName}`}
                                        className="flex items-center px-12 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                                    >
                                        <ExternalLink className="h-4 w-4 mr-2" />
                                        Profile
                                    </a>
                                }
                            </div>

                            {/* member Content */}
                            <div className="p-6">
                                <div className="flex items-center justify-between mb-3">
                                    <h3 className="text-xl font-bold text-white">{member.title}</h3>
                                </div>
                                {member.contact?.affiliation &&
                                    <p className="text-gray-300 mb-4 line-clamp-3">{member.contact.affiliation}</p>
                                }
                            </div>
                        </div>
                    ))}
                </div>

                {/* member Grid */}
                <h3 className="text-2xl sm:text-3xl font-bold py-6 text-white" >Team</h3>
                <div className="grid lg:grid-cols-4 gap-8">
                    {teamMembers.map((member: any) => (
                        member.category == Constants.TeamMember &&
                        <div key={member.id} className="bg-gray-800/50 rounded-lg border border-blue-500/20 hover:border-blue-500/40 transition-all duration-300 overflow-hidden group">
                            {/* member Image */}
                            <div className="p-4">
                                <ProfilePhoto src={member.profileImageUrl || "/placeholder.svg"} alt={member.title} size="lg" className="mb-6" />
                            </div>

                            {/* member Links */}
                            <div className="flex item-center px-14">
                                {member.firstName &&
                                    <a
                                        href={`/member?name=${member.firstName}`}
                                        className="flex items-center px-12 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                                    >
                                        <ExternalLink className="h-4 w-4 mr-2" />
                                        Profile
                                    </a>
                                }
                            </div>

                            {/* member Content */}
                            <div className="p-6">
                                <div className="flex items-center justify-between mb-3">
                                    <h3 className="text-xl font-bold text-white">{member.title}</h3>
                                </div>
                                {member.contact?.affiliation &&
                                    <p className="text-gray-300 mb-4 line-clamp-3">{member.contact.affiliation}</p>
                                }
                            </div>
                        </div>
                    ))}
                </div>

                {/* advisor Grid */}
                <h3 className="text-2xl sm:text-3xl font-bold py-6 text-white">Advisors</h3>
                <div className="grid lg:grid-cols-4 gap-8">
                    {teamMembers?.map((member: any) => (
                        member.category == Constants.Advisor &&
                        <div key={member.id} className="bg-gray-800/50 rounded-lg border border-blue-500/20 hover:border-blue-500/40 transition-all duration-300 overflow-hidden group">
                            {/* member Image */}
                            <div className="p-4">
                                <ProfilePhoto src={member.profileImageUrl || "/placeholder.svg"} alt={member.title} size="lg" className="mb-6" />
                            </div>

                            {/* member Links */}
                            <div className="flex item-center px-14">
                                {member.firstName &&
                                    <a
                                        href={`/member?name=${member.firstName}`}
                                        className="flex items-center px-12 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                                    >
                                        <ExternalLink className="h-4 w-4 mr-2" />
                                        Profile
                                    </a>
                                }
                            </div>

                            {/* member Content */}
                            <div className="p-6">
                                <div className="flex items-center justify-between mb-3">
                                    <h3 className="text-xl font-bold text-white">{member.title}</h3>
                                </div>

                                <p className="text-gray-300 mb-4">
                                    {Array.isArray(member.contact?.affiliation)
                                        ? member.contact.affiliation.map((line: string, i: number) => (
                                            <span key={i}>
                                                {line}
                                                <br />
                                            </span>
                                        ))
                                        : member.contact?.affiliation}
                                </p>

                                {/*member.contact?.affiliation &&
                                    <p className="text-gray-300 mb-4 line-clamp-3">{member.contact.affiliation}</p>
                                */}
                            </div>
                        </div>
                    ))}
                </div>

                {/* CTA Section */}
                <div className="text-center mt-16">
                    <div className="bg-gray-800/50 p-8 rounded-lg border border-blue-500/20">
                        <h2 className="text-2xl font-bold text-white mb-4">
                            {teamsContent?.cta_section?.title || "Interested in Working Together With Us?"}
                        </h2>
                        <p className="text-gray-300 mb-6">
                            {teamsContent?.cta_section?.description ||
                                "We are always open to discussing new opportunities and interesting members."}
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
