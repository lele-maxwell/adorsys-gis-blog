'use client';

import { useState, useEffect, useCallback } from 'react';
import { Search, ChevronDown, X } from 'react-feather';
import { CourseCard } from '@blog/components/course-card';
import { Pagination } from '@blog/components/pagination';
import { useRouter, useSearchParams } from 'next/navigation';
import { useLanguage } from '@blog/components/language-switcher';

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
  const { currentLanguage } = useLanguage();

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
        'tryDifferentKeywords': 'Try different keywords or browse all courses',
        'searchSuggestions': 'Popular searches:',
        'suggestion1': 'gis',
        'suggestion2': 'analysis',
        'suggestion3': 'programming',
        'suggestion4': 'web mapping',
        'suggestion5': 'database',
        'suggestion6': 'automation'
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
        'tryDifferentKeywords': 'Essayez différents mots-clés ou parcourez tous les cours',
        'searchSuggestions': 'Recherches populaires:',
        'suggestion1': 'sig',
        'suggestion2': 'analyse',
        'suggestion3': 'programmation',
        'suggestion4': 'cartographie web',
        'suggestion5': 'base de données',
        'suggestion6': 'automatisation'
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
        'tryDifferentKeywords': 'Intenta diferentes palabras clave o explora todos los cursos',
        'searchSuggestions': 'Búsquedas populares:',
        'suggestion1': 'sig',
        'suggestion2': 'análisis',
        'suggestion3': 'programación',
        'suggestion4': 'mapeo web',
        'suggestion5': 'base de datos',
        'suggestion6': 'automatización'
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

  const handleSuggestionClick = useCallback((suggestion: string) => {
    setLocalSearchQuery(suggestion);
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
        <p className='text-lg md:text-xl text-white/75 max-w-2xl mx-auto leading-relaxed'>
          {t('coursesDescription')}
        </p>
      </div>

      {/* Enhanced Search Section */}
      <div className='max-w-2xl mx-auto mb-8'>
        <form onSubmit={handleSubmit} className='relative'>
          <div className='relative flex items-center bg-white/15 backdrop-blur-xl border border-white/20 rounded-full overflow-hidden shadow-2xl focus-within:ring-2 focus-within:ring-primary/50 focus-within:border-primary transition-all duration-200'>
            {/* Search Input */}
            <input
              type='text'
              name='search'
              placeholder={t('searchPlaceholder')}
              value={localSearchQuery}
              onChange={handleSearchChange}
              className='flex-1 pl-6 pr-12 py-4 bg-transparent border-none outline-none text-white placeholder:text-white/50'
              autoComplete='off'
            />
            
            {/* Clear Search Button */}
            {localSearchQuery && (
              <button
                type='button'
                onClick={handleClearSearch}
                className='absolute right-16 p-2 text-white/50 hover:text-white transition-colors duration-200'
                aria-label={t('clearSearch')}
              >
                <X className='w-4 h-4' />
              </button>
            )}
            
            {/* Dropdown Divider */}
            <div className='w-px h-8 bg-white/20'></div>
            
            {/* Dropdown Menu */}
            <div className='flex items-center gap-2 px-4 py-2 cursor-pointer hover:bg-white/10 transition-colors duration-200'>
              <span className='text-sm font-medium text-white/60'>{t('courses')}</span>
              <ChevronDown className='w-4 h-4 text-white/50' />
            </div>
            
            {/* Search Button */}
            <button
              type='submit'
              className='ml-2 p-4 bg-primary hover:bg-primary-focus text-primary-content rounded-full transition-all duration-200 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-primary/50 shadow-xl'
            >
              <Search className='w-5 h-5' />
            </button>
          </div>
        </form>
        
        {/* Search Suggestions */}
        {!localSearchQuery && (
          <div className='mt-4 text-center'>
            <p className='text-sm text-white/50 mb-2'>{t('searchSuggestions')}</p>
            <div className='flex flex-wrap justify-center gap-2'>
              {[
                t('suggestion1'),
                t('suggestion2'),
                t('suggestion3'),
                t('suggestion4'),
                t('suggestion5'),
                t('suggestion6')
              ].map((suggestion, index) => (
                <button
                  key={index}
                  onClick={() => handleSuggestionClick(suggestion)}
                  className='px-3 py-1 text-xs bg-white/15 hover:bg-primary/25 hover:text-primary text-white/70 rounded-full transition-all duration-200 hover:scale-105 border border-white/20 hover:border-primary/30 backdrop-blur-md'
                >
                  {suggestion}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Results Summary */}
      <div className='text-center mb-8'>
        <div className='inline-flex items-center gap-2 px-4 py-2 bg-white/15 backdrop-blur-xl rounded-full border border-white/20'>
          <span className='text-sm font-medium text-white/80'>
            {filteredPages.length} {t('coursesAvailable')}
          </span>
          {searchQuery && (
            <>
              <span className='text-white/30'>•</span>
              <span className='text-sm text-white/60'>
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
            <h3 className='text-xl font-semibold mb-2 text-white'>{t('noResults')}</h3>
            <p className='text-white/60'>{t('tryDifferentKeywords')}</p>
          </div>
        </div>
      )}

      {/* Courses Grid */}
      {filteredPages.length > 0 && (
        <div className='grid gap-8 sm:grid-cols-2 lg:grid-cols-3 mb-12 items-stretch'>
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