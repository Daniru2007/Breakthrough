import GrammarSection from '../GrammarSection';

interface GrammarSectionData {
  title: string;
  content: string;
  imageUrl: string;
}

interface ContentSectionProps {
  sections: GrammarSectionData[];
}

export function ContentSection({ sections }: ContentSectionProps) {
  return (
    <div className="space-y-6">
      {sections.map((section, index) => (
        <GrammarSection
          key={index}
          title={section.title}
          content={section.content}
          imageUrl={section.imageUrl}
        />
      ))}
    </div>
  );
}