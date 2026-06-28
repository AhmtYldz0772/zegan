import { Link } from 'react-router-dom';
import { ArrowRight, Home, Building2, Paintbrush, Truck, Thermometer, Layers, Sun, ClipboardCheck, LucideIcon } from 'lucide-react';
import { useCategories } from '../../hooks/useData';
import type { Category } from '../../types';
import LoadingSpinner from '../ui/LoadingSpinner';

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

export default function ServicesSection() {
  const { data: categories, loading } = useCategories();

  if (loading) {
    return (
      <section className="section-padding bg-carbon-950">
        <div className="container-custom">
          <LoadingSpinner className="py-20" />
        </div>
      </section>
    );
  }

  return (
    <section className="section-padding bg-carbon-950">
      <div className="container-custom">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="label">Unsere Expertise</span>
          <h2 className="heading-lg text-white mt-4 mb-6">
            Leistungen nach Maß
          </h2>
          <p className="subheading mx-auto text-gray-400">
            Von der Sanierung bis zum Neubau – wir bieten Ihnen das vollumfängliche Baudienstleistungsspektrum aus einer Hand.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.slice(0, 8).map((category: Category, index: number) => {
            const IconComponent = iconMap[category.icon] || Building2;
            return (
              <Link
                key={category.id}
                to={`/leistungen/${category.slug}`}
                className={`card card-hover p-6 group animate-slide-up`}
                style={{ animationDelay: `${index * 50}ms` }}
              >
                {/* Icon */}
                <div className="w-14 h-14 bg-accent-500/10 border border-accent-500/20 rounded flex items-center justify-center mb-6 group-hover:bg-accent-500 group-hover:border-accent-500 transition-all duration-300">
                  <IconComponent className="w-7 h-7 text-accent-500 group-hover:text-white transition-colors" />
                </div>

                {/* Title */}
                <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-accent-500 transition-colors">
                  {category.title}
                </h3>

                {/* Description */}
                <p className="text-gray-400 text-sm mb-6 line-clamp-3">
                  {category.shortDescription}
                </p>

                {/* CTA */}
                <div className="flex items-center gap-2 text-accent-500 text-sm font-medium group-hover:gap-3 transition-all">
                  Mehr erfahren
                  <ArrowRight className="w-4 h-4" />
                </div>
              </Link>
            );
          })}
        </div>

        {/* All Services CTA */}
        <div className="text-center mt-12">
          <Link to="/leistungen" className="btn-secondary">
            Alle Leistungen ansehen
          </Link>
        </div>
      </div>
    </section>
  );
}
