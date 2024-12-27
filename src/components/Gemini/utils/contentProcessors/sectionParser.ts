export interface ContentSection {
  type: 'heading' | 'subheading' | 'content' | 'example';
  title: string;
  description?: string;
  examples?: string[];
  step?: number;
}

export function parseContent(text: string): ContentSection[] {
  const sections: ContentSection[] = [];
  const lines = text.split('\n').map(line => line.trim()).filter(Boolean);

  // Helper function to capitalize first letter of each word
  const capitalize = (str: string) => {
    return str.split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ');
  };

  // Extract step and title from a line
  const parseStepAndTitle = (line: string) => {
    const stepMatch = line.match(/step\s+(\d+):\s*(.*?)(?=\s|$)/i);
    if (stepMatch) {
      return {
        step: parseInt(stepMatch[1]),
        title: capitalize(stepMatch[2])
      };
    }
    return { title: capitalize(line) };
  };

  let currentSection: ContentSection | null = null;

  for (const line of lines) {
    // Handle main heading
    if (!sections.length && !line.toLowerCase().includes('step')) {
      sections.push({
        type: 'heading',
        title: capitalize(line)
      });
      continue;
    }

    // Check for new section (starts with "step" or contains ":")
    if (line.toLowerCase().includes('step') || line.includes(':')) {
      if (currentSection) {
        sections.push(currentSection);
      }

      const { step, title } = parseStepAndTitle(line);
      currentSection = {
        type: 'subheading',
        title,
        step,
        description: '',
        examples: []
      };

      // Extract examples if they're on the same line
      const exampleMatch = line.match(/examples:\s*([^.]+)/i);
      if (exampleMatch) {
        currentSection.examples = exampleMatch[1]
          .split(',')
          .map(ex => ex.trim())
          .filter(Boolean);
      }
    } else if (currentSection) {
      // Handle examples if they're on a separate line
      if (line.toLowerCase().startsWith('examples:')) {
        currentSection.examples = line
          .replace(/^examples:\s*/i, '')
          .split(',')
          .map(ex => ex.trim())
          .filter(Boolean);
      } else {
        // Add to description
        currentSection.description = (currentSection.description || '') + ' ' + line;
      }
    }
  }

  if (currentSection) {
    sections.push(currentSection);
  }

  return sections;
}