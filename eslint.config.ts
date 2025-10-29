import js from '@eslint/js'
import globals from 'globals'
import tseslint, { FlatConfig } from 'typescript-eslint'
import pluginImport from 'eslint-plugin-import'

export default <FlatConfig.Config[]>[
  ...tseslint.configs.recommended,
  ...tseslint.configs.stylistic,
  {
    plugins: {
      import: pluginImport,
      js,
    },
    languageOptions: {
      globals: globals.browser,
    },
    files: ['**/*.{js,mjs,cjs,ts,mts,cts}'],
    settings: {
      'import/resolver': {
        typescript: {
          project: ['./tsconfig.json'],
        },
        node: true,
      },
    },
    rules: {
      // useful with path aliases
      'import/no-unresolved': 'error',
    },
  },
]
