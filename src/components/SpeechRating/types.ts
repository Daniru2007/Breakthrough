export interface Recording {
  userId: string;
  count: number;
  url: string;
  username?: string;
}

export interface Rating {
  rating: number;
  timestamp: Date;
}

export interface User {
  Username: string;
  // Add other user fields as needed
}

export interface RecordingState {
  isRecording: boolean;
  audioBlob: Blob | null;
  isUploading?: boolean;
  uploadProgress?: number;
}