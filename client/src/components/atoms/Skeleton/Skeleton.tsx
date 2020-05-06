import React from 'react';
import MuiSkeleton, { SkeletonProps as MuiSkeletonProps, SkeletonTypeMap } from '@material-ui/lab/Skeleton';
import { spacing, sizing } from '@material-ui/system';

import { composeSystem, styled, SpacingProps, SizingProps } from '@services/theme';
import { WithMainRef } from '@typings/components';

export type SkeletonProps<D extends React.ElementType = SkeletonTypeMap['defaultComponent'], P = {}> = MuiSkeletonProps<
  D,
  P
> &
  SpacingProps &
  SizingProps &
  WithMainRef;

const { system, systemKeys } = composeSystem(spacing, sizing);

const StyledSkeleton = styled(MuiSkeleton, { omitKeys: systemKeys })<SkeletonProps>(system);

export const Skeleton = <D extends React.ElementType = SkeletonTypeMap['defaultComponent']>({
  mainRef,
  ...props
}: SkeletonProps<D, { component?: D }>) => {
  return <StyledSkeleton {...props} ref={mainRef} />;
};
