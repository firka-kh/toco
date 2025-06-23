import React from 'react';
import { motion } from 'framer-motion';
import { 
  Search, 
  MapPin, 
  Briefcase, 
  Users, 
  TrendingUp, 
  Star,
  ArrowRight,
  Building,
  Clock,
  Eye
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLocale } from '@/hooks/useLocale';
import { useJobsStore } from '@/store/jobsStore';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import Input from '@/components/ui/Input';
import { formatSalary, timeAgo } from '@/utils';

const HomePage: React.FC = () => {
  const { t, getLocalizedText } = useLocale();
  const { jobs, fetchJobs } = useJobsStore();
  const [searchQuery, setSearchQuery] = React.useState('');
  const [searchLocation, setSearchLocation] = React.useState('');

  React.useEffect(() => {
    fetchJobs();
  }, [fetchJobs]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Redirect to jobs page with search params
    window.location.href = `/jobs?q=${encodeURIComponent(searchQuery)}&location=${encodeURIComponent(searchLocation)}`;
  };

  const featuredJobs = jobs.filter(job => job.featured).slice(0, 6);
  const recentJobs = jobs.slice(0, 8);

  const stats = [
    { 
      icon: Briefcase, 
      value: '2,500+', 
      label: t('stats.jobs'),
      color: 'from-blue-500 to-blue-600'
    },
    { 
      icon: Building, 
      value: '500+', 
      label: t('stats.companies'),
      color: 'from-green-500 to-green-600'
    },
    { 
      icon: Users, 
      value: '15,000+', 
      label: t('stats.users'),
      color: 'from-purple-500 to-purple-600'
    },
    { 
      icon: TrendingUp, 
      value: '98%', 
      label: 'Успешных размещений',
      color: 'from-orange-500 to-orange-600'
    },
  ];

  const categories = [
    { name: 'Информационные технологии', count: 450, icon: '💻' },
    { name: 'Финансы и банки', count: 320, icon: '💰' },
    { name: 'Образование', count: 280, icon: '📚' },
    { name: 'Здравоохранение', count: 240, icon: '🏥' },
    { name: 'Строительство', count: 210, icon: '🏗️' },
    { name: 'Маркетинг и реклама', count: 180, icon: '📊' },
  ];

  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-600 via-purple-600 to-blue-800 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black/20" />
        <div className="relative container mx-auto px-4 py-20">
          <div className="max-w-4xl mx-auto text-center">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-4xl md:text-6xl font-bold mb-6"
            >
              {t('hero.title')}
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-xl md:text-2xl mb-12 text-blue-100"
            >
              {t('hero.subtitle')}
            </motion.p>

            {/* Search Form */}
            <motion.form
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              onSubmit={handleSearch}
              className="bg-white rounded-2xl p-6 shadow-2xl max-w-4xl mx-auto"
            >
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="md:col-span-2">
                  <Input
                    placeholder={t('hero.searchPlaceholder')}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    icon={<Search className="h-5 w-5" />}
                    className="border-0 bg-gray-50 text-lg"
                  />
                </div>
                <div className="flex space-x-2">
                  <Input
                    placeholder="Местоположение"
                    value={searchLocation}
                    onChange={(e) => setSearchLocation(e.target.value)}
                    icon={<MapPin className="h-5 w-5" />}
                    className="border-0 bg-gray-50"
                  />
                  <Button type="submit" size="lg" className="px-8">
                    {t('hero.searchButton')}
                  </Button>
                </div>
              </div>
            </motion.form>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="text-center">
                <div className={`w-12 h-12 mx-auto mb-4 rounded-full bg-gradient-to-r ${stat.color} flex items-center justify-center`}>
                  <stat.icon className="h-6 w-6 text-white" />
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</div>
                <div className="text-gray-600">{stat.label}</div>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Popular Categories */}
      <section className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            {t('hero.popularCategories')}
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Найдите работу в самых востребованных отраслях Таджикистана
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Link to={`/jobs?category=${encodeURIComponent(category.name)}`}>
                <Card hover className="group">
                  <div className="flex items-center space-x-4">
                    <div className="text-3xl">{category.icon}</div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 group-hover:text-primary-600 transition-colors">
                        {category.name}
                      </h3>
                      <p className="text-gray-500">{category.count} вакансий</p>
                    </div>
                    <ArrowRight className="h-5 w-5 text-gray-400 group-hover:text-primary-600 transition-colors" />
                  </div>
                </Card>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Featured Jobs */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              {t('hero.featuredJobs')}
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Рекомендуемые вакансии от лучших работодателей
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {featuredJobs.map((job, index) => (
              <motion.div
                key={job.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Link to={`/jobs/${job.id}`}>
                  <Card hover className="h-full">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <img
                          src={job.company.logo}
                          alt={job.company.name}
                          className="w-12 h-12 rounded-lg object-cover"
                        />
                        <div>
                          <h3 className="font-semibold text-gray-900">
                            {getLocalizedText(job.title)}
                          </h3>
                          <p className="text-gray-600">{job.company.name}</p>
                        </div>
                      </div>
                      {job.featured && (
                        <Star className="h-5 w-5 text-yellow-500 fill-current" />
                      )}
                    </div>

                    <div className="space-y-2 mb-4">
                      <div className="flex items-center text-gray-600">
                        <MapPin className="h-4 w-4 mr-2" />
                        <span className="text-sm">{job.location}</span>
                      </div>
                      <div className="flex items-center text-gray-600">
                        <Briefcase className="h-4 w-4 mr-2" />
                        <span className="text-sm">{t(`jobTypes.${job.type}`)}</span>
                      </div>
                      <div className="flex items-center text-gray-600">
                        <Clock className="h-4 w-4 mr-2" />
                        <span className="text-sm">{timeAgo(job.createdAt)}</span>
                      </div>
                    </div>

                    <div className="flex justify-between items-center">
                      <span className="font-semibold text-primary-600">
                        {formatSalary(job.salary.min, job.salary.max, job.salary.currency)}
                      </span>
                      <div className="flex items-center text-gray-500">
                        <Eye className="h-4 w-4 mr-1" />
                        <span className="text-sm">{job.views}</span>
                      </div>
                    </div>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>

          <div className="text-center">
            <Link to="/jobs">
              <Button size="lg">
                Посмотреть все вакансии
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-gradient-to-r from-primary-600 to-purple-600 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Готовы найти работу мечты?
          </h2>
          <p className="text-xl mb-8 text-blue-100">
            Присоединяйтесь к тысячам успешных соискателей
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/resume">
              <Button variant="outline" size="lg" className="bg-white text-primary-600 border-white hover:bg-gray-100">
                {t('nav.resume')}
              </Button>
            </Link>
            <Link to="/jobs">
              <Button variant="ghost" size="lg" className="text-white border-white hover:bg-white/10">
                {t('nav.jobs')}
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
