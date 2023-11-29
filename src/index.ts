import { assistants } from "./openaiApi"
import { initManager } from "./api";
import { readFile } from "./filesystem";

let folderArg

async function logAllAssistants() {
  console.log((await assistants.list()).data)

}

if (process.argv.length > 2) {
  folderArg = process.argv[2];
} else {
  console.log("No argument was provided.");
  process.exit(1);
}

export async function runSwarm(folder?: string) {
  const manager = initManager()
  await manager.create(folderArg)
  await logAllAssistants()
  // manager reads task from file
  const task = await readFile(`tasks/${folder}/task.txt`)

  if (!task) {
    console.error("Task is required");
    process.exit(1);
  }
  // assign task to manager
  await manager.assignTask(task)
  const subtasksRes = await manager.createSubtasks()
  console.log(subtasksRes)
  await manager.del()
  await logAllAssistants()
}

runSwarm(folderArg)