import { type ChangeEvent, type FormEvent, useMemo, useState } from 'react';
import { Check, ClipboardList, Loader2, Send, Home, Building2, Paintbrush, Truck, Thermometer, Layers, Sun, ClipboardCheck } from 'lucide-react';
import { objectTypes } from '../../data/defaultData';
import { useCategories } from '../../hooks/useData';
import { upsertDocument } from '../../services/firestoreService';

const iconMap: Record<string, React.ReactNode> = {
  'Home': <Home className="w-5 h-5" />,
  'Building2': <Building2 className="w-5 h-5" />,
  'paintbrush': <Paintbrush className="w-5 h-5" />,
  'Truck': <Truck className="w-5 h-5" />,
  'Thermometer': <Thermometer className="w-5 h-5" />,
  'Layers': <Layers className="w-5 h-5" />,
  'Sun': <Sun className="w-5 h-5" />,
  'ClipboardCheck': <ClipboardCheck className="w-5 h-5" />,
};

const initialForm = {
  name: '',
  email: '',
  phone: '',
  objectType: '',
  area: '',
  message: '',
};

export default function QuickQuoteSection() {
  const { data: categories } = useCategories();
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [formData, setFormData] = useState(initialForm);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const selectedServiceTitles = useMemo(
    () =>
      selectedServices
        .map((slug) => categories.find((category) => category.slug === slug)?.title)
        .filter(Boolean),
    [categories, selectedServices],
  );

  const toggleService = (slug: string) => {
    setSelectedServices((current) =>
      current.includes(slug) ? current.filter((item) => item !== slug) : [...current, slug],
    );
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = event.target;
    setFormData((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);

    if (!selectedServices.length) {
      setError('Bitte waehlen Sie mindestens eine Leistung aus.');
      return;
    }

    setSubmitting(true);

    const messageData = {
      name: formData.name,
      email: formData.email,
      phone: formData.phone || null,
      service: selectedServices.join(', '),
      selectedServices,
      selectedServiceTitles,
      projectAddress: null,
      objectType: formData.objectType || null,
      area: formData.area ? Number(formData.area) : null,
      message: formData.message || 'Kurzanfrage ueber die Startseite.',
      attachments: [],
      status: 'new',
      source: 'home_quick_quote',
    };

    try {
      await upsertDocument('messages', messageData);
    } catch (submitError) {
      const cachedMessages = JSON.parse(window.localStorage.getItem('demo_messages') || '[]');
      window.localStorage.setItem(
        'demo_messages',
        JSON.stringify([{ ...messageData, createdAt: new Date().toISOString() }, ...cachedMessages]),
      );
      console.info('Quick quote saved locally because Firebase is not configured.', submitError);
    } finally {
      setSubmitting(false);
      setSubmitted(true);
      setSelectedServices([]);
      setFormData(initialForm);
    }
  };

  return (
    <section className="bg-carbon-1000 py-10 sm:py-14 lg:py-16" data-testid="quick-quote-section">
      <div className="container-custom">
        <div className="grid gap-6 border-y border-white/10 py-8 lg:grid-cols-[0.85fr_1.15fr] lg:gap-10 lg:py-10">
          <div className="min-w-0">
            <span className="label">Direkt anfragen</span>
            <h2 className="mt-4 text-3xl font-bold leading-tight text-white sm:text-4xl">
              Welche Arbeiten sollen wir fuer Sie pruefen?
            </h2>
            <p className="mt-4 text-base leading-7 text-gray-400">
              Waehlen Sie eine oder mehrere Leistungen aus und senden Sie uns die Eckdaten. Unser Team meldet sich mit
              einer ersten Einschaetzung.
            </p>

            {selectedServices.length > 0 && (
              <div className="mt-6 rounded border border-accent-500/25 bg-accent-500/10 p-4">
                <div className="flex items-center gap-2 text-sm font-semibold text-white mb-3">
                  <ClipboardList className="h-4 w-4 text-accent-500" />
                  Ausgewaehlt
                </div>
                <div className="flex flex-wrap gap-3">
                  {selectedServices.map((slug) => {
                    const category = categories.find((c) => c.slug === slug);
                    return (
                      <div
                        key={slug}
                        className="flex items-center gap-2 px-3 py-2 rounded bg-accent-500/20 border border-accent-500/40"
                      >
                        <span className="text-accent-400">{category && iconMap[category.icon]}</span>
                        <span className="text-sm font-medium text-white">{category?.title}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          <form onSubmit={handleSubmit} className="min-w-0 space-y-5">
            <div className="grid mobile-safe-grid gap-2">
              {categories.map((category) => {
                const active = selectedServices.includes(category.slug);

                return (
                  <button
                    key={category.slug}
                    type="button"
                    onClick={() => toggleService(category.slug)}
                    data-service-slug={category.slug}
                    className={`flex min-h-[3.25rem] items-center justify-between gap-3 rounded border px-3 py-3 text-left text-sm font-semibold transition-all sm:px-4 ${
                      active
                        ? 'border-accent-500 bg-accent-500 text-white shadow-lg shadow-accent-500/20'
                        : 'border-white/10 bg-carbon-900/60 text-white/85 hover:border-accent-500/60 hover:bg-white/5'
                    }`}
                    aria-pressed={active}
                  >
                    <div className="flex items-center gap-2 min-w-0">
                      <span className={`flex-shrink-0 ${active ? 'text-white' : 'text-accent-500'}`}>
                        {iconMap[category.icon]}
                      </span>
                      <span className="min-w-0 break-words">{category.title}</span>
                    </div>
                    <span
                      className={`flex h-6 w-6 flex-shrink-0 items-center justify-center rounded border ${
                        active ? 'border-white/50 bg-white/15' : 'border-white/15 bg-white/5'
                      }`}
                    >
                      {active && <Check className="h-4 w-4" />}
                    </span>
                  </button>
                );
              })}
            </div>

            {error && (
              <div className="rounded border border-red-500/25 bg-red-500/10 px-4 py-3 text-sm text-red-200">
                {error}
              </div>
            )}

            {submitted && (
              <div className="rounded border border-green-500/25 bg-green-500/10 px-4 py-3 text-sm text-green-200">
                Vielen Dank. Ihre Kurzanfrage wurde erfasst.
              </div>
            )}

            <div className="grid gap-3 md:grid-cols-2">
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="input-field"
                placeholder="Name"
                required
              />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="input-field"
                placeholder="E-Mail"
                required
              />
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="input-field"
                placeholder="Telefon"
              />
              <select
                name="objectType"
                value={formData.objectType}
                onChange={handleChange}
                className="select-field"
              >
                <option value="">Objekttyp</option>
                {objectTypes.map((objectType) => (
                  <option key={objectType.value} value={objectType.value}>
                    {objectType.label}
                  </option>
                ))}
              </select>
              <input
                type="number"
                name="area"
                value={formData.area}
                onChange={handleChange}
                className="input-field md:col-span-2"
                placeholder="Flaeche in m2"
                min="0"
              />
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                className="textarea-field md:col-span-2"
                placeholder="Kurze Projektbeschreibung"
                rows={3}
              />
            </div>

            <button type="submit" disabled={submitting} className="btn-primary w-full justify-center">
              {submitting ? (
                <>
                  Wird gesendet
                  <Loader2 className="h-5 w-5 animate-spin" />
                </>
              ) : (
                <>
                  Kurzanfrage senden
                  <Send className="h-5 w-5" />
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
