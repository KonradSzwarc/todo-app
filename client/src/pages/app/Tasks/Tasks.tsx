import React, { useState } from 'react';
import { useEffectOnce } from 'react-use';

import { Box } from '@/components/atoms/Box';
import { TextField, TextFieldProps } from '@/components/atoms/TextField';
import { TaskList, TaskListProps } from '@/components/organisms/TaskList';
import { useTasksActions, useTasksState } from '@/store/tasks';

const Tasks = () => {
  const tasks = useTasksState();
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const { fetchTasks, createTask, updateTask, deleteTask } = useTasksActions();

  useEffectOnce(() => {
    fetchTasks();
  });

  const createNewTask = () => {
    createTask(newTaskTitle);
    setNewTaskTitle('');
  };

  const handleDone: TaskListProps['onDoneClick'] = (id, isDone) => {
    updateTask({ params: { id }, body: { isDone } });
  };

  const handleDelete: TaskListProps['onDeleteClick'] = (id) => {
    deleteTask(id);
  };

  const handleNewTaskTitleChange: TextFieldProps['onChange'] = (e) => {
    setNewTaskTitle(e.target.value);
  };

  const handleNewTaskTitleKeyPress: TextFieldProps['onKeyPress'] = (e) => {
    if (e.key === 'Enter' && newTaskTitle.trim()) {
      createNewTask();
    }
  };

  return (
    <Box mt={4} mx="auto" width={800}>
      <TextField
        name="newTaskTitle"
        fullWidth
        variant="standard"
        placeholder="Enter new task title and press enter to add"
        value={newTaskTitle}
        onChange={handleNewTaskTitleChange}
        onKeyPress={handleNewTaskTitleKeyPress}
      />
      <TaskList
        tasks={tasks.data}
        loading={tasks.status === 'loading'}
        onDoneClick={handleDone}
        onDeleteClick={handleDelete}
      />
    </Box>
  );
};

export default Tasks;
