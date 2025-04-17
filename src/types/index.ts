
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
  specialties?: string[];
}

// Tour/Event package
export interface Package {
  id: string;
  title: string;
  description: string;
  category: 'travel' | 'clubs' | 'events' | 'services' | 'guide' | 'rental' | 'tours';
  location: string;
  price: number; // in credits
  dates: {
    start: Date;
    end: Date;
  };
  createdBy: string; // user ID
  creatorRole: 'agent' | 'venue' | 'guide';
  images: string[];
  capacity?: number;
  qrCode?: string; // QR code for event verification
  visitors: number; // Number of visitors who viewed the package
  attendees: number; // Number of people who booked
  creditsEarned: number; // Credits earned from this package
}

// Event submission form
export interface EventSubmission {
  title: string;
  description: string;
  location: string;
  price: number;
  date: string;
  capacity?: number;
  imageUrl?: string;
}
