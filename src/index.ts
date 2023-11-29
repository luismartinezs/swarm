import { manager, listAgents } from "./openai";
import agentConfig from "./agentConfig.json";

export async function runSwarm(folder?: string) {
  const { createAgent, delAgent } = manager()
  const _manager = await createAgent({
    name: `${agentConfig.manager.name}-${folder}`,
    description: agentConfig.manager.description,
    instructions: agentConfig.manager.instructions,
  })
  console.log((await listAgents()).data)
  await delAgent(_manager.id)
  console.log((await listAgents()).data)
}

