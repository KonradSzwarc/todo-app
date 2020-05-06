import {
  styled,
  composeSystem,
  SpacingProps,
  SizingProps,
  TypographyProps,
  DisplayProps,
  FlexboxProps,
} from '@services/theme';
import { spacing, sizing, typography, flexbox, display } from '@material-ui/system';

const { system, systemKeys } = composeSystem(spacing, sizing, typography, flexbox, display);

type BoxProps = SpacingProps & SizingProps & TypographyProps & FlexboxProps & DisplayProps;

export const Box = styled('div', { omitKeys: systemKeys })<BoxProps>(system);
