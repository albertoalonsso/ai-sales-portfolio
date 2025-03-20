import { NewsletterEntry, NewsletterResponse, Subscriber } from '@/models/newsletter';

// Mock data for the newsletter entries
const mockNewsletterEntries: NewsletterEntry[] = [
  {
    id: '1',
    title: "Reinforcement Learning in Financial Markets: Current Applications",
    slug: "reinforcement-learning-financial-markets",
    content: "# Reinforcement Learning in Financial Markets\n\nIn recent years, the application of Reinforcement Learning (RL) in financial markets has gained significant traction...",
    excerpt: "Exploring how RL is transforming portfolio optimization and trading strategies in today's dynamic markets.",
    coverImage: "/lovable-uploads/4618583b-b2b8-4dd4-9cb2-a0786c92b99f.png",
    publishedDate: "2024-06-15",
    lastModified: "2024-06-15",
    author: {
      name: "Alberto Alonso",
      avatar: "/lovable-uploads/4618583b-b2b8-4dd4-9cb2-a0786c92b99f.png",
      title: "AI Sales Engineer"
    },
    tags: ["AI & Finance", "Reinforcement Learning", "Portfolio Optimization"],
    readTime: 8,
    featured: true,
    status: "published",
    commentCount: 8,
    shareCount: 23
  },
  {
    id: '2',
    title: "The Future of 5G and IoT in Industrial Environments",
    slug: "5g-iot-industrial-environments",
    content: "# The Future of 5G and IoT in Industrial Environments\n\nThe convergence of 5G connectivity and Internet of Things (IoT) technology is revolutionizing industrial environments...",
    excerpt: "How next-generation connectivity is enabling unprecedented automation and data analytics in manufacturing.",
    coverImage: "/lovable-uploads/4618583b-b2b8-4dd4-9cb2-a0786c92b99f.png",
    publishedDate: "2024-06-02",
    lastModified: "2024-06-05",
    author: {
      name: "Alberto Alonso",
      avatar: "/lovable-uploads/4618583b-b2b8-4dd4-9cb2-a0786c92b99f.png",
      title: "AI Sales Engineer"
    },
    tags: ["Technology", "IoT", "5G", "Industry"],
    readTime: 5,
    featured: false,
    status: "published",
    commentCount: 5,
    shareCount: 17
  },
  {
    id: '3',
    title: "NLP Analysis: Extracting Value from Financial Communications",
    slug: "nlp-analysis-financial-communications",
    content: "# NLP Analysis: Extracting Value from Financial Communications\n\nNatural Language Processing (NLP) has emerged as a powerful tool for analyzing financial communications...",
    excerpt: "Techniques for analyzing earnings calls and financial reports to gain market insights using natural language processing.",
    coverImage: "/lovable-uploads/4618583b-b2b8-4dd4-9cb2-a0786c92b99f.png",
    publishedDate: "2024-05-23",
    lastModified: "2024-05-25",
    author: {
      name: "Alberto Alonso",
      avatar: "/lovable-uploads/4618583b-b2b8-4dd4-9cb2-a0786c92b99f.png",
      title: "AI Sales Engineer"
    },
    tags: ["AI & Finance", "NLP", "Financial Analysis"],
    readTime: 12,
    featured: true,
    status: "published",
    commentCount: 12,
    shareCount: 31
  }
];

// Mock subscribers
const mockSubscribers: Subscriber[] = [
  {
    id: '1',
    email: "john@example.com",
    name: "John Doe",
    subscribedDate: "2024-05-10",
    preferences: {
      frequency: "weekly",
      topics: ["AI & Finance", "Reinforcement Learning"]
    },
    active: true
  },
  {
    id: '2',
    email: "sarah@example.com",
    name: "Sarah Johnson",
    subscribedDate: "2024-05-15",
    preferences: {
      frequency: "biweekly",
      topics: ["IoT", "5G", "Industry"]
    },
    active: true
  }
];

// API service for newsletter
export const newsletterApi = {
  // Get all newsletter entries with pagination and filtering
  getEntries: async (page = 1, pageSize = 9, tag?: string): Promise<NewsletterResponse> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Filter by tag if provided
    let filteredEntries = [...mockNewsletterEntries];
    if (tag && tag !== '') {
      filteredEntries = filteredEntries.filter(entry => 
        entry.tags.some(t => t.toLowerCase().includes(tag.toLowerCase()))
      );
    }
    
    // Calculate pagination
    const totalCount = filteredEntries.length;
    const totalPages = Math.ceil(totalCount / pageSize);
    const startIndex = (page - 1) * pageSize;
    const paginatedEntries = filteredEntries.slice(startIndex, startIndex + pageSize);
    
    return {
      entries: paginatedEntries,
      totalCount,
      totalPages,
      currentPage: page
    };
  },
  
  // Get a single newsletter entry by ID or slug
  getEntry: async (idOrSlug: string): Promise<NewsletterEntry | null> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 300));
    
    const entry = mockNewsletterEntries.find(
      entry => entry.id === idOrSlug || entry.slug === idOrSlug
    );
    
    return entry || null;
  },
  
  // Get featured newsletter entries
  getFeaturedEntries: async (): Promise<NewsletterEntry[]> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 300));
    
    return mockNewsletterEntries.filter(entry => entry.featured && entry.status === 'published');
  },
  
  // Search newsletter entries
  searchEntries: async (query: string): Promise<NewsletterEntry[]> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    if (!query || query.trim() === '') return [];
    
    const searchTerm = query.toLowerCase();
    return mockNewsletterEntries.filter(entry => 
      entry.title.toLowerCase().includes(searchTerm) || 
      entry.content.toLowerCase().includes(searchTerm) ||
      entry.excerpt.toLowerCase().includes(searchTerm) ||
      entry.tags.some(tag => tag.toLowerCase().includes(searchTerm))
    );
  },
  
  // Add a subscriber
  addSubscriber: async (email: string, name?: string, preferences?: Partial<Subscriber['preferences']>): Promise<boolean> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // Check if subscriber already exists
    const existingSubscriber = mockSubscribers.find(sub => sub.email === email);
    if (existingSubscriber) return false;
    
    // In a real implementation, this would add to a database
    const newSubscriber: Subscriber = {
      id: String(mockSubscribers.length + 1),
      email,
      name,
      subscribedDate: new Date().toISOString(),
      preferences: {
        frequency: preferences?.frequency || 'weekly',
        topics: preferences?.topics || []
      },
      active: true
    };
    
    mockSubscribers.push(newSubscriber);
    return true;
  }
};
