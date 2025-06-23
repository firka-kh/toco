import { create } from 'zustand';
import { Job, FilterOptions, SearchParams } from '@/types';

interface JobsState {
  jobs: Job[];
  filteredJobs: Job[];
  isLoading: boolean;
  searchParams: SearchParams;
  totalJobs: number;
  currentPage: number;
  
  // Actions
  fetchJobs: () => Promise<void>;
  searchJobs: (query: string, filters: FilterOptions) => void;
  setFilters: (filters: FilterOptions) => void;
  setSort: (sort: 'date' | 'salary' | 'relevance') => void;
  setPage: (page: number) => void;
  getJobById: (id: string) => Job | undefined;
  applyToJob: (jobId: string) => Promise<void>;
  saveJob: (jobId: string) => void;
  unsaveJob: (jobId: string) => void;
}

// Mock data generator
const generateMockJobs = (): Job[] => {
  const titles = {
    taj: [
      'Барномасоз',
      'Муҳандиси компютер',
      'Мудири лоиҳа',
      'Таҳлилгари тиҷорат',
      'Дизайнери UX/UI',
      'Мутахассиси маркетинг',
      'Муҳосиб',
      'Муаллими забони англисӣ',
      'Табиб',
      'Муҳандиси сохтмон'
    ],
    rus: [
      'Программист',
      'Инженер-программист',
      'Менеджер проектов',
      'Бизнес-аналитик',
      'UX/UI дизайнер',
      'Специалист по маркетингу',
      'Бухгалтер',
      'Преподаватель английского языка',
      'Врач',
      'Инженер-строитель'
    ]
  };

  const companies = [
    'TajNet Technologies',
    'Душанбе IT Solutions',
    'Орфо Софт',
    'Таджик Софт',
    'IT Академия',
    'Банк Эсхата',
    'Худжанд Девелопмент',
    'Согд Технологии',
    'Кулоб IT Центр',
    'Курган-Тюбе Софт'
  ];

  const locations = [
    'Душанбе',
    'Худжанд',
    'Кулоб',
    'Курган-Тюбе',
    'Истаравшан',
    'Пенджикент',
    'Вахдат',
    'Турсунзаде',
    'Канибадам',
    'Исфара'
  ];

  const categories = [
    'Информационные технологии',
    'Финансы и банки',
    'Образование',
    'Здравоохранение',
    'Строительство',
    'Маркетинг и реклама',
    'Продажи',
    'Администрация',
    'Производство',
    'Туризм'
  ];

  return Array.from({ length: 50 }, (_, index) => ({
    id: `job-${index + 1}`,
    title: {
      taj: titles.taj[index % titles.taj.length],
      rus: titles.rus[index % titles.rus.length],
    },
    company: {
      name: companies[index % companies.length],
      logo: `https://images.unsplash.com/photo-${1560472354 + index}?w=100&h=100&fit=crop`,
      size: ['10-50', '50-200', '200-1000', '1000+'][Math.floor(Math.random() * 4)],
      industry: categories[index % categories.length],
    },
    location: locations[index % locations.length],
    salary: {
      min: 1000 + (index * 100),
      max: 2000 + (index * 150),
      currency: 'TJS',
      negotiable: Math.random() > 0.7,
    },
    type: ['full-time', 'part-time', 'remote', 'contract', 'internship'][Math.floor(Math.random() * 5)] as any,
    experience: ['entry', 'junior', 'middle', 'senior', 'lead'][Math.floor(Math.random() * 5)] as any,
    category: categories[index % categories.length],
    description: {
      taj: 'Ин корӣ барои касони ботаҷриба ва пешқадам мувофиқ аст. Шумо бояд малакаҳои зарурӣ дошта бошед.',
      rus: 'Эта работа подходит для опытных и начинающих специалистов. Вы должны обладать необходимыми навыками.',
    },
    requirements: {
      taj: ['Таҷрибаи кор', 'Малакаҳои техникӣ', 'Забони англисӣ'],
      rus: ['Опыт работы', 'Технические навыки', 'Английский язык'],
    },
    benefits: {
      taj: ['Маоши хуб', 'Таъмини тиббӣ', 'Рӯзҳои истироҳат'],
      rus: ['Хорошая зарплата', 'Медицинское страхование', 'Отпуск'],
    },
    skills: ['JavaScript', 'React', 'Node.js', 'Python', 'SQL'].slice(0, Math.floor(Math.random() * 3) + 2),
    createdAt: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000),
    expiresAt: new Date(Date.now() + Math.random() * 60 * 24 * 60 * 60 * 1000),
    views: Math.floor(Math.random() * 1000),
    applications: Math.floor(Math.random() * 50),
    featured: Math.random() > 0.8,
    urgent: Math.random() > 0.9,
  }));
};

export const useJobsStore = create<JobsState>((set, get) => ({
  jobs: [],
  filteredJobs: [],
  isLoading: false,
  searchParams: {
    query: '',
    filters: {},
    sort: 'date',
    page: 1,
    limit: 12,
  },
  totalJobs: 0,
  currentPage: 1,

  fetchJobs: async () => {
    set({ isLoading: true });
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 500));
      
      const mockJobs = generateMockJobs();
      set({ 
        jobs: mockJobs, 
        filteredJobs: mockJobs, 
        totalJobs: mockJobs.length,
        isLoading: false 
      });
    } catch (error) {
      set({ isLoading: false });
    }
  },

  searchJobs: (query: string, filters: FilterOptions) => {
    const { jobs } = get();
    let filtered = [...jobs];

    // Filter by search query
    if (query) {
      filtered = filtered.filter(job => 
        job.title.rus.toLowerCase().includes(query.toLowerCase()) ||
        job.title.taj.toLowerCase().includes(query.toLowerCase()) ||
        job.company.name.toLowerCase().includes(query.toLowerCase()) ||
        job.location.toLowerCase().includes(query.toLowerCase())
      );
    }

    // Apply filters
    if (filters.location) {
      filtered = filtered.filter(job => job.location === filters.location);
    }
    if (filters.category) {
      filtered = filtered.filter(job => job.category === filters.category);
    }
    if (filters.type) {
      filtered = filtered.filter(job => job.type === filters.type);
    }
    if (filters.experience) {
      filtered = filtered.filter(job => job.experience === filters.experience);
    }
    if (filters.salary) {
      filtered = filtered.filter(job => 
        job.salary.min >= filters.salary!.min && 
        job.salary.max <= filters.salary!.max
      );
    }
    if (filters.remote) {
      filtered = filtered.filter(job => job.type === 'remote');
    }
    if (filters.featured) {
      filtered = filtered.filter(job => job.featured);
    }

    set({ 
      filteredJobs: filtered,
      totalJobs: filtered.length,
      searchParams: { ...get().searchParams, query, filters }
    });
  },

  setFilters: (filters: FilterOptions) => {
    const { searchParams } = get();
    get().searchJobs(searchParams.query || '', filters);
  },

  setSort: (sort: 'date' | 'salary' | 'relevance') => {
    const { filteredJobs } = get();
    let sorted = [...filteredJobs];

    switch (sort) {
      case 'date':
        sorted.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        break;
      case 'salary':
        sorted.sort((a, b) => b.salary.max - a.salary.max);
        break;
      case 'relevance':
        sorted.sort((a, b) => b.views - a.views);
        break;
    }

    set({ 
      filteredJobs: sorted,
      searchParams: { ...get().searchParams, sort }
    });
  },

  setPage: (page: number) => {
    set({ 
      currentPage: page,
      searchParams: { ...get().searchParams, page }
    });
  },

  getJobById: (id: string) => {
    const { jobs } = get();
    return jobs.find(job => job.id === id);
  },

  applyToJob: async (jobId: string) => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 500));
    
    const { jobs } = get();
    const updatedJobs = jobs.map(job => 
      job.id === jobId 
        ? { ...job, applications: job.applications + 1 }
        : job
    );
    
    set({ jobs: updatedJobs });
  },

  saveJob: (jobId: string) => {
    // This would typically save to user's saved jobs
    console.log('Job saved:', jobId);
  },

  unsaveJob: (jobId: string) => {
    // This would typically remove from user's saved jobs
    console.log('Job unsaved:', jobId);
  },
}));
