import { FileOperations } from './File-operations';

function addProblem(): void {
  const args = process.argv;

  if (args.length < 3) {
    throw new Error('Please provide the number of the problem to initialize');
  } else if (args.length > 3) {
    throw new Error('Expected exactly one argument');
  }

  const problemToAdd: string = args[2];

  const fo = new FileOperations();
  fo.addDirectory(problemToAdd);
  fo.addDirectoryContent();
  fo.addStartScript(problemToAdd);
}

try {
  addProblem();
} catch (exc) {
  console.log(exc);
}
