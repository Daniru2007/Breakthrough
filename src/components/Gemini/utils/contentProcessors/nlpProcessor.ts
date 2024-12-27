import nlp from 'compromise';

interface ProcessedSection {
  type: 'heading' | 'section';
  title: string;
  content: string;
  examples?: string[];
}

export function processContent(text: string): ProcessedSection[] {
  const doc = nlp(text);
  const sentences = doc.sentences().out('array');
  const sections: ProcessedSection[] = [];
  
  let currentSection: ProcessedSection | null = null;
  
  sentences.forEach((sentence) => {
    // Check if sentence starts with "step" or contains a heading pattern
    if (sentence.toLowerCase().includes('step') || /^[a-z\s]+:/i.test(sentence)) {
      if (currentSection) {
        sections.push(currentSection);
      }
      
      const title = sentence.split(':')[0].trim();
      currentSection = {
        type: 'section',
        title: title.charAt(0).toUpperCase() + title.slice(1).toLowerCase(),
        content: sentence.split(':')[1]?.trim() || '',
        examples: []
      };
    } else if (sentence.toLowerCase().includes('examples')) {
      if (currentSection) {
        const examples = sentence
          .toLowerCase()
          .replace('examples:', '')
          .split(',')
          .map(ex => ex.trim())
          .filter(Boolean);
        currentSection.examples = examples;
      }
    } else if (currentSection) {
      currentSection.content += ' ' + sentence;
    } else {
      // If no current section, treat as heading
      sections.push({
        type: 'heading',
        title: sentence,
        content: ''
      });
    }
  });

  if (currentSection) {
    sections.push(currentSection);
  }

  return sections;
}