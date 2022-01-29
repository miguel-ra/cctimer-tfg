/// <reference types="vite/client" />
declare module "*.json" {
  const translation: { [key: string]: string };
  export default translation;
}
