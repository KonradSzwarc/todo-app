import { DEFAULT_LANGUAGE, LANGUAGES } from './constants';

export type Language = keyof typeof LANGUAGES;

export type DefaultLanguage = typeof DEFAULT_LANGUAGE;

export type TranslationResources = Record<Language, Record<string, string>>;
