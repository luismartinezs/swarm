import OpenAI from "openai";
import { withError } from "./util";

if (!process.env.OPENAI_API_KEY) {
  throw new Error("OPENAI_API_KEY is not set");
}

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const MODELS = {
  "gpt-3.5-turbo-1106": "gpt-3.5-turbo-1106",
};

export async function listAgents() {
  return withError(async () => openai.beta.assistants.list())
}

export const agent = () => {
  async function createAgent(params) {
    return withError(async () => openai.beta.assistants.create({
      model: MODELS["gpt-3.5-turbo-1106"],
      ...params
    }))
  }

  async function delAgent(id) {
    return withError(async () => openai.beta.assistants.del(id))
  }

  return {
    createAgent,
    delAgent
  }
}

export const manager = () => {
  return agent()
}