export interface Feature {
  title: string;
  description: string;
  buttonText: string;
}

export const features: Feature[] = [
  {
    title: "Tutorial Analysis",
    description: "Smart tutorial recommendations based on your emotional engagement. We analyze your learning patterns to provide perfectly tailored content that matches your unique learning style.",
    buttonText: "Analyze Tutorials",
  },
  {
    title: "Exam Summary",
    description: "Intelligent analysis of past papers to identify patterns and key topics. Our AI creates personalized study plans that optimize your preparation time.",
    buttonText: "Summarize Papers",
  }
];