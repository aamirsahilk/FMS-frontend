import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
    base:"/",
    build: {
    outDir: 'build',
    },
    plugins: [
        react(),
    ],
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src'),
        },
    },
    server : {
        // port : 3004 ,
        proxy : {
            target: 'https://fms-wdhb.onrender.com/', // Replace with your backend server URL
            
        }
    }
});
