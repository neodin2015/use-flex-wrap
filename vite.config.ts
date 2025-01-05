import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';
import { resolve } from 'path';

export default defineConfig({
	build: {
		lib: {
			entry: {
				react: resolve(__dirname, 'src/react.ts'),
				vue: resolve(__dirname, 'src/vue.ts'),
			},
			name: 'use-flex-wrap',
			formats: ['es'],
		},
		rollupOptions: {
			external: ['react', 'react-dom', 'vue'],
			output: {
				entryFileNames: '[name].js',
			},
		},
	},
	plugins: [dts({
		tsconfigPath: './tsconfig.app.json',
	})],
});