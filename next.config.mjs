/** @type {import('next').NextConfig} */
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const nextConfig = {
   reactStrictMode: true,
   images: {
      formats: ['image/avif', 'image/webp'],
      remotePatterns: [
         {
            protocol: 'https',
            hostname: 'kinopoiskapiunofficial.tech',
            port: '',
            pathname: '/images/posters/kp/*',
         },
         {
            protocol: 'https',
            hostname: 'kinopoiskapiunofficial.tech',
            port: '',
            pathname: '/images/posters/kp_small/*',
         },
      ],
   },
   env: {},
   sassOptions: {
      includePaths: [path.join(__dirname, 'scss')],
      silenceDeprecations: ['mixed-decls', 'legacy-js-api'],
      prependData: `@use "./src/scss/tools/vars" as v;@use "./src/scss/tools/mixins" as m;@use "./src/scss/tools/functions" as f;@use "./src/scss/tools/extends";`,
   },
   // output: 'export',
   distDir: './dist',
   async redirects() {
      return [
         {
            source: '/',
            destination: '/movies/1',
            permanent: true,
         },
      ];
   },
};

export default nextConfig;
