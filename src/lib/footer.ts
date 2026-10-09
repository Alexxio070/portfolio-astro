import { getFooterNavItems, footerLinkGroups, resolveNavItem } from '@/config/nav.config';
import { defaultLocale, t } from '@/i18n';
import type { FooterLinkGroup } from '@/components/layout/Footer.astro';

/**
 * The footer's link groups: a Site column built from `footerNavItems`, followed
 * by whatever `footerLinkGroups` in `nav.config.ts` adds. A group with no links
 * is dropped, so the footer reports what exists rather than what someone
 * remembered to add.
 */

export async function getDerivedFooterGroups(
  locale: string = defaultLocale
): Promise<FooterLinkGroup[]> {
  const groups: FooterLinkGroup[] = [];

  // The site's own pages, from the footer nav a site already configures.
  const navLinks = getFooterNavItems(locale).map((item) => ({
    label: item.label,
    href: item.href,
    external: item.external,
  }));
  if (navLinks.length) {
    groups.push({ title: t('footer.groups.site', locale), links: navLinks });
  }

  // Columns declared in config are appended to the derived ones, and go
  // through the same resolver as the nav so their labels translate and their
  // internal hrefs get the locale prefix.
  for (const group of footerLinkGroups) {
    const links = group.links.map((item) => {
      const resolved = resolveNavItem(item, locale);
      return { label: resolved.label, href: resolved.href, external: resolved.external };
    });
    if (!links.length) continue;
    groups.push({
      title: group.titleKey ? t(group.titleKey, locale) : group.title,
      links,
    });
  }

  return groups;
}
