export const calculateProgress = (xp: number, maxXP: number = 5000): number => {
  return Math.min(100, (xp / maxXP) * 100);
};