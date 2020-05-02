import React, { useRef } from 'react';
import { useTranslation } from 'react-i18next';

import { Avatar } from '@components/atoms/Avatar';
import { AvatarGroup } from '@components/atoms/AvatarGroup';
import { Button } from '@components/atoms/Button';

export const Home = () => {
  const { t } = useTranslation('translation');
  const ref = useRef<HTMLDivElement>(null);

  return (
    <div className="App">
      <AvatarGroup max={2}>
        <Avatar>K</Avatar>
        <Avatar>S</Avatar>
        <Avatar>A</Avatar>
      </AvatarGroup>
      <Button mainRef={ref} mt={3} variant="contained" color="primary">
        Click me
      </Button>
      <header className="App-header">
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a className="App-link" href="https://reactjs.org" target="_blank" rel="noopener noreferrer">
          {t('Hello world')}
        </a>
      </header>
    </div>
  );
};
