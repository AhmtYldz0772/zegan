import { Link } from 'react-router-dom';
import { ArrowRight, Home, Building2, Paintbrush, Truck, Thermometer, Layers, Sun, ClipboardCheck, LucideIcon } from 'lucide-react';
import Seo from '../components/shared/Seo';
import { useCategories } from '../hooks/useData';
import { optimizeCloudinary } from '../utils/helpers';
import type { Category } from '../types';
import LoadingSpinner from '../components/ui/LoadingSpinner';

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

export default function Leistungen() {
  const { data: categories, loading } = useCategories();

  return (
    <>
      <Seo
        title="Leistungen"
        description="Unsere Baudienstleistungen: Sanierung, Rohbau, Ausbau, Abbruch, Wärmedämmung und mehr. Qualitätsarbeit aus Berlin."
        keywords={['Baudienstleistungen', 'Sanierung', 'Neubau', 'Berlin']}
      />

      {/* Hero */}
      <section className="pt-32 pb-16 bg-carbon-950">
        <div className="container-custom">
          <div className="max-w-3xl">
            <span className="label">Unser Angebot</span>
            <h1 className="heading-xl text-white mt-4 mb-6">
              Leistungen aus einer Hand
            </h1>
            <p className="text-xl text-gray-400">
              Von der Sanierung über den Neubau bis hin zu speziellen Bauleistungen – wir bieten Ihnen das vollständige Spektrum professioneller Baudienstleistungen.
            </p>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="section-padding bg-carbon-1000">
        <div className="container-custom">
          {loading ? (
            <LoadingSpinner className="py-20" />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {categories.map((category: Category, index: number) => {
                const IconComponent = iconMap[category.icon] || Building2;
                return (
                  <Link
                    key={category.id}
                    to={`/leistungen/${category.slug}`}
                    className={`card card-hover overflow-hidden group animate-slide-up`}
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    <div className="flex flex-col md:flex-row">
                      {/* Image */}
                      <div className="relative w-full md:w-48 h-48 md:h-auto flex-shrink-0 overflow-hidden">
                        <img
                          src={optimizeCloudinary(category.image, { width: 400, height: 300, quality: 'auto' })}
                          alt={category.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-r from-carbon-1000/50 to-transparent hidden md:block" />
                      </div>

                      {/* Content */}
                      <div className="flex-1 p-6">
                        {/* Icon & Title */}
                        <div className="flex items-center gap-3 mb-4">
                          <div className="w-10 h-10 bg-accent-500/10 border border-accent-500/20 rounded flex items-center justify-center group-hover:bg-accent-500 group-hover:border-accent-500 transition-all duration-300">
                            <IconComponent className="w-5 h-5 text-accent-500 group-hover:text-white transition-colors" />
                          </div>
                          <h3 className="text-xl font-semibold text-white group-hover:text-accent-500 transition-colors">
                            {category.title}
                          </h3>
                        </div>

                        {/* Description */}
                        <p className="text-gray-400 text-sm mb-6 line-clamp-3">
                          {category.shortDescription}
                        </p>

                        {/* CTA */}
                        <div className="flex items-center gap-2 text-accent-500 text-sm font-medium group-hover:gap-3 transition-all">
                          Details ansehen
                          <ArrowRight className="w-4 h-4" />
                        </div>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
