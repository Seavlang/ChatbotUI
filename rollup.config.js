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
    // other plugins
  ],
};
