vue3-preview-file
================
### vue3文件预览组件(TS版本,依赖于vue3,element-plus)
### 可预览word，excel，图片，pdf
#### 如何使用
##### 1. 安装
    yarn add vue3-preview-file --save
    npm install vue3-preview-file --save
##### 2. 引入    
    引入css   
    import "vue3-preview-file/style.css";    

    引入组件   
        单独引入    
        import { PreviewFile } from 'vue3-preview-file'   
        全局注册
        import PreviewFile from 'vue3-preview-file'    
        app.use(PreviewFile)
            .mount('#app')
##### 3. 使用demo     
![demo1](https://github.com/ZhangChuan01/vue3-preview-file/blob/main/demo1.png)
![demo2](https://github.com/ZhangChuan01/vue3-preview-file/blob/main/demo2.png)
[详细使用](https://github.com/ZhangChuan01/vue3-preview-file/blob/main/src/App.vue)
##### 4. 详细参数设置        
dialogVisible(必传，boolean，组件显示与隐藏)    

file(必传，object，文件信息)
| 字段名   | 是否必传 | 类型   | 描述                           |
| -------- | -------- | ------ | ------------------------------ |
| name     | 是       | string | 文件名称（包含后缀的完整名称） |
| filePath | 是       | camera | 文件地址                       |

download(图片非必传，其余必传，object，获取二进制文件流的接口详细信息)
|  字段名  | 是否必传 | 类型 | 描述  |
|  ----  |  ------  |  ----  | ----  |
| url | 是 | string | 获取二进制文件流接口地址，注意，Excel返回的为arraybuffer,其他为blob |
| method | 否 | string | 请求方式，默认get |
| data | 否 | any | body传参 |
| params | 否 | any | url传参 |

pdfOptions(非必传，object，pdf预览可选配置)
| 字段名   | 是否必传 | 类型   | 描述                           |
| -------- | -------- | ------ | ------------------------------ |
| type     | 否       | string | 渲染模式，默认为browser即浏览器直接打开pdf，可选参数canvas |
##### 5. 其他   
    弹框支持element-plus组件dialog的所有参数