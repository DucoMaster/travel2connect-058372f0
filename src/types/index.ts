
// User roles
export type UserRole = 'traveler' | 'guide' | 'agent' | 'venue';

// User interface
export interface User {
  id: string;
  email: string;
  name?: string;
  role: UserRole;
  location?: string;
  profileImage?: string;
  description?: string;
  credits: number;
  ranking: number;
  createdAt: Date;
}

// Tour/Event package
export interface Package {
  id: string;
  title: string;
  description: string;
  category: 'travel' | 'clubs' | 'events' | 'services';
  location: string;
  price: number; // in credits
  dates: {
    start: Date;
    end: Date;
  };
  createdBy: string; // user ID
  creatorRole: 'agent' | 'venue';
  images: string[];
  capacity?: number;
}
