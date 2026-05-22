import { argv } from 'process';
import { readTasks, showHelp, writeTasks } from './utils.js';
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

const deleteTask = (taskID: number) => {
  let tasks = readTasks();
  const filteredTasks = tasks.filter(task => task.id !== taskID);
  if (filteredTasks.length === tasks.length) {
    console.log('Error: Task to Delete not found');
    process.exit(1);
  }
  writeTasks(filteredTasks);
};

const markTaskAs = (taskID: number, status: Task['status']) => {
  let tasks = readTasks();
  let index = tasks.findIndex(task => task.id === taskID);
  if (index === -1) {
    console.log('Error: Task to mark not found');
    process.exit(1);
  }
  tasks[index]!.status = status;
  tasks[index]!.updatedAt = new Date();
  writeTasks(tasks);
};

const listTasks = (filterStatus?: Task['status']) => {
  let tasks = readTasks();
  if (filterStatus) {
    tasks = tasks.filter(task => task.status === filterStatus);
  }
  for (let task of tasks) {
    console.log(
      `${task.id}.${task.description} (${task.status}, last updated at ${task.updatedAt})`,
    );
  }
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
    checkArgs(1);
    deleteTask(Number(args[0]));
    console.log(`Task deleted successfully (ID: ${args[0]})`);
    break;

  case 'mark-in-progress':
    checkArgs(1);
    markTaskAs(Number(args[0]), 'in-progress');
    console.log(`Task marked in-progress successfully (ID: ${args[0]})`);
    break;

  case 'mark-done':
    checkArgs(1);
    markTaskAs(Number(args[0]), 'done');
    console.log(`Task marked done successfully (ID: ${args[0]})`);
    break;

  case 'list':
    if (args.length === 1) listTasks(args[0] as Task['status']);
    else listTasks();
    break;

  case '-h':
    showHelp();
    break;

  default:
    console.log('Invalid option, use -h to see available operations');
    break;
}
