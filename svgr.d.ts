declare module '*.svg' {
   import { StaticImport } from 'next/dist/shared/lib/get-img-props';
   const content: StaticImport;
   export default content;
}

declare module '*.svg?url' {
   const content: string;
   export default content;
}
