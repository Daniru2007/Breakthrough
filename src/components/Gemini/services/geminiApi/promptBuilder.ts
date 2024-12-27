export function buildPrompt(topic: string, strategy: ContentStrategy): string {
  const emotionalGuidance = strategy.supportLevel === 'high' 
    ? `
Write in a supportive and encouraging tone:
- Show empathy and understanding
- Break down complex ideas naturally
- Use reassuring language
- Provide validation
- Include relatable examples`
    : '';

  return `
You are an expert teacher having a natural conversation with a student about ${topic}. Write as if you're explaining this topic to them in person.

IMPORTANT REQUIREMENTS:
1. Length: Write exactly ${strategy.wordCount} words
2. Style: Use ${strategy.complexity} language
3. Tone: Keep a ${strategy.tone} tone
4. Format: Write in natural paragraphs
5. Examples: Include examples organically within the text

CRITICAL RULES:
- NO headers or section titles
- NO bullet points or numbered lists
- NO structured sections like "Key Concepts" or "Practice Tips"
- Write as a continuous, natural explanation
- Flow topics naturally from one to another
- Integrate examples within the paragraphs
${emotionalGuidance}

The response should read like a natural conversation or lecture, not a structured document.`;
}