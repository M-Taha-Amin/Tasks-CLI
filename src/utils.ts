import fs from 'fs';
import path from 'path';
import type { Task } from './types.js';

const __dirname = import.meta.dirname;
const TASKS_PATH = path.join(__dirname, './tasks.json');

const taskFileNotExists = (): Boolean => {
  return fs.existsSync(TASKS_PATH) === false;
};

export const readTasks = (): Array<Task> => {
  try {
    if (taskFileNotExists()) {
      fs.writeFileSync(TASKS_PATH, JSON.stringify([]));
    }
    let data = fs.readFileSync(TASKS_PATH, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    console.log('File not found', error);
    process.exit(1);
  }
};

export const writeTasks = (updatedData: Array<Task>) => {
  try {
    fs.writeFileSync(TASKS_PATH, JSON.stringify(updatedData));
  } catch (error) {
    console.log('File not found');
    process.exit(1);
  }
};

export const showHelp = () => {
  console.log('Task Tracker CLI v1');
  console.log('Supported operations:');

  console.log('\t Command: add <task_name>');
  console.log('\t Description: adds a new task with given name to the list\n');

  console.log('\t Command: update <task_id> <new_name>');
  console.log('\t Description: updates existing task with new name given\n');

  console.log('\t Command: delete <task_id>');
  console.log('\t Description: deletes the task with given id\n');

  console.log('\t Command: mark-in-progress <task_id>');
  console.log(
    '\t Description: marks the status as in-progress of task with given id\n',
  );

  console.log('\t Command: mark-done <task_id>');
  console.log('\t Description: marks the task with given id as done\n');

  console.log('\t Command: list <status>');
  console.log(
    '\t Description: Lists tasks based on status as a filter, status is optional.\n\t If status is omitted, all tasks are shown\n',
  );
};
