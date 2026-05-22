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
