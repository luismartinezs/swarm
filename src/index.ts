import { v4 as uuidv4 } from "uuid";
import { manager, listAgents } from "./openai";

const uuid = uuidv4();

async function main() {
  const { createAgent, delAgent } = manager()
  const _manager = await createAgent({
    name: `test-${uuid}`,
    description: `test assistant for uuid ${uuid}`,
    instructions: "you are a helpful assistant",
  })
  console.log((await listAgents()).data)
  await delAgent(_manager.id)
  console.log((await listAgents()).data)
}

main()