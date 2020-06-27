import React from 'react';

import { render } from '@/utils/test';

import { Default, Empty, Loading } from './TaskList.stories';

jest.mock('@material-ui/icons/Inbox', () => () => '123');

describe('TaskList', () => {
  it('renders tasks list without crash', () => {
    const { getByTestId } = render(<Default />);

    const taskList = getByTestId('task-list');

    expect(taskList).toBeInTheDocument();
  });

  it('renders empty screen if there are no tasks', () => {
    const { getByTestId } = render(<Empty />);

    const emptyScreen = getByTestId('task-list-empty');

    expect(emptyScreen).toBeInTheDocument();
  });

  it('renders skeletons if tasks are loading', () => {
    const { getByTestId, getAllByTestId } = render(<Loading />);

    const loadingScreen = getByTestId('task-list-loading');
    const skeletons = getAllByTestId('task-skeleton') as HTMLElement[];

    expect(loadingScreen).toBeInTheDocument();
    expect(skeletons.length).toBeGreaterThan(0);
  });
});
