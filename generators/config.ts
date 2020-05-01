import { resolve } from 'path';

export const config = {
  clientGeneratedPath: resolve(__dirname, '../client/src/generated'),
  apiClient: {
    fileName: 'api.ts',
    apiClientPath: '@utils/apiClient',
  },
};
