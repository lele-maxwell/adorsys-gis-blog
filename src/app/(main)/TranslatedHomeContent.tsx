'use client';

import Link from 'next/link';
import { useLanguage } from '@blog/components/language-switcher';

// Direct translation function that doesn't depend on i18next
function useDirectTranslation() {
  const { currentLanguage } = useLanguage();

  const t = (key: string) => {
    const translations = {
      en: {
        'common.knowledgeHub': 'Knowledge Hub',
        'common.gateway': 'Your Gateway to Professional Excellence',
        'common.description': 'Embark on a transformative learning journey with our comprehensive collection of expertly curated courses and resources designed to elevate your skills and advance your career.',
        'common.expertLed': 'Expert-Led Content',
        'common.interactiveLearning': 'Interactive Learning',
        'common.practicalSkills': 'Practical Skills',
        'common.getStarted': 'Get Started',
        'common.teamCollaboration': 'Team Collaboration',
        'common.realTimeLearning': 'Real-time learning with peers',
        'common.liveSession': 'Live Session',
        'common.activeLearners': 'Active Learners',
        'common.globalCommunity': 'Global Community'
      },
      fr: {
        'common.knowledgeHub': 'Hub de Connaissances',
        'common.gateway': 'Votre Portail vers l\'Excellence Professionnelle',
        'common.description': 'Embarquez pour un voyage d\'apprentissage transformateur avec notre collection complète de cours et de ressources expertement organisés conçus pour élever vos compétences et faire progresser votre carrière.',
        'common.expertLed': 'Contenu Dirigé par des Experts',
        'common.interactiveLearning': 'Apprentissage Interactif',
        'common.practicalSkills': 'Compétences Pratiques',
        'common.getStarted': 'Commencer',
        'common.teamCollaboration': 'Collaboration d\'Équipe',
        'common.realTimeLearning': 'Apprentissage en temps réel avec les pairs',
        'common.liveSession': 'Session en Direct',
        'common.activeLearners': 'Apprenants Actifs',
        'common.globalCommunity': 'Communauté Mondiale'
      },
      es: {
        'common.knowledgeHub': 'Centro de Conocimiento',
        'common.gateway': 'Tu Portal hacia la Excelencia Profesional',
        'common.description': 'Embárcate en un viaje de aprendizaje transformador con nuestra colección integral de cursos y recursos curados por expertos diseñados para elevar tus habilidades y avanzar en tu carrera.',
        'common.expertLed': 'Contenido Dirigido por Expertos',
        'common.interactiveLearning': 'Aprendizaje Interactivo',
        'common.practicalSkills': 'Habilidades Prácticas',
        'common.getStarted': 'Comenzar',
        'common.teamCollaboration': 'Colaboración en Equipo',
        'common.realTimeLearning': 'Aprendizaje en tiempo real con compañeros',
        'common.liveSession': 'Sesión en Vivo',
        'common.activeLearners': 'Estudiantes Activos',
        'common.globalCommunity': 'Comunidad Global'
      }
    };

    return translations[currentLanguage as keyof typeof translations]?.[key as keyof typeof translations.en] || key;
  };

  return { t, currentLanguage };
}

export function TranslatedHomeContent() {
  const { t, currentLanguage } = useDirectTranslation();
  
  return (
    <div className='flex flex-col lg:flex-row items-center min-h-[calc(100vh-120px)] gap-16'>
      {/* Left Content - Now translated */}
      <div className='flex-1 text-center lg:text-left'>
        <div className='mb-12'>
          {/* Main Heading */}
          <h1 className='text-5xl md:text-7xl lg:text-8xl font-black text-base-content mb-8 leading-tight tracking-tight'>
            <span className='block bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent'>
              {t('common.knowledgeHub')}
            </span>
          </h1>
          
          {/* Decorative Line */}
          <div className='w-32 h-1.5 bg-gradient-to-r from-primary to-secondary rounded-full mx-auto lg:mx-0 mb-10'></div>
        </div>
        
        {/* Subtitle */}
        <h2 className='text-2xl md:text-3xl text-base-content/90 mb-6 font-semibold leading-relaxed'>
          {t('common.gateway')}
        </h2>
        
        {/* Description */}
        <p className='text-lg md:text-xl text-base-content/70 mb-8 max-w-3xl leading-relaxed font-light'>
          {t('common.description')}
        </p>

        {/* Features List */}
        <div className='flex flex-wrap gap-6 mb-12 text-base-content/80'>
          <div className='flex items-center gap-2'>
            <div className='w-2 h-2 bg-primary rounded-full'></div>
            <span className='text-sm font-medium'>{t('common.expertLed')}</span>
          </div>
          <div className='flex items-center gap-2'>
            <div className='w-2 h-2 bg-secondary rounded-full'></div>
            <span className='text-sm font-medium'>{t('common.interactiveLearning')}</span>
          </div>
          <div className='flex items-center gap-2'>
            <div className='w-2 h-2 bg-accent rounded-full'></div>
            <span className='text-sm font-medium'>{t('common.practicalSkills')}</span>
          </div>
        </div>

        {/* Call to Action */}
        <div className='flex flex-col sm:flex-row gap-4 items-center lg:items-start'>
          <Link 
            href='/courses' 
            className='inline-flex items-center gap-2 px-6 py-3 bg-primary hover:bg-primary-focus text-primary-content font-semibold text-base rounded-full transition-all duration-300 hover:scale-105 hover:shadow-lg shadow-md'
          >
            {t('common.getStarted')}
            <svg className='w-4 h-4' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
              <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M13 7l5 5m0 0l-5 5m5-5H6' />
            </svg>
          </Link>
        </div>
      </div>

      {/* Right Learning Image Card */}
      <div className='flex-1 max-w-lg'>
        <div className='relative'>
          {/* Background Cards - Layered Effect */}
          <div className='absolute top-4 left-4 w-full h-96 bg-slate-900 rounded-3xl transform rotate-2 shadow-2xl'></div>
          <div className='absolute top-2 left-2 w-full h-96 bg-slate-800 rounded-3xl transform -rotate-1 shadow-xl'></div>
          
          {/* Additional Background Cards for Main Card */}
          <div className='absolute -top-2 -left-2 w-full h-96 bg-slate-900 rounded-3xl transform rotate-3 shadow-2xl'></div>
          <div className='absolute -top-1 -left-1 w-full h-96 bg-slate-800 rounded-3xl transform -rotate-2 shadow-xl'></div>
          <div className='absolute top-1 left-1 w-full h-96 bg-slate-700 rounded-3xl transform rotate-1 shadow-lg'></div>
          
          {/* Main Card - Moved Up */}
          <div className='bg-slate-800/90 rounded-3xl p-0 border border-slate-700/50 shadow-2xl relative overflow-hidden -mt-8'>
            {/* Full Card Image */}
            <div className='relative w-full h-96'>
              <img 
                src="https://st2.depositphotos.com/3591429/6301/i/950/depositphotos_63016959-stock-photo-man-working-on-a-computer.jpg"
                alt="Student with tablet"
                className='w-full h-full object-cover'
                style={{
                  filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.3))'
                }}
              />
            </div>
          </div>
          
          {/* Team Collaboration Card - Below Main Card with Gap and Right Shift */}
          <div className='absolute top-[28rem] left-8 w-full h-96 bg-slate-800/90 rounded-3xl p-0 border border-slate-700/50 shadow-2xl overflow-hidden'>
            <div className='relative w-full h-full'>
              <img 
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
                alt="Team collaboration"
                className='w-full h-full object-cover'
              />
              <div className='absolute inset-0 bg-gradient-to-t from-slate-900/60 via-slate-800/20 to-transparent'></div>
              
              {/* Content Overlay */}
              <div className='absolute bottom-6 left-6 right-6'>
                <div className='text-white text-xl font-bold mb-2'>{t('common.teamCollaboration')}</div>
                <div className='text-white/80 text-sm'>{t('common.realTimeLearning')}</div>
              </div>
            </div>
          </div>
          
          {/* Live Session Card - Middle Cutting Through Both */}
          <div className='absolute top-80 -right-8 w-64 h-40 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 shadow-lg z-30'>
            <div className='p-6 h-full flex flex-col justify-between'>
              <div className='flex items-center gap-3'>
                <div className='w-4 h-4 bg-green-400 rounded-full animate-pulse'></div>
                <span className='text-white/90 text-base font-medium'>{t('common.liveSession')}</span>
              </div>
              <div className='text-center'>
                <div className='text-white text-2xl font-bold'>2.5k+</div>
                <div className='text-white/70 text-base'>{t('common.activeLearners')}</div>
              </div>
              <div className='flex items-center justify-center gap-3'>
                <div className='w-3 h-3 bg-blue-400 rounded-full'></div>
                <div className='w-3 h-3 bg-purple-400 rounded-full'></div>
                <div className='w-3 h-3 bg-cyan-400 rounded-full'></div>
                <span className='text-white/80 text-sm'>{t('common.globalCommunity')}</span>
              </div>
            </div>
          </div>
          
          {/* Floating Elements */}
          <div className='absolute -top-4 -right-4 w-8 h-8 bg-yellow-400/80 rounded-full animate-pulse'></div>
          <div className='absolute -bottom-2 -left-2 w-6 h-6 bg-green-400/60 rounded-full animate-pulse delay-1000'></div>
        </div>
      </div>
    </div>
  );
} 