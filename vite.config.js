// import { defineConfig } from 'vite';
// import laravel, { refreshPaths } from 'laravel-vite-plugin';

// export default defineConfig({
//     root: './app',
//     build:{
//         outDir: '../public/build',
//         emptyOutDir: true,
//         manifest:true,
//         rollupOptions: {
//             input: './resources/views/welcome.blade.php',
//           },
//         plugins: [
//             laravel({
//                 input: [
//                     'resources/css/app.css',
//                     'resources/js/app.js',
//                 ],
//                 refresh: [
//                     ...refreshPaths,
//                     'app/Http/Livewire/**',
//                 ],
//             }),
//         ],
//     },
//     publicDir: '../public',
// });

import mix from 'laravel-mix';
import vue from '@vitejs/plugin-vue';
import { resolve } from 'path';

const { createVuePlugin } = require('vite-plugin-vue2')

module.exports = {
  plugins: [
    createVuePlugin()
  ],
  server: {
    base: '/' // especifica aquí la URL base de tu aplicación
  },
  build: {
    base: '/' // especifica aquí la URL base de tu aplicación
  }
}

mix.js('resources/js/app.js', 'public/js')
    .vue()
    .alias({
        '@': resolve('resources/js'),
    })
    .webpackConfig({
        output: {
            publicPath: '/',
            chunkFilename: mix.inProduction() ? 'js/[name].[chunkhash].js' : 'js/[name].js',
        },
        resolve: {
            extensions: ['.js', '.vue', '.json'],
            alias: {
                vue$: 'vue/dist/vue.runtime.esm.js',
            },
        },
    });

export default {
    plugins: [vue()],
    server: {
        proxy: {
            '/': {
                target: 'http://localhost:8000',
                changeOrigin: true,
            },
        },
    },
    build: {
        outDir: 'public/build',
        emptyOutDir: true,
    },
    optimizeDeps: {
        include: ['@inertiajs/inertia', '@inertiajs/inertia-vue3'],
    },
};
