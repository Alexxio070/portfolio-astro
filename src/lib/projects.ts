/**
 * Helpers for the projects shown on the home page.
 *
 * Projects live in `src/content/projects/<locale>/`.
 */
import { getCollection, type CollectionEntry } from 'astro:content';
import { defaultLocale } from '@/i18n';

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
