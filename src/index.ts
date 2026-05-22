import { argv } from 'process';

const command = argv.slice(2);
const action = command[0];
const args = command.slice(1);

const checkArgs = (required: number) => {
  if (args.length < required) {
    console.log('Error: Not enough arguments given for', action?.toUpperCase());
    process.exit(1);
  }
};

switch (action) {
  case 'add':
    break;

  case 'update':
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
