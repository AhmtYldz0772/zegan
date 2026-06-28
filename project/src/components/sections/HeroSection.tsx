import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { useSiteConfigContext } from '../../context/SiteConfigContext';
import { optimizeCloudinary } from '../../utils/helpers';

export default function HeroSection() {
  const { config } = useSiteConfigContext();

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={optimizeCloudinary(config.heroImage, { width: 1920, quality: 'auto' })}
          alt=""
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-carbon-1000/95 via-carbon-1000/80 to-carbon-1000/60" />
        <div className="absolute inset-0 bg-gradient-to-t from-carbon-1000 via-transparent to-carbon-1000/50" />
      </div>

      {/* Content */}
      <div className="relative container-custom z-10 pt-24">
        <div className="max-w-4xl">
          {/* Label */}
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-accent-500/20 border border-accent-500/30 rounded mb-8 animate-slide-up">
            <span className="w-2 h-2 bg-accent-500 rounded-full animate-pulse" />
            <span className="text-accent-400 text-sm font-medium uppercase tracking-wider">
              Premium Bauunternehmen Berlin
            </span>
          </div>

          {/* Headline */}
          <h1 className="heading-lg text-white mb-6 animate-slide-up animate-delay-100">
            {config.heroTitle}
          </h1>

          {/* Subheadline */}
          <p className="subheading text-gray-300 mb-10 animate-slide-up animate-delay-200">
            {config.heroSubtitle}
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 animate-slide-up animate-delay-300">
            <Link to="/kontakt" className="btn-primary group">
              Projekt anfragen
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link to="/referenzen" className="btn-secondary">
              Referenzen ansehen
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16 pt-8 border-t border-white/10 animate-slide-up animate-delay-400">
            <div>
              <div className="text-4xl md:text-5xl font-bold text-accent-500 mb-1">15+</div>
              <div className="text-gray-400 text-sm">Jahre Erfahrung</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold text-accent-500 mb-1">500+</div>
              <div className="text-gray-400 text-sm">Projekte realisiert</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold text-accent-500 mb-1">98%</div>
              <div className="text-gray-400 text-sm">Zufriedene Kunden</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold text-accent-500 mb-1">24/7</div>
              <div className="text-gray-400 text-sm">Support & Beratung</div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce">
        <span className="text-gray-500 text-xs uppercase tracking-widest">Scroll</span>
        <div className="w-6 h-10 border-2 border-gray-500 rounded-full flex justify-center pt-2">
          <div className="w-1 h-2 bg-gray-500 rounded-full" />
        </div>
      </div>
    </section>
  );
}
