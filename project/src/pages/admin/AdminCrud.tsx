import ReactQuill from 'react-quill';
import { FormEvent, useMemo, useState } from 'react';
import { Upload } from 'lucide-react';
import useCloudinary from '../../hooks/useCloudinary';
import { useBlogs, useCategories, useProjects, useReviews, useTeamMembers } from '../../hooks/useData';
import { removeDocument, upsertDocument } from '../../services/firestoreService';
import { slugify } from '../../utils/helpers';
import type { Blog, Category, Project, Review, TeamMember } from '../../types';

type EditableCollection = 'categories' | 'projects' | 'blogs' | 'teamMembers' | 'reviews';
type EditableItem = Partial<Category & Project & Blog & TeamMember & Review>;

const collectionLabels: Record<EditableCollection, string> = {
  categories: 'Leistung',
  projects: 'Projekt',
  blogs: 'Bauwissen Artikel',
  teamMembers: 'Teammitglied',
  reviews: 'Bewertung',
};

function emptyForm(collectionName: EditableCollection): EditableItem {
  if (collectionName === 'categories') {
    return {
      title: '',
      slug: '',
      description: '',
      shortDescription: '',
      image: '',
      order: 1,
      seoTitle: '',
      seoDescription: '',
      seoKeywords: [],
      advantages: [],
      processSteps: [],
    };
  }
  if (collectionName === 'blogs') {
    return {
      title: '',
      slug: '',
      excerpt: '',
      content: '',
      coverImage: '',
      categorySlug: '',
      author: 'Redaktion',
      readingTime: 5,
      tags: [],
      seoTitle: '',
      seoDescription: '',
      seoKeywords: [],
      publishedAt: new Date().toISOString(),
    };
  }
  if (collectionName === 'teamMembers') {
    return {
      name: '',
      position: '',
      photo: '',
      order: 1,
    };
  }
  if (collectionName === 'reviews') {
    return {
      name: '',
      rating: 5,
      text: '',
      date: new Date().toISOString().slice(0, 10),
      avatar: '',
      order: 1,
    };
  }
  return {
    title: '',
    slug: '',
    description: '',
    shortDescription: '',
    categorySlug: '',
    location: 'Berlin',
    year: new Date().getFullYear(),
    thumbnail: '',
    beforeImage: '',
    afterImage: '',
    gallery: [],
    highlights: [],
    client: '',
    duration: '',
    featured: false,
    seoTitle: '',
    seoDescription: '',
    seoKeywords: [],
  };
}

function parseList(value?: string[] | string) {
  if (Array.isArray(value)) return value.join(', ');
  return value || '';
}

function toList(value: string) {
  return value.split(',').map((item) => item.trim()).filter(Boolean);
}

export default function AdminCrud({ collectionName, richText = false }: { collectionName: EditableCollection; richText?: boolean }) {
  const categoryData = useCategories();
  const projectData = useProjects();
  const blogData = useBlogs();
  const teamData = useTeamMembers();
  const reviewData = useReviews();
  const { uploading, uploadFiles } = useCloudinary();
  const [editingId, setEditingId] = useState<string | undefined>();
  const [form, setForm] = useState<EditableItem>(emptyForm(collectionName));
  const [status, setStatus] = useState('');

  const items = useMemo(() => {
    if (collectionName === 'categories') return categoryData.data;
    if (collectionName === 'projects') return projectData.data;
    if (collectionName === 'blogs') return blogData.data;
    if (collectionName === 'teamMembers') return teamData.data;
    return reviewData.data;
  }, [blogData.data, categoryData.data, collectionName, projectData.data, reviewData.data, teamData.data]);

  function update(field: keyof EditableItem, value: unknown) {
    setForm((current) => ({ ...current, [field]: value }));
  }

  function startEdit(item: EditableItem) {
    setEditingId(item.id);
    setForm({ ...emptyForm(collectionName), ...item });
  }

  async function uploadField(files: FileList | null, field: 'image' | 'coverImage' | 'thumbnail' | 'beforeImage' | 'afterImage' | 'gallery' | 'photo' | 'avatar') {
    if (!files?.length) return;
    try {
      const urls = await uploadFiles(files);
      if (field === 'gallery') {
        update('gallery', [...(form.gallery || []), ...urls]);
      } else {
        update(field, urls[0]);
      }
    } catch (error) {
      setStatus(error instanceof Error ? error.message : 'Upload fehlgeschlagen.');
    }
  }

  async function submit(event: FormEvent) {
    event.preventDefault();
    setStatus('');

    const payload: Record<string, unknown> = { ...form };

    if (collectionName === 'categories' || collectionName === 'projects' || collectionName === 'blogs') {
      const title = String(form.title || '');
      payload.slug = form.slug || slugify(title);
      payload.seoTitle = form.seoTitle || `${title} | Bauunternehmen Berlin`;
      payload.seoDescription = form.seoDescription || form.shortDescription || form.description || form.excerpt || title;
      payload.seoKeywords = Array.isArray(form.seoKeywords) ? form.seoKeywords : toList(String(form.seoKeywords || ''));
      payload.tags = Array.isArray(form.tags) ? form.tags : toList(String(form.tags || ''));
      payload.highlights = Array.isArray(form.highlights) ? form.highlights : toList(String(form.highlights || ''));
      payload.advantages = Array.isArray(form.advantages) ? form.advantages : toList(String(form.advantages || ''));
      payload.processSteps = Array.isArray(form.processSteps) ? form.processSteps : toList(String(form.processSteps || ''));
    }

    if (collectionName === 'teamMembers') {
      payload.name = String(form.name || '');
      payload.position = String(form.position || '');
      payload.photo = String(form.photo || '');
      payload.order = Number(form.order || 1);
    }

    if (collectionName === 'reviews') {
      payload.name = String(form.name || '');
      payload.rating = Number(form.rating || 5);
      payload.text = String(form.text || '');
      payload.date = String(form.date || new Date().toISOString().slice(0, 10));
      payload.avatar = String(form.avatar || '');
      payload.order = Number(form.order || 1);
    }

    try {
      await upsertDocument(collectionName, payload, editingId);
      setForm(emptyForm(collectionName));
      setEditingId(undefined);
      setStatus('Gespeichert.');
    } catch (error) {
      setStatus(error instanceof Error ? error.message : 'Speichern fehlgeschlagen.');
    }
  }

  async function destroy(id?: string) {
    if (!id) return;
    try {
      await removeDocument(collectionName, id);
      setStatus('Gelöscht.');
    } catch (error) {
      setStatus(error instanceof Error ? error.message : 'Löschen fehlgeschlagen.');
    }
  }

  const titleLabel = collectionName === 'teamMembers' ? 'Name' : collectionName === 'reviews' ? 'Name' : 'Titel';
  const titleValue = collectionName === 'teamMembers' || collectionName === 'reviews' ? String(form.name || '') : String(form.title || '');

  return (
    <div className="grid gap-6 p-4 sm:p-6 lg:p-8 xl:grid-cols-[0.95fr_1.05fr]">
      <form onSubmit={submit} className="card min-w-0 space-y-5 p-4 sm:p-6">
        <div>
          <h1 className="text-2xl font-bold text-white">{collectionLabels[collectionName]} verwalten</h1>
          <p className="mt-1 text-sm text-gray-500">Firestore CRUD mit SEO und Cloudinary Medien.</p>
        </div>

        {(collectionName === 'teamMembers' || collectionName === 'reviews') ? (
          <>
            <label className="block">
              <span className="mb-2 block text-sm font-medium text-white">{titleLabel}</span>
              <input className="input-field" value={titleValue} onChange={(event) => update('name', event.target.value)} required />
            </label>
            {collectionName === 'teamMembers' && (
              <>
                <label className="block">
                  <span className="mb-2 block text-sm font-medium text-white">Position</span>
                  <input className="input-field" value={String(form.position || '')} onChange={(event) => update('position', event.target.value)} />
                </label>
                <label className="block">
                  <span className="mb-2 block text-sm font-medium text-white">Reihenfolge</span>
                  <input className="input-field" type="number" value={Number(form.order || 1)} onChange={(event) => update('order', Number(event.target.value))} />
                </label>
              </>
            )}
            {collectionName === 'reviews' && (
              <>
                <label className="block">
                  <span className="mb-2 block text-sm font-medium text-white">Bewertung</span>
                  <input className="input-field" type="number" min="1" max="5" value={Number(form.rating || 5)} onChange={(event) => update('rating', Number(event.target.value))} />
                </label>
                <label className="block">
                  <span className="mb-2 block text-sm font-medium text-white">Datum</span>
                  <input className="input-field" type="date" value={String(form.date || '')} onChange={(event) => update('date', event.target.value)} />
                </label>
                <label className="block">
                  <span className="mb-2 block text-sm font-medium text-white">Text</span>
                  <textarea className="textarea-field" value={String(form.text || '')} onChange={(event) => update('text', event.target.value)} required />
                </label>
                <label className="block">
                  <span className="mb-2 block text-sm font-medium text-white">Reihenfolge</span>
                  <input className="input-field" type="number" value={Number(form.order || 1)} onChange={(event) => update('order', Number(event.target.value))} />
                </label>
              </>
            )}
          </>
        ) : (
          <>
            <label className="block">
              <span className="mb-2 block text-sm font-medium text-white">Titel</span>
              <input className="input-field" value={String(form.title || '')} onChange={(event) => setForm({ ...form, title: event.target.value, slug: slugify(event.target.value) })} required />
            </label>
            <label className="block">
              <span className="mb-2 block text-sm font-medium text-white">Slug</span>
              <input className="input-field" value={String(form.slug || '')} onChange={(event) => update('slug', event.target.value)} required />
            </label>

            {collectionName !== 'blogs' && (
              <label className="block">
                <span className="mb-2 block text-sm font-medium text-white">Kurzbeschreibung</span>
                <textarea className="textarea-field" value={String(form.shortDescription || '')} onChange={(event) => update('shortDescription', event.target.value)} />
              </label>
            )}

            {richText ? (
              <label className="block">
                <span className="mb-2 block text-sm font-medium text-white">Rich Text Inhalt</span>
                <ReactQuill theme="snow" value={(collectionName === 'blogs' ? String(form.content || '') : String(form.description || ''))} onChange={(value) => update(collectionName === 'blogs' ? 'content' : 'description', value)} />
              </label>
            ) : (
              <label className="block">
                <span className="mb-2 block text-sm font-medium text-white">Beschreibung</span>
                <textarea className="textarea-field" value={String(form.description || '')} onChange={(event) => update('description', event.target.value)} />
              </label>
            )}

            {collectionName === 'projects' && (
              <div className="grid gap-4 md:grid-cols-2">
                <label className="block"><span className="mb-2 block text-sm font-medium text-white">Kategorie Slug</span><input className="input-field" value={String(form.categorySlug || '')} onChange={(event) => update('categorySlug', event.target.value)} /></label>
                <label className="block"><span className="mb-2 block text-sm font-medium text-white">Ort</span><input className="input-field" value={String(form.location || '')} onChange={(event) => update('location', event.target.value)} /></label>
                <label className="block"><span className="mb-2 block text-sm font-medium text-white">Jahr</span><input className="input-field" type="number" value={Number(form.year || '')} onChange={(event) => update('year', Number(event.target.value))} /></label>
                <label className="flex items-center gap-3 pt-7 text-sm text-white"><input type="checkbox" checked={Boolean(form.featured)} onChange={(event) => update('featured', event.target.checked)} /> Featured</label>
                <label className="block"><span className="mb-2 block text-sm font-medium text-white">Kunde</span><input className="input-field" value={String(form.client || '')} onChange={(event) => update('client', event.target.value)} /></label>
                <label className="block"><span className="mb-2 block text-sm font-medium text-white">Dauer</span><input className="input-field" value={String(form.duration || '')} onChange={(event) => update('duration', event.target.value)} /></label>
              </div>
            )}

            {collectionName === 'blogs' && (
              <div className="grid gap-4 md:grid-cols-2">
                <label className="block"><span className="mb-2 block text-sm font-medium text-white">Auszug</span><input className="input-field" value={String(form.excerpt || '')} onChange={(event) => update('excerpt', event.target.value)} /></label>
                <label className="block"><span className="mb-2 block text-sm font-medium text-white">Kategorie Slug</span><input className="input-field" value={String(form.categorySlug || '')} onChange={(event) => update('categorySlug', event.target.value)} /></label>
                <label className="block"><span className="mb-2 block text-sm font-medium text-white">Autor</span><input className="input-field" value={String(form.author || '')} onChange={(event) => update('author', event.target.value)} /></label>
                <label className="block"><span className="mb-2 block text-sm font-medium text-white">Lesezeit</span><input className="input-field" type="number" value={Number(form.readingTime || 5)} onChange={(event) => update('readingTime', Number(event.target.value))} /></label>
              </div>
            )}
          </>
        )}

        <div className="grid gap-4 md:grid-cols-2">
          {collectionName === 'categories' && <label className="block"><span className="mb-2 block text-sm font-medium text-white">Bild</span><input className="input-field" type="file" onChange={(event) => void uploadField(event.target.files, 'image')} /></label>}
          {collectionName === 'blogs' && <label className="block"><span className="mb-2 block text-sm font-medium text-white">Cover</span><input className="input-field" type="file" onChange={(event) => void uploadField(event.target.files, 'coverImage')} /></label>}
          {collectionName === 'projects' && (
            <>
              <label className="block"><span className="mb-2 block text-sm font-medium text-white">Thumbnail</span><input className="input-field" type="file" onChange={(event) => void uploadField(event.target.files, 'thumbnail')} /></label>
              <label className="block"><span className="mb-2 block text-sm font-medium text-white">Before</span><input className="input-field" type="file" onChange={(event) => void uploadField(event.target.files, 'beforeImage')} /></label>
              <label className="block"><span className="mb-2 block text-sm font-medium text-white">After</span><input className="input-field" type="file" onChange={(event) => void uploadField(event.target.files, 'afterImage')} /></label>
              <label className="block"><span className="mb-2 block text-sm font-medium text-white">Galerie</span><input className="input-field" type="file" multiple onChange={(event) => void uploadField(event.target.files, 'gallery')} /></label>
            </>
          )}
          {collectionName === 'teamMembers' && <label className="block"><span className="mb-2 block text-sm font-medium text-white">Foto</span><input className="input-field" type="file" onChange={(event) => void uploadField(event.target.files, 'photo')} /></label>}
          {collectionName === 'reviews' && <label className="block"><span className="mb-2 block text-sm font-medium text-white">Avatar</span><input className="input-field" type="file" onChange={(event) => void uploadField(event.target.files, 'avatar')} /></label>}
        </div>

        {collectionName !== 'teamMembers' && collectionName !== 'reviews' && (
          <div className="rounded border border-white/10 p-4">
            <h2 className="mb-4 font-semibold text-white">SEO Suite</h2>
            <div className="grid gap-4">
              <input className="input-field" placeholder="Meta Title" value={String(form.seoTitle || '')} onChange={(event) => update('seoTitle', event.target.value)} />
              <textarea className="textarea-field" placeholder="Meta Description" value={String(form.seoDescription || '')} onChange={(event) => update('seoDescription', event.target.value)} />
              <input className="input-field" placeholder="Keywords, kommagetrennt" value={parseList(form.seoKeywords)} onChange={(event) => update('seoKeywords', toList(event.target.value))} />
            </div>
          </div>
        )}

        <button type="submit" className="btn-primary w-full justify-center">
          {uploading ? <Upload className="h-5 w-5 animate-pulse" /> : null}
          Speichern
        </button>
        {status && <p className="text-sm text-gray-400">{status}</p>}
      </form>

      <div className="min-w-0 space-y-3">
        {items.map((item) => {
          const itemName = String((item as TeamMember & Review & { title?: string; slug?: string; position?: string }).name || (item as { title?: string }).title || (item as { slug?: string }).slug || '');
          const itemSubtitle = collectionName === 'teamMembers'
            ? String((item as TeamMember).position || '')
            : collectionName === 'reviews'
              ? String((item as Review).text || '').slice(0, 80)
              : String((item as { slug?: string }).slug || '');
          return (
            <article key={item.id || item.slug} className="card flex min-w-0 flex-col gap-4 p-4 sm:flex-row sm:items-start sm:justify-between sm:p-5">
              <div className="min-w-0">
                <div className="flex items-center gap-3">
                  {(collectionName === 'teamMembers' || collectionName === 'reviews') && (
                    <img
                      src={collectionName === 'teamMembers' ? String((item as TeamMember).photo || '/logo.jpeg') : String((item as Review).avatar || '/logo.jpeg')}
                      alt={itemName}
                      className="h-12 w-12 rounded-full object-cover"
                    />
                  )}
                  <div>
                    <h2 className="text-lg font-semibold text-white">{itemName}</h2>
                    <p className="break-all text-sm text-gray-500">{itemSubtitle}</p>
                  </div>
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                <button className="min-h-10 rounded border border-white/10 px-3 py-2 text-sm text-white hover:bg-white/10" onClick={() => startEdit(item as EditableItem)}>Bearbeiten</button>
                <button className="min-h-10 rounded border border-red-500/30 px-3 py-2 text-sm text-red-300 hover:bg-red-500/10" onClick={() => void destroy(item.id)}>Löschen</button>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}
