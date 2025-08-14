// Client-safe environment utilities
export const isClient = typeof window !== 'undefined';
export const isServer = typeof window === 'undefined';
export const isDevelopment = process.env.NODE_ENV === 'development';
export const isProduction = process.env.NODE_ENV === 'production';

// Safe environment variable access
export const getEnvVar = (key: string, defaultValue: string = ''): string => {
  if (isServer) {
    return defaultValue;
  }
  
  // For client-side, only access NEXT_PUBLIC_ variables
  if (key.startsWith('NEXT_PUBLIC_')) {
    return process.env[key] || defaultValue;
  }
  
  return defaultValue;
};

// Check if we're running on localhost
export const isLocalhost = isClient && window.location.hostname === 'localhost';

// Check if Tolgee should be enabled
export const shouldEnableTolgee = (): boolean => {
  const apiKey = getEnvVar('NEXT_PUBLIC_TOLGEE_API_KEY');
  const hasValidApiKey = apiKey && apiKey !== 'your_tolgee_api_key_here';
  
  // In development on localhost, prefer stability over Tolgee
  if (isLocalhost && isDevelopment) {
    return false;
  }
  
  return hasValidApiKey;
}; 