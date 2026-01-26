// Placeholder image as data URI (simple gradient)
export const PLACEHOLDER_IMAGE = `data:image/svg+xml,${encodeURIComponent(`
<svg xmlns="http://www.w3.org/2000/svg" width="400" height="300" viewBox="0 0 400 300">
  <defs>
    <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#8B5CF6;stop-opacity:0.3" />
      <stop offset="100%" style="stop-color:#4A90D9;stop-opacity:0.3" />
    </linearGradient>
  </defs>
  <rect fill="url(#grad)" width="400" height="300"/>
  <text x="200" y="140" text-anchor="middle" fill="#666" font-family="system-ui" font-size="14">
    Photo not found
  </text>
  <text x="200" y="165" text-anchor="middle" fill="#999" font-family="system-ui" font-size="12">
    Add image to /images/photos/
  </text>
</svg>
`)}`;

// Handle image load errors by replacing with placeholder
export const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
  const target = e.target as HTMLImageElement;
  if (target.src !== PLACEHOLDER_IMAGE) {
    target.src = PLACEHOLDER_IMAGE;
  }
};
