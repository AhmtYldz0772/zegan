import { Link } from 'react-router-dom';
import { Calendar, Clock } from 'lucide-react';
import Seo from '../components/shared/Seo';
import { useBlogs } from '../hooks/useData';
import { optimizeCloudinary, formatDateGerman } from '../utils/helpers';
import type { Blog } from '../types';
import LoadingSpinner from '../components/ui/LoadingSpinner';

export default function Bauwissen() {
  const { data: blogs, loading } = useBlogs();

  return (
    <>
      <Seo
        title="Bauwissen"
        description="Aktuelles und Fachwissen rund um das Bauen. Tipps, Ratgeber und Einblicke aus der Praxis."
        keywords={['Bauwissen', 'Blog', 'Ratgeber', 'Bauinfos']}
      />

      {/* Hero */}
      <section className="pt-32 pb-16 bg-carbon-950">
        <div className="container-custom">
          <div className="max-w-3xl">
            <span className="label">Informationszentrum</span>
            <h1 className="heading-xl text-white mt-4 mb-6">
              Bauwissen
            </h1>
            <p className="text-xl text-gray-400">
              Aktuelles und Fachwissen rund um das Bauen. Profitieren Sie von unserer Expertise mit praktischen Tipps und Einblicken aus der Baupraxis.
            </p>
          </div>
        </div>
      </section>

      {/* Blog Grid */}
      <section className="section-padding bg-carbon-1000">
        <div className="container-custom">
          {loading ? (
            <LoadingSpinner className="py-20" />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {blogs.map((blog: Blog, index: number) => (
                <Link
                  key={blog.id}
                  to={`/bauwissen/${blog.slug}`}
                  className={`card card-hover overflow-hidden group animate-slide-up`}
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  {/* Image */}
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <img
                      src={optimizeCloudinary(blog.coverImage, { width: 600, height: 375, quality: 'auto' })}
                      alt={blog.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-carbon-1000 via-transparent to-transparent" />
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    {/* Tags */}
                    {blog.tags && blog.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-4">
                        {blog.tags.slice(0, 2).map((tag: string, idx: number) => (
                          <span
                            key={idx}
                            className="px-2 py-1 bg-accent-500/10 text-accent-400 text-xs rounded"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* Title */}
                    <h3 className="text-lg font-semibold text-white mb-3 group-hover:text-accent-500 transition-colors line-clamp-2">
                      {blog.title}
                    </h3>

                    {/* Excerpt */}
                    <p className="text-gray-400 text-sm mb-4 line-clamp-3">
                      {blog.excerpt}
                    </p>

                    {/* Meta */}
                    <div className="flex items-center gap-4 text-gray-500 text-xs">
                      <span className="flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5" />
                        {formatDateGerman(blog.publishedAt)}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5" />
                        {blog.readingTime} Min. Lesezeit
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}

          {/* Empty State */}
          {!loading && blogs.length === 0 && (
            <div className="text-center py-16">
              <p className="text-gray-400">
                Keine Artikel vorhanden.
              </p>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
