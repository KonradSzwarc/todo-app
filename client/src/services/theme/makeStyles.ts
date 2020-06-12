/* eslint-disable @typescript-eslint/no-explicit-any */
import makeMuiStyles from '@material-ui/styles/makeStyles';
import { ClassNameMap, Styles, WithStylesOptions } from '@material-ui/styles/withStyles';

import { Theme } from './types';

export const makeStyles = <Props extends {} | undefined = undefined, ClassKey extends string = string>(
  styles: Styles<Theme, Props extends undefined ? {} : Props, ClassKey>,
  options?: Omit<WithStylesOptions<Theme>, 'withTheme'>,
) => {
  return makeMuiStyles(styles, options) as Props extends undefined
    ? (props?: any) => ClassNameMap<ClassKey>
    : (props: Props) => ClassNameMap<ClassKey>;
};
