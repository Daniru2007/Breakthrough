// ... keep existing types ...

export interface Tutorial {
  id: string;
  title: string;
  description: string;
}

export interface ContentStrategy {
  complexity: 'simple' | 'moderate' | 'detailed';
  tone: 'encouraging' | 'neutral' | 'supportive';
  structure: 'step-by-step' | 'conceptual';
  verbosity: 'concise' | 'moderate' | 'detailed';
  wordCount: number;
  supportLevel: 'high' | 'moderate' | 'standard';
}