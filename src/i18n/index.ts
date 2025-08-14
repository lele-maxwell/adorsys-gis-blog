import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import {initReactI18next} from 'react-i18next';
import { Tolgee } from '@tolgee/i18next';

// Embedded translations to ensure fallback always works
const embeddedTranslations = {
  en: {
    common: {
      knowledgeHub: 'Knowledge Hub',
      gateway: 'Your Gateway to Professional Excellence',
      description: 'Embark on a transformative learning journey with our comprehensive collection of expertly curated courses and resources designed to elevate your skills and advance your career.',
      expertLed: 'Expert-Led Content',
      interactiveLearning: 'Interactive Learning',
      practicalSkills: 'Practical Skills',
      getStarted: 'Get Started',
      teamCollaboration: 'Team Collaboration',
      realTimeLearning: 'Real-time learning with peers',
      liveSession: 'Live Session',
      activeLearners: 'Active Learners',
      globalCommunity: 'Global Community',
      welcome: 'Welcome to',
      ourCourses: 'Our Courses',
      coursesDescription: 'Explore our comprehensive collection of GIS lessons, from fundamentals to advanced techniques. Each course is designed with interactive content and practical examples.',
      searchPlaceholder: 'What are you looking for?',
      courses: 'Courses',
      coursesAvailable: 'courses available',
      resultsFor: 'Results for',
      backToCourses: 'Back to Courses'
    },
    languages: {
      en: 'English',
      fr: 'Français',
      es: 'Español'
    },
    navigation: {
      home: 'Home',
      courses: 'Courses',
      search: 'Search',
      language: 'Language'
    }
  },
  fr: {
    common: {
      knowledgeHub: 'Hub de Connaissances',
      gateway: 'Votre Portail vers l\'Excellence Professionnelle',
      description: 'Embarquez pour un voyage d\'apprentissage transformateur avec notre collection complète de cours et de ressources expertement organisés conçus pour élever vos compétences et faire progresser votre carrière.',
      expertLed: 'Contenu Dirigé par des Experts',
      interactiveLearning: 'Apprentissage Interactif',
      practicalSkills: 'Compétences Pratiques',
      getStarted: 'Commencer',
      teamCollaboration: 'Collaboration d\'Équipe',
      realTimeLearning: 'Apprentissage en temps réel avec les pairs',
      liveSession: 'Session en Direct',
      activeLearners: 'Apprenants Actifs',
      globalCommunity: 'Communauté Mondiale',
      welcome: 'Bienvenue sur',
      ourCourses: 'Nos Cours',
      coursesDescription: 'Explorez notre collection complète de leçons SIG, des fondamentaux aux techniques avancées. Chaque cours est conçu avec du contenu interactif et des exemples pratiques.',
      searchPlaceholder: 'Que recherchez-vous ?',
      courses: 'Cours',
      coursesAvailable: 'cours disponibles',
      resultsFor: 'Résultats pour',
      backToCourses: 'Retour aux Cours'
    },
    languages: {
      en: 'English',
      fr: 'Français',
      es: 'Español'
    },
    navigation: {
      home: 'Accueil',
      courses: 'Cours',
      search: 'Recherche',
      language: 'Langue'
    }
  },
  es: {
    common: {
      knowledgeHub: 'Centro de Conocimiento',
      gateway: 'Tu Portal hacia la Excelencia Profesional',
      description: 'Embárcate en un viaje de aprendizaje transformador con nuestra colección integral de cursos y recursos curados por expertos diseñados para elevar tus habilidades y avanzar en tu carrera.',
      expertLed: 'Contenido Dirigido por Expertos',
      interactiveLearning: 'Aprendizaje Interactivo',
      practicalSkills: 'Habilidades Prácticas',
      getStarted: 'Comenzar',
      teamCollaboration: 'Colaboración en Equipo',
      realTimeLearning: 'Aprendizaje en tiempo real con compañeros',
      liveSession: 'Sesión en Vivo',
      activeLearners: 'Estudiantes Activos',
      globalCommunity: 'Comunidad Global',
      welcome: 'Bienvenido a',
      ourCourses: 'Nuestros Cursos',
      coursesDescription: 'Explora nuestra colección integral de lecciones SIG, desde fundamentos hasta técnicas avanzadas. Cada curso está diseñado con contenido interactivo y ejemplos prácticos.',
      searchPlaceholder: '¿Qué estás buscando?',
      courses: 'Cursos',
      coursesAvailable: 'cursos disponibles',
      resultsFor: 'Resultados para',
      backToCourses: 'Volver a los Cursos'
    },
    languages: {
      en: 'English',
      fr: 'Français',
      es: 'Español'
    },
    navigation: {
      home: 'Inicio',
      courses: 'Cursos',
      search: 'Buscar',
      language: 'Idioma'
    }
  }
};

export async function i18nFn() {
    // Check if i18n is already initialized
    if (i18n.isInitialized) {
        console.log('i18n already initialized');
        return i18n;
    }

    try {
        await i18n
            .use(LanguageDetector)
            .use(initReactI18next)
            .init({
                fallbackLng: 'en',
                ns: ['common', 'languages', 'navigation'],
                defaultNS: 'common',
                supportedLngs: ['en', 'fr', 'es'],
                interpolation: {
                    escapeValue: false,
                },
                debug: process.env.NODE_ENV === 'development',
                // Use embedded translations as resources
                resources: embeddedTranslations,
                // Add fallback to prevent showing keys
                fallbackLng: 'en',
                fallbackNS: 'common',
                // Ensure translations are loaded
                load: 'languageOnly',
            });
        
        console.log('i18n initialized successfully with embedded translations');
        return i18n;
    } catch (error) {
        console.error('Failed to initialize i18n:', error);
        // Return i18n instance even if initialization fails
        return i18n;
    }
}

// Create Tolgee instance with proper initialization
let tolgeeInstance: Tolgee | null = null;

export async function createTolgee() {
    if (tolgeeInstance) {
        return tolgeeInstance;
    }

    try {
        // Only access NEXT_PUBLIC_ environment variables on client side
        if (typeof window === 'undefined') {
            console.warn('Tolgee cannot be initialized on server side');
            return null;
        }

        const apiKey = process.env.NEXT_PUBLIC_TOLGEE_API_KEY;
        if (!apiKey || apiKey === 'your_tolgee_api_key_here') {
            console.warn('Tolgee API key not configured, skipping Tolgee initialization');
            return null;
        }

        tolgeeInstance = new Tolgee({
            apiKey,
            apiUrl: process.env.NEXT_PUBLIC_TOLGEE_API_URL || 'https://app.tolgee.io',
            defaultLanguage: 'en',
            fallbackLanguage: 'en',
            supportedLanguages: ['en', 'fr', 'es'],
        });

        // Initialize the instance
        await tolgeeInstance.init();
        console.log('Tolgee initialized successfully');
        return tolgeeInstance;
    } catch (error) {
        console.error('Failed to initialize Tolgee:', error);
        return null;
    }
}

// Export a function to get the Tolgee instance
export const getTolgee = () => tolgeeInstance;
