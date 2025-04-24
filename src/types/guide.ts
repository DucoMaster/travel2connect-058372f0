export interface Guide {
  id: string;
  name?: string;
  email: string;
  role: string;
  description?: string;
  location?: string;
  profileImage?: string;
  ranking: number;
  specialties?: string[];
  packages?: any[];
}
