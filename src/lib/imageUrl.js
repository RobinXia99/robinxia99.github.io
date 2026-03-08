/**
 * Optimize a Contentful image URL with format, width, and quality params.
 * Falls through for non-Contentful URLs.
 */
export function optimizeImageUrl(url, { width = 800, quality = 80 } = {}) {
  if (!url) return url;
  if (!url.includes('images.ctfassets.net')) return url;
  const separator = url.includes('?') ? '&' : '?';
  return `${url}${separator}w=${width}&fm=webp&q=${quality}`;
}
