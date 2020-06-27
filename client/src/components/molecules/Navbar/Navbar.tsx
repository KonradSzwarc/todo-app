import { IconButton, Toolbar, Typography } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import React from 'react';

import { AppBar } from '@/components/atoms/AppBar';
import { Box } from '@/components/atoms/Box';
import { Button } from '@/components/atoms/Button';
import { useHistory } from '@/hooks/useHistory';
import { useUserAuthorization } from '@/services/auth';
import { styled } from '@/services/theme';
import { useCurrentUserActions } from '@/store/currentUser';

type NavbarComponentProps = {
  redirect: (path: string) => () => void;
  authorized: boolean;
  signOut: () => void;
};

const MenuButton = styled(IconButton)(({ theme }) => ({
  marginRight: theme.spacing(2),
}));

const Title = styled(Typography)({
  flexGrow: 1,
});

export const NavbarComponent = ({ redirect, authorized, signOut }: NavbarComponentProps) => {
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
          {authorized ? (
            <>
              <Button onClick={redirect('/app/tasks')} color="inherit">
                Tasks
              </Button>
              <Button onClick={signOut} color="inherit">
                Sign out
              </Button>
            </>
          ) : (
            <Button onClick={redirect('/sign-in')} color="inherit">
              Sign in
            </Button>
          )}
        </Toolbar>
      </AppBar>
      <Box height={64} />
    </>
  );
};

export const Navbar = () => {
  const { redirect } = useHistory();
  const { isUserAuthorized } = useUserAuthorization();
  const { signOut } = useCurrentUserActions();

  return <NavbarComponent redirect={redirect} authorized={isUserAuthorized} signOut={signOut} />;
};
