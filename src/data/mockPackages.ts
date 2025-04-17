
import { Package } from '@/types';

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
    visitors: 234,
    attendees: 8,
    creditsEarned: 360,
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
    visitors: 512,
    attendees: 22,
    creditsEarned: 2640,
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
    visitors: 378,
    attendees: 6,
    creditsEarned: 450,
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
    visitors: 127,
    attendees: 14,
    creditsEarned: 1330,
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
    visitors: 89,
    attendees: 5,
    creditsEarned: 300,
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
    visitors: 142,
    attendees: 4,
    creditsEarned: 600,
  },
];
