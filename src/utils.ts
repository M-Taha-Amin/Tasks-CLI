import fs from 'fs';
import path from 'path';
import type { Task } from './types.js';

const __dirname = import.meta.dirname;
const TASKS_PATH = path.join(__dirname, './tasks.json');

export const readTasks = (): Array<Task> => {
  try {
    let data = fs.readFileSync(TASKS_PATH, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    console.log('File not found');
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
