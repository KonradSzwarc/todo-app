import { IconButton, Toolbar, Typography } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import React from 'react';

import { AppBar } from '@/components/atoms/AppBar';
import { Box } from '@/components/atoms/Box';
import { Button } from '@/components/atoms/Button';
import { useHistory } from '@/hooks/useHistory';
import { styled } from '@/services/theme';
import { useCurrentUserActions, useCurrentUserState } from '@/store/currentUser';

const MenuButton = styled(IconButton)(({ theme }) => ({
  marginRight: theme.spacing(2),
}));

const Title = styled(Typography)({
  flexGrow: 1,
});

export const Navbar = () => {
  const { redirect } = useHistory();
  const currentUser = useCurrentUserState();
  const { signOut } = useCurrentUserActions();

  const handleSignOut = () => signOut();

  const isUserLoaded = currentUser.status !== 'idle' && currentUser.status !== 'loading';

  return (
    <>
      <AppBar>
        <Toolbar>
          <MenuButton edge="start" color="inherit" aria-label="menu">
            <MenuIcon />
          </MenuButton>
          <Title variant="h6">Todo App</Title>
          <Button onClick={redirect('/')} color="inherit">
            Home
          </Button>
          {isUserLoaded && (
            <>
              {currentUser.data ? (
                <Button onClick={handleSignOut} color="inherit">
                  Sign out
                </Button>
              ) : (
                <Button onClick={redirect('/sign-in')} color="inherit">
                  Sign in
                </Button>
              )}
            </>
          )}
        </Toolbar>
      </AppBar>
      <Box height={64} />
    </>
  );
};
