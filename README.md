vue3-preview-compent
================
### vue3文件预览组件(TS版本)
### 可预览word，excel，图片，pdf
#### 如何使用
1. 安装
    ```  
    yarn add vue3-preview-compent --save
    npm install vue3-preview-compent --save
    ```
2. 引入  
    import { PreviewComponent } from 'vue3-preview-compent/dist'
3. 使用   
      [详细使用](https://github.com/ZhangChuan01/vue3-preview-compent/blob/main/src/App.vue)
4. 详细参数设置        
    ##### dialogVisible(必传，boolean类型，组件显示与隐藏)    
    ##### file(必传，文件信息)
    | 字段名   | 是否必传 | 类型   | 描述                           |
    | -------- | -------- | ------ | ------------------------------ |
    | name     | 是       | string | 文件名称（包含后缀的完整名称） |
    | filePath | 是       | camera | 文件地址                       |
    ##### download(图片非必传，其余必传，获取二进制文件流的接口详细信息)
    |  字段名  | 是否必传 | 类型 | 描述  |
    |  ----  |  ------  |  ----  | ----  |
    | url | 是 | string | 获取二进制文件流接口地址，注意，Excel返回的为arraybuffer,其他为blob |
    | method | 否 | string | 请求方式，默认get |
    | data | 否 | any | body传参 |
    | params | 否 | any | url传参 |
    ##### pdfOptions(非必传，pdf预览可选配置)
    | 字段名   | 是否必传 | 类型   | 描述                           |
    | -------- | -------- | ------ | ------------------------------ |
    | type     | 否       | string | 渲染模式，默认为browser即浏览器直接打开pdf，可选参数canvas |
5. 其他   
    弹框支持element-plus组件dialog的所有参数