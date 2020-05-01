import React from 'react';
import { render } from '@utils/testing';
import { WithPinnedTasks, Loading, Empty, Default } from './TaskList.stories';

describe('TaskList', () => {
  it('renders tasks list without crash', () => {
    const { getByTestId } = render(<Default />);

    const taskList = getByTestId('task-list');

    expect(taskList).toBeInTheDocument();
  });

  it('renders pinned tasks at the start of the list', () => {
    const { getAllByTestId } = render(<WithPinnedTasks />);

    const tasks = getAllByTestId(/task-\d+/) as HTMLElement[];

    expect(tasks[0]).toHaveAttribute('data-testid', 'task-6');
    expect(tasks[1]).toHaveAttribute('data-testid', 'task-1');
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
