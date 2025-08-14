'use client';

import { TolgeeProvider as TolgeeProviderBase } from '@tolgee/react';
import { createTolgee } from '@blog/i18n';
import { FallbackProvider } from './FallbackProvider';
import { useEffect, useState } from 'react';

interface TolgeeProviderProps {
  children: React.ReactNode;
}

export default function TolgeeProvider({ children }: TolgeeProviderProps) {
  const [tolgeeInstance, setTolgeeInstance] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const initializeTolgee = async () => {
      try {
        setIsLoading(true);
        
        // Check if we should even try to initialize Tolgee
        const apiKey = process.env.NEXT_PUBLIC_TOLGEE_API_KEY;
        if (!apiKey || apiKey === 'your_tolgee_api_key_here') {
          console.warn('Tolgee API key not configured, using fallback provider');
          setHasError(true);
          setIsLoading(false);
          return;
        }

        const instance = await createTolgee();
        
        if (instance) {
          // Test if the instance has the required methods
          if (typeof instance.isLoaded === 'function' || typeof instance.init === 'function') {
            setTolgeeInstance(instance);
          } else {
            console.warn('Tolgee instance missing required methods, using fallback');
            setHasError(true);
          }
        } else {
          setHasError(true);
        }
      } catch (error) {
        console.error('Failed to initialize Tolgee:', error);
        setHasError(true);
      } finally {
        setIsLoading(false);
      }
    };

    initializeTolgee();
  }, []);

  // Show loading state
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-base-content/70">Initializing...</p>
        </div>
      </div>
    );
  }

  // If Tolgee failed to initialize or is not configured, use fallback provider
  if (hasError || !tolgeeInstance) {
    console.warn('Using fallback provider - Tolgee not available');
    return <FallbackProvider>{children}</FallbackProvider>;
  }

  // Render Tolgee provider with the initialized instance
  try {
    return (
      <TolgeeProviderBase tolgee={tolgeeInstance}>
        {children}
      </TolgeeProviderBase>
    );
  } catch (error) {
    console.error('Failed to render Tolgee provider:', error);
    return <FallbackProvider>{children}</FallbackProvider>;
  }
} 