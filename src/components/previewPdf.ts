import * as pdf from 'pdfjs-dist'
import pdfWorker from 'pdfjs-dist/build/pdf.worker.mjs?url'

pdf.GlobalWorkerOptions.workerSrc = pdfWorker

/**
 * @desc 使用pdf.js加载pdf
 * @param contentDom
 * @param url
 */
export const loadPdf = async (
  contentDom: HTMLDivElement | null,
  url: string,
  loadingDom: HTMLDivElement | null
) => {
  //得到请求的 pdf 文件
  const loadingTask = pdf.getDocument({
    url: url,
    disableRange: true,
    cMapPacked: true,
    cMapUrl: '/cmaps/'
  })
  //loading效果,下载pdf过程中展示loading
  loadingTask.onProgress = () => {
    if (loadingDom) {
      loadingDom.style.display = 'block'
    }
  }
  loadingTask.promise.then(pdfDoc => {
    //下载完成时，loading消失
    if (loadingDom) {
      loadingDom.style.display = 'none'
    }
    //得到 pdf 总页数
    const totalPages = pdfDoc.numPages
    for (let i = 1; i <= totalPages; i++) {
      pdfDoc.getPage(i).then(page => {
        const canvas = document.createElement('canvas')
        canvas.setAttribute('id', `the-canvas${i}`)
        const ctx = canvas.getContext('2d') as CanvasRenderingContext2D
        // const dpr = window.devicePixelRatio || 1
        const CSS_UNITS = 96.0 / 72.0
        const scaledViewport = page.getViewport({ scale: 1 })
        console.log('scaled viewport', scaledViewport)
        canvas.height = Math.floor(scaledViewport.height * CSS_UNITS)
        canvas.width = Math.floor(scaledViewport.width * CSS_UNITS)
        console.log('container',contentDom?.offsetWidth)
        canvas.style.width = contentDom?.offsetWidth + 'px'
        canvas.style.height =
          contentDom!.offsetWidth / (canvas.width / canvas.height) + 'px'

        // const transform = dpr !== 1 ? [ dpr, 0, 0, dpr, 0, 0 ] : undefined
        const transform = [ CSS_UNITS, 0, 0, CSS_UNITS, 0, 0 ]
        const renderContext = {
          canvasContext: ctx,
          viewport: scaledViewport,
          transform
        }
        console.log('render context', renderContext)
        page.render(renderContext)
        contentDom?.appendChild(canvas)
      })
    }
  })
}
