import {User} from "@firebase/auth";

interface InvaUser extends User {
  roles: string[];
  status: 'Active' | 'Disabled' | 'Suspended';
}