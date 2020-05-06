/* eslint-disable no-restricted-syntax */
import { readFileSync, readdirSync, writeFileSync } from 'fs';
import { resolve } from 'path';
import { config } from '../config';

const getTypes = (translationFiles: string[]): string => {
  let res = '';

  for (const fileName of translationFiles) {
    const translationName = fileName.replace('.json', '');
    let str = `'${translationName}':`;

    const fileContent = readFileSync(resolve(config.translations.translationsDir, fileName), 'utf-8');
    const parsedFileContent = JSON.parse(fileContent);

    for (const key of Object.keys(parsedFileContent)) {
      str += `| "${key}"\n`;
    }

    res += str;
  }

  return res.trim();
};

const getNames = (translationFiles: string[]) =>
  translationFiles.map((fileName) => `"${fileName.replace('.json', '')}"`).toString();

const translationFiles = readdirSync(resolve(config.translations.translationsDir));

const translationTypesContent = `export type Translations = {${getTypes(translationFiles)}}`.trim();

const translationFilesContent = `export const translationFiles = [${getNames(translationFiles)}]`.trim();

writeFileSync(
  resolve(config.clientGeneratedPath, config.translations.translationsTypeFileName),
  translationTypesContent,
  'utf8',
);

writeFileSync(
  resolve(config.clientGeneratedPath, config.translations.translationKeysFileName),
  translationFilesContent,
  'utf8',
);
