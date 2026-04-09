import { getThumbnailPath, handleImageError } from './image-utils';

describe('image-utils', () => {
  describe('getThumbnailPath', () => {
    it('should return default logo if src is undefined', () => {
      expect(getThumbnailPath(undefined)).toBe('/assets/logo-header.webp');
    });

    it('should return default logo if src is empty string', () => {
      expect(getThumbnailPath('')).toBe('/assets/logo-header.webp');
    });

    it('should return original src if it contains logo-header.webp', () => {
      const src = 'assets/img/logo-header.webp';
      expect(getThumbnailPath(src)).toBe(src);
    });

    it('should return original src if it starts with http', () => {
      const src = 'http://example.com/image.jpg';
      expect(getThumbnailPath(src)).toBe(src);
    });

    it('should insert thumbnails folder for absolute path', () => {
      const src = '/assets/images/climbing.jpg';
      expect(getThumbnailPath(src)).toBe('/assets/images/thumbnails/climbing.jpg');
    });

    it('should insert thumbnails folder for relative path', () => {
      const src = 'assets/images/climbing.jpg';
      expect(getThumbnailPath(src)).toBe('assets/images/thumbnails/climbing.jpg');
    });

    it('should handle path without nested directories', () => {
      const src = 'climbing.jpg';
      expect(getThumbnailPath(src)).toBe('thumbnails/climbing.jpg');
    });
  });

  describe('handleImageError', () => {
    it('should update target src to originalSrc if they are different', () => {
      const originalSrc = 'original.jpg';
      const event = {
        target: {
          src: 'broken.jpg'
        }
      };

      handleImageError(event, originalSrc);

      expect(event.target.src).toBe(originalSrc);
    });

    it('should not update target src if it is already originalSrc', () => {
      const originalSrc = 'original.jpg';
      const event = {
        target: {
          src: 'original.jpg'
        }
      };

      handleImageError(event, originalSrc);

      expect(event.target.src).toBe(originalSrc);
    });
  });
});
