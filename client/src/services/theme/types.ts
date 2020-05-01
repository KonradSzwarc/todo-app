import { Theme as MuiTheme, ThemeOptions as MuiThemeOptions } from '@material-ui/core/styles/createMuiTheme';
import { PaletteOptions } from '@material-ui/core/styles/createPalette';

type Palette = PaletteOptions & {};

export type ThemeObject = MuiThemeOptions & {
  palette?: Palette;
};

export type Theme = MuiTheme & {};
