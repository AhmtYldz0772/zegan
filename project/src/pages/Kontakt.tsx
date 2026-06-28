import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Send, Phone, Mail, MapPin, Upload, CheckCircle, AlertCircle } from 'lucide-react';
import Seo from '../components/shared/Seo';
import { useSiteConfigContext } from '../context/SiteConfigContext';
import { useCategories } from '../hooks/useData';
import useCloudinary from '../hooks/useCloudinary';
import { upsertDocument } from '../services/firestoreService';

export default function Kontakt() {
  const { config } = useSiteConfigContext();
  const { data: categories } = useCategories();
  const { uploadFiles, uploading } = useCloudinary();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    projectAddress: '',
    objectType: '',
    area: '',
    message: '',
  });
  const [files, setFiles] = useState<File[]>([]);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFiles(Array.from(e.target.files));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    try {
      const attachmentUrls = files.length ? await uploadFiles(files) : [];
      const messageData = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone || null,
        service: formData.service || null,
        projectAddress: formData.projectAddress || null,
        objectType: formData.objectType || null,
        area: formData.area ? Number(formData.area) : null,
        message: formData.message,
        attachments: attachmentUrls,
        status: 'new',
      };

      await upsertDocument('messages', messageData);
      setSubmitted(true);
    } catch (err) {
      console.error('Error submitting form:', err);
      setError('Ein Fehler ist aufgetreten. Bitte versuchen Sie es erneut.');
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <>
        <Seo
          title="Kontakt"
          description="Kontaktieren Sie uns für Ihr Bauvorhaben. Unverbindliche Beratung und Angebot."
          keywords={['Kontakt', 'Anfrage', 'Beratung', 'Berlin']}
        />

        <section className="section-padding flex items-center justify-center bg-carbon-1000 min-h-[60vh]">
          <div className="max-w-lg text-center">
            <div className="w-20 h-20 bg-green-500/20 border border-green-500/30 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-10 h-10 text-green-500" />
            </div>
            <h1 className="text-3xl font-bold text-white mb-4">
              Vielen Dank!
            </h1>
            <p className="text-gray-400 mb-8">
              Ihre Anfrage wurde erfolgreich gesendet. Wir melden uns in Kürze bei Ihnen.
            </p>
            <Link to="/" className="btn-secondary">
              Zurück zur Startseite
            </Link>
          </div>
        </section>
      </>
    );
  }

  return (
    <>
      <Seo
        title="Kontakt"
        description="Kontaktieren Sie uns für Ihr Bauvorhaben. Unverbindliche Beratung und Angebot."
        keywords={['Kontakt', 'Anfrage', 'Beratung', 'Berlin']}
      />

      {/* Hero */}
      <section className="bg-carbon-950 pb-12 pt-28 sm:pb-16 sm:pt-32">
        <div className="container-custom">
          <div className="max-w-3xl">
            <span className="label">Kontakt</span>
            <h1 className="heading-xl text-white mt-4 mb-6">
              Projekt anfragen
            </h1>
            <p className="text-base leading-7 text-gray-400 sm:text-xl sm:leading-8">
              Nutzen Sie das Kontaktformular oder rufen Sie uns direkt an. Wir beraten Sie unverbindlich zu Ihrem Bauvorhaben.
            </p>
          </div>
        </div>
      </section>

      {/* Form & Info */}
      <section className="section-padding bg-carbon-1000">
        <div className="container-custom">
          <div className="grid gap-8 lg:grid-cols-3 lg:gap-12">
            {/* Form */}
            <div className="lg:col-span-2">
              <form onSubmit={handleSubmit} className="card p-4 sm:p-6 lg:p-8">
                <h2 className="text-xl font-bold text-white mb-6">Ihre Anfrage</h2>

                {error && (
                  <div className="flex items-center gap-3 p-4 bg-red-500/10 border border-red-500/20 rounded mb-6">
                    <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
                    <p className="text-red-400 text-sm">{error}</p>
                  </div>
                )}

                <div className="mb-6 grid gap-4 md:grid-cols-2 md:gap-6">
                  {/* Name */}
                  <div>
                    <label className="block text-sm font-medium text-white mb-2">
                      Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="input-field"
                      placeholder="Max Mustermann"
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-sm font-medium text-white mb-2">
                      E-Mail *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="input-field"
                      placeholder="email@beispiel.de"
                    />
                  </div>

                  {/* Phone */}
                  <div>
                    <label className="block text-sm font-medium text-white mb-2">
                      Telefon
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="input-field"
                      placeholder="+49 30 ..."
                    />
                  </div>

                  {/* Service */}
                  <div>
                    <label className="block text-sm font-medium text-white mb-2">
                      Gewünschte Leistung
                    </label>
                    <select
                      name="service"
                      value={formData.service}
                      onChange={handleChange}
                      className="select-field"
                    >
                      <option value="">Bitte wählen...</option>
                      {categories.map((cat) => (
                        <option key={cat.slug} value={cat.slug}>
                          {cat.title}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Project Address */}
                  <div>
                    <label className="block text-sm font-medium text-white mb-2">
                      Projektadresse
                    </label>
                    <input
                      type="text"
                      name="projectAddress"
                      value={formData.projectAddress}
                      onChange={handleChange}
                      className="input-field"
                      placeholder="Straße, PLZ Berlin"
                    />
                  </div>

                  {/* Object Type */}
                  <div>
                    <label className="block text-sm font-medium text-white mb-2">
                      Objekttyp
                    </label>
                    <select
                      name="objectType"
                      value={formData.objectType}
                      onChange={handleChange}
                      className="select-field"
                    >
                      <option value="">Bitte wählen...</option>
                      <option value="apartment">Wohnung</option>
                      <option value="house">Haus</option>
                      <option value="commercial">Gewerbeobjekt</option>
                      <option value="industrial">Industriebau</option>
                      <option value="other">Sonstiges</option>
                    </select>
                  </div>

                  {/* Area */}
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-white mb-2">
                      Fläche (m²)
                    </label>
                    <input
                      type="number"
                      name="area"
                      value={formData.area}
                      onChange={handleChange}
                      className="input-field"
                      placeholder="z.B. 100"
                      min="0"
                    />
                  </div>

                  {/* Message */}
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-white mb-2">
                      Ihre Nachricht *
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={5}
                      className="textarea-field"
                      placeholder="Beschreiben Sie Ihr Projekt..."
                    />
                  </div>

                  {/* File Upload */}
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-white mb-2">
                      Anhänge (optional)
                    </label>
                    <div className="relative">
                      <input
                        type="file"
                        multiple
                        accept="image/*,.pdf"
                        onChange={handleFileChange}
                        className="hidden"
                        id="file-upload"
                      />
                      <label
                        htmlFor="file-upload"
                        className="flex items-center gap-3 px-4 py-3 border border-dashed border-white/20 rounded cursor-pointer hover:border-accent-500 transition-colors"
                      >
                        <Upload className="w-5 h-5 text-gray-500" />
                        <span className="text-gray-400 text-sm">
                          {files.length > 0
                            ? `${files.length} Datei(en) ausgewählt`
                            : 'Dateien hochladen'}
                        </span>
                      </label>
                    </div>
                  </div>

                  {/* Privacy */}
                  <div className="md:col-span-2">
                    <p className="text-gray-500 text-xs">
                      Mit dem Absenden erklären Sie sich mit der Verarbeitung Ihrer Daten gemäß unserer{' '}
                      <Link to="/datenschutz" className="text-accent-500 hover:underline">
                        Datenschutzerklärung
                      </Link>{' '}
                      einverstanden.
                    </p>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="btn-primary w-full justify-center"
                >
                  {submitting || uploading ? 'Wird gesendet...' : 'Anfrage absenden'}
                  {!submitting && <Send className="w-5 h-5" />}
                </button>
              </form>
            </div>

            {/* Contact Info */}
            <div className="lg:col-span-1 space-y-6">
              {/* Direct Contact */}
              <div className="card p-6">
                <h3 className="text-lg font-semibold text-white mb-6">
                  Direkter Kontakt
                </h3>
                <div className="space-y-4">
                  {config.phone && (
                    <a
                      href={`tel:${config.phone}`}
                      className="flex items-center gap-4 text-gray-400 hover:text-accent-500 transition-colors"
                    >
                      <div className="w-10 h-10 bg-accent-500/10 border border-accent-500/20 rounded flex items-center justify-center">
                        <Phone className="w-5 h-5 text-accent-500" />
                      </div>
                      <div>
                        <div className="text-white font-medium">{config.phone}</div>
                        <div className="text-xs text-gray-500">Telefon</div>
                      </div>
                    </a>
                  )}
                  {config.email && (
                    <a
                      href={`mailto:${config.email}`}
                      className="flex items-center gap-4 text-gray-400 hover:text-accent-500 transition-colors"
                    >
                      <div className="w-10 h-10 bg-accent-500/10 border border-accent-500/20 rounded flex items-center justify-center">
                        <Mail className="w-5 h-5 text-accent-500" />
                      </div>
                      <div>
                        <div className="text-white font-medium">{config.email}</div>
                        <div className="text-xs text-gray-500">E-Mail</div>
                      </div>
                    </a>
                  )}
                  {config.address && (
                    <div className="flex items-center gap-4 text-gray-400">
                      <div className="w-10 h-10 bg-accent-500/10 border border-accent-500/20 rounded flex items-center justify-center">
                        <MapPin className="w-5 h-5 text-accent-500" />
                      </div>
                      <div>
                        <div className="text-white font-medium">{config.address}</div>
                        <div className="text-xs text-gray-500">Adresse</div>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Map */}
              {config.googleMapsIframe && (
                <div className="card overflow-hidden">
                  <div className="aspect-[4/3]">
                    <iframe
                      src={config.googleMapsIframe}
                      width="100%"
                      height="100%"
                      style={{ border: 0 }}
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      title="Standort"
                    />
                  </div>
                </div>
              )}

              {/* Quick Links */}
              <div className="card p-6">
                <h3 className="text-lg font-semibold text-white mb-4">
                  Schnellzugriff
                </h3>
                <div className="space-y-3">
                  <Link to="/baukosten-rechner" className="block text-gray-400 hover:text-accent-500 text-sm transition-colors">
                    &rarr; Baukosten-Rechner
                  </Link>
                  <Link to="/leistungen" className="block text-gray-400 hover:text-accent-500 text-sm transition-colors">
                    &rarr; Unsere Leistungen
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
