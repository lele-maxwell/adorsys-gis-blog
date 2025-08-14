'use client';

import { useState, useEffect } from 'react';
import { Search, ChevronDown } from 'react-feather';
import { CourseCard } from '@blog/components/course-card';
import { Pagination } from '@blog/components/pagination';

interface CoursesContentProps {
  allPages: string[];
  currentPages: string[];
  descriptions: Record<string, string>;
  currentPage: number;
  totalPages: number;
  searchQuery: string;
  filteredPages: string[];
}

// Direct translation function for courses page
function useDirectTranslation() {
  const [currentLanguage, setCurrentLanguage] = useState('en');
  
  // Listen for language changes from the language switcher
  useEffect(() => {
    const handleLanguageChange = (event: CustomEvent) => {
      setCurrentLanguage(event.detail.language);
    };
    
    window.addEventListener('languageChange', handleLanguageChange as EventListener);
    return () => {
      window.removeEventListener('languageChange', handleLanguageChange as EventListener);
    };
  }, []);

  const t = (key: string) => {
    const translations = {
      en: {
        'ourCourses': 'Our Courses',
        'coursesDescription': 'Explore our comprehensive collection of GIS lessons, from fundamentals to advanced techniques. Each course is designed with interactive content and practical examples.',
        'searchPlaceholder': 'What are you looking for?',
        'courses': 'Courses',
        'coursesAvailable': 'courses available',
        'resultsFor': 'Results for'
      },
      fr: {
        'ourCourses': 'Nos Cours',
        'coursesDescription': 'Explorez notre collection complète de leçons SIG, des fondamentaux aux techniques avancées. Chaque cours est conçu avec du contenu interactif et des exemples pratiques.',
        'searchPlaceholder': 'Que recherchez-vous ?',
        'courses': 'Cours',
        'coursesAvailable': 'cours disponibles',
        'resultsFor': 'Résultats pour'
      },
      es: {
        'ourCourses': 'Nuestros Cursos',
        'coursesDescription': 'Explora nuestra colección integral de lecciones SIG, desde fundamentos hasta técnicas avanzadas. Cada curso está diseñado con contenido interactivo y ejemplos prácticos.',
        'searchPlaceholder': '¿Qué estás buscando?',
        'courses': 'Cursos',
        'coursesAvailable': 'cursos disponibles',
        'resultsFor': 'Resultados para'
      }
    };

    return translations[currentLanguage as keyof typeof translations]?.[key as keyof typeof translations.en] || key;
  };

  return { t, currentLanguage };
}

export default function CoursesContent({
  allPages,
  currentPages,
  descriptions,
  currentPage,
  totalPages,
  searchQuery,
  filteredPages,
}: CoursesContentProps) {
  const { t } = useDirectTranslation();

  return (
    <>
      {/* Header Section */}
      <div className='text-center mb-12'>
        <h1 className='text-4xl md:text-6xl font-extrabold mb-6'>
          <span className='bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent'>
            {t('ourCourses')}
          </span>
        </h1>
        <p className='text-lg md:text-xl opacity-80 max-w-2xl mx-auto leading-relaxed'>
          {t('coursesDescription')}
        </p>
      </div>

      {/* Search Section */}
      <div className='max-w-2xl mx-auto mb-12'>
        <form className='relative'>
          <div className='relative flex items-center bg-base-200 border border-base-300 rounded-full overflow-hidden shadow-sm'>
            {/* Search Input */}
            <input
              type='text'
              name='search'
              placeholder={t('searchPlaceholder')}
              defaultValue={searchQuery}
              className='flex-1 pl-6 pr-4 py-4 bg-transparent border-none outline-none text-base placeholder:text-base-content/50'
            />
            
            {/* Dropdown Divider */}
            <div className='w-px h-8 bg-base-300'></div>
            
            {/* Dropdown Menu */}
            <div className='flex items-center gap-2 px-4 py-2 cursor-pointer hover:bg-base-300 transition-colors duration-200'>
              <span className='text-sm font-medium text-base-content/70'>{t('courses')}</span>
              <ChevronDown className='w-4 h-4 text-base-content/50' />
            </div>
            
            {/* Search Button */}
            <button
              type='submit'
              className='ml-2 p-4 bg-primary hover:bg-primary-focus text-primary-content rounded-full transition-all duration-200 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-primary/50'
            >
              <Search className='w-5 h-5' />
            </button>
          </div>
        </form>
      </div>

      {/* Results Summary */}
      <div className='text-center mb-8'>
        <div className='inline-flex items-center gap-2 px-4 py-2 bg-base-200 rounded-full'>
          <span className='text-sm font-medium'>
            {filteredPages.length} {t('coursesAvailable')}
          </span>
          {searchQuery && (
            <>
              <span className='text-base-content/30'>•</span>
              <span className='text-sm opacity-70'>
                {t('resultsFor')} "{searchQuery}"
              </span>
            </>
          )}
        </div>
      </div>

      {/* Courses Grid */}
      <div className='grid gap-8 sm:grid-cols-2 lg:grid-cols-3 mb-12'>
        {currentPages.map((blog_slug, index) => (
          <CourseCard
            key={blog_slug}
            blog_slug={blog_slug}
            index={index}
            description={descriptions[blog_slug]}
          />
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className='flex justify-center'>
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            searchQuery={searchQuery}
          />
        </div>
      )}
    </>
  );
} 