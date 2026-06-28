export interface Category {
  id: string;
  slug: string;
  title: string;
  description: string;
  shortDescription: string;
  icon: string;
  image: string;
  order: number;
  advantages: string[];
  processSteps: string[];
  seoTitle: string;
  seoDescription: string;
  seoKeywords: string[];
  createdAt: string;
  updatedAt: string;
}

export interface Project {
  id: string;
  slug: string;
  title: string;
  description: string;
  shortDescription: string;
  categorySlug: string;
  location: string;
  year: number;
  thumbnail: string;
  beforeImage: string;
  afterImage: string;
  gallery: string[];
  highlights: string[];
  client: string;
  duration: string;
  seoTitle: string;
  seoDescription: string;
  seoKeywords: string[];
  featured: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Blog {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  coverImage: string;
  categorySlug: string;
  author: string;
  publishedAt: string;
  readingTime: number;
  tags: string[];
  seoTitle: string;
  seoDescription: string;
  seoKeywords: string[];
  createdAt: string;
  updatedAt: string;
}

export interface SiteConfig {
  id: string;
  companyName: string;
  logo: string;
  address: string;
  phone: string;
  email: string;
  googleMapsIframe: string;
  heroTitle: string;
  heroSubtitle: string;
  heroImage: string;
  aboutTitle: string;
  aboutText: string;
  globalSeoTitle: string;
  globalSeoDescription: string;
  globalSeoKeywords: string[];
  socialLinks: {
    instagram?: string;
    facebook?: string;
    linkedin?: string;
    youtube?: string;
  };
  footerText: string;
  telegramChatId?: string;
  telegramBotToken?: string;
  smsApiKey?: string;
  smsPhoneNumber?: string;
}

export interface Message {
  id: string;
  name: string;
  email: string;
  phone: string;
  service: string;
  projectAddress: string;
  objectType: string;
  area: number;
  message: string;
  attachments: string[];
  status: 'new' | 'read' | 'contacted' | 'closed';
  createdAt: string;
  updatedAt: string;
}

export interface PricingRule {
  id: string;
  basePrice: number;
  areaFactor: number;
  complexityFactors: {
    simple: number;
    medium: number;
    complex: number;
  };
  serviceMultipliers: Record<string, number>;
  objectMultipliers: Record<string, number>;
}

export interface SeoProps {
  title: string;
  description: string;
  keywords?: string[];
  image?: string;
  url?: string;
  type?: 'website' | 'article';
}

export interface User {
  id: string;
  email: string;
  role: 'admin' | 'editor';
  createdAt: string;
}

export interface TeamMember {
  id: string;
  name: string;
  position: string;
  photo: string;
  order: number;
  createdAt: string;
  updatedAt: string;
}

export interface Review {
  id: string;
  name: string;
  rating: number;
  text: string;
  date: string;
  avatar?: string;
  order: number;
  createdAt: string;
  updatedAt: string;
}

export type ObjectType = 'apartment' | 'house' | 'commercial' | 'industrial' | 'other';
export type Complexity = 'simple' | 'medium' | 'complex';
