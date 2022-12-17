import {Timestamp} from "@firebase/firestore";
import {User} from "@firebase/auth";

interface Photo {
  name: string;
  type: string;
  location: string;
  createdAt: Timestamp;
  createdBy: User;
}