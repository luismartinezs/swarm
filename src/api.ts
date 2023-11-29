import { sleep, withError } from "./util";
import { assistants, threads, runs } from "./openaiApi";
import agentConfig from "./agentConfig.json";

type RunStatus = 'queued' | 'in_progress' | 'completed' | 'requires_action' | 'expired' | 'cancelling' | 'cancelled' | 'failed';


async function handleRun(threadId: string, runId: string) {
  let run = await runs.retrieve(threadId, runId)
  let status = run.status

  while (status === "queued" || status === "in_progress") {
    await sleep(1000);
    console.log("running GPT, current status", status);
    run = await runs.retrieve(threadId, runId);
    status = run.status;
  }

  return status

  // if (status === "completed") {
  //   console.log("handleRun: run completed");
  //   return status
  // } else {
  //   console.log("handleRun: Unhandled status", status);
  //   return status
  // }
}


export async function delAllAgents() {
  const _assistants = await assistants.list()
  _assistants.data.forEach(async ({ id }) => {
    await withError(async () => assistants.del(id))
  })
}

export const initManager = () => {
  let id: string
  let threadId: string

  async function create(name) {
    const manager = await assistants.create({
      name: `${name}_${agentConfig.manager.name}`,
      description: agentConfig.manager.description,
      instructions: agentConfig.manager.instructions,
    })

    if (manager) {
      id = manager.id
    } else {
      console.error("createManager: Manager not found")
    }
  }

  async function del() {
    return assistants.del(id)
  }

  async function assignTask(task: string) {
    // create thread
    const thread = await threads.create()
    if (!thread) {
      console.error("assignTask: Thread not found")
      return
    }
    threadId = thread.id
    // add message
    await threads.addMessage(threadId, {
      content: task
    })
  }

  async function createSubtasks() {
    await threads.addMessage(threadId, {
      content: "Split this task into a list of ordered subtasks"
    })
    const _run = await runs.create(threadId, {
      assistant_id: id,
    })
    const status = await handleRun(threadId, _run.id)
    if (status === "completed") {
      return threads.listMessages(threadId)
    }
  }

  return { create, del, assignTask, createSubtasks }
}
