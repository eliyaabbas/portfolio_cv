import { defineConfig } from 'astro/config';
import icon from 'astro-icon';

// https://astro.build/config
export default defineConfig({
  site: 'https://eliyaasayyed.works',
  integrations: [icon()],
  build: {
    // The site's CSS is small (~9 KB), so inline it: separate stylesheets were render-blocking round trips on mobile
    inlineStylesheets: 'always',
  },
});
