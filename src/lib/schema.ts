import type { WebSite, Person, WithContext } from 'schema-dts';
import siteConfig from '@/config/site.config';

/**
 * Create WebSite schema for homepage
 */
export function createWebsiteSchema(): WithContext<WebSite> {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: siteConfig.name,
    url: siteConfig.url,
    description: siteConfig.description,
  };
}

/**
 * Create the Person schema for the site's author
 */
export function createPersonSchema(): WithContext<Person> {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: siteConfig.author,
    jobTitle: siteConfig.tagline,
    url: siteConfig.url,
    email: siteConfig.email,
    ...(siteConfig.authorImage ? { image: `${siteConfig.url}${siteConfig.authorImage}` } : {}),
    sameAs: siteConfig.socialLinks,
  };
}
