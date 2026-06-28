import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowRight, MapPin, Calendar, Clock, Image, Home, Building2, Paintbrush, Truck, Thermometer, Layers, Sun, ClipboardCheck, LucideIcon, User } from 'lucide-react';
import Seo from '../components/shared/Seo';
import { useProject, useProjects, useCategory } from '../hooks/useData';
import { optimizeCloudinary } from '../utils/helpers';
import BeforeAfterSlider from '../components/ui/BeforeAfterSlider';
import ImageLightbox from '../components/ui/ImageLightbox';
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

export default function ProjectDetail() {
  const { slug } = useParams<{ slug: string }>();
  const { data: project, loading: projectLoading } = useProject(slug || '');
  const { data: category } = useCategory(project?.categorySlug || '');
  const { data: relatedProjects } = useProjects();

  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  if (projectLoading) {
    return <LoadingPage />;
  }

  if (!project) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center">
        <h1 className="text-2xl font-bold text-white mb-4">Projekt nicht gefunden</h1>
        <Link to="/referenzen" className="btn-secondary">
          Zurück zu Referenzen
        </Link>
      </div>
    );
  }

  const IconComponent = category ? iconMap[category.icon] || Building2 : Building2;
  const gallery = project.gallery || [project.thumbnail];

  return (
    <>
      <Seo
        title={project.seoTitle || project.title}
        description={project.seoDescription || project.shortDescription}
        keywords={project.seoKeywords}
        image={project.thumbnail}
      />

      {/* Hero */}
      <section className="relative h-[60vh] min-h-[400px]">
        <img
          src={optimizeCloudinary(project.thumbnail, { width: 1920, height: 1080, quality: 'auto' })}
          alt={project.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-carbon-1000 via-carbon-1000/60 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 container-custom pb-12">
          <Link
            to="/referenzen"
            className="text-gray-400 hover:text-white text-sm mb-6 inline-flex items-center gap-2 transition-colors"
          >
            <ArrowRight className="w-4 h-4 rotate-180" />
            Zurück zu Referenzen
          </Link>
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 bg-accent-500/20 border border-accent-500/30 rounded flex items-center justify-center">
              <IconComponent className="w-6 h-6 text-accent-500" />
            </div>
            <div className="text-gray-400 text-sm">{project.categorySlug}</div>
          </div>
          <h1 className="heading-lg text-white mb-4">{project.title}</h1>
          <div className="flex flex-wrap items-center gap-6 text-gray-300 text-sm">
            <span className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-accent-500" />
              {project.location}
            </span>
            <span className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-accent-500" />
              {project.year}
            </span>
            {project.duration && (
              <span className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-accent-500" />
                {project.duration}
              </span>
            )}
            {project.client && (
              <span className="flex items-center gap-2">
                <User className="w-4 h-4 text-accent-500" />
                {project.client}
              </span>
            )}
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="section-padding bg-carbon-900">
        <div className="container-custom">
          {/* Description */}
          <div className="max-w-4xl mb-16">
            <p className="text-lg text-gray-300 leading-relaxed">{project.description}</p>
          </div>

          {/* Highlights */}
          {project.highlights && project.highlights.length > 0 && (
            <div className="flex flex-wrap gap-3 mb-16">
              {project.highlights.map((highlight: string, index: number) => (
                <span
                  key={index}
                  className="px-4 py-2 bg-accent-500/10 border border-accent-500/20 rounded text-accent-400 text-sm"
                >
                  {highlight}
                </span>
              ))}
            </div>
          )}

          {/* Before/After */}
          {project.beforeImage && project.afterImage && (
            <div className="mb-16">
              <h2 className="text-2xl font-bold text-white mb-6">Vorher & Nachher</h2>
              <BeforeAfterSlider
                beforeImage={project.beforeImage}
                afterImage={project.afterImage}
                className="w-full"
              />
            </div>
          )}

          {/* Gallery */}
          {gallery.length > 0 && (
            <div className="mb-16">
              <div className="flex items-center gap-3 mb-6">
                <Image className="w-5 h-5 text-accent-500" />
                <h2 className="text-2xl font-bold text-white">Projektgalerie</h2>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {gallery.map((img: string, index: number) => (
                  <button
                    key={index}
                    onClick={() => openLightbox(index)}
                    className="aspect-square overflow-hidden rounded focus:outline-none focus:ring-2 focus:ring-accent-500"
                  >
                    <img
                      src={optimizeCloudinary(img, { width: 400, height: 400, quality: 'auto' })}
                      alt={`${project.title} - Bild ${index + 1}`}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                    />
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Related Projects */}
      {relatedProjects.length > 1 && (
        <section className="section-padding bg-carbon-1000">
          <div className="container-custom">
            <h2 className="text-2xl font-bold text-white mb-8">Weitere Projekte</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedProjects
                .filter((p) => p.slug !== slug)
                .slice(0, 3)
                .map((related) => (
                  <Link
                    key={related.id}
                    to={`/referenzen/${related.slug}`}
                    className="card card-hover overflow-hidden group"
                  >
                    <div className="relative aspect-video overflow-hidden">
                      <img
                        src={optimizeCloudinary(related.thumbnail, { width: 400, height: 225, quality: 'auto' })}
                        alt={related.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="text-white font-semibold group-hover:text-accent-500 transition-colors">
                        {related.title}
                      </h3>
                      <p className="text-gray-400 text-sm mt-2">{related.location}</p>
                    </div>
                  </Link>
                ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <CTASection />

      {/* Lightbox */}
      <ImageLightbox
        images={gallery}
        initialIndex={lightboxIndex}
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
      />
    </>
  );
}
