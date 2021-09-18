import resolve from '@rollup/plugin-node-resolve';
import vue from 'rollup-plugin-vue';
import babel from '@rollup/plugin-babel';
import commonjs from '@rollup/plugin-commonjs';
import postcss from 'rollup-plugin-postcss';
import {visualizer} from 'rollup-plugin-visualizer';
import externals from 'rollup-plugin-node-externals';
import { terser } from 'rollup-plugin-terser';
import {cssUrl} from '@sixian/css-url';

export default {
	input: 'app.js',
	external: ['vue'],

	output: [{
		format: 'umd',
		dir: 'dist',
		globals: {
			vue: 'Vue'
		},
		name: 'FcDesigner',
		exports: 'named',
		entryFileNames: 'index.js',
		sourcemap: false,
		sourcemapExcludeSources: false,
	},{
		format: 'umd',
		dir: 'dist',
		globals: {
			vue: 'Vue'
		},
		name: 'FcDesigner',
		exports: 'named',
		entryFileNames: 'index.min.js',
		sourcemap: false,
		sourcemapExcludeSources: false,
		plugins: [terser()]
	}],
	plugins: [
		vue({ preprocessStyles: true }),
		postcss({
				minimize: true,
				extract: false,
				plugins: [
						cssUrl({
								imgExtensions : /\.(png|jpg|jpeg|gif|svg)$/,
								fontExtensions : /\.(ttf|woff|woff2|eot)$/,
								limit : 8192,
								hash : false,
								slash : false
						}),
				]
		}),
		externals({
			devDeps: true
		}),
		resolve({
			extensions: ['.js', '.json', '.jsx', '.ts', '.tsx'],
			preferBuiltins: true,
			jsnext: true,
			module: true
		}),
		commonjs(),
		babel({
			babelHelpers: 'bundled',
			exclude: 'node_modules/**',
			extensions: ['.js', '.jsx', '.mjs', '.ts', '.tsx', '.vue'],
		}),
    visualizer()
	],
};