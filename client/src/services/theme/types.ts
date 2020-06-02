import * as CSS from 'csstype';
import { SpacingProps as SystemSpacingProps, SizingProps as SystemSizingProps } from '@material-ui/system';
import { Theme as MuiTheme, ThemeOptions as MuiThemeOptions } from '@material-ui/core/styles/createMuiTheme';
import { PaletteOptions } from '@material-ui/core/styles/createPalette';

// eslint-disable-next-line import/no-cycle
import { themes } from './themes';

type Palette = PaletteOptions & {};

export type ThemeObject = MuiThemeOptions & {
  palette?: Palette;
};

export type Theme = MuiTheme & {};

export type ThemeKey = keyof typeof themes;

export type BreakpointKey = Theme['breakpoints']['keys'][0];

type ResponsiveStyle<T> = Partial<Record<BreakpointKey, T>> | T;

export type SpacingProps = Partial<Record<keyof SystemSpacingProps, ResponsiveStyle<number | string>>>;

export type SizingProps = Partial<
  Record<keyof Omit<SystemSizingProps, 'boxSizing'>, ResponsiveStyle<number | string>>
> & {
  boxSizing?: ResponsiveStyle<CSS.Properties['boxSizing']>;
};

export type TypographyProps = Partial<{
  fontFamily: ResponsiveStyle<string>;
  fontSize: ResponsiveStyle<FontSize | number>;
  fontStyle: ResponsiveStyle<'italic' | 'normal' | 'oblique'>;
  fontWeight: ResponsiveStyle<FontWeight>;
  letterSpacing: ResponsiveStyle<string | number>;
  lineHeight: ResponsiveStyle<CSS.Properties['lineHeight']>;
  textAlign: ResponsiveStyle<CSS.Properties['textAlign']>;
}>;

export type FlexboxProps = Partial<{
  flexDirection: ResponsiveStyle<CSS.Properties['flexDirection']>;
  flexWrap: ResponsiveStyle<CSS.Properties['flexWrap']>;
  justifyContent: ResponsiveStyle<CSS.Properties['justifyContent']>;
  alignItems: ResponsiveStyle<CSS.Properties['alignItems']>;
  alignContent: ResponsiveStyle<CSS.Properties['alignContent']>;
  order: ResponsiveStyle<CSS.Properties['order']>;
  flex: ResponsiveStyle<CSS.Properties['flex']>;
  flexGrow: ResponsiveStyle<CSS.Properties['flexGrow']>;
  flexShrink: ResponsiveStyle<CSS.Properties['flexShrink']>;
  alignSelf: ResponsiveStyle<CSS.Properties['alignSelf']>;
}>;

export type DisplayProps = Partial<{
  display: ResponsiveStyle<CSS.Properties['display']>;
  displayPrint: ResponsiveStyle<CSS.Properties['display']>;
  displayRaw: ResponsiveStyle<CSS.Properties['display']>;
  overflow: ResponsiveStyle<CSS.Properties['overflow']>;
  textOverflow: ResponsiveStyle<CSS.Properties['textOverflow']>;
  visibility: ResponsiveStyle<CSS.Properties['visibility']>;
  whiteSpace: ResponsiveStyle<CSS.Properties['whiteSpace']>;
}>;

type FontSize =
  | 'h1.fontSize'
  | 'h2.fontSize'
  | 'h3.fontSize'
  | 'h4.fontSize'
  | 'h5.fontSize'
  | 'h6.fontSize'
  | 'subtitle1.fontSize'
  | 'subtitle2.fontSize'
  | 'body1.fontSize'
  | 'body2.fontSize'
  | 'button.fontSize'
  | 'caption.fontSize'
  | 'overline.fontSize';

type FontWeight = 'fontWeightLight' | 'fontWeightRegular' | 'fontWeightMedium' | 'fontWeightBold';
