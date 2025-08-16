'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { motion, useInView, useScroll, useTransform, easeOut } from 'framer-motion';
import { BookOpen, Code, Globe, Database, Map, Layers, BarChart, Settings, Zap, Target } from 'react-feather';
import { useLanguage } from '@blog/components/language-switcher';

interface CourseCardProps {
  blog_slug: string;
  index: number;
  description?: string;
}

// Course icon mapping
const getCourseIcon = (slug: string) => {
  const courseIcons: { [key: string]: any } = {
    'first-lesson': BookOpen,
    'gis-basics': Map,
    'spatial-analysis': BarChart,
    'web-mapping': Globe,
    'remote-sensing': Layers,
    'database-management': Database,
    'programming': Code,
    'advanced-techniques': Settings,
    'automation': Zap,
    'project-management': Target,
  };
  
  return courseIcons[slug] || BookOpen;
};

// Direct translation function for course cards
function useDirectTranslation() {
  const { currentLanguage } = useLanguage();

  const getCourseTitle = (slug: string): string => {
    const courseTitles = {
      en: {
        '01-first-lesson': 'Secure Software Development Lifecycle',
        '02-first-lesson': 'Secure Software Development Lifecycle',
        '03-gis-fundamentals': 'GIS Fundamentals',
        '04-spatial-analysis': 'Spatial Analysis Techniques',
        '05-web-mapping': 'Web Mapping and Visualization',
        '06-remote-sensing': 'Remote Sensing and Satellite Imagery',
        '07-3d-gis': '3D GIS and Terrain Modeling',
        // Also support the actual slugs from markdown files
        'first-lesson': 'Secure Software Development Lifecycle',
        'gis-fundamentals': 'GIS Fundamentals',
        'spatial-analysis': 'Spatial Analysis Techniques',
        'web-mapping': 'Web Mapping and Visualization',
        'remote-sensing': 'Remote Sensing and Satellite Imagery',
        '3d-gis': '3D GIS and Terrain Modeling',
      },
      fr: {
        '01-first-lesson': 'Cycle de Vie du Développement Logiciel Sécurisé',
        '02-first-lesson': 'Cycle de Vie du Développement Logiciel Sécurisé',
        '03-gis-fundamentals': 'Fondamentaux SIG',
        '04-spatial-analysis': 'Techniques d\'Analyse Spatiale',
        '05-web-mapping': 'Cartographie Web et Visualisation',
        '06-remote-sensing': 'Télédétection et Imagerie Satellitaire',
        '07-3d-gis': 'SIG 3D et Modélisation du Terrain',
        // Also support the actual slugs from markdown files
        'first-lesson': 'Cycle de Vie du Développement Logiciel Sécurisé',
        'gis-fundamentals': 'Fondamentaux SIG',
        'spatial-analysis': 'Techniques d\'Analyse Spatiale',
        'web-mapping': 'Cartographie Web et Visualisation',
        'remote-sensing': 'Télédétection et Imagerie Satellitaire',
        '3d-gis': 'SIG 3D et Modélisation du Terrain',
      },
      es: {
        '01-first-lesson': 'Ciclo de Vida del Desarrollo de Software Seguro',
        '02-first-lesson': 'Ciclo de Vida del Desarrollo de Software Seguro',
        '03-gis-fundamentals': 'Fundamentos SIG',
        '04-spatial-analysis': 'Técnicas de Análisis Espacial',
        '05-web-mapping': 'Mapeo Web y Visualización',
        '06-remote-sensing': 'Percepción Remota e Imagen Satelital',
        '07-3d-gis': 'SIG 3D y Modelado del Terreno',
        // Also support the actual slugs from markdown files
        'first-lesson': 'Ciclo de Vida del Desarrollo de Software Seguro',
        'gis-fundamentals': 'Fundamentos SIG',
        'spatial-analysis': 'Técnicas de Análisis Espacial',
        'web-mapping': 'Mapeo Web y Visualización',
        'remote-sensing': 'Percepción Remota e Imagen Satelital',
        '3d-gis': 'SIG 3D y Modelado del Terreno',
      }
    };

    const titles = courseTitles[currentLanguage as keyof typeof courseTitles] || courseTitles.en;
    
    // Try exact match first
    let title = titles[slug as keyof typeof titles];
    
    // If no exact match, try to find a partial match
    if (!title) {
      const cleanSlug = slug.toLowerCase().replace(/[-_\d]/g, ' ').trim();
      const slugWords = cleanSlug.split(/\s+/);
      
      // Look for courses that contain any of the slug words
      for (const [key, value] of Object.entries(titles)) {
        const keyWords = key.toLowerCase().replace(/[-_\d]/g, ' ').trim().split(/\s+/);
        if (slugWords.some(word => keyWords.includes(word))) {
          title = value;
          break;
        }
      }
    }
    
    if (title) return title;
    
    // Final fallback: format the slug nicely
    const cleanSlug = slug.replace(/\d+/g, '').replace(/[-_]/g, ' ').trim();
    return cleanSlug.replace(/\b\w/g, l => l.toUpperCase());
  };

  const getCourseDescription = (slug: string): string => {
    const courseDescriptions = {
      en: {
        '01-first-lesson': 'Learn the fundamentals of Secure Software Development Lifecycle and security practices.',
        '02-first-lesson': 'Master secure software development principles and security integration.',
        '03-gis-fundamentals': 'Master core GIS principles, data types, and basic spatial analysis techniques.',
        '04-spatial-analysis': 'Learn advanced spatial analysis methods and statistical techniques for geographic data.',
        '05-web-mapping': 'Create interactive web maps and develop modern mapping applications.',
        '06-remote-sensing': 'Understand satellite imagery analysis and remote sensing data processing.',
        '07-3d-gis': 'Explore three-dimensional geographic information systems and terrain modeling.',
        // Also support the actual slugs from markdown files
        'first-lesson': 'Learn the fundamentals of Secure Software Development Lifecycle and security practices.',
        'gis-fundamentals': 'Master core GIS principles, data types, and basic spatial analysis techniques.',
        'spatial-analysis': 'Learn advanced spatial analysis methods and statistical techniques for geographic data.',
        'web-mapping': 'Create interactive web maps and develop modern mapping applications.',
        'remote-sensing': 'Understand satellite imagery analysis and remote sensing data processing.',
        '3d-gis': 'Explore three-dimensional geographic information systems and terrain modeling.',
      },
      fr: {
        '01-first-lesson': 'Apprenez les fondamentaux du Cycle de Vie du Développement Logiciel Sécurisé et des pratiques de sécurité.',
        '02-first-lesson': 'Maîtrisez les principes de développement logiciel sécurisé et l\'intégration de la sécurité.',
        '03-gis-fundamentals': 'Maîtrisez les principes fondamentaux des SIG, les types de données et les techniques d\'analyse spatiale de base.',
        '04-spatial-analysis': 'Apprenez les méthodes d\'analyse spatiale avancées et les techniques statistiques pour les données géographiques.',
        '05-web-mapping': 'Créez des cartes web interactives et développez des applications de cartographie modernes.',
        '06-remote-sensing': 'Comprenez l\'analyse d\'imagerie satellite et le traitement des données de télédétection.',
        '07-3d-gis': 'Explorez les systèmes d\'information géographique tridimensionnels et la modélisation du terrain.',
        // Also support the actual slugs from markdown files
        'first-lesson': 'Apprenez les fondamentaux du Cycle de Vie du Développement Logiciel Sécurisé et des pratiques de sécurité.',
        'gis-fundamentals': 'Maîtrisez les principes fondamentaux des SIG, les types de données et les techniques d\'analyse spatiale de base.',
        'spatial-analysis': 'Apprenez les méthodes d\'analyse spatiale avancées et les techniques statistiques pour les données géographiques.',
        'web-mapping': 'Créez des cartes web interactives et développez des applications de cartographie modernes.',
        'remote-sensing': 'Comprenez l\'analyse d\'imagerie satellite et le traitement des données de télédétection.',
        '3d-gis': 'Explorez les systèmes d\'information géographique tridimensionnels et la modélisation du terrain.',
      },
      es: {
        '01-first-lesson': 'Aprende los fundamentos del Ciclo de Vida del Desarrollo de Software Seguro y prácticas de seguridad.',
        '02-first-lesson': 'Domina los principios de desarrollo de software seguro e integración de seguridad.',
        '03-gis-fundamentals': 'Domina los principios fundamentales de los SIG, tipos de datos y técnicas básicas de análisis espacial.',
        '04-spatial-analysis': 'Aprende métodos avanzados de análisis espacial y técnicas estadísticas para datos geográficos.',
        '05-web-mapping': 'Crea mapas web interactivos y desarrolla aplicaciones de mapeo modernas.',
        '06-remote-sensing': 'Comprende el análisis de imágenes satelitales y el procesamiento de datos de percepción remota.',
        '07-3d-gis': 'Explora los sistemas de información geográfica tridimensionales y modelado del terreno.',
        // Also support the actual slugs from markdown files
        'first-lesson': 'Aprende los fundamentos del Ciclo de Vida del Desarrollo de Software Seguro y prácticas de seguridad.',
        'gis-fundamentals': 'Domina los principios fundamentales de los SIG, tipos de datos y técnicas básicas de análisis espacial.',
        'spatial-analysis': 'Aprende métodos avanzados de análisis espacial y técnicas estadísticas para datos geográficos.',
        'web-mapping': 'Crea mapas web interactivos y desarrolla aplicaciones de mapeo modernas.',
        'remote-sensing': 'Comprende el análisis de imágenes satelitales y el procesamiento de datos de percepción remota.',
        '3d-gis': 'Explora los sistemas de información geográfica tridimensionales y modelado del terreno.',
      }
    };

    const descriptions = courseDescriptions[currentLanguage as keyof typeof courseDescriptions] || courseDescriptions.en;
    
    // Try exact match first
    let description = descriptions[slug as keyof typeof descriptions];
    
    // If no exact match, try to find a partial match
    if (!description) {
      const cleanSlug = slug.toLowerCase().replace(/[-_\d]/g, ' ').trim();
      const slugWords = cleanSlug.split(/\s+/);
      
      // Look for courses that contain any of the slug words
      for (const [key, value] of Object.entries(descriptions)) {
        const keyWords = key.toLowerCase().replace(/[-_\d]/g, ' ').trim().split(/\s+/);
        if (slugWords.some(word => keyWords.includes(word))) {
          description = value;
          break;
        }
      }
    }
    
    return description || 'Explore comprehensive GIS concepts and practical applications.';
  };

  const getOpenButtonText = (): string => {
    const buttonTexts = {
      en: 'Open',
      fr: 'Ouvrir',
      es: 'Abrir'
    };
    
    return buttonTexts[currentLanguage as keyof typeof buttonTexts] || buttonTexts.en;
  };

  // Debug logging to help identify translation issues
  console.log('Current Language:', currentLanguage);
  console.log('Available Languages:', ['en', 'fr', 'es']);

  return { getCourseTitle, getCourseDescription, getOpenButtonText, currentLanguage };
}

export function CourseCard({ blog_slug, index, description }: CourseCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(cardRef, { once: true, margin: '-100px' });
  const [isHovered, setIsHovered] = useState(false);
  
  const { getCourseTitle, getCourseDescription, getOpenButtonText, currentLanguage } = useDirectTranslation();
  
  // Get course icon and title with fallbacks
  const CourseIcon = getCourseIcon(blog_slug);
  const courseTitle = getCourseTitle(blog_slug) || 'Course Title';
  
  // Prioritize translated description, then fall back to prop description, then default
  const translatedDescription = getCourseDescription(blog_slug);
  const courseDescription = translatedDescription || description || 'Explore comprehensive GIS concepts and practical applications.';
  
  // Debug logging to help identify translation issues
  console.log(`Course: ${blog_slug}`);
  console.log(`Language: ${currentLanguage}`);
  console.log(`Translated Description: ${translatedDescription}`);
  console.log(`Prop Description: ${description}`);
  console.log(`Final Description: ${courseDescription}`);
  
  // Ensure description is properly truncated and formatted
  const truncatedDescription = courseDescription.length > 120 
    ? courseDescription.substring(0, 120) + '...' 
    : courseDescription;
  
  // Parallax scroll effect
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ['start end', 'end start'],
  });
  
  const y = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.8, 0.6]);

  // Staggered entrance animation
  const cardVariants = {
    hidden: {
      opacity: 0,
      scale: 0.8,
      y: 60,
    },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: easeOut,
        delay: 0.8 + index * 0.15, // Stagger entrance
      },
    },
  };

  // 3D hover animation variants
  const hoverVariants = {
    rest: {
      rotateY: 0,
      rotateX: 0,
      translateZ: 0,
      scale: 1,
      transition: {
        duration: 0.3,
        ease: easeOut,
      },
    },
    hover: {
      rotateY: 12,
      rotateX: 4,
      translateZ: 40,
      scale: 1.05,
      transition: {
        duration: 0.3,
        ease: easeOut,
      },
    },
  };

  // Image hover animation variants
  const imageVariants = {
    rest: {
      scale: 1,
      filter: 'brightness(1) contrast(1) saturate(1)',
      transition: {
        duration: 0.3,
        ease: easeOut,
      },
    },
    hover: {
      scale: 1.10,
      filter: 'brightness(1.15) contrast(1.1) saturate(1.2)',
      transition: {
        duration: 0.3,
        ease: easeOut,
      },
    },
  };

  return (
    <Link href={`/b/${blog_slug}`} className='block'>
      <motion.div
        ref={cardRef}
        variants={cardVariants}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        style={{ y, opacity }}
        className='perspective-[1200px]'
      >
        <motion.div
          variants={hoverVariants}
          initial="rest"
          animate={isHovered ? 'hover' : 'rest'}
          onHoverStart={() => setIsHovered(true)}
          onHoverEnd={() => setIsHovered(false)}
          className='card bg-base-200 hover:bg-base-300 transition-colors duration-300 shadow-sm hover:shadow-2xl rounded-2xl overflow-hidden group cursor-pointer transform-gpu h-full'
          style={{
            transformStyle: 'preserve-3d',
          }}
        >
          {/* Enhanced Image Section - Fixed Height */}
          <motion.div
            ref={imageRef}
            variants={imageVariants}
            initial="rest"
            animate={isHovered ? 'hover' : 'rest'}
            className='aspect-video bg-gradient-to-br from-base-100 to-base-200 flex items-center justify-center relative overflow-hidden'
          >
            {/* Decorative background pattern */}
            <div className='absolute inset-0 opacity-5 group-hover:opacity-10 transition-opacity duration-300'>
              <svg className='w-full h-full' viewBox='0 0 100 100' preserveAspectRatio='none'>
                <defs>
                  <pattern id={`grid-${blog_slug}`} x='0' y='0' width='10' height='10' patternUnits='userSpaceOnUse'>
                    <path d='M 10 0 L 0 0 0 10' fill='none' stroke='currentColor' strokeWidth='0.5'/>
                  </pattern>
                </defs>
                <rect width='100' height='100' fill={`url(#grid-${blog_slug})`}/>
              </svg>
            </div>
            
            {/* Course Icon */}
            <div className='relative z-10 flex flex-col items-center gap-3'>
              <div className='w-16 h-16 bg-primary/20 rounded-2xl flex items-center justify-center group-hover:bg-primary/30 transition-all duration-300'>
                <CourseIcon className='w-8 h-8 text-primary group-hover:scale-110 transition-transform duration-300' />
              </div>
            </div>
            
            {/* Hover overlay effect */}
            <div className='absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300' />
          </motion.div>

          {/* Card Content - Fixed Height */}
          <div className='card-body relative z-10 flex flex-col h-full'>
            <div className='flex-1'>
              <h2 className='text-xl font-bold text-base-content group-hover:text-primary transition-colors duration-300 leading-tight mb-3 line-clamp-2'>
                {courseTitle}
              </h2>
              <p className='text-sm opacity-70 group-hover:opacity-90 transition-colors duration-300 leading-relaxed line-clamp-3'>
                {truncatedDescription}
              </p>
            </div>
            
            <div className='card-actions justify-end mt-4'>
              <span className='btn btn-primary btn-sm rounded-full group-hover:scale-105 transition-transform duration-300'>
                {getOpenButtonText()}
              </span>
            </div>
          </div>

          {/* Subtle border glow on hover */}
          <div className='absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-primary/20 transition-all duration-300 pointer-events-none' />
        </motion.div>
      </motion.div>
    </Link>
  );
}