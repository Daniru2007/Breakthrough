interface GrammarSection {
  title: string;
  description: string;
  examples: string[];
}

interface ParsedGrammarContent {
  title: string;
  introduction: string;
  sections: GrammarSection[];
}

export function parseGrammarContent(content: string): ParsedGrammarContent {
  const lines = content.split('\n');
  const sections: GrammarSection[] = [];
  let title = '';
  let introduction = '';
  let currentSection: Partial<GrammarSection> = {};

  // Helper to extract content between quotes
  const extractQuoted = (text: string): string[] => {
    const matches = text.match(/"([^"]+)"/g) || [];
    return matches.map(m => m.replace(/"/g, ''));
  };

  lines.forEach((line, index) => {
    const trimmedLine = line.trim();
    
    // Extract title (first line)
    if (!title && trimmedLine) {
      title = trimmedLine;
      return;
    }

    // Extract introduction (text before numbered sections)
    if (!introduction && !trimmedLine.match(/^\d+\./)) {
      introduction += trimmedLine + ' ';
      return;
    }

    // Parse numbered sections
    const sectionMatch = trimmedLine.match(/^(\d+)\.\s*(.*?):/);
    if (sectionMatch) {
      if (currentSection.title) {
        sections.push(currentSection as GrammarSection);
      }
      currentSection = {
        title: sectionMatch[2],
        description: '',
        examples: []
      };
      return;
    }

    // Handle examples
    if (trimmedLine.includes('Examples:')) {
      currentSection.examples = extractQuoted(trimmedLine);
      return;
    }

    // Add to current section description
    if (currentSection.title && trimmedLine) {
      currentSection.description += trimmedLine + ' ';
    }
  });

  // Add last section
  if (currentSection.title) {
    sections.push(currentSection as GrammarSection);
  }

  return {
    title,
    introduction: introduction.trim(),
    sections: sections.map(section => ({
      ...section,
      description: section.description.trim()
    }))
  };
}