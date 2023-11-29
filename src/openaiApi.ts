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
  "gpt-4-1106-preview": "gpt-4-1106-preview",
};

function openaiApi() {
  function assistants() {
    function create(params: Parameters<typeof openai.beta.assistants.create>[0]) {
      const defaultParams = {
        model: MODELS["gpt-3.5-turbo-1106"],
      }
      const _params = { ...defaultParams, ...params }
      return withError(async () => openai.beta.assistants.create(_params))
    }

    function del(id: string) {
      return withError(async () => openai.beta.assistants.del(id))
    }

    function retrieve(id: string) {
      return withError(async () => openai.beta.assistants.retrieve(id))
    }

    function list() {
      return withError(async () => openai.beta.assistants.list())
    }

    return {
      create,
      del,
      retrieve,
      list
    }
  }

  function threads() {
    function create() {
      return withError(async () => openai.beta.threads.create())
    }

    function addMessage(id: string, params: Parameters<typeof openai.beta.threads.messages.create>[1]) {
      const _params = {
        role: "user",
        ...params
      }
      return withError(async () => openai.beta.threads.messages.create(id, _params))
    }

    function listMessages(id: string) {
      return withError(async () => openai.beta.threads.messages.list(id))
    }

    return {
      create,
      addMessage,
      listMessages
    }
  }

  function runs() {
    function create(threadId: string, params: Parameters<typeof openai.beta.threads.runs.create>[1]) {
      return withError(async () => openai.beta.threads.runs.create(threadId, params))
    }

    function retrieve(threadId: string, id: string) {
      return withError(async () => openai.beta.threads.runs.retrieve(threadId, id))
    }

    return {
      create,
      retrieve
    }
  }

  return {
    assistants,
    threads,
    runs
  }
}

const api = openaiApi()
export const assistants = api.assistants()
export const threads = api.threads()
export const runs = api.runs()
