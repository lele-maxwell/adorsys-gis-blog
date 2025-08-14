'use client';

import { useState, useEffect, useCallback } from 'react';
import { Search, ChevronDown, X } from 'react-feather';
import { CourseCard } from '@blog/components/course-card';
import { Pagination } from '@blog/components/pagination';
import { useRouter, useSearchParams } from 'next/navigation';

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
        'searchPlaceholder': 'Search courses, topics, or keywords...',
        'courses': 'Courses',
        'coursesAvailable': 'courses available',
        'resultsFor': 'Results for',
        'clearSearch': 'Clear search',
        'noResults': 'No courses found',
        'tryDifferentKeywords': 'Try different keywords or browse all courses'
      },
      fr: {
        'ourCourses': 'Nos Cours',
        'coursesDescription': 'Explorez notre collection complète de leçons SIG, des fondamentaux aux techniques avancées. Chaque cours est conçu avec du contenu interactif et des exemples pratiques.',
        'searchPlaceholder': 'Rechercher des cours, sujets ou mots-clés...',
        'courses': 'Cours',
        'coursesAvailable': 'cours disponibles',
        'resultsFor': 'Résultats pour',
        'clearSearch': 'Effacer la recherche',
        'noResults': 'Aucun cours trouvé',
        'tryDifferentKeywords': 'Essayez différents mots-clés ou parcourez tous les cours'
      },
      es: {
        'ourCourses': 'Nuestros Cursos',
        'coursesDescription': 'Explora nuestra colección integral de lecciones SIG, desde fundamentos hasta técnicas avanzadas. Cada curso está diseñado con contenido interactivo y ejemplos prácticos.',
        'searchPlaceholder': 'Buscar cursos, temas o palabras clave...',
        'courses': 'Cursos',
        'coursesAvailable': 'cursos disponibles',
        'resultsFor': 'Resultados para',
        'clearSearch': 'Limpiar búsqueda',
        'noResults': 'No se encontraron cursos',
        'tryDifferentKeywords': 'Intenta diferentes palabras clave o explora todos los cursos'
      }
    };

    return translations[currentLanguage as keyof typeof translations]?.[key as keyof typeof translations.en] || key;
  };

  return { t, currentLanguage };
}

// Debounce hook for search
function useDebounce(value: string, delay: number) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
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
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const [localSearchQuery, setLocalSearchQuery] = useState(searchQuery);
  const debouncedSearchQuery = useDebounce(localSearchQuery, 300);

  // Update URL when debounced search changes
  useEffect(() => {
    const params = new URLSearchParams(searchParams);
    if (debouncedSearchQuery) {
      params.set('search', debouncedSearchQuery);
      params.set('page', '1'); // Reset to first page when searching
    } else {
      params.delete('search');
    }
    router.push(`/courses?${params.toString()}`);
  }, [debouncedSearchQuery, router, searchParams]);

  // Update local search when URL changes
  useEffect(() => {
    setLocalSearchQuery(searchQuery);
  }, [searchQuery]);

  const handleSearchChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setLocalSearchQuery(e.target.value);
  }, []);

  const handleClearSearch = useCallback(() => {
    setLocalSearchQuery('');
  }, []);

  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    // Search is already handled by the debounced effect
  }, []);

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

      {/* Enhanced Search Section */}
      <div className='max-w-2xl mx-auto mb-12'>
        <form onSubmit={handleSubmit} className='relative'>
          <div className='relative flex items-center bg-base-200 border border-base-300 rounded-full overflow-hidden shadow-sm focus-within:ring-2 focus-within:ring-primary/50 focus-within:border-primary transition-all duration-200'>
            {/* Search Input */}
            <input
              type='text'
              name='search'
              placeholder={t('searchPlaceholder')}
              value={localSearchQuery}
              onChange={handleSearchChange}
              className='flex-1 pl-6 pr-12 py-4 bg-transparent border-none outline-none text-base placeholder:text-base-content/50'
              autoComplete='off'
            />
            
            {/* Clear Search Button */}
            {localSearchQuery && (
              <button
                type='button'
                onClick={handleClearSearch}
                className='absolute right-16 p-2 text-base-content/50 hover:text-base-content transition-colors duration-200'
                aria-label={t('clearSearch')}
              >
                <X className='w-4 h-4' />
              </button>
            )}
            
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

      {/* No Results Message */}
      {filteredPages.length === 0 && searchQuery && (
        <div className='text-center py-12'>
          <div className='max-w-md mx-auto'>
            <div className='text-6xl mb-4'>🔍</div>
            <h3 className='text-xl font-semibold mb-2'>{t('noResults')}</h3>
            <p className='text-base-content/70'>{t('tryDifferentKeywords')}</p>
          </div>
        </div>
      )}

      {/* Courses Grid */}
      {filteredPages.length > 0 && (
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
      )}

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