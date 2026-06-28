import { useParams, Link } from 'react-router-dom';
import { ArrowRight, CheckCircle, Home, Building2, Paintbrush, Truck, Thermometer, Layers, Sun, ClipboardCheck, LucideIcon } from 'lucide-react';
import Seo from '../components/shared/Seo';
import { useCategory } from '../hooks/useData';
import CTASection from '../components/sections/CTASection';
import { LoadingPage } from '../components/ui/LoadingSpinner';

const iconMap: Record<string, LucideIcon> = {
  Home,
  Building2,
  Paintbrush: Paintbrush,
  Truck,
  Thermometer,
  Layers,
  Sun,
  ClipboardCheck,
};

export default function ServiceDetail() {
  const { slug } = useParams<{ slug: string }>();
  const { data: category, loading } = useCategory(slug || '');

  if (loading) {
    return <LoadingPage />;
  }

  if (!category) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center">
        <h1 className="text-2xl font-bold text-white mb-4">Leistung nicht gefunden</h1>
        <Link to="/leistungen" className="btn-secondary">
          Zurück zu Leistungen
        </Link>
      </div>
    );
  }

  const IconComponent = iconMap[category.icon] || Building2;

  return (
    <>
      <Seo
        title={category.seoTitle || category.title}
        description={category.seoDescription || category.description}
        keywords={category.seoKeywords}
        image={category.image}
      />

      {/* Hero */}
      <section className="pt-32 pb-16 bg-carbon-950">
        <div className="container-custom">
          <div className="max-w-4xl">
            <Link
              to="/leistungen"
              className="text-gray-400 hover:text-white text-sm mb-6 inline-flex items-center gap-2 transition-colors"
            >
              <ArrowRight className="w-4 h-4 rotate-180" />
              Zurück zu Leistungen
            </Link>
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 bg-accent-500/10 border border-accent-500/20 rounded flex items-center justify-center">
                <IconComponent className="w-8 h-8 text-accent-500" />
              </div>
              <span className="label">Leistung</span>
            </div>
            <h1 className="heading-xl text-white mb-6">{category.title}</h1>
            <p className="text-xl text-gray-400">{category.description}</p>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="section-padding bg-carbon-1000">
        <div className="container-custom">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-12">
              {/* Advantages */}
              <div className="card p-8">
                <h2 className="text-2xl font-bold text-white mb-6">Ihre Vorteile</h2>
                <div className="grid md:grid-cols-2 gap-4">
                  {category.advantages.map((advantage, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-accent-500 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-300">{advantage}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Process */}
              <div className="card p-8">
                <h2 className="text-2xl font-bold text-white mb-6">Unser Prozess</h2>
                <div className="space-y-6">
                  {category.processSteps.map((step, index) => (
                    <div key={index} className="flex items-start gap-4">
                      <div className="w-8 h-8 bg-accent-500 rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0">
                        {index + 1}
                      </div>
                      <div className="flex-1">
                        <p className="text-white font-medium mb-1">{step}</p>
                        <div className="h-1 bg-carbon-700 rounded w-full last:hidden" style={{ width: `${100 - index * 25}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              {/* CTA Card */}
              <div className="card p-6 mb-6">
                <h3 className="text-xl font-bold text-white mb-4">
                  Projekt anfragen
                </h3>
                <p className="text-gray-400 text-sm mb-6">
                  Benötigen Sie diese Leistung? Kontaktieren Sie uns für eine unverbindliche Beratung.
                </p>
                <Link to="/kontakt" className="btn-primary w-full justify-center">
                  Angebot anfordern
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </div>

              {/* Related Services */}
              <div className="card p-6">
                <h3 className="text-xl font-bold text-white mb-6">
                  Weitere Leistungen
                </h3>
                <div className="space-y-4">
                  <Link to="/kontakt" className="text-gray-400 hover:text-accent-500 text-sm transition-colors">
                    &rarr; Kostenlose Erstberatung
                  </Link>
                  <Link to="/baukosten-rechner" className="text-gray-400 hover:text-accent-500 text-sm transition-colors block">
                    &rarr; Baukosten berechnen
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <CTASection />
    </>
  );
}
