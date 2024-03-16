const buildEslintCommand = (filenames) => `pnpm lint-es:prefix ${filenames.join(' ')}`;

/** @type {import("lint-staged").Config} */
export default {
  '*.{ts,tsx}': [
    buildEslintCommand,
    'prettier --write',
    () => 'tsc --incremental false --noEmit',
  ],
  '*.{md,yaml,json,js,mjs}': 'prettier --write',
};
