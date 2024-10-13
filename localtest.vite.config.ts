import { resolve } from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
    root: './src/localtest/',
    build: {
        rollupOptions: {
            input: {
                app: './src/localtest/index.html'
            }
        }
    },
    resolve: {
        alias: {
            '@diff': resolve('src/diff'),
            '@components': resolve('src/components')
        }
    },
    plugins: [react()]
});
