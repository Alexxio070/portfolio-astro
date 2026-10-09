/**
 * Helpers for the projects shown on the home page.
 *
 * Projects live in `src/content/projects/<locale>/`. The default locale stays
 * at the site root (`/projects/...`); other locales are prefixed.
 */
import { getCollection, type CollectionEntry } from 'astro:content';
import { defaultLocale, localizedPath, getLocales } from '@/i18n';

/**
 * Strip the locale prefix (and any `.md`/`.mdx` extension) from a project id to
 * get its URL slug (e.g. "en/my-project" → "my-project").
 */
export function getProjectSlug(projectId: string, locale: string = defaultLocale): string {
  // Strip the leading locale-folder segment and any file extension, leaving a
  // single-segment slug. The prefix is normally `locale`, but any other
  // configured locale is stripped too, so a folder/locale mismatch still
  // yields a clean slug rather than one containing a slash.
  const localePrefix = new RegExp(`^(${[locale, ...getLocales()].join('|')})/`);
  return projectId.replace(localePrefix, '').replace(/\.mdx?$/, '');
}

/**
 * URL path for an individual project, locale-aware: `/projects/<slug>` for the
 * default locale and `/<locale>/projects/<slug>` for the others.
 */
export function getProjectUrl(projectId: string, locale: string = defaultLocale): string {
  return localizedPath(`/projects/${getProjectSlug(projectId, locale)}`, locale);
}

/**
 * All visible projects for a locale, ordered by their `order` field. Drafts are
 * filtered out in production, kept visible in dev so authors can preview them.
 */
export async function getVisibleProjects(
  locale: string = defaultLocale,
): Promise<CollectionEntry<'projects'>[]> {
  const all = await getCollection('projects', ({ data }) => {
    return data.locale === locale && (import.meta.env.PROD ? data.draft !== true : true);
  });
  return all.sort((a, b) => a.data.order - b.data.order);
}
