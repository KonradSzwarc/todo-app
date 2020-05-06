import { resolve } from 'path';

export const config = {
  clientGeneratedPath: resolve(__dirname, '../client/src/generated'),
  apiClient: {
    fileName: 'api.ts',
    apiClientPath: '@utils/apiClient',
  },
  translations: {
    translationsDir: resolve(__dirname, '../client/public/locales/en'),
    translationsTypeFileName: 'translations.ts',
    translationKeysFileName: 'translationKeys.ts',
  },
};
