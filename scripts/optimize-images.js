const sharp = require("sharp");
const fs = require("fs");
const path = require("path");

const ASSETS_ROOT = path.join(__dirname, "..", "src", "assets");
const THUMB_DIR_NAME = "thumbnails";
const MAX_SIZE = 800; // Increased from 300 for better quality on large screens
const QUALITY = 85; // Higher quality setting

async function optimizeImages(dir) {
  const files = fs.readdirSync(dir);

  for (const file of files) {
    const fullPath = path.join(dir, file);
    const stats = fs.statSync(fullPath);

    if (stats.isDirectory()) {
      if (file === THUMB_DIR_NAME) continue; // skip existing thumbnails folders
      await optimizeImages(fullPath);
      continue;
    }

    const ext = path.extname(file).toLowerCase();
    if ([".jpg", ".jpeg", ".png", ".webp"].includes(ext)) {
      const thumbPath = path.join(dir, THUMB_DIR_NAME);
      if (!fs.existsSync(thumbPath)) {
        fs.mkdirSync(thumbPath, { recursive: true });
      }

      const targetPath = path.join(thumbPath, file);

      // Skip if thumbnail exists and is newer than original
      if (fs.existsSync(targetPath)) {
        const thumbStat = fs.statSync(targetPath);
        if (thumbStat.mtimeMs > stats.mtimeMs) {
          continue;
        }
      }

      try {
        console.log(`Processing: ${path.relative(ASSETS_ROOT, fullPath)}`);

        // 1. Always create a high-quality WebP thumbnail
        await sharp(fullPath)
          .resize(MAX_SIZE, MAX_SIZE, {
            fit: "inside", // preserve aspect ratio
            withoutEnlargement: true,
          })
          .webp({ quality: QUALITY })
          .toFile(targetPath.replace(ext, ".webp"));

        // 2. Create/Update the thumbnail in original format with high quality
        const transformer = sharp(fullPath).resize(MAX_SIZE, MAX_SIZE, {
          fit: "inside",
          withoutEnlargement: true,
        });

        if (ext === ".jpg" || ext === ".jpeg") {
          transformer.jpeg({ quality: QUALITY, progressive: true });
        } else if (ext === ".png") {
          transformer.png({ compressionLevel: 8, palette: true }); // PNG is lossless so compressionLevel is for speed/size, palette helps a lot
        } else if (ext === ".webp") {
          transformer.webp({ quality: QUALITY });
        }

        await transformer.toFile(targetPath);
      } catch (err) {
        console.error(`Error processing ${fullPath}:`, err.message);
      }
    }
  }
}

console.log("Generating thumbnails...");
optimizeImages(ASSETS_ROOT)
  .then(() => console.log("Done!"))
  .catch((err) => console.error("Failed to optimize images:", err));
