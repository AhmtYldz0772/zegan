import { FormEvent, useEffect, useState } from 'react';
import { usePricingRules } from '../../hooks/useData';
import { upsertDocument } from '../../services/firestoreService';
import type { PricingRule } from '../../types';

export default function AdminPricing() {
  const { data } = usePricingRules();
  const [form, setForm] = useState<PricingRule>(data);
  const [status, setStatus] = useState('');

  useEffect(() => setForm(data), [data]);

  async function submit(event: FormEvent) {
    event.preventDefault();
    try {
      await upsertDocument('pricingRules', form as unknown as Record<string, unknown>, form.id || 'site_pricing');
      setStatus('Preismatrix gespeichert.');
    } catch (error) {
      setStatus(error instanceof Error ? error.message : 'Speichern fehlgeschlagen.');
    }
  }

  return (
    <form onSubmit={submit} className="max-w-5xl space-y-6 p-4 sm:p-6 lg:p-8">
      <h1 className="text-2xl font-bold text-white">Preismatrix</h1>
      <div className="grid gap-4 md:grid-cols-3">
        <label><span className="mb-2 block text-sm font-medium text-white">Basispreis</span><input className="input-field" type="number" value={form.basePrice} onChange={(event) => setForm({ ...form, basePrice: Number(event.target.value) })} /></label>
        <label><span className="mb-2 block text-sm font-medium text-white">m² Faktor</span><input className="input-field" type="number" value={form.areaFactor} onChange={(event) => setForm({ ...form, areaFactor: Number(event.target.value) })} /></label>
      </div>
      <section className="card p-5">
        <h2 className="mb-4 font-semibold text-white">Service Multiplikatoren</h2>
        <div className="grid gap-4 md:grid-cols-2">
          {Object.entries(form.serviceMultipliers).map(([key, value]) => (
            <label key={key}><span className="mb-2 block text-sm font-medium text-white">{key}</span><input className="input-field" type="number" step="0.01" value={value} onChange={(event) => setForm({ ...form, serviceMultipliers: { ...form.serviceMultipliers, [key]: Number(event.target.value) } })} /></label>
          ))}
        </div>
      </section>
      <button className="btn-primary" type="submit">Speichern</button>
      {status && <p className="text-sm text-gray-400">{status}</p>}
    </form>
  );
}
