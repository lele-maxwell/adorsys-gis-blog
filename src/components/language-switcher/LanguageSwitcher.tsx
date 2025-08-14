'use client';

import { useState, useRef, useEffect } from 'react';

const languages = [
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'fr', name: 'Français', flag: '🇫🇷' },
  { code: 'es', name: 'Español', flag: '🇪🇸' },
];

interface LanguageSwitcherProps {
  variant?: 'full' | 'icon-only';
}

export default function LanguageSwitcher({ variant = 'full' }: LanguageSwitcherProps) {
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const currentLanguageData = languages.find(lang => lang.code === currentLanguage) || languages[0];

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const changeLanguage = (languageCode: string) => {
    setCurrentLanguage(languageCode);
    setIsOpen(false);
    
    // Emit custom event for the direct translation system
    const event = new CustomEvent('languageChange', {
      detail: { language: languageCode }
    });
    window.dispatchEvent(event);
    
    console.log('Language changed to:', languageCode);
  };

  if (variant === 'icon-only') {
    // Icon-only version for vertical navigation
    return (
      <div className="relative" ref={dropdownRef}>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-3 bg-base-200/60 backdrop-blur-md rounded-xl text-base-content/70 hover:text-base-content hover:bg-base-200/80 transition-colors shadow-lg"
          aria-label="Select language"
          aria-expanded={isOpen}
          aria-haspopup="true"
        >
          {/* Globe Icon Only */}
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </button>

        {isOpen && (
          <div 
            className="absolute top-full mt-2 left-0 bg-base-200/95 backdrop-blur-md rounded-xl shadow-lg border border-base-300/50 min-w-[160px] z-50"
            role="menu"
            aria-orientation="vertical"
          >
            {languages.map((language) => (
              <button
                key={language.code}
                onClick={() => changeLanguage(language.code)}
                className={`w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-base-300/50 transition-colors first:rounded-t-xl last:rounded-b-xl ${
                  currentLanguage === language.code ? 'bg-primary/20 text-primary' : 'text-base-content/80'
                }`}
                role="menuitem"
                aria-current={currentLanguage === language.code ? 'true' : 'false'}
              >
                <span className="text-lg">{language.flag}</span>
                <span className="text-sm font-medium">{language.name}</span>
              </button>
            ))}
          </div>
        )}
      </div>
    );
  }

  // Full version for top navigation
  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 bg-base-200/60 backdrop-blur-md rounded-xl text-base-content/70 hover:text-base-content hover:bg-base-200/80 transition-colors shadow-lg"
        aria-label="Select language"
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        {/* Globe Icon */}
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        
        {/* Flag and Language Name */}
        <span className="text-sm font-medium">{currentLanguageData.flag}</span>
        <span className="text-sm font-medium">{currentLanguageData.name}</span>
        
        {/* Dropdown Arrow */}
        <svg className={`w-3 h-3 transition-transform ${isOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <div 
          className="absolute top-full mt-2 right-0 bg-base-200/95 backdrop-blur-md rounded-xl shadow-lg border border-base-300/50 min-w-[160px] z-50"
          role="menu"
          aria-orientation="vertical"
        >
          {languages.map((language) => (
            <button
              key={language.code}
              onClick={() => changeLanguage(language.code)}
              className={`w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-base-300/50 transition-colors first:rounded-t-xl last:rounded-b-xl ${
                currentLanguage === language.code ? 'bg-primary/20 text-primary' : 'text-base-content/80'
              }`}
              role="menuitem"
              aria-current={currentLanguage === language.code ? 'true' : 'false'}
            >
              <span className="text-lg">{language.flag}</span>
              <span className="text-sm font-medium">{language.name}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
} 