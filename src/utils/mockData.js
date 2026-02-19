// Helper for images
export const getImageUrl = (path) => {
  // Check if it's already a full URL (in case we switch to other sources)
  if (path && path.startsWith('http')) return path;

  // User placeholder if path is null or undefined
  if (!path) return "https://via.placeholder.com/300x450?text=No+Image";

  return `https://image.tmdb.org/t/p/original${path}`;
};
