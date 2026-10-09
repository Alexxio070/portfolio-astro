/**
 * Check if a URL is external
 */
export function isExternalUrl(url: string): boolean {
  return url.startsWith('http://') || url.startsWith('https://');
}

/**
 * Resolve a flat array of social profile URLs into structured link objects.
 * Matches each URL against known platforms to derive icon name and label.
 */
const SOCIAL_PLATFORMS = [
  { key: 'github',    match: /github\.com/i,                  label: 'GitHub',      icon: 'github'    },
  { key: 'twitter',   match: /x\.com|twitter\.com/i,          label: 'X / Twitter', icon: 'x-twitter' },
  { key: 'linkedin',  match: /linkedin\.com/i,                label: 'LinkedIn',    icon: 'linkedin'  },
  { key: 'instagram', match: /instagram\.com/i,               label: 'Instagram',   icon: 'instagram' },
  { key: 'bluesky',   match: /bsky\.app|bluesky\.social/i,    label: 'Bluesky',     icon: 'bluesky'   },
] as const;

export interface ResolvedSocialLink {
  key: string;
  href: string;
  label: string;
  icon: string;
}

export function resolveSocialLinks(urls: string[]): ResolvedSocialLink[] {
  return urls.flatMap((href) => {
    const platform = SOCIAL_PLATFORMS.find((p) => p.match.test(href));
    if (!platform) return [];
    return [{ key: platform.key, href, label: platform.label, icon: platform.icon }];
  });
}
