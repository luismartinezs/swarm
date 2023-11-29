import { runSwarm } from "./src";
import { createFile, createFolder } from "./src/filesystem";
import { camelCase } from "./src/util";

// ask user for new task name
const taskName = prompt("Enter task name: ");

if (!taskName) {
  console.error("Task name is required");
  process.exit(1);
}

// create folder task_name_timestamp in tasks folder
const taskFolderName = `${camelCase(taskName)}_${Date.now()}`;
await createFolder(`tasks/${taskFolderName}`);

// create task file
await createFile(`tasks/${taskFolderName}/task.txt`, `
## TASK

${taskName}
`);

runSwarm(taskFolderName)