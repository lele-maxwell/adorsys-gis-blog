'use client';

import { useEffect, useState } from 'react';
import { i18nFn } from '@blog/i18n';

interface I18nProviderProps {
  children: React.ReactNode;
}

export default function I18nProvider({ children }: I18nProviderProps) {
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    const initializeI18n = async () => {
      try {
        console.log('Initializing i18n...');
        await i18nFn();
        console.log('i18n initialization complete');
        setIsInitialized(true);
      } catch (error) {
        console.error('Failed to initialize i18n:', error);
        // Set as initialized even if it fails to prevent blocking the app
        setIsInitialized(true);
      }
    };

    initializeI18n();
  }, []);

  // Show loading while i18n initializes
  if (!isInitialized) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-base-content/70">Initializing translations...</p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
} 