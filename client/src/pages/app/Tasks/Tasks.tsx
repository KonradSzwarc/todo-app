import React from 'react';
import { useEffectOnce } from 'react-use';

import { TaskList, TaskListProps } from '@/components/organisms/TaskList';
import { useTasksActions, useTasksState } from '@/store/tasks';

const Tasks = () => {
  const tasks = useTasksState();
  const { fetchTasks, updateTask } = useTasksActions();

  useEffectOnce(() => {
    fetchTasks();
  });

  const handleDone: TaskListProps['onDoneClick'] = (id, status) => {
    updateTask({ params: { id }, body: { status } });
  };

  return <TaskList tasks={tasks.data} loading={tasks.status === 'loading'} onDoneClick={handleDone} />;
};

export default Tasks;
