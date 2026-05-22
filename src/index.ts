import { argv } from 'process';
import { readTasks, writeTasks } from './utils.js';
import type { Task } from './types.js';

const command = argv.slice(2);
const action = command[0];
const args = command.slice(1);

const addTask = (taskDescription: string) => {
  let tasks = readTasks();
  const currentDate = new Date();
  let task: Task = {
    id: tasks.length + 1,
    description: taskDescription,
    status: 'todo',
    createdAt: currentDate,
    updatedAt: currentDate,
  };
  tasks.push(task);
  writeTasks(tasks);
  return task.id;
};

const updateTask = (taskID: number, newDescription: string) => {
  let tasks = readTasks();
  let index = tasks.findIndex(task => task.id === taskID);
  if (index === -1) {
    console.log('Error: Task to update not found');
    process.exit(1);
  }
  tasks[index]!.description = newDescription;
  tasks[index]!.updatedAt = new Date();
  writeTasks(tasks);
};

const checkArgs = (required: number) => {
  if (args.length < required) {
    console.log('Error: Not enough arguments given for', action?.toUpperCase());
    process.exit(1);
  }
};

switch (action) {
  case 'add':
    checkArgs(1);
    const taskID = addTask(args[0] as string);
    console.log(`Task added successfully (ID: ${taskID})`);
    break;

  case 'update':
    checkArgs(2);
    updateTask(Number(args[0]), args[1] as string);
    console.log(`Task updated successfully (ID: ${args[0]})`);
    break;

  case 'delete':
    break;

  case 'mark-in-progress':
    break;

  case 'mark-done':
    break;

  case 'list':
    break;

  default:
    break;
}
