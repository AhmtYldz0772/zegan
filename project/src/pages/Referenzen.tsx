import { useState } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Calendar, ArrowRight } from 'lucide-react';
import Seo from '../components/shared/Seo';
import { useProjects, useCategories } from '../hooks/useData';
import { optimizeCloudinary } from '../utils/helpers';
import type { Project, Category } from '../types';
import LoadingSpinner from '../components/ui/LoadingSpinner';

export default function Referenzen() {
  const { data: projects, loading: projectsLoading } = useProjects();
  const { data: categories } = useCategories();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const filteredProjects = projects.filter((project: Project) => {
    if (selectedCategory === 'all') return true;
    return project.categorySlug === selectedCategory;
  });

  return (
    <>
      <Seo
        title="Referenzen"
        description="Unsere erfolgreich abgeschlossenen Bauprojekte in Berlin. Von Sanierung bis Neubau – überzeugen Sie sich selbst."
        keywords={['Referenzen', 'Bauprojekte', 'Portfolio', 'Berlin']}
      />

      {/* Hero */}
      <section className="bg-carbon-950 pb-12 pt-28 sm:pb-16 sm:pt-32">
        <div className="container-custom">
          <div className="max-w-3xl">
            <span className="label">Portfolio</span>
            <h1 className="heading-xl text-white mt-4 mb-6">
              Referenzen
            </h1>
            <p className="text-base leading-7 text-gray-400 sm:text-xl sm:leading-8">
              Über 500 erfolgreich realisierte Projekte sprechen für sich. Entdecken Sie ausgewählte Arbeiten aus unserem Portfolio.
            </p>
          </div>
        </div>
      </section>

      {/* Projects */}
      <section className="section-padding bg-carbon-1000">
        <div className="container-custom">
          {/* Filters */}
          <div className="-mx-4 mb-10 flex gap-2 overflow-x-auto px-4 pb-2 sm:mx-0 sm:flex-wrap sm:gap-3 sm:px-0 md:mb-12">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`min-h-10 flex-shrink-0 rounded px-4 py-2 text-sm font-medium transition-all ${
                selectedCategory === 'all'
                  ? 'bg-accent-500 text-white'
                  : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white'
              }`}
            >
              Alle Projekte
            </button>
            {categories.map((category: Category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.slug)}
                className={`min-h-10 flex-shrink-0 rounded px-4 py-2 text-sm font-medium transition-all ${
                  selectedCategory === category.slug
                    ? 'bg-accent-500 text-white'
                    : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white'
                }`}
              >
                {category.title}
              </button>
            ))}
          </div>

          {/* Projects Grid */}
          {projectsLoading ? (
            <LoadingSpinner className="py-20" />
          ) : (
            <div className="grid mobile-safe-grid gap-5 lg:gap-6">
              {filteredProjects.map((project: Project, index: number) => (
                <Link
                  key={project.id}
                  to={`/referenzen/${project.slug}`}
                  className={`card card-hover overflow-hidden group animate-slide-up`}
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  {/* Image */}
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <img
                      src={optimizeCloudinary(project.thumbnail, { width: 600, height: 375, quality: 'auto' })}
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-carbon-1000 via-transparent to-transparent" />
                    {project.featured && (
                      <div className="absolute top-4 left-4 px-3 py-1 bg-accent-500 rounded text-xs font-semibold text-white">
                        Featured
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    {/* Meta */}
                    <div className="mb-4 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-gray-500">
                      <span className="flex items-center gap-1.5">
                        <MapPin className="w-4 h-4" />
                        {project.location}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Calendar className="w-4 h-4" />
                        {project.year}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="text-lg font-semibold text-white mb-3 group-hover:text-accent-500 transition-colors">
                      {project.title}
                    </h3>

                    {/* Description */}
                    <p className="text-gray-400 text-sm line-clamp-2 mb-4">
                      {project.shortDescription}
                    </p>

                    {/* CTA */}
                    <div className="flex items-center gap-2 text-accent-500 text-sm font-medium group-hover:gap-3 transition-all">
                      Details ansehen
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}

          {/* Empty State */}
          {!projectsLoading && filteredProjects.length === 0 && (
            <div className="text-center py-16">
              <p className="text-gray-400">
                Keine Projekte in dieser Kategorie gefunden.
              </p>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
