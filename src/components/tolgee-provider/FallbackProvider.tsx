'use client';

import { useEffect, useState, type ReactNode } from 'react';
import { useTranslation } from 'react-i18next';

interface FallbackProviderProps {
  children: ReactNode;
}

export function FallbackProvider({ children }: FallbackProviderProps) {
  const [isI18nReady, setIsI18nReady] = useState(false);
  const { i18n } = useTranslation();

  useEffect(() => {
    // Check if i18n is ready
    if (i18n.isInitialized) {
      setIsI18nReady(true);
    } else {
      // Wait for i18n to be ready
      const checkReady = () => {
        if (i18n.isInitialized) {
          setIsI18nReady(true);
        } else {
          setTimeout(checkReady, 100);
        }
      };
      checkReady();
    }
  }, [i18n]);

  // Show loading while i18n initializes
  if (!isI18nReady) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-base-content/70">Loading translations...</p>
        </div>
      </div>
    );
  }

  // Once i18n is ready, render children with fallback translations
  return (
    <div className="fallback-provider">
      {children}
    </div>
  );
} 