/// <reference types="vite/client" />
declare module "*.css";
declare module "*.avif" {
  const src: string;
  export default src;
}
