import { describe, it, expect, vi } from 'vitest';

// The project URL helper with i18n on and two locales: the default locale
// stays at the site root and the other one is prefixed.
vi.mock('astro:content', () => ({
  getCollection: vi.fn(async () => []),
}));

vi.mock('@/config/i18n.config', () => ({
  default: {
    enabled: true,
    defaultLocale: 'en',
    locales: ['en', 'es'],
    localeNames: { en: 'English', es: 'Español' },
    detectBrowserLocale: false,
  },
}));

import { getProjectSlug, getProjectUrl } from '@/lib/projects';

describe('project URL helpers (i18n enabled — en default, es secondary)', () => {
  it('keeps default-locale project URLs at the site root', () => {
    expect(getProjectUrl('en/my-project')).toBe('/projects/my-project');
    expect(getProjectUrl('en/my-project', 'en')).toBe('/projects/my-project');
  });

  it('prefixes secondary-locale project URLs with the locale', () => {
    expect(getProjectUrl('es/my-project', 'es')).toBe('/es/projects/my-project');
  });

  it('strips the locale folder and the extension from the id', () => {
    expect(getProjectSlug('es/my-project.mdx', 'es')).toBe('my-project');
    expect(getProjectSlug('en/my-project.md')).toBe('my-project');
  });

  it('still gives a clean slug when the folder and the locale disagree', () => {
    expect(getProjectSlug('es/my-project', 'en')).toBe('my-project');
  });
});
