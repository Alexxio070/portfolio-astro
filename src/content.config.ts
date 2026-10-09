import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';
import { glob } from 'astro/loaders';
import i18nConfig from './config/i18n.config';

// Locale field shared across content collections. Derived from your i18n
// config (src/config/i18n.config.ts) rather than a hard-coded list, so adding
// a locale there is all it takes — every collection schema accepts it with no
// further edits.
const localeSchema = z
  .string()
  .refine((value) => i18nConfig.locales.includes(value), {
    message: `locale must be one of the configured i18n locales: ${i18nConfig.locales.join(', ')}`,
  })
  .default(i18nConfig.defaultLocale);

// Projects collection — one Markdown file per project and language
const projects = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/projects' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    /**
     * Lucide icon shown on the project card, e.g. "smartphone", "book-open",
     * "database". Give each project its own: the card is mostly text, and one
     * repeated icon across every card makes them read as placeholders. Falls
     * back to "layers" when unset.
     */
    icon: z.string().optional(),
    /** Where the card links to: `url` if set, otherwise `repo`. With neither, it is a plain card. */
    url: z.url().optional(),
    repo: z.url().optional(),
    tags: z.array(z.string()).default([]),
    order: z.number().default(99),
    year: z.number().optional(),
    draft: z.boolean().default(false),
    locale: localeSchema,
  }),
});

export const collections = {
  projects,
};
