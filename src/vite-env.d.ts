/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_MAGIC_KEY: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
