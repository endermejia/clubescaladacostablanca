export function getThumbnailPath(src: string | undefined): string {
  if (!src || src.includes('logo-header.webp') || src.startsWith('http')) {
    return src || '/assets/logo-header.webp';
  }

  // Handle paths with or without leading slash
  const cleanSrc = src.startsWith('/') ? src.slice(1) : src;
  const parts = cleanSrc.split('/');
  const fileName = parts.pop();

  // Reconstruct path with 'thumbnails' folder
  const thumbPath = [...parts, 'thumbnails', fileName].join('/');

  // Return with original leading slash if it had one
  return src.startsWith('/') ? `/${thumbPath}` : thumbPath;
}

export function handleImageError(event: any, originalSrc: string): void {
  if (event.target.src !== originalSrc) {
    event.target.src = originalSrc;
  }
}
