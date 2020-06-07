import { IconButton, Toolbar, Typography } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import React from 'react';
import { useHistory } from 'react-router-dom';

import { AppBar } from '@/components/atoms/AppBar';
import { Box } from '@/components/atoms/Box';
import { Button } from '@/components/atoms/Button';
import { makeStyles } from '@/services/theme';
import { useCurrentUserActions, useCurrentUserState } from '@/store/currentUser';

const useStyles = makeStyles((theme) => ({
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

export const Navbar = () => {
  const classes = useStyles();
  const history = useHistory();
  const currentUser = useCurrentUserState();
  const { signIn, signOut } = useCurrentUserActions();

  const handleSignIn = () => signIn({ email: 'Hayden_Zemlak49@hotmail.com', password: '12345678' });

  const handleSignOut = () => signOut();

  return (
    <>
      <AppBar>
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            Todo App
          </Typography>
          <Button onClick={() => history.push('/')}>Home</Button>
          <Button onClick={() => history.push('/sign-in')}>Sign in</Button>
          {(currentUser.status === 'success' || currentUser.status === 'failure') && (
            <>
              {currentUser.data ? (
                <Button onClick={handleSignOut} color="inherit">
                  Sign out
                </Button>
              ) : (
                <Button onClick={handleSignIn} color="inherit">
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
