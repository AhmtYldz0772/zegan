import { Link } from 'react-router-dom';
import { ArrowRight, Phone } from 'lucide-react';
import { useSiteConfigContext } from '../../context/SiteConfigContext';

export default function CTASection() {
  const { config } = useSiteConfigContext();

  return (
    <section className="relative section-padding overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-accent-600 via-accent-500 to-carbon-950" />
      <div className="absolute inset-0 bg-carbon-1000/50" />

      {/* Content */}
      <div className="relative container-custom">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="heading-lg text-white mb-6">
            Bereit für Ihr Bauvorhaben?
          </h2>
          <p className="text-xl text-white/80 mb-10">
            Kontaktieren Sie uns noch heute für eine unverbindliche Beratung. Wir freuen uns auf Ihr Projekt.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/kontakt" className="btn-primary bg-white text-accent-600 hover:bg-gray-100">
              Projekt anfragen
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            {config.phone && (
              <a
                href={`tel:${config.phone}`}
                className="btn-secondary border-white/30 hover:bg-white/10"
              >
                <Phone className="w-5 h-5" />
                {config.phone}
              </a>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
