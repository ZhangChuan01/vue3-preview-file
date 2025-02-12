import { App } from 'vue'
import PreviewFile from './components/PreviewFile.vue'

declare module 'vue' {
  export interface GlobalComponents {
    PreviewFile: typeof PreviewFile
  }
}

export { PreviewFile }

export default {
  install: (app: App) => {
    app.component('PreviewFile', PreviewFile)
  }
}
