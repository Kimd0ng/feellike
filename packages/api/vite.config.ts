import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';
import path from 'path';

export default defineConfig({
    plugins: [
        dts({
            include: ['src/**/*.ts'],
            outDir: 'dist',
            insertTypesEntry: true,
            rollupTypes: true,
        }),
    ],
    build: {
        lib: {
            entry: path.resolve(__dirname, 'src/index.ts'),
            name: 'FeellikeAPI',
            formats: ['es', 'umd'],
            fileName: (format) => `feellike-api.${format}.js`,
        },
        rollupOptions: {
            external: ['axios', '@supabase/supabase-js'],
            output: {
                globals: {
                    axios: 'axios',
                    '@supabase/supabase-js': 'SupabaseJS',
                },
            },
        },
    },
});
