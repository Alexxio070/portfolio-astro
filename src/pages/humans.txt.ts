import type { APIRoute } from 'astro';
import siteConfig from '@/config/site.config';

/**
 * /humans.txt
 *
 * The human counterpart of robots.txt: who made the site and with what. Every
 * value comes from the site config, so it cannot drift from the page.
 */
export const GET: APIRoute = () => {
  const links = siteConfig.socialLinks.map((url) => `Profile: ${url}`).join('\n');
  const built = new Date().toISOString().slice(0, 10);

  const humansTxt = `
/* TEAM */
Developer: ${siteConfig.author}
Contact: ${siteConfig.email}
${links}

/* SITE */
Last build: ${built}
Languages: Spanish, English
Standards: HTML5, CSS3
Components: Astro, Tailwind CSS, TypeScript
Static site: no backend, no cookies, no tracking
`.trim();

  return new Response(humansTxt + '\n', {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
    },
  });
};
