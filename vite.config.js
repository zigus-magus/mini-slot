import { defineConfig } from 'vite';

export default defineConfig({
	server: {
		port: 3000,
		open: true
	},
	base: './',
	build: {
		outDir: 'dist',
		assetsDir: 'assets',
		assetsInlineLimit: 0,
		rollupOptions: {
			output: {
				assetFileNames: 'assets/[name]-[hash][extname]',
			}
		}
	}
});