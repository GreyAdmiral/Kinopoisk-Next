import path from 'path';

const buildEslintCommand = (filenames) =>
   `next lint --file ${filenames.map((f) => path.relative(process.cwd(), f)).join(' --file ')}`;

export default {
   './src/**/*': 'npm run prettier:fix',
   './src/**/*.{tsx,jsx,ts}': [buildEslintCommand],
};
