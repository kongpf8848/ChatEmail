export const DEFAULT_SYSTEM_PROMPT =
    "The following is a friendly conversation between a human and an AI. The AI is talkative and provides lots of specific details from its context. If the AI does not know the answer to a question, it truthfully says it does not know.";

export const CHAT_FILES_MAX_SIZE =
    parseInt(process.env.NEXT_PUBLIC_CHAT_FILES_MAX_SIZE || '') || 0;

export const CHAT_FILES_UPLOAD_PATH = process.env.NEXT_PUBLIC_CHAT_FILES_UPLOAD_PATH || "public/uploads";

export const SUPABASE_KEY = process.env.SUPABASE_API_KEY
// if (!SUPABASE_KEY) throw new Error(`Expected SUPABASE_API_KEY`)

export const SUPABASE_URL = process.env.SUPABASE_API_URL
// if (!SUPABASE_URL) throw new Error(`Expected env var SUPABASE_API_URL`)

export const OPENAI_TYPE = process.env.OPENAI_TYPE || "OPENAI"; // Or OPENAI || AZURE_OPENAI

export const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
export const OPENAI_API_MODEL = process.env.OPENAI_API_MODEL || "gpt-3.5-turbo";

export const AZURE_OPENAI_API_KEY = process.env.AZURE_OPENAI_API_KEY;

export const AZURE_OPENAI_API_INSTANCE_NAME = process.env.AZURE_OPENAI_API_INSTANCE_NAME;

export const AZURE_OPENAI_API_DEPLOYMENT_NAME = process.env.AZURE_OPENAI_API_DEPLOYMENT_NAME;
export const AZURE_OPENAI_API_EMBEDDINGS_DEPLOYMENT_NAME = process.env.AZURE_OPENAI_API_EMBEDDINGS_DEPLOYMENT_NAME;

export const AZURE_OPENAI_API_VERSION = process.env.AZURE_OPENAI_API_VERSION || "2023-03-15-preview";