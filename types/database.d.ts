import {Timestamp} from "@firebase/firestore";

export interface Photo {
  name: string;
  type: string;
  location: string;
  createdAt: Timestamp;
  createdBy: string;
  isPublic: boolean;
}