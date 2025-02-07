import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import eslintPlugin from 'vite-plugin-eslint'
import { createHtmlPlugin } from 'vite-plugin-html'
import AutoImport from 'unplugin-auto-import/vite'
import ElementPlus from 'unplugin-element-plus/vite'
import vueSetupExtend from 'vite-plugin-vue-setup-extend'  //便于使用组件名
import { resolve } from 'path'

const name = 'vue3后台管理系统'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    host: '0.0.0.0',
    proxy: {
      '^/api': {
        target: 'http://192.168.8.181:44382',
        changeOrigin: true
      },
      '^/wwwroot': {
        target: 'http://192.168.8.181:44382',
        changeOrigin: true,
        rewrite: (path: string) => path.replace(/^\/wwwroot/, '')
      }
    }
  },
  plugins: [
    vue(),
    vueSetupExtend(),
    eslintPlugin({
      include: [ 'src/**/*.js', 'src/**/*.vue', 'src/*.js', 'src/*.vue' ]
    }),
    createHtmlPlugin({
      inject: {
        data: {
          title: name
        }
      }
    }),
    AutoImport({
      imports: [
        // 需要自动导入的插件，自定义导入的API
        'vue',
        'vue-router',
        'pinia'
      ],
      dts: true
    }),
    ElementPlus({
      // options
    })
  ],
  build: {
    lib: {
      // src/indext.ts 是我们导出组件的地方
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'vue3-preview-compent',
      // 运行构建时输出文件的名称
      fileName: 'index'
    },
    rollupOptions: {
      // 确保外部依赖项不应捆绑到你的库中
      external: [ 'vue' ],
      output: {
        // 提供全局变量以便在 UMD 构建中可以被外部依赖项使用
        globals: {
          vue: 'Vue'
        }
      }
    }
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src') // 路径别名
    },
    extensions: [ '.js', '.json', '.ts' ]
  }
})
