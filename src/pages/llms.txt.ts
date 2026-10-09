import type { APIRoute } from 'astro';
import siteConfig from '@/config/site.config';
import { defaultLocale, getLocales, getLocaleName, localizedPath } from '@/i18n';
import { getHomeNavItems } from '@/config/nav.config';

/**
 * /llms.txt
 *
 * A plain-Markdown map of this site for large language models, following the
 * proposal at https://llmstxt.org. Where robots.txt tells a crawler *whether*
 * it may read the site, llms.txt tells a model *what the site is and which
 * pages matter*, in one short file.
 *
 * It is generated at build time from the site config, the locales and the
 * navigation, so it cannot drift from the real page. The site is one page per
 * language; its sections are anchors on that page, so they are listed as
 * sections rather than as pages of their own.
 */
export const GET: APIRoute = ({ site }) => {
  const base = (site?.toString() || siteConfig.url).replace(/\/$/, '');

  const line = (title: string, url: string, description?: string) =>
    description ? `- [${title}](${url}): ${description}` : `- [${title}](${url})`;

  const pages = getLocales().map((locale) =>
    line(getLocaleName(locale), `${base}${localizedPath('/', locale).replace(/\/?$/, '/')}`)
  );

  const sections = getHomeNavItems(defaultLocale)
    .filter((item) => item.href.startsWith('#') && item.href !== '#home')
    .map((item) => `- ${item.label} (${item.href})`);

  const profiles = siteConfig.socialLinks.map((url) => line(new URL(url).hostname.replace(/^www\./, ''), url));

  const text = [
    `# ${siteConfig.name}`,
    ``,
    `> ${siteConfig.description}`,
    ``,
    `## Pages`,
    ``,
    ...pages,
    ``,
    `## Sections of each page`,
    ``,
    ...sections,
    ``,
    `## Profiles`,
    ``,
    ...profiles,
    ``,
    `## More`,
    ``,
    line('Sitemap', `${base}/sitemap-index.xml`),
    ``,
    `---`,
    ``,
    `Contact: ${siteConfig.email}`,
    ``,
  ].join('\n');

  return new Response(text, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
    },
  });
};
