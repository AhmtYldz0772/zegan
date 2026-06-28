import { Link } from 'react-router-dom';
import { ArrowRight, MapPin, Calendar } from 'lucide-react';
import { useProjects } from '../../hooks/useData';
import { optimizeCloudinary } from '../../utils/helpers';
import type { Project } from '../../types';
import LoadingSpinner from '../ui/LoadingSpinner';

export default function FeaturedProjectsSection() {
  const { data: projects, loading } = useProjects(true);

  if (loading) {
    return (
      <section className="section-padding">
        <div className="container-custom">
          <LoadingSpinner className="py-20" />
        </div>
      </section>
    );
  }

  return (
    <section className="section-padding bg-carbon-1000">
      <div className="container-custom">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-12">
          <div>
            <span className="label">Referenzen</span>
            <h2 className="heading-lg text-white mt-4">
              Ausgewählte Projekte
            </h2>
          </div>
          <Link to="/referenzen" className="btn-ghost group">
            Alle Projekte
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.slice(0, 4).map((project: Project, index: number) => (
            <Link
              key={project.id}
              to={`/referenzen/${project.slug}`}
              className={`card card-hover overflow-hidden group animate-slide-up`}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Image */}
              <div className="relative aspect-[16/10] overflow-hidden">
                <img
                  src={optimizeCloudinary(project.thumbnail, { width: 800, height: 500, quality: 'auto' })}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-carbon-1000 via-transparent to-transparent" />
              </div>

              {/* Content */}
              <div className="p-6">
                {/* Tags */}
                <div className="flex items-center gap-4 text-gray-500 text-sm mb-4">
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
                <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-accent-500 transition-colors">
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
      </div>
    </section>
  );
}
