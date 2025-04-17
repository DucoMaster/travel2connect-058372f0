
import { UserRole } from '@/types';

// Role-specific questions for profile completion
export const roleQuestions: Record<UserRole, Array<{question: string, options: string[]}>> = {
  traveler: [
    {
      question: "What type of traveler are you?",
      options: ["Adventure seeker", "Cultural explorer", "Relaxation enthusiast", "Foodie traveler", "Budget backpacker"]
    },
    {
      question: "What's your preferred travel duration?",
      options: ["Weekend trips", "1-2 week vacations", "Extended travel (1+ months)", "Spontaneous getaways", "Seasonal travel"]
    },
    {
      question: "How do you prefer to travel?",
      options: ["Solo", "With partner", "With family", "With friends", "In tour groups"]
    },
    {
      question: "What do you value most in a destination?",
      options: ["Nature & landscapes", "Local cuisine", "Historical sites", "Cultural experiences", "Nightlife & entertainment"]
    },
    {
      question: "How do you discover new destinations?",
      options: ["Social media", "Friend recommendations", "Travel blogs", "Travel agencies", "Spontaneous decisions"]
    }
  ],
  guide: [
    {
      question: "What type of guide are you?",
      options: ["Adventure guide", "Cultural expert", "Food & cuisine specialist", "Historical guide", "Nature guide"]
    },
    {
      question: "What languages do you speak fluently?",
      options: ["English only", "English + 1 other language", "English + 2 other languages", "3+ languages", "Local dialects"]
    },
    {
      question: "How long have you been guiding?",
      options: ["New to guiding", "1-2 years", "3-5 years", "5-10 years", "10+ years experience"]
    },
    {
      question: "What size groups do you prefer?",
      options: ["Individual travelers", "Couples or pairs", "Small groups (3-5)", "Medium groups (6-10)", "Large groups (10+)"]
    },
    {
      question: "What's your guiding style?",
      options: ["Informative & educational", "Fun & entertaining", "Relaxed & adaptable", "Adventure & excitement", "Off-the-beaten-path"]
    }
  ],
  agent: [
    {
      question: "What type of travel do you specialize in?",
      options: ["Luxury travel", "Adventure travel", "Cultural tours", "Budget-friendly packages", "Customized itineraries"]
    },
    {
      question: "What regions do you focus on?",
      options: ["Local/domestic only", "Continental focus", "Global destinations", "Off-the-beaten-path", "Urban experiences"]
    },
    {
      question: "What's your typical client base?",
      options: ["Solo travelers", "Couples", "Families", "Groups", "Corporate clients"]
    },
    {
      question: "How long have you been in the travel industry?",
      options: ["New to the industry", "1-3 years", "4-7 years", "8-15 years", "15+ years"]
    },
    {
      question: "What sets your travel packages apart?",
      options: ["Unique experiences", "Great value", "Luxurious touches", "Local connections", "Environmental sustainability"]
    }
  ],
  venue: [
    {
      question: "What type of venue do you represent?",
      options: ["Restaurant/Dining", "Nightclub/Bar", "Cultural venue", "Entertainment complex", "Multi-purpose venue"]
    },
    {
      question: "What's your venue's capacity?",
      options: ["Intimate (under 50)", "Small (50-100)", "Medium (100-250)", "Large (250-500)", "Very large (500+)"]
    },
    {
      question: "What kind of events do you typically host?",
      options: ["Live music", "Cultural performances", "Dining experiences", "Nightlife & dancing", "Mixed events"]
    },
    {
      question: "What's your venue's atmosphere?",
      options: ["Upscale & luxurious", "Casual & relaxed", "Energetic & lively", "Authentic & local", "Themed experience"]
    },
    {
      question: "How long has your venue been operating?",
      options: ["New venue", "1-2 years", "3-5 years", "5-10 years", "Established 10+ years"]
    }
  ]
};
