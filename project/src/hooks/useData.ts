import { useEffect, useMemo, useState } from 'react';
import { defaultBlogs, defaultCategories, defaultPricingRule, defaultProjects, defaultReviews, defaultSiteConfig, defaultTeamMembers } from '../data/defaultData';
import { listenCollection, listenSiteConfig } from '../services/firestoreService';
import type { Blog, Category, Message, PricingRule, Project, Review, SiteConfig, TeamMember } from '../types';

function useFirestoreCollection<T>(collectionName: 'categories' | 'projects' | 'blogs' | 'messages' | 'pricingRules' | 'teamMembers' | 'reviews', fallback: T[]) {
  const [data, setData] = useState<T[]>(fallback);
  const [loading, setLoading] = useState(true);
  const [error] = useState<Error | null>(null);

  useEffect(() => {
    const unsubscribe = listenCollection<T>(collectionName, (items) => {
      setData(items.length ? items : fallback);
      setLoading(false);
    });
    return unsubscribe;
  }, [collectionName]);

  return { data, loading, error };
}

export function useCategories() {
  const result = useFirestoreCollection<Category>('categories', defaultCategories);
  const data = useMemo(
    () => [...result.data].sort((a, b) => (a.order || 0) - (b.order || 0)),
    [result.data],
  );
  return { ...result, data };
}

export function useCategory(slug: string) {
  const { data, loading, error } = useCategories();
  return {
    data: data.find((item) => item.slug === slug) || null,
    loading,
    error,
  };
}

export function useProjects(featured?: boolean) {
  const result = useFirestoreCollection<Project>('projects', defaultProjects);
  const data = useMemo(() => {
    const items = featured ? result.data.filter((item) => item.featured) : result.data;
    return [...items].sort((a, b) => (b.year || 0) - (a.year || 0));
  }, [featured, result.data]);
  return { ...result, data };
}

export function useProject(slug: string) {
  const { data, loading, error } = useProjects();
  return {
    data: data.find((item) => item.slug === slug) || null,
    loading,
    error,
  };
}

export function useBlogs() {
  const result = useFirestoreCollection<Blog>('blogs', defaultBlogs);
  const data = useMemo(
    () => [...result.data].sort((a, b) => new Date(b.publishedAt || b.createdAt).getTime() - new Date(a.publishedAt || a.createdAt).getTime()),
    [result.data],
  );
  return { ...result, data };
}

export function useBlog(slug: string) {
  const { data, loading, error } = useBlogs();
  return {
    data: data.find((item) => item.slug === slug) || null,
    loading,
    error,
  };
}

export function useMessages() {
  return useFirestoreCollection<Message>('messages', []);
}

export function useTeamMembers() {
  const result = useFirestoreCollection<TeamMember>('teamMembers', defaultTeamMembers);
  const data = useMemo(
    () => [...result.data].sort((a, b) => (a.order || 0) - (b.order || 0)),
    [result.data],
  );
  return { ...result, data };
}

export function useReviews() {
  const result = useFirestoreCollection<Review>('reviews', defaultReviews);
  const data = useMemo(
    () => [...result.data].sort((a, b) => (a.order || 0) - (b.order || 0)),
    [result.data],
  );
  return { ...result, data };
}

export function useSiteConfig() {
  const [data, setData] = useState<SiteConfig>(defaultSiteConfig);
  const [loading, setLoading] = useState(true);
  const [error] = useState<Error | null>(null);

  useEffect(() => {
    const unsubscribe = listenSiteConfig<SiteConfig>((config) => {
      setData(config);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  return { data, loading, error };
}

export function usePricingRules() {
  const { data, loading, error } = useFirestoreCollection<PricingRule>('pricingRules', [defaultPricingRule]);
  return {
    data: data[0] || defaultPricingRule,
    loading,
    error,
  };
}
