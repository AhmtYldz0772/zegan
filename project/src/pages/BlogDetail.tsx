import { useParams, Link } from 'react-router-dom';
import { ArrowRight, Calendar, Clock, User } from 'lucide-react';
import Seo from '../components/shared/Seo';
import { useBlog, useBlogs } from '../hooks/useData';
import { optimizeCloudinary, formatDateGerman } from '../utils/helpers';
import CTASection from '../components/sections/CTASection';
import { LoadingPage } from '../components/ui/LoadingSpinner';

export default function BlogDetail() {
  const { slug } = useParams<{ slug: string }>();
  const { data: blog, loading } = useBlog(slug || '');
  const { data: relatedBlogs } = useBlogs();

  if (loading) {
    return <LoadingPage />;
  }

  if (!blog) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center">
        <h1 className="text-2xl font-bold text-white mb-4">Artikel nicht gefunden</h1>
        <Link to="/bauwissen" className="btn-secondary">
          Zurück zu Bauwissen
        </Link>
      </div>
    );
  }

  const relatedArticles = relatedBlogs.filter((b) => b.slug !== slug).slice(0, 3);

  return (
    <>
      <Seo
        title={blog.seoTitle || blog.title}
        description={blog.seoDescription || blog.excerpt}
        keywords={blog.seoKeywords}
        image={blog.coverImage}
        type="article"
      />

      {/* Hero */}
      <section className="relative h-[50vh] min-h-[350px]">
        <img
          src={optimizeCloudinary(blog.coverImage, { width: 1920, height: 960, quality: 'auto' })}
          alt={blog.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-carbon-1000 via-carbon-1000/60 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 container-custom pb-12">
          <Link
            to="/bauwissen"
            className="text-gray-400 hover:text-white text-sm mb-6 inline-flex items-center gap-2 transition-colors"
          >
            <ArrowRight className="w-4 h-4 rotate-180" />
            Zurück zu Bauwissen
          </Link>
          {blog.tags && blog.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {blog.tags.map((tag: string, idx: number) => (
                <span
                  key={idx}
                  className="px-3 py-1 bg-accent-500 text-white text-xs font-medium rounded"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
          <h1 className="heading-lg text-white mb-4">{blog.title}</h1>
          <div className="flex flex-wrap items-center gap-6 text-gray-300 text-sm">
            <span className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-accent-500" />
              {formatDateGerman(blog.publishedAt)}
            </span>
            <span className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-accent-500" />
              {blog.readingTime} Min. Lesezeit
            </span>
            {blog.author && (
              <span className="flex items-center gap-2">
                <User className="w-4 h-4 text-accent-500" />
                {blog.author}
              </span>
            )}
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="section-padding bg-carbon-900">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            {/* Excerpt */}
            <p className="text-xl text-gray-300 mb-8 leading-relaxed">{blog.excerpt}</p>

            {/* Content - Safely render HTML */}
            <article
              className="prose prose-lg prose-invert max-w-none
                prose-headings:text-white prose-headings:font-bold prose-headings:mb-4
                prose-h2:text-2xl prose-h2:mt-12 prose-h2:mb-6
                prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-4
                prose-p:text-gray-300 prose-p:leading-relaxed prose-p:mb-6
                prose-a:text-accent-500 prose-a:no-underline hover:prose-a:underline
                prose-strong:text-white
                prose-ul:text-gray-300 prose-ul:mb-6 prose-li:mb-2
                prose-ol:text-gray-300 prose-ol:mb-6
                prose-blockquote:border-l-accent-500 prose-blockquote:bg-carbon-800/50 prose-blockquote:py-4 prose-blockquote:px-6 prose-blockquote:rounded-r prose-blockquote:text-gray-300
              "
              dangerouslySetInnerHTML={{ __html: blog.content }}
            />
          </div>
        </div>
      </section>

      {/* Related Articles */}
      {relatedArticles.length > 0 && (
        <section className="section-padding bg-carbon-1000">
          <div className="container-custom">
            <h2 className="text-2xl font-bold text-white mb-8">Weitere Artikel</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedArticles.map((related) => (
                <Link
                  key={related.id}
                  to={`/bauwisen/${related.slug}`}
                  className="card card-hover overflow-hidden group"
                >
                  <div className="relative aspect-video overflow-hidden">
                    <img
                      src={optimizeCloudinary(related.coverImage, { width: 400, height: 225, quality: 'auto' })}
                      alt={related.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="text-white font-semibold group-hover:text-accent-500 transition-colors line-clamp-2">
                      {related.title}
                    </h3>
                    <p className="text-gray-400 text-sm mt-2 line-clamp-2">{related.excerpt}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <CTASection />
    </>
  );
}
