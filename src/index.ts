import { App } from 'vue'
import PreviewFile from './components/PreviewFile.vue'

export default {
  install: (app: App) => {
    app.component('PreviewFile', PreviewFile)
  }
}

export { PreviewFile }