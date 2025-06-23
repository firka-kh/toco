export interface Job {
  id: string;
  title: {
    taj: string;
    rus: string;
  };
  company: {
    name: string;
    logo?: string;
    size?: string;
    industry?: string;
  };
  location: string;
  salary: {
    min: number;
    max: number;
    currency: string;
    negotiable?: boolean;
  };
  type: 'full-time' | 'part-time' | 'remote' | 'contract' | 'internship';
  experience: 'entry' | 'junior' | 'middle' | 'senior' | 'lead';
  category: string;
  description: {
    taj: string;
    rus: string;
  };
  requirements: {
    taj: string[];
    rus: string[];
  };
  benefits: {
    taj: string[];
    rus: string[];
  };
  skills: string[];
  createdAt: Date;
  expiresAt: Date;
  views: number;
  applications: number;
  featured?: boolean;
  urgent?: boolean;
}

export interface Resume {
  id: string;
  userId: string;
  name: string;
  position: {
    taj: string;
    rus: string;
  };
  location: string;
  experience: number;
  education: {
    degree: string;
    institution: string;
    year: number;
    field: string;
  }[];
  skills: string[];
  languages: {
    name: string;
    level: 'basic' | 'intermediate' | 'advanced' | 'native';
  }[];
  expectedSalary: {
    min: number;
    max: number;
    currency: string;
  };
  workHistory: {
    company: string;
    position: string;
    startDate: Date;
    endDate?: Date;
    description: string;
    current: boolean;
  }[];
  contact: {
    email: string;
    phone: string;
    linkedin?: string;
    portfolio?: string;
  };
  summary: {
    taj: string;
    rus: string;
  };
  createdAt: Date;
  updatedAt: Date;
  views: number;
  downloads: number;
  isPublic: boolean;
}

export interface User {
  id: string;
  email: string;
  name: string;
  role: 'jobseeker' | 'employer' | 'admin';
  avatar?: string;
  company?: {
    name: string;
    position: string;
    logo?: string;
  };
  profile: {
    phone?: string;
    location?: string;
    bio?: string;
    website?: string;
  };
  preferences: {
    language: 'taj' | 'rus';
    notifications: {
      email: boolean;
      sms: boolean;
      push: boolean;
    };
  };
  createdAt: Date;
  isVerified: boolean;
}

export interface Course {
  id: string;
  title: {
    taj: string;
    rus: string;
  };
  description: {
    taj: string;
    rus: string;
  };
  provider: string;
  category: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  duration: {
    hours: number;
    weeks: number;
  };
  format: 'online' | 'offline' | 'hybrid';
  price: {
    amount: number;
    currency: string;
    free?: boolean;
  };
  schedule: {
    startDate: Date;
    endDate: Date;
    days: string[];
    time: string;
  };
  instructor: {
    name: string;
    bio: string;
    experience: string;
    avatar?: string;
  };
  curriculum: {
    title: string;
    description: string;
    duration: string;
  }[];
  skills: string[];
  requirements: string[];
  certificate: boolean;
  rating: number;
  reviews: number;
  studentsCount: number;
  featured?: boolean;
  createdAt: Date;
}

export interface Company {
  id: string;
  name: string;
  logo?: string;
  description: {
    taj: string;
    rus: string;
  };
  industry: string;
  size: string;
  location: string;
  website?: string;
  contact: {
    email: string;
    phone: string;
    address: string;
  };
  socialMedia: {
    facebook?: string;
    twitter?: string;
    linkedin?: string;
    instagram?: string;
  };
  founded?: number;
  employees?: number;
  benefits: string[];
  culture: string[];
  jobsCount: number;
  rating?: number;
  verified: boolean;
  createdAt: Date;
}

export interface Application {
  id: string;
  jobId: string;
  resumeId: string;
  userId: string;
  coverLetter?: string;
  status: 'pending' | 'reviewed' | 'interview' | 'accepted' | 'rejected';
  appliedAt: Date;
  updatedAt: Date;
  notes?: string;
}

export interface NewsArticle {
  id: string;
  title: {
    taj: string;
    rus: string;
  };
  content: {
    taj: string;
    rus: string;
  };
  excerpt: {
    taj: string;
    rus: string;
  };
  category: string;
  author: {
    name: string;
    avatar?: string;
  };
  featuredImage?: string;
  tags: string[];
  publishedAt: Date;
  views: number;
  featured?: boolean;
  readTime: number;
}

export interface FilterOptions {
  location?: string;
  category?: string;
  type?: string;
  experience?: string;
  salary?: {
    min: number;
    max: number;
  };
  remote?: boolean;
  featured?: boolean;
}

export interface SearchParams {
  query?: string;
  filters: FilterOptions;
  sort: 'date' | 'salary' | 'relevance';
  page: number;
  limit: number;
}

export interface ApiResponse<T> {
  data: T;
  total: number;
  page: number;
  limit: number;
  hasMore: boolean;
}
