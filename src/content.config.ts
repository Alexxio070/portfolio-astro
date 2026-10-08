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

// Projects collection — one MDX file per project
const projects = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/projects' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string(),
      /**
       * Lucide icon shown on the project card, e.g. "rocket", "book-open",
       * "shopping-bag". Give each project its own: the card is mostly text,
       * and one repeated icon across every card makes them read as
       * placeholders. Falls back to "layers" when unset.
       */
      icon: z.string().optional(),
      url: z.string().url().optional(),
      repo: z.string().url().optional(),
      image: image().optional(),
      imageAlt: z.string().optional(),
      /**
       * Optional gallery — when provided, renders a swipeable carousel in the
       * hero in place of the single `image`. A slide is either an image
       * (`src` + `alt`) or a self-hosted video (`video` + `poster` + `alt`).
       * Video files live in `public/` and are referenced by root-relative
       * path; the poster is required so the slide costs nothing until played.
       */
      gallery: z
        .array(
          z.union([
            z.object({
              src: image(),
              alt: z.string(),
            }),
            z.object({
              video: z
                .string()
                .regex(
                  /^\/.+/,
                  'video must be a root-relative path to a file in public/, e.g. "/videos/demo.mp4"'
                ),
              poster: image(),
              alt: z.string(),
            }),
          ])
        )
        .default([]),
      tags: z.array(z.string()).default([]),
      featured: z.boolean().default(false),
      order: z.number().default(99),
      year: z.number().optional(),
      client: z.string().optional(),
      role: z.string().optional(),
      services: z.array(z.string()).default([]),
      /** Optional editorial tagline — short facts rendered as a single line under the hero description with brand-coloured dot separators. */
      meta: z.array(z.string()).default([]),
      draft: z.boolean().default(false),
      placeholder: z.boolean().default(false),
      /** Per-project override: hide table of contents on this project */
      toc: z.boolean().optional(),
      locale: localeSchema,
    }),
});

export const collections = {
  projects,
};
