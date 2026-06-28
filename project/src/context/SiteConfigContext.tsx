import { createContext, useContext, ReactNode } from 'react';
import { useSiteConfig } from '../hooks/useData';
import type { SiteConfig } from '../types';
import { defaultSiteConfig } from '../data/defaultData';

interface SiteConfigContextValue {
  config: SiteConfig;
  loading: boolean;
  error: Error | null;
}

const SiteConfigContext = createContext<SiteConfigContextValue>({
  config: defaultSiteConfig,
  loading: true,
  error: null,
});

export function SiteConfigProvider({ children }: { children: ReactNode }) {
  const { data, loading, error } = useSiteConfig();

  return (
    <SiteConfigContext.Provider value={{ config: data || defaultSiteConfig, loading, error }}>
      {children}
    </SiteConfigContext.Provider>
  );
}

export function useSiteConfigContext() {
  const context = useContext(SiteConfigContext);
  if (!context) {
    throw new Error('useSiteConfigContext must be used within a SiteConfigProvider');
  }
  return context;
}
