/// <reference types="vite/client" />

interface ImportMetaEnv {
  // Client-side environment variables
  readonly VITE_API_URL: string;
}

// biome-ignore lint/correctness/noUnusedVariables: will be picked up by ide
interface ImportMeta {
  readonly env: ImportMetaEnv;
}

export {};
