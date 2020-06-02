import { LANGUAGES, DEFAULT_LANGUAGE } from './constants';

export type Language = keyof typeof LANGUAGES;

export type DefaultLanguage = typeof DEFAULT_LANGUAGE;

export type TranslationResources = Record<Language, Record<string, string>>;
