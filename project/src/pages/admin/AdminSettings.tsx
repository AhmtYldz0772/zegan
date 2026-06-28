import { FormEvent, useEffect, useState } from 'react';
import { useSiteConfigContext } from '../../context/SiteConfigContext';
import { saveSiteConfig } from '../../services/firestoreService';
import type { SiteConfig } from '../../types';

export default function AdminSettings() {
  const { config } = useSiteConfigContext();
  const [form, setForm] = useState<SiteConfig>(config);
  const [status, setStatus] = useState('');

  useEffect(() => setForm(config), [config]);

  async function submit(event: FormEvent) {
    event.preventDefault();
    try {
      await saveSiteConfig(form as unknown as Record<string, unknown>);
      setStatus('Einstellungen gespeichert.');
    } catch (error) {
      setStatus(error instanceof Error ? error.message : 'Speichern fehlgeschlagen.');
    }
  }

  return (
    <form onSubmit={submit} className="max-w-5xl space-y-5 p-4 sm:p-6 lg:p-8">
      <h1 className="text-2xl font-bold text-white">Einstellungen</h1>
      {[
        'companyName',
        'logo',
        'address',
        'phone',
        'email',
        'googleMapsIframe',
        'heroTitle',
        'heroSubtitle',
        'heroImage',
        'globalSeoTitle',
        'globalSeoDescription',
        'footerText',
      ].map((field) => (
        <label key={field} className="block">
          <span className="mb-2 block text-sm font-medium text-white">{field}</span>
          <textarea
            className="textarea-field"
            value={String(form[field as keyof SiteConfig] || '')}
            onChange={(event) => setForm((current) => ({ ...current, [field]: event.target.value }))}
          />
        </label>
      ))}
      <button className="btn-primary" type="submit">Speichern</button>
      {status && <p className="text-sm text-gray-400">{status}</p>}
    </form>
  );
}
