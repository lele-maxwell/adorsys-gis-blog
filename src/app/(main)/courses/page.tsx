import Link from 'next/link';
import { getAllBlogs } from '@blog/server/blog';
import { Container } from '@blog/components/container';
import type { Metadata } from 'next';
import { Pagination } from '@blog/components/pagination';
import { CourseCard } from '@blog/components/course-card';
import { DecorativeElements } from '@blog/components/decorative-elements';
import { Search, ChevronDown } from 'react-feather';
import { loadBlog } from '@blog/converters';
import { CoursesContent } from '@blog/components/courses-content';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Courses | adorsys GIS',
  description: 'Browse all available lessons and blog courses.',
};

interface SearchParams {
  page?: string;
  search?: string;
}

// Course title mapping for better search - now with translations
const getCourseTitle = (slug: string): string => {
  const courseTitles = {
    en: {
      'first-lesson': 'Introduction to GIS',
      '03-gis-fundamentals': 'GIS Fundamentals',
      'spatial-analysis': 'Spatial Analysis',
      'web-mapping': 'Web Mapping',
      'remote-sensing': 'Remote Sensing',
      'database-management': 'Database Management',
      'programming': 'GIS Programming',
      'advanced-techniques': 'Advanced Techniques',
      'automation': 'Process Automation',
      'project-management': 'Project Management',
      // Add mappings for actual course slugs
      'd-gis': '3D GIS',
      'gis-fundamentals': 'GIS Fundamentals',
    },
    fr: {
      'first-lesson': 'Introduction aux SIG',
      '03-gis-fundamentals': 'Fondamentaux SIG',
      'spatial-analysis': 'Analyse Spatiale',
      'web-mapping': 'Cartographie Web',
      'remote-sensing': 'Télédétection',
      'database-management': 'Gestion de Base de Données',
      'programming': 'Programmation SIG',
      'advanced-techniques': 'Techniques Avancées',
      'automation': 'Automatisation des Processus',
      'project-management': 'Gestion de Projet',
      // Add mappings for actual course slugs
      'd-gis': 'SIG 3D',
      'gis-fundamentals': 'Fondamentaux SIG',
    },
    es: {
      'first-lesson': 'Introducción a los SIG',
      '03-gis-fundamentals': 'Fundamentos SIG',
      'spatial-analysis': 'Análisis Espacial',
      'web-mapping': 'Mapeo Web',
      'remote-sensing': 'Percepción Remota',
      'database-management': 'Gestión de Base de Datos',
      'programming': 'Programación SIG',
      'advanced-techniques': 'Técnicas Avanzadas',
      'automation': 'Automatización de Procesos',
      'project-management': 'Gestión de Proyectos',
      // Add mappings for actual course slugs
      'd-gis': 'SIG 3D',
      'gis-fundamentals': 'Fundamentos SIG',
    }
  };

  // For now, default to English. In a real implementation, you'd get the current language
  const titles = courseTitles.en;
  const title = titles[slug as keyof typeof titles];
  
  if (title) return title;
  
  // Fallback: format the slug
  const cleanSlug = slug.replace(/\d+/g, '').replace(/[-_]/g, ' ').trim();
  return cleanSlug.replace(/\b\w/g, l => l.toUpperCase());
};

// Course description mapping for better search - now with translations
const getCourseDescription = (slug: string): string => {
  const courseDescriptions = {
    en: {
      'first-lesson': 'Learn the fundamentals of Geographic Information Systems and spatial data concepts.',
      '03-gis-fundamentals': 'Master core GIS principles, data types, and basic spatial analysis techniques.',
      'spatial-analysis': 'Explore advanced spatial analysis methods and statistical techniques for geographic data.',
      'web-mapping': 'Create interactive web maps and develop modern mapping applications.',
      'remote-sensing': 'Understand satellite imagery analysis and remote sensing data processing.',
      'database-management': 'Learn spatial database design and management for GIS applications.',
      'programming': 'Develop GIS automation scripts and custom spatial analysis tools.',
      'advanced-techniques': 'Master advanced GIS workflows and specialized analysis methods.',
      'automation': 'Automate GIS processes and create efficient spatial data workflows.',
      'project-management': 'Plan and execute GIS projects from conception to completion.',
      // Add descriptions for actual course slugs
      'd-gis': 'Explore three-dimensional geographic information systems and learn techniques for creating, analyzing, and visualizing 3D spatial data.',
      'gis-fundamentals': 'This lesson covers the core concepts of Geographic Information Systems, providing a solid foundation for understanding spatial data and analysis.',
    },
    fr: {
      'first-lesson': 'Apprenez les fondamentaux des Systèmes d\'Information Géographique et des concepts de données spatiales.',
      '03-gis-fundamentals': 'Maîtrisez les principes fondamentaux des SIG, les types de données et les techniques d\'analyse spatiale de base.',
      'spatial-analysis': 'Explorez les méthodes d\'analyse spatiale avancées et les techniques statistiques pour les données géographiques.',
      'web-mapping': 'Créez des cartes web interactives et développez des applications de cartographie modernes.',
      'remote-sensing': 'Comprenez l\'analyse d\'imagerie satellite et le traitement des données de télédétection.',
      'database-management': 'Apprenez la conception et la gestion de bases de données spatiales pour les applications SIG.',
      'programming': 'Développez des scripts d\'automatisation SIG et des outils d\'analyse spatiale personnalisés.',
      'advanced-techniques': 'Maîtrisez les workflows SIG avancés et les méthodes d\'analyse spécialisées.',
      'automation': 'Automatisez les processus SIG et créez des workflows de données spatiales efficaces.',
      'project-management': 'Planifiez et exécutez des projets SIG de la conception à la finalisation.',
      // Add descriptions for actual course slugs
      'd-gis': 'Explorez les systèmes d\'information géographique tridimensionnels et apprenez les techniques de création, d\'analyse et de visualisation de données spatiales 3D.',
      'gis-fundamentals': 'Cette leçon couvre les concepts fondamentaux des Systèmes d\'Information Géographique, fournissant une base solide pour comprendre les données spatiales et l\'analyse.',
    },
    es: {
      'first-lesson': 'Aprende los fundamentos de los Sistemas de Información Geográfica y conceptos de datos espaciales.',
      '03-gis-fundamentals': 'Domina los principios fundamentales de los SIG, tipos de datos y técnicas básicas de análisis espacial.',
      'spatial-analysis': 'Explora métodos avanzados de análisis espacial y técnicas estadísticas para datos geográficos.',
      'web-mapping': 'Crea mapas web interactivos y desarrolla aplicaciones de mapeo modernas.',
      'remote-sensing': 'Comprende el análisis de imágenes satelitales y el procesamiento de datos de percepción remota.',
      'database-management': 'Aprende diseño y gestión de bases de datos espaciales para aplicaciones SIG.',
      'programming': 'Desarrolla scripts de automatización SIG y herramientas personalizadas de análisis espacial.',
      'advanced-techniques': 'Domina flujos de trabajo SIG avanzados y métodos de análisis especializados.',
      'automation': 'Automatiza procesos SIG y crea flujos de trabajo de datos espaciales eficientes.',
      'project-management': 'Planifica y ejecuta proyectos SIG desde la concepción hasta la finalización.',
      // Add descriptions for actual course slugs
      'd-gis': 'Explora los sistemas de información geográfica tridimensionales y aprende técnicas para crear, analizar y visualizar datos espaciales 3D.',
      'gis-fundamentals': 'Esta lección cubre los conceptos fundamentales de los Sistemas de Información Geográfica, proporcionando una base sólida para entender los datos espaciales y el análisis.',
    }
  };

  // For now, default to English. In a real implementation, you'd get the current language
  const descriptions = courseDescriptions.en;
  const description = descriptions[slug as keyof typeof descriptions];
  
  return description || 'Explore comprehensive GIS concepts and practical applications.';
};

function stripHtml(html: string): string {
  return html.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
}

function truncate(text: string, words: number): string {
  const parts = text.split(' ');
  if (parts.length <= words) return text;
  return parts.slice(0, words).join(' ') + '…';
}

function extractOverview(html: string): string | null {
  // Try to find an Overview/Project Overview heading and take the first following paragraph
  const overviewHeadingRegex = /<h[1-4][^>]*>([^<]*overview[^<]*)<\/h[1-4]>[\s\S]*?(<p>[\s\S]*?<\/p>)/i;
  const overviewMatch = overviewHeadingRegex.exec(html);
  if (overviewMatch && overviewMatch[2]) {
    return stripHtml(overviewMatch[2]);
  }
  // Fallback: first paragraph in the document
  const firstParagraph = /<p>([\s\S]*?)<\/p>/i.exec(html);
  if (firstParagraph && firstParagraph[1]) {
    return stripHtml(firstParagraph[1]);
  }
  return null;
}

// Enhanced search function that searches in titles, descriptions, and content with partial matching
function searchInCourse(searchQuery: string, slug: string, description: string): boolean {
  if (!searchQuery.trim()) return true;
  
  const query = searchQuery.toLowerCase().trim();
  const title = getCourseTitle(slug).toLowerCase();
  const courseDescription = getCourseDescription(slug).toLowerCase();
  const contentDescription = description.toLowerCase();
  const slugLower = slug.toLowerCase();
  
  // Split query into individual words for partial matching
  const queryWords = query.split(/\s+/).filter(word => word.length > 0);
  
  // If single word query, check for partial matches
  if (queryWords.length === 1) {
    const word = queryWords[0];
    if (!word) return false;
    
    // Check if any field contains the word (partial match)
    return (
      title.includes(word) ||
      courseDescription.includes(word) ||
      contentDescription.includes(word) ||
      slugLower.includes(word)
    );
  }
  
  // For multi-word queries, check if ALL words are found in ANY field
  return queryWords.every(word => {
    if (!word) return false;
    return (
      title.includes(word) ||
      courseDescription.includes(word) ||
      contentDescription.includes(word) ||
      slugLower.includes(word)
    );
  });
}

export default async function CoursesPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams> | SearchParams;
}) {
  const resolvedParams = await Promise.resolve(searchParams);
  const { page = '1', search = '' } = resolvedParams;

  const allPages = await getAllBlogs();
  const currentPage = parseInt(page || '1');
  const searchQuery = search || '';
  const itemsPerPage = 6;

  // Build descriptions from course content (Overview/first paragraph)
  const descriptionsEntries = await Promise.all(
    allPages.map(async (slug) => {
      try {
        const { course } = await loadBlog(slug);
        const html = course?.content ?? '';
        const overview = extractOverview(html);
        const description = truncate(overview ?? getCourseDescription(slug), 28);
        return [slug, description] as const;
      } catch {
        return [slug, getCourseDescription(slug)] as const;
      }
    })
  );
  const descriptions = Object.fromEntries(descriptionsEntries);

  // Enhanced filtering with comprehensive search
  const filteredPages = allPages.filter((page) => {
    const description = descriptions[page];
    if (!description) return false;
    return searchInCourse(searchQuery, page, description);
  });

  // Calculate pagination
  const totalPages = Math.ceil(filteredPages.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentPages = filteredPages.slice(startIndex, endIndex);

  return (
    <div className='min-h-screen relative overflow-hidden'>
      {/* Professional Dark Background with GIS Theme */}
      <div className='absolute inset-0 z-0'>
        <div 
          className='w-full h-full bg-cover bg-center bg-no-repeat'
          style={{
            backgroundImage: `url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1920 1080"><defs><radialGradient id="bg" cx="0.5" cy="0.5" r="0.5"><stop offset="0%" stop-color="%231a1a1a"/><stop offset="30%" stop-color="%23151515"/><stop offset="60%" stop-color="%23101010"/><stop offset="100%" stop-color="%230a0a0a"/></radialGradient><linearGradient id="grid" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="%230ea5e9" stop-opacity="0.06"/><stop offset="50%" stop-color="%238b5cf6" stop-opacity="0.05"/><stop offset="100%" stop-color="%230ea5e9" stop-opacity="0.04"/></linearGradient><linearGradient id="accent" x1="0%" y1="0%" x2="100%" y2="0%"><stop offset="0%" stop-color="%230ea5e9" stop-opacity="0.2"/><stop offset="50%" stop-color="%238b5cf6" stop-opacity="0.15"/><stop offset="100%" stop-color="%230ea5e9" stop-opacity="0.2"/></linearGradient><pattern id="hex" width="120" height="104" patternUnits="userSpaceOnUse"><path d="M60 0l60 52v52L60 156 0 104V52L60 0z" fill="none" stroke="%230ea5e9" stroke-width="0.6" opacity="0.12"/></pattern><pattern id="dots" width="80" height="80" patternUnits="userSpaceOnUse"><circle cx="40" cy="40" r="1.2" fill="%230ea5e9" opacity="0.18"/></pattern><filter id="glow"><feGaussianBlur stdDeviation="4" result="coloredBlur"/><feMerge><feMergeNode in="coloredBlur"/><feMergeNode in="SourceGraphic"/></feMerge></filter><filter id="subtle"><feGaussianBlur stdDeviation="1" result="subtleBlur"/><feMerge><feMergeNode in="subtleBlur"/><feMergeNode in="SourceGraphic"/></feMerge></filter></defs><rect width="1920" height="1080" fill="url(%23bg)"/><rect width="1920" height="1080" fill="url(%23grid)"/><rect width="1920" height="1080" fill="url(%23hex)"/><rect width="1920" height="1080" fill="url(%23dots)"/><g filter="url(%23glow)"><circle cx="400" cy="250" r="150" fill="%230ea5e9" opacity="0.05"/><circle cx="1500" cy="750" r="180" fill="%238b5cf6" opacity="0.04"/><circle cx="1200" cy="200" r="100" fill="%2310b981" opacity="0.035"/><polygon points="500,700 600,600 700,700 600,800" fill="%230ea5e9" opacity="0.025"/><polygon points="1400,500 1500,400 1600,500 1500,600" fill="%238b5cf6" opacity="0.02"/></g><g filter="url(%23subtle)" opacity="0.3"><path d="M0 300 Q500 200 1000 300 T2000 300" stroke="url(%23accent)" stroke-width="0.8" fill="none"/><path d="M0 700 Q500 600 1000 700 T2000 700" stroke="url(%23accent)" stroke-width="0.8" fill="none"/><path d="M300 0 Q300 200 300 400 T300 800" stroke="url(%23accent)" stroke-width="0.8" fill="none"/><path d="M1600 0 Q1600 200 1600 400 T1600 800" stroke="url(%23accent)" stroke-width="0.8" fill="none"/></g><g opacity="0.25"><circle cx="150" cy="150" r="1.5" fill="%230ea5e9"/><circle cx="1770" cy="930" r="1.5" fill="%238b5cf6"/><circle cx="1770" cy="150" r="1.5" fill="%2310b981"/><circle cx="150" cy="930" r="1.5" fill="%230ea5e9"/></g><g opacity="0.2"><rect x="0" y="0" width="1920" height="2" fill="url(%23accent)"/><rect x="0" y="1078" width="1920" height="2" fill="url(%23accent)"/><rect x="0" y="0" width="2" height="1080" fill="url(%23accent)"/><rect x="1918" y="0" width="2" height="1080" fill="url(%23accent)"/></g></svg>')`
          }}
        />
      </div>

      {/* Content Area */}
      <div className='relative z-10 ml-24'>
        <Container className='relative overflow-hidden'>
          {/* Decorative Background Elements */}
          <DecorativeElements />
          
          <CoursesContent
            allPages={allPages}
            currentPages={currentPages}
            descriptions={descriptions}
            currentPage={currentPage}
            totalPages={totalPages}
            searchQuery={searchQuery}
            filteredPages={filteredPages}
          />
        </Container>
      </div>
    </div>
  );
} 