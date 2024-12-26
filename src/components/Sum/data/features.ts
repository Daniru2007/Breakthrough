export interface Feature {
  id: number;
  title: string;
  description: string;
  buttonText: string;
}

export const features: Feature[] = [
  {
    id:1,
    title: "Tutorial Analysis",
    description: "Smart tutorial recommendations based on your emotional engagement. We analyze your learning patterns to provide perfectly tailored content that matches your unique learning style.",
    buttonText: "Analyze Tutorials",
  },
  {
    id:2,
    title: "Exam Summary",
    description: "Intelligent analysis of past papers to identify patterns and key topics. Our AI creates personalized study plans that optimize your preparation time.",
    buttonText: "Summarize Papers",
  }
];