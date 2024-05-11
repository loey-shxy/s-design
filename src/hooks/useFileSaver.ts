import { ElMessage, ElProgress, MessageHandler } from 'element-plus'
import { defineComponent, ref, h } from 'vue'

interface Options {
    tip?: boolean,
    name?: string | undefined
}

const progress = ref(0)
const color = [
    { color: '#f56c6c', percentage: 20 },
    { color: '#e6a23c', percentage: 40 },
    { color: '#6f7ad3', percentage: 60 },
    { color: '#1989fa', percentage: 80 },
    { color: '#5cb87a', percentage: 100 },
]

const Message = defineComponent({
    props: {
        progress: {
            type: Number,
            default: 0
        }
    },
    render(ctx: any) {
        return h(ElProgress, {
            style: {
                width: '200px',
                height: '30px'
            },
            color,
            percentage: ctx.progress.value,
            striped: true,
            storkeWidth: 15
        })
    }
})

const formatBytes = (bytes: number, decimals = 2) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const dm = decimals < 0 ? 0 : decimals
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k ,i)).toFixed(dm)) + ' ' + sizes[i]
}

/**
 * 链接跨域检测
 * @param url
 * @returns
 */
const corsEnabled = (url: string | URL) => {
    const xhr = new XMLHttpRequest()
    xhr.open('HEAD', url, false)
    try {
        xhr.send()
    } catch (e) {}
    return xhr.status >= 200 && xhr.status <= 299
}
const Progress = (ev: ProgressEvent<XMLHttpRequestEventTarget>, handle: MessageHandler) => {
    progress.value = Math.floor(ev.loaded / ev.total) * 100
    if (ev.loaded >= ev.total) {
        setTimeout(() => {
            handle.close()
            progress.value = 0
        }, 3000)
    }
}

const download = (
    url: string,
    options: Options = {
        name: 'download'
    }
) => {
    const xhr = new XMLHttpRequest()
    let MessageHandler: MessageHandler
    if (options && options.tip) {
        MessageHandler = ElMessage({
            message: h(Message as any, { progress }),
            duration: 0
        })
    }

    xhr.open('GET', url)
    xhr.addEventListener('progress', (ev) => Progress(ev, MessageHandler))
    xhr.responseType = 'blob'
    xhr.onload = function () {
        options && options.tip && ElMessage.success(`File size ${formatBytes(xhr.response.size)}`)
        FileSaver(xhr.response, options)
    }
    xhr.onerror = function() {
        options && !options.tip && ElMessage.error(`could not download file`)
    }
    xhr.send()
}

const click = (node: HTMLAnchorElement) => { 
    node.target = '_blank'
    node.click()
    setTimeout(() => {
        node.remove()
    }, 0)
}

/**
 * @description Blob流处理
 * @param url 
 * @param options 
 */
const deelBlob = (url: Blob, options: Options) => {
    const a = document.createElement('a')
    a.rel = 'noopener'
    a.href = URL.createObjectURL(url)
    a.download = options.name!
    click(a)
}

/**
 * @description url处理方式
 * @param url 
 * @param options 
 */
const deelUrl = (url: string, options: Options) => {
    const a = document.createElement('a')
    a.rel = 'noopener'
    const file = url.split('/')
    options.name = file[file.length - 1]
    a.href = url
    a.download = options.name

    // 由于重定向 和本网站不同源可能被拦截
    if (a.origin !== location.origin) {
        corsEnabled(a.href) ? download(url, options) : click(a)
    }
}

/**
 * @description 文件保存功能
 * @param url 
 * @param options 
 */
export const FileSaver = (
    url?: string | Blob,
    options: Options = {
        name: 'download',
        tip: true
    }
) => {
    if (url) {
        if (typeof url === 'string') {
            let isBlocked = false
            try {
                let popup = window.open(url, '_blank')
                if (popup === null || typeof popup == 'undefined') {
                    isBlocked = true
                }
            } catch (error) {
                isBlocked = true
            }
            if (isBlocked) {
                deelUrl(url, options)
            }
        } else {
            deelBlob(url, options)
        }
    } else {
        new Error('没有资源')
    }
}
