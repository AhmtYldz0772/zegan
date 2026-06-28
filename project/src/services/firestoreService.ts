import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  serverTimestamp,
  setDoc,
  updateDoc,
} from 'firebase/firestore';
import { db, firebaseReady } from '../lib/firebase';
import {
  defaultBlogs,
  defaultCategories,
  defaultPricingRule,
  defaultProjects,
  defaultReviews,
  defaultSiteConfig,
  defaultTeamMembers,
} from '../data/defaultData';

type CollectionName = 'categories' | 'projects' | 'blogs' | 'messages' | 'pricingRules' | 'teamMembers' | 'reviews';

const fallbackData: Record<string, unknown[]> = {
  categories: defaultCategories,
  projects: defaultProjects,
  blogs: defaultBlogs,
  messages: [],
  pricingRules: [defaultPricingRule],
  teamMembers: defaultTeamMembers,
  reviews: defaultReviews,
};

function normalizeDoc<T>(id: string, data: Record<string, unknown>): T {
  return { id, ...data } as T;
}

export function listenCollection<T>(
  collectionName: CollectionName,
  callback: (items: T[]) => void,
): () => void {
  if (!firebaseReady || !db) {
    callback((fallbackData[collectionName] || []) as T[]);
    return () => undefined;
  }

  return onSnapshot(
    collection(db, collectionName),
    (snapshot) => {
      const items = snapshot.docs.map((item) => normalizeDoc<T>(item.id, item.data()));
      callback(items);
    },
    () => callback((fallbackData[collectionName] || []) as T[]),
  );
}

export function listenSiteConfig<T>(callback: (config: T) => void): () => void {
  if (!firebaseReady || !db) {
    callback(defaultSiteConfig as T);
    return () => undefined;
  }

  return onSnapshot(
    doc(db, 'settings', 'site_config'),
    (snapshot) => callback({ ...defaultSiteConfig, ...(snapshot.data() || {}) } as T),
    () => callback(defaultSiteConfig as T),
  );
}

export async function saveSiteConfig(payload: Record<string, unknown>) {
  if (!firebaseReady || !db) throw new Error('Firebase ist nicht konfiguriert.');
  await setDoc(doc(db, 'settings', 'site_config'), payload, { merge: true });
}

export async function upsertDocument(collectionName: CollectionName, payload: Record<string, unknown>, id?: string) {
  if (!firebaseReady || !db) throw new Error('Firebase ist nicht konfiguriert.');

  const data = {
    ...payload,
    ...(payload.createdAt ? {} : { createdAt: serverTimestamp() }),
    updatedAt: serverTimestamp(),
  };

  if (id) {
    await setDoc(doc(db, collectionName, id), data, { merge: true });
    return id;
  }

  const ref = await addDoc(collection(db, collectionName), data);
  return ref.id;
}

export async function removeDocument(collectionName: CollectionName, id: string) {
  if (!firebaseReady || !db) throw new Error('Firebase ist nicht konfiguriert.');
  await deleteDoc(doc(db, collectionName, id));
}

export async function seedFirestore() {
  await saveSiteConfig(defaultSiteConfig as unknown as Record<string, unknown>);
  await Promise.all(defaultCategories.map((item) => upsertDocument('categories', item as unknown as Record<string, unknown>)));
  await Promise.all(defaultProjects.map((item) => upsertDocument('projects', item as unknown as Record<string, unknown>)));
  await Promise.all(defaultBlogs.map((item) => upsertDocument('blogs', item as unknown as Record<string, unknown>)));
  await Promise.all(defaultTeamMembers.map((item) => upsertDocument('teamMembers', item as unknown as Record<string, unknown>)));
  await Promise.all(defaultReviews.map((item) => upsertDocument('reviews', item as unknown as Record<string, unknown>)));
  await upsertDocument('pricingRules', defaultPricingRule as unknown as Record<string, unknown>, 'site_pricing');
}
