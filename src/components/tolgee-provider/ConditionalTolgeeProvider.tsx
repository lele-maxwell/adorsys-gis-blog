'use client';

import { FallbackProvider } from './FallbackProvider';
import { useEffect, useState } from 'react';
import { shouldEnableTolgee } from '@blog/utils/env';

interface ConditionalTolgeeProviderProps {
  children: React.ReactNode;
}

export default function ConditionalTolgeeProvider({ children }: ConditionalTolgeeProviderProps) {
  const [shouldUseTolgee, setShouldUseTolgee] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkTolgeeAvailability = async () => {
      try {
        setIsLoading(true);
        
        // Use the safe environment utility
        if (!shouldEnableTolgee()) {
          console.log('Tolgee disabled - using fallback provider for stability');
          setShouldUseTolgee(false);
          setIsLoading(false);
          return;
        }

        // Try to dynamically import Tolgee to avoid SSR issues
        try {
          const { TolgeeProvider: TolgeeProviderBase } = await import('@tolgee/react');
          const { createTolgee } = await import('@blog/i18n');
          
          const instance = await createTolgee();
          if (instance && typeof instance.init === 'function') {
            setShouldUseTolgee(true);
            console.log('Tolgee provider will be used');
          } else {
            console.warn('Tolgee instance missing required methods, using fallback');
            setShouldUseTolgee(false);
          }
        } catch (importError) {
          console.warn('Failed to import Tolgee, using fallback provider:', importError);
          setShouldUseTolgee(false);
        }
      } catch (error) {
        console.error('Error checking Tolgee availability:', error);
        setShouldUseTolgee(false);
      } finally {
        setIsLoading(false);
      }
    };

    checkTolgeeAvailability();
  }, []);

  // Show loading state
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-base-content/70">Checking translation provider...</p>
        </div>
      </div>
    );
  }

  // If Tolgee is not available, use fallback provider
  if (!shouldUseTolgee) {
    console.log('Using fallback provider - local translations will be used');
    return <FallbackProvider>{children}</FallbackProvider>;
  }

  // Dynamically render Tolgee provider
  return <DynamicTolgeeProvider>{children}</DynamicTolgeeProvider>;
}

// Separate component for dynamic Tolgee rendering
function DynamicTolgeeProvider({ children }: { children: React.ReactNode }) {
  const [TolgeeProviderComponent, setTolgeeProviderComponent] = useState<any>(null);
  const [tolgeeInstance, setTolgeeInstance] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadTolgee = async () => {
      try {
        const [{ TolgeeProvider: TolgeeProviderBase }, { createTolgee }] = await Promise.all([
          import('@tolgee/react'),
          import('@blog/i18n')
        ]);
        
        setTolgeeProviderComponent(() => TolgeeProviderBase);
        
        const instance = await createTolgee();
        setTolgeeInstance(instance);
      } catch (error) {
        console.error('Failed to load Tolgee:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadTolgee();
  }, []);

  if (isLoading || !TolgeeProviderComponent || !tolgeeInstance) {
    return <FallbackProvider>{children}</FallbackProvider>;
  }

  return (
    <TolgeeProviderComponent tolgee={tolgeeInstance}>
      {children}
    </TolgeeProviderComponent>
  );
} 