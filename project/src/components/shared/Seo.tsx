import { Helmet } from 'react-helmet-async';
import type { SeoProps } from '../../types';

interface SeoComponentProps extends SeoProps {
  children?: React.ReactNode;
}

export default function Seo({
  title,
  description,
  keywords,
  image,
  url,
  type = 'website',
  children,
}: SeoComponentProps) {
  const siteUrl = url || (typeof window !== 'undefined' ? window.location.href : '');
  const absoluteImageUrl = image || 'https://images.pexels.com/photos/1216589/pexels-photo-1216589.jpeg';

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      {keywords && keywords.length > 0 && (
        <meta name="keywords" content={keywords.join(', ')} />
      )}

      {/* Open Graph */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={type} />
      <meta property="og:url" content={siteUrl} />
      <meta property="og:image" content={absoluteImageUrl} />
      <meta property="og:site_name" content="Bauunternehmen Berlin" />
      <meta property="og:locale" content="de_DE" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={absoluteImageUrl} />

      {/* Canonical URL */}
      <link rel="canonical" href={siteUrl} />

      {children}
    </Helmet>
  );
}

export function generatePageSeo(
  pageTitle: string,
  pageDescription: string,
  pageKeywords?: string[],
  pageImage?: string,
  pageType: 'website' | 'article' = 'website'
): SeoProps {
  return {
    title: `${pageTitle} | Bauunternehmen Berlin`,
    description: pageDescription,
    keywords: pageKeywords,
    image: pageImage,
    type: pageType,
  };
}
