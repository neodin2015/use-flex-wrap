import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';

export default defineConfig({
	build: {
		lib: {
			entry: 'src/index.ts',
			name: 'use-flex-wrap',
			formats: ['es'],
			fileName: 'index',
		},
		rollupOptions: {
			external: ['react', 'react-dom'],
		},
	},
	plugins: [dts({ tsconfigPath: './tsconfig.app.json' })],
});