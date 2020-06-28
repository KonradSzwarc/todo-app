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

  const handleDone: TaskListProps['onDoneClick'] = (id, isDone) => {
    updateTask({ params: { id }, body: { isDone } });
  };

  return <TaskList tasks={tasks.data} loading={tasks.status === 'loading'} onDoneClick={handleDone} />;
};

export default Tasks;
