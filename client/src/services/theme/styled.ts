/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import emotionStyled, {
  StyledOptions,
  CreateStyledComponentExtrinsic,
  CreateStyledComponentBase,
} from '@emotion/styled';
import { Theme } from './types';

type JSXInEl = JSX.IntrinsicElements;

type Options = StyledOptions & { omitKeys?: string[] };

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

const shouldForwardProp = (omitKeys: string[] = []) => (prop: string) => !omitKeys.includes(prop);

export const styled: CreateStyled<Theme> = (
  tag: React.ComponentType<any> | keyof JSXInEl,
  { omitKeys, ...options }: Options = {},
) => {
  const config = omitKeys ? { shouldForwardProp: shouldForwardProp(omitKeys), ...options } : options;

  return typeof tag === 'string' ? emotionStyled(tag, config) : emotionStyled(tag, config);
};
