/* eslint-disable */

/// <reference types="vite/client" />
import type { RDKitModule } from 'types/rdkit'
// Mocks all files ending in `.vue` showing them as plain Vue instances
// declare module '*.vue' {
//   import type { DefineComponent } from 'vue';
//   const component: DefineComponent<{}, {}, any>;
//   export default component;
// }
export {}
declare global {
    interface Window {
        RDKitModule: RDKitModule
    }
}
