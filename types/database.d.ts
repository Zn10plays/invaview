import {Timestamp} from "@firebase/firestore";

export interface Photo {
  name: string;
  type: string;
  location: string;
  createdAt: Timestamp;
  createdBy: string;
  isPublic: boolean;
  shorts: Short[];
}

export interface Short {
  id: string;
  createdAt: Timestamp;
  variant: 'Temporary' | 'Permanent'
  expiresAt: Timestamp | null;
  isActive: boolean
}