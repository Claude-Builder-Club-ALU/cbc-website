// Event photos in public/ are stored as WebP in two sizes:
//   name.webp     up to 1600px (lightbox, hero)
//   name-sm.webp  up to 720px  (cards, grids, carousel)
// To add a photo, export both sizes, e.g. with ImageMagick:
//   convert in.jpg -strip -resize '1600x1600>' -quality 75 name.webp
//   convert in.jpg -strip -resize '720x720>'   -quality 72 name-sm.webp

/** Path of the small (720px) version of a photo. */
export const smallPhoto = (url: string) => url.replace(/\.webp$/, "-sm.webp");

/** srcSet that lets the browser pick the small or full version. */
export const photoSrcSet = (url: string) => `${smallPhoto(url)} 720w, ${url} 1600w`;
