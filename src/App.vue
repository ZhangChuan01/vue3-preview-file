<script setup lang="ts">
import PreviewFile from './components/PreviewFile.vue'
import { ElButton } from 'element-plus'

let dialogVisible = ref(false)
const file = reactive({
  name: '',
  filePath: ''
})
const download = reactive({
  url: '/api/app/fileDownload/downloadOne',
  method: 'get',
  params: {}
})

// 预览Excel
const preview1 = () => {
  file.name = '班组作业效率分析2024.xlsx'
  file.filePath = 'http://192.168.8.181:44382/Inventory/2024/2024-11-18/班组作业效率分析2024.xlsx'
  download.params = {
    filePath: 'http://192.168.8.181:44382/Inventory/2024/2024-11-18/班组作业效率分析2024.xlsx'
  }
  dialogVisible.value = true
}
// 预览图片
const preview2 = () => {
  file.name = 'belt.png'
  file.filePath = 'http://192.168.8.181:44382/Inventory/2024/2024-11-18/belt.png'
  dialogVisible.value = true
}
// 预览PDF
const preview3 = () => {
  file.name = 'DZFP_371_3ce4dc30-e866-4c9b-be59-23808057e308.pdf'
  file.filePath = 'http://192.168.8.181:44382/Inventory/2024/2024-11-18/DZFP_371_3ce4dc30-e866-4c9b-be59-23808057e308.pdf'
  download.params = {
    filePath: 'http://192.168.8.181:44382/Inventory/2024/2024-11-18/DZFP_371_3ce4dc30-e866-4c9b-be59-23808057e308.pdf'
  }
  dialogVisible.value = true
}

// 预览Word
const preview4 = () => {
  file.name = 'jenkins前端项目配置.docx'
  file.filePath = '/wwwroot/Inventory/2025/2025-02-08/jenkins前端项目配置.docx'
  download.params = {
    filePath: '/wwwroot/Inventory/2025/2025-02-08/jenkins前端项目配置.docx'
  }
  dialogVisible.value = true
}
</script>

<template>
  <el-button
    type="primary"
    @click="preview1"
  >
    预览Excel
  </el-button>
  <el-button
    type="primary"
    @click="preview2"
  >
    预览图片
  </el-button>
  <el-button
    type="primary"
    @click="preview3"
  >
    预览PDF
  </el-button>
  <el-button
    type="primary"
    @click="preview4"
  >
    预览word
  </el-button>
  <PreviewFile
    v-model:dialog-visible="dialogVisible"
    :download="download"
    :file="file"
  />
</template>
