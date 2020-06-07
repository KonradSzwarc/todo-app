/* eslint-disable @typescript-eslint/no-explicit-any */
import emotionStyled, {
  CreateStyledComponentBase,
  CreateStyledComponentExtrinsic,
  StyledOptions,
} from '@emotion/styled';
import React from 'react';

import { Theme } from './types';

type JSXInEl = JSX.IntrinsicElements;

type Options = StyledOptions & { omitKeys?: string[]; preserveKeys?: string[] };

interface CreateStyled<Theme extends object = any> {
  <Tag extends React.ComponentType<any>, ExtraProps = {}>(tag: Tag, options?: Options): CreateStyledComponentExtrinsic<
    Tag,
    ExtraProps,
    Theme
  >;

  <Tag extends keyof JSXInEl, ExtraProps = {}>(tag: Tag, options?: Options): CreateStyledComponentBase<
    Omit<JSXInEl[Tag], 'color'>,
    ExtraProps,
    Theme
  >;
}

const shouldForwardProp = (omitKeys: string[] = [], preserveKeys: string[] = []) => (prop: string) =>
  preserveKeys.includes(prop) || !omitKeys.includes(prop);

export const styled: CreateStyled<Theme> = (
  tag: React.ComponentType<any> | keyof JSXInEl,
  { omitKeys, preserveKeys, ...options }: Options = {},
) => {
  const config = omitKeys ? { shouldForwardProp: shouldForwardProp(omitKeys, preserveKeys), ...options } : options;

  // eslint-disable-next-line sonarjs/no-all-duplicated-branches
  return typeof tag === 'string' ? emotionStyled(tag, config) : emotionStyled(tag, config);
};
