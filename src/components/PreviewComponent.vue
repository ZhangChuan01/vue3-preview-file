<script lang="ts">
interface DownLoad {
  url: string
  method: string
  data?: any
  params?: any
}
interface FileInfo {
  name: string
  filePath: string
}
</script>
<script setup lang='ts'>
import * as docxPreview from 'docx-preview'
import * as xlsx from 'xlsx'
import canvasDatagrid from 'canvas-datagrid'
import { loadPdf } from './previewPdf'
import axios from 'axios'
import { ElDialog,ElMessage } from 'element-plus'

const emits = defineEmits<{
  (e:'update:dialogVisible', dialogVisible: boolean): void
}>()

const props = withDefaults(defineProps<{
  dialogVisible: boolean
  file: FileInfo
  download?: DownLoad,
  pdfOptions?: {
    type: string
  }
}>(), {
  download: () => ({
    url: '',
    method: 'GET'
  }),
  pdfOptions: () => ({ type: 'browser' })
})
const dialogShow = computed({
  get: () => props.dialogVisible,
  set: val => emits('update:dialogVisible', val)
})
const downloadFileApi = (type:any = 'blob') =>{
  return axios({
    ...props.download,
    responseType: type
  })
}

let sheetNames = ref<any>([]),activeSheet = ref(0),grid:any = {},workbook:any = null
const getFileData = async () => {
  await nextTick()
  const type = props.file.name.substring(props.file.name.lastIndexOf('.') + 1)
  console.log('type: ' , type,props.file)
  const privewContainer = document.querySelector('.privew-container') as HTMLElement
  if(type === 'docx' || type === 'doc'){
    const res = await downloadFileApi()
    console.log('res: ', res)
    if(res.data){
      docxPreview.renderAsync(res.data, privewContainer).catch(error => {
        ElMessage.error('文件解析失败无法预览，请尝试下载到本地查看')
      })
    }
  }else if(type === 'jpg' || type === 'jpeg' || type === 'png'){
    privewContainer.innerHTML = `<img src="${props.file.filePath}" />`
  }else if(type === 'pdf'){
    if(props.pdfOptions.type === 'canvas'){
      loadPdf(privewContainer as HTMLDivElement, props.file.filePath,null)
    }else{
      privewContainer.innerHTML = `<iframe src="${props.file.filePath}" />`
    }
  }else if(type === 'xlsx' || type === 'xls'){
    const res = await downloadFileApi('arraybuffer')
    console.log(res)
    if(res.data){
      workbook = xlsx.read(res.data, { type: 'buffer' })
      sheetNames.value = workbook.SheetNames  //获取到所有表格
      console.log('Sheet names', sheetNames)
      const worksheet = workbook.Sheets[sheetNames.value[0]]  //取第一张表
      const json = xlsx.utils.sheet_to_json(worksheet)
      grid = canvasDatagrid({
        parentNode: privewContainer, // el 是 document 中的一个 DOM 元素
        data: json, // json 是前面解析得到 sheet 对应的数据
        editable: false // 表示不使用表格编辑
        // ... // 下面是对表格的一些配置项
      })
      grid.style.width = '100%'
      grid.style.height = '100%'
    }
  }
}
const sheetChange = (index: number) => {
  activeSheet.value = index
  console.log('sheet: ' , index, workbook, sheetNames.value[index])
  console.log('grid: ' , grid,workbook.Sheets[sheetNames.value[index]])
  grid.data = xlsx.utils.sheet_to_json(workbook.Sheets[sheetNames.value[index]])
}
watch(dialogShow,val => {
  console.log('val: ', val)
  if(val){
    getFileData()
  }
})

</script>
<template>
  <el-dialog
    v-model="dialogShow"
    title="预览"
    destroy-on-close
    v-bind="$attrs"
  >
    <div class="privew-container" />
    <div class="sheet-wrapper">
      <div
        v-for="(item,index) in sheetNames"
        :key="item"
        :class="['sheet',{active: index === activeSheet}]"
        @click="sheetChange(index)"
      >
        {{ item }}
      </div>
    </div>
  </el-dialog>
</template>

<style lang="scss" scoped>
.privew-container {
  width: 100%;
  height: 600px;
  overflow: auto;
  & > :deep(img) {
    display: block;
    margin: 0 auto;
  }
  :deep(iframe) {
    width: 100%;
    height: 100%;
  }
}
:deep(.docx) {
  svg {
    display: block;
    margin: 0 auto;
  }
}
.sheet-wrapper {
  position: absolute;
  bottom: 60px;
  display: flex;
  align-items: center;
  .sheet {
    margin: 0 5px;
    padding: 8px 4px;
    background: #eee;
    border-radius: 4px;
    cursor: pointer;
    &:hover {
      background: #fff;
    }
  }
  .active {
    background: #fff;
  }
}
</style>

