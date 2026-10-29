// Next.js basePath prefixes routes and framework assets, but not /public file URLs.
// Keep source card paths untouched so existing card name/alt-text parsing still works.
const BASE_PATH = "/tichulearnbook";

export function siteAsset(src: string): string {
  return src.startsWith("/") ? `${BASE_PATH}${src}` : src;
}
