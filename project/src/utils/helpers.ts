export function optimizeCloudinary(
  url: string,
  options: {
    width?: number;
    height?: number;
    quality?: string | number;
    format?: string;
    crop?: string;
  } = {}
): string {
  if (!url || !url.includes('cloudinary') || !url.includes('/upload/')) {
    return url;
  }

  const { width, height, quality = 'auto', format = 'auto', crop = 'fill' } = options;

  const transformations: string[] = [];

  if (quality) {
    transformations.push(`q_${quality}`);
  }

  if (format) {
    transformations.push(`f_${format}`);
  }

  if (width || height) {
    const sizeTransform = [];
    if (width) sizeTransform.push(`w_${width}`);
    if (height) sizeTransform.push(`h_${height}`);
    if (crop) sizeTransform.push(`c_${crop}`);
    transformations.push(sizeTransform.join(','));
  }

  if (transformations.length === 0) {
    return url.replace('/upload/', '/upload/q_auto,f_auto/');
  }

  const transformString = transformations.join('/');
  return url.replace('/upload/', `/upload/${transformString}/`);
}

export function formatDateGerman(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('de-DE', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export function formatPrice(price: number): string {
  return new Intl.NumberFormat('de-DE', {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
}

export function extractTextFromHtml(html: string, maxLength: number = 160): string {
  const div = document.createElement('div');
  div.innerHTML = html;
  const text = div.textContent || div.innerText || '';
  return text.substring(0, maxLength).trim();
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[äÄ]/g, 'ae')
    .replace(/[öÖ]/g, 'oe')
    .replace(/[üÜ]/g, 'ue')
    .replace(/[ß]/g, 'ss')
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export function debounce<T extends (...args: unknown[]) => unknown>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeoutId: ReturnType<typeof setTimeout> | null = null;

  return (...args: Parameters<T>) => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(() => {
      func(...args);
    }, wait);
  };
}

export function getAbsoluteUrl(path: string): string {
  const baseUrl = import.meta.env.VITE_SITE_URL || 'https://bauunternehmen-berlin.de';
  return `${baseUrl}${path.startsWith('/') ? path : `/${path}`}`;
}

export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength).trim() + '...';
}
