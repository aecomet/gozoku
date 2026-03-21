import vue from '@vitejs/plugin-vue';
import path from 'path';
import { defineConfig } from 'vite';
import compression from 'vite-plugin-compression';

export default () => {
  const SRC_PATH = 'src';
  const OUTPUT_PATH = 'build';

  return defineConfig({
    plugins: [vue(), compression({ algorithm: 'brotliCompress', ext: '.br' })],
    base: '/gozoku/',
    resolve: {
      alias: {
        '@': '/src'
      }
    },
    css: {
      preprocessorOptions: {
        scss: {
          api: 'modern-compiler'
        }
      }
    },
    publicDir: path.resolve(__dirname, `${SRC_PATH}/assets/public`),
    // productioin build
    build: {
      rollupOptions: {
        output: {
          chunkFileNames: 'vendor.[hash].js',
          entryFileNames: '[name].[hash].js'
        }
      },
      outDir: path.resolve(__dirname, OUTPUT_PATH),
      emptyOutDir: true
    }
  });
};
