import { defineConfig } from 'tsup'

export default defineConfig({
    entry: ['src/main.ts'],
    format: ['esm'],
    target: 'node18',
    outDir: 'dist',
    platform: 'node',
    sourcemap: true,
    clean: true,
    splitting: true,
    minify: true,
    dts: true,
    tsconfig: './tsconfig.json',
    esbuildOptions: (opts) => {
        opts.alias = {
            '#config/*': './src/config/*',
            '#utils/*': './src/utils/*',
            '#types/*': './src/types/*',
            '#client/*': './src/client/*',
            '#errors/*': './src/errors/*',
            '#core/*': './src/core/*',
            '#root/*': './src/*',
        }
    },
})
