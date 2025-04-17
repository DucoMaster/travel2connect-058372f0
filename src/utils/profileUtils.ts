
// Mock function to simulate AI image processing
export const generateAIImages = async (originalImage: string) => {
  // In real app, this would call an AI API
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  // Return 3 fake AI-generated image URLs
  return [
    'https://images.unsplash.com/photo-1472396961693-142e6e269027?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1433086966358-54859d0ed716?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1482938289607-e9573fc25ebb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&q=80'
  ];
};

// Mock function to simulate AI description generation
export const generateAIDescription = async (name: string, location: string, answers: string[]) => {
  // In real app, this would call an AI API
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  // Return a generated description based on user role
  const descriptions = {
    traveler: `${name} is an enthusiastic traveler based in ${location}, with a passion for exploring new cultures and experiences. Always seeking authentic connections with local guides and unique opportunities to make each journey memorable.`,
    guide: `${name} is a knowledgeable local guide based in ${location} with deep expertise in the region's history, culture, and hidden gems. Specializing in creating personalized experiences that showcase the authentic side of destinations.`,
    agent: `${name} is a professional travel agent from ${location}, dedicated to crafting exceptional travel experiences. With a keen eye for detail and in-depth knowledge of global destinations, ${name} creates perfectly tailored packages for discerning travelers.`,
    venue: `${name} represents a premier entertainment venue in ${location}, offering unique experiences for visitors and locals alike. The venue is known for its authentic atmosphere and commitment to showcasing local culture and talent.`
  };
  
  return descriptions[answers[0] as keyof typeof descriptions] || descriptions.traveler;
};
