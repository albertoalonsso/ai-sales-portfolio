
export interface NewsletterEntry {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  coverImage: string;
  publishedDate: string;
  lastModified: string;
  author: {
    name: string;
    avatar: string;
    title: string;
  };
  tags: string[];
  readTime: number;
  featured: boolean;
  status: 'published' | 'draft' | 'archived';
  commentCount?: number;
  shareCount?: number;
}

export interface NewsletterResponse {
  entries: NewsletterEntry[];
  totalCount: number;
  totalPages: number;
  currentPage: number;
}

export interface Subscriber {
  id: string;
  email: string;
  name?: string;
  subscribedDate: string;
  preferences: {
    frequency: 'weekly' | 'biweekly';
    topics: string[];
  };
  active: boolean;
}
