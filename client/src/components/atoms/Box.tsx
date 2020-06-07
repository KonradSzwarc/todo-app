import { display, flexbox, sizing, spacing, typography } from '@material-ui/system';

import {
  composeSystem,
  DisplayProps,
  FlexboxProps,
  SizingProps,
  SpacingProps,
  styled,
  TypographyProps,
} from '@/services/theme';

const { system, systemKeys } = composeSystem(spacing, sizing, typography, flexbox, display);

type BoxProps = SpacingProps & SizingProps & TypographyProps & FlexboxProps & DisplayProps;

export const Box = styled('div', { omitKeys: systemKeys })<BoxProps>(system);
