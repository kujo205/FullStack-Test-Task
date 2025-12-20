/// <reference types="vite/client" />

interface ImportMetaEnv {
  // Client-side environment variables
  readonly VITE_API_URL: string;
}

// biome-ignore lint/correctness/noUnusedVariables: <explanation>
interface ImportMeta {
  readonly env: ImportMetaEnv;
}

export {};
