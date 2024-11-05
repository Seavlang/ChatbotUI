// rollup.config.js
import image from '@rollup/plugin-image';

export default {
  input: 'src/index.js',
  output: {
    file: 'dist/bundle.js',
    format: 'cjs',
  },
  plugins: [
    image(),
    postcss({
        extract: true, // Extracts CSS to a separate file
        minimize: true,
        plugins: [require('tailwindcss'), require('autoprefixer')],
      }),
    // other plugins
  ],
};
