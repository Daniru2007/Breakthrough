export interface UserData {
  name: string;
  avatar: string;
  xp: number;
  streak: number;
  rank: number;
  progress: number;
  school?: string;
  email: string; // Required field for unique identification
}

export interface FirestoreUser {
  Username?: string;
  school?: string;
  email: string;
}

export interface FirestoreUserExtension {
  XP: number;
  Streak: number;
  UserID: any; // Firebase DocumentReference
}