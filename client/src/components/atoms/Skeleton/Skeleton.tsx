import React from 'react';
import MuiSkeleton, { SkeletonProps as MuiSkeletonProps, SkeletonTypeMap } from '@material-ui/lab/Skeleton';
import { spacing, SpacingProps, sizing, SizingProps } from '@material-ui/system';

import { makeStyles, composeSystem } from '@services/theme';
import { WithMainRef } from '@typings/components';
import { omitProps } from '@utils/omitProps';

export type SkeletonProps<D extends React.ElementType = SkeletonTypeMap['defaultComponent'], P = {}> = MuiSkeletonProps<
  D,
  P
> &
  SpacingProps &
  SizingProps &
  WithMainRef;

const { system, systemKeys } = composeSystem(spacing, sizing);

const useStyles = makeStyles<SkeletonProps>((theme) => ({
  root: (props) => system({ theme, ...props }),
}));

export const Skeleton = <D extends React.ElementType = SkeletonTypeMap['defaultComponent']>({
  mainRef,
  ...props
}: SkeletonProps<D, { component?: D }>) => {
  const classes = useStyles(omitProps(systemKeys, props));

  return <MuiSkeleton {...props} classes={classes} ref={mainRef} />;
};
