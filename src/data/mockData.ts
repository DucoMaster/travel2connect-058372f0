
import { Package, User } from '@/types';

// Sample travel packages
export const mockPackages: Package[] = [
  {
    id: '1',
    title: 'Historical Walking Tour of Rome',
    description: 'Explore the ancient streets of Rome with a knowledgeable local guide. Visit the Colosseum, Roman Forum, and hidden gems off the tourist path.',
    category: 'travel',
    location: 'Rome, Italy',
    price: 45, // credits
    dates: {
      start: new Date('2025-06-15'),
      end: new Date('2025-06-15'),
    },
    createdBy: 'guide1',
    creatorRole: 'agent',
    images: [
      'https://images.unsplash.com/photo-1552832230-c0197dd311b5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80',
    ],
    capacity: 12,
  },
  {
    id: '2',
    title: 'Bali Beach Resort Getaway',
    description: 'Relax on the beautiful beaches of Bali with this all-inclusive resort package. Includes accommodation, meals, and various water activities.',
    category: 'travel',
    location: 'Bali, Indonesia',
    price: 120, // credits
    dates: {
      start: new Date('2025-07-10'),
      end: new Date('2025-07-17'),
    },
    createdBy: 'agent1',
    creatorRole: 'agent',
    images: [
      'https://images.unsplash.com/photo-1537996194471-e657df975ab4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80',
    ],
    capacity: 30,
  },
  {
    id: '3',
    title: 'Tokyo Night Club Tour',
    description: 'Experience the vibrant nightlife of Tokyo with VIP access to the city\'s top clubs. Includes a local guide and skip-the-line entry.',
    category: 'clubs',
    location: 'Tokyo, Japan',
    price: 75, // credits
    dates: {
      start: new Date('2025-05-20'),
      end: new Date('2025-05-20'),
    },
    createdBy: 'venue1',
    creatorRole: 'venue',
    images: [
      'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80',
    ],
    capacity: 8,
  },
  {
    id: '4',
    title: 'New York Broadway Experience',
    description: 'Enjoy a premium Broadway show followed by a meet-and-greet with the cast. Includes pre-show dinner at a top restaurant.',
    category: 'events',
    location: 'New York, USA',
    price: 95, // credits
    dates: {
      start: new Date('2025-08-05'),
      end: new Date('2025-08-05'),
    },
    createdBy: 'venue2',
    creatorRole: 'venue',
    images: [
      'https://images.unsplash.com/photo-1521332770536-1e7f9a1e348b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80',
    ],
    capacity: 20,
  },
  {
    id: '5',
    title: 'Mediterranean Cooking Class',
    description: 'Learn to prepare authentic Mediterranean dishes with a professional chef. Includes market tour, cooking session, and dining experience.',
    category: 'services',
    location: 'Barcelona, Spain',
    price: 60, // credits
    dates: {
      start: new Date('2025-06-25'),
      end: new Date('2025-06-25'),
    },
    createdBy: 'guide2',
    creatorRole: 'agent',
    images: [
      'https://images.unsplash.com/photo-1507048331197-7d4ac70811cf?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80',
    ],
    capacity: 10,
  },
  {
    id: '6',
    title: 'Safari Adventure in Kenya',
    description: 'Experience the wildlife of Kenya on this guided safari tour. See lions, elephants, giraffes and more in their natural habitat.',
    category: 'travel',
    location: 'Nairobi, Kenya',
    price: 150, // credits
    dates: {
      start: new Date('2025-09-10'),
      end: new Date('2025-09-15'),
    },
    createdBy: 'agent2',
    creatorRole: 'agent',
    images: [
      'https://images.unsplash.com/photo-1517022812141-23620dba5c23?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80',
    ],
    capacity: 8,
  },
];

// Sample users with different roles
export const mockUsers: User[] = [
  {
    id: 'guide1',
    email: 'marco@guides.com',
    name: 'Marco Romano',
    role: 'guide',
    credits: 250,
    profileImage: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=256&q=80',
    description: 'Born and raised in Rome, I have been a certified tour guide for over 15 years. I specialize in historical tours that take you beyond the typical tourist routes. My passion is bringing ancient history to life through engaging storytelling.',
    location: 'Rome, Italy',
    ranking: 5,
    specialties: ['history', 'architecture', 'food'],
    createdAt: new Date('2024-01-15')
  },
  {
    id: 'guide2',
    email: 'sofia@guides.com',
    name: 'Sofia Martinez',
    role: 'guide',
    credits: 180,
    profileImage: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=256&q=80',
    description: 'Culinary expert and cooking instructor with a deep knowledge of Mediterranean cuisine. My tours combine market visits with hands-on cooking experiences, allowing you to truly taste the culture of Barcelona.',
    location: 'Barcelona, Spain',
    ranking: 4,
    specialties: ['cooking', 'cuisine', 'markets'],
    createdAt: new Date('2024-02-10')
  },
  {
    id: 'guide3',
    email: 'akio@guides.com',
    name: 'Akio Tanaka',
    role: 'guide',
    credits: 200,
    profileImage: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=256&q=80',
    description: 'Tokyo nightlife expert who knows all the hidden gems and exclusive venues. My tours give you VIP access to the best clubs and bars in town, with personal introductions to owners and staff.',
    location: 'Tokyo, Japan',
    ranking: 5,
    specialties: ['nightlife', 'entertainment', 'local culture'],
    createdAt: new Date('2024-01-05')
  },
  {
    id: 'agent1',
    email: 'peter@travelagent.com',
    name: 'Peter Johnson',
    role: 'agent',
    credits: 500,
    profileImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=256&q=80',
    description: 'Experienced travel agent specializing in luxury resort packages and all-inclusive getaways in exotic destinations.',
    location: 'New York, USA',
    ranking: 4,
    createdAt: new Date('2023-11-20')
  },
  {
    id: 'agent2',
    email: 'nala@safaris.com',
    name: 'Nala Kimathi',
    role: 'agent',
    credits: 350,
    profileImage: 'https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=256&q=80',
    description: 'Safari specialist with extensive knowledge of East African wildlife. I organize ethical and sustainable safari experiences that support local conservation efforts.',
    location: 'Nairobi, Kenya',
    ranking: 5,
    createdAt: new Date('2023-12-15')
  },
  {
    id: 'venue1',
    email: 'club@tokyo.com',
    name: 'Tokyo Club Experience',
    role: 'venue',
    credits: 1000,
    profileImage: 'https://images.unsplash.com/photo-1566737236500-c8ac43014a67?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=256&q=80',
    description: 'Premium nightclub offering exclusive packages for international visitors. VIP access to the hottest parties in Tokyo.',
    location: 'Tokyo, Japan',
    ranking: 4,
    createdAt: new Date('2023-10-05')
  },
  {
    id: 'venue2',
    email: 'broadway@nyc.com',
    name: 'Broadway VIP Experience',
    role: 'venue',
    credits: 800,
    profileImage: 'https://images.unsplash.com/photo-1518391846015-55a9cc003b25?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=256&q=80',
    description: 'Official provider of premium Broadway show packages including backstage tours and cast meet-and-greets.',
    location: 'New York, USA',
    ranking: 5,
    createdAt: new Date('2023-09-18')
  }
];
