import { readMarkdownFile } from "@/lib/markdown-parser"
import {
  Lightbulb,
  ChevronRight,
  Info,
} from "lucide-react"
import { ReactElement } from "react";

interface ParagraphProps {
  content: string;
}

interface TitleProps {
  title: string;
}

interface BulletPointWithDescription {
  title: string;
  description: string;
}

interface BulletExplainerProps {
  title: string;
  bulletPointsWithDesc: BulletPointWithDescription[];
}

interface BulletPointsProps {
  bulletPoints: string[];
}

interface SectionItem {
  title: string;
  text: string;
  points: string[];
}

interface DescriptiveBulletPointsProps {
  bulletPointsWithDesc: BulletPointWithDescription[];
}

interface SectionsProps {
  sections: SectionItem[];
}

export default function BlogPost(slug: any) {
  const blogContent = readMarkdownFile(`/blog-posts/${slug.slug}.md`);

  const ParagraphComponent: React.FC<ParagraphProps> = ({ content }) => (
    <p className="text-white leading-relaxed mb-6">{content}</p>
  );

  const TitleComponent: React.FC<TitleProps> = ({ title }) => (
    <div className="mb-6">
      <h2 className="text-2xl font-semibold text-blue mb-3">{title}</h2>
    </div>
  );

  const BulletExplainerWithTitle: React.FC<BulletExplainerProps> = ({ title, bulletPointsWithDesc }) => (
    <div className="bg-gray-800/50 p-8 rounded-lg border border-blue-500/20 p-6 rounded-xl shadow-sm mb-6">
      <h3 className="text-xl font-semibold text-blue-50 mb-4 flex items-center">
        <Lightbulb className="w-6 h-6 mr-2 text-blue-500" />
        {title}
      </h3>
      <ul className="space-y-4">
        {bulletPointsWithDesc.map((item, index) => (
          <li key={index} className="flex items-start">
            <ChevronRight className="w-5 h-5 text-blue-500 mt-1 mr-2 flex-shrink-0" />
            <div>
              <h4 className="font-medium text-blue-500">{item.title}</h4>
              <p className="text-white text-sm">{item.description}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );

  const DescriptiveBulletPointsComponent: React.FC<DescriptiveBulletPointsProps> = ({
    bulletPointsWithDesc,
  }) => (
    <div className="mb-6">
      <div className="bg-gray-800/50 p-8 rounded-lg border border-blue-500/20 p-6 rounded-xl shadow-sm">
        <ul className="space-y-4">
          {bulletPointsWithDesc.map((item, index) => (
            <li key={index} className="flex items-start">
              <ChevronRight className="w-5 h-5 text-blue-500 mt-1 mr-2 flex-shrink-0" />
              <div>
                <h4 className="font-medium text-blue-500">{item.title}</h4>
                <p className="text-white text-sm">{item.description}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );

  // Component for general bullet points
  const BulletPointsComponent: React.FC<BulletPointsProps> = ({ bulletPoints }) => (
    <div className="mb-6">
      <ul className="list-none space-y-2">
        {bulletPoints.map((item, index) => (
          <li key={index} className="flex items-center text-white">
            <ChevronRight className="w-5 h-5 text-blue-500 mr-2 flex-shrink-0" />
            {item}
          </li>
        ))}
      </ul>
    </div>
  );

  // Component for sections with points
  const SectionsComponent: React.FC<SectionsProps> = ({ sections }) => (
    <div className="mb-6">
      <div className="grid md:grid-cols-2 gap-6">
        {sections.map((section, index) => (
          <div key={index} className="bg-gray-800/50 p-8 rounded-lg border border-blue-500/20 rounded-xl shadow-sm">
            <h3 className="text-xl font-semibold text-blue-500 mb-3 flex items-center">
              <Info className="w-5 h-5 text-purple-500 mr-2" />
              {section.title}
            </h3>
            <p className="text-white leading-relaxed mb-3">{section.text}</p>
            <ul className="list-none space-y-1">
              {section.points.map((point, pIndex) => (
                <li key={pIndex} className="flex items-center text-white text-sm">
                  <ChevronRight className="w-4 h-4 text-blue-500 mr-1.5 flex-shrink-0" />
                  {point}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );



  return (
    <div className="min-h-screen bg-gray-800/50 p-8 rounded-lg border border-blue-500/20 mb-12">
      <div className="max-w-4xl mx-auto bg-gray-800/50 rounded-lg border border-blue-500/20 p-8 md:p-10 rounded-2xl shadow-lg">
        {/* Heading Section (Mandatory) */}
        <header className="text-center mb-10">
          <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight mb-4 rounded-lg">
            {blogContent.title}
          </h1>

          <div className="text-lg md:text-xl text-white italic space-y-4">
            {Array.isArray(blogContent.overview[0].introduction)
              ? blogContent.overview[0].introduction.map((para: string, i: number) => (
                <p key={i}>{para}</p>
                  ))
              : <p>{blogContent.overview[0].introduction}</p>}
          </div>

          {/*<p className="text-lg md:text-xl text-white italic">
            {blogContent.overview[0].introduction}
          </p>*/}
        </header>

        {/* Content Section */}
        <main>
          {blogContent.content.map((item: any) => {
            const componentData = item;
            var outputBlock = new Array<ReactElement<any, any>>();
            if (componentData.title) {
              outputBlock.push(<TitleComponent key={componentData.blockId} title={componentData.title} />)
            }

            if (componentData.paragraph) {
              outputBlock.push(<ParagraphComponent key={componentData.blockId+10} content={componentData.paragraph} />);
            }

            if (componentData.bulletExplainerWithTitle) {
              // Bullet explainer with title and descriptions
              const explainer = componentData.bulletExplainerWithTitle;
              outputBlock.push(<BulletExplainerWithTitle
                key={componentData.blockId + 20}
                title={explainer.title}
                bulletPointsWithDesc={explainer.bulletPointsWithDesc}
              />);
            }

            if (componentData.sections) {
              outputBlock.push(
                <SectionsComponent key={componentData.blockId + 30} sections={componentData.sections} />
              )
            }

            if (componentData.bulletPoints) {
              outputBlock.push(<BulletPointsComponent
                key={componentData.blockId + 40}
                bulletPoints={componentData.bulletPoints}
              />)
            }

            if(componentData.bulletPointsWithDesc){
              outputBlock.push(<DescriptiveBulletPointsComponent key={componentData.blockId+50} bulletPointsWithDesc={componentData.bulletPointsWithDesc}/>)
            }

            return outputBlock;
          })}
        </main>
      </div>
    </div>
  );
}