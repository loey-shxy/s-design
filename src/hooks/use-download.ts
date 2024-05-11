import { ElNotification } from 'element-plus'

/**
 * @description 接收数据流生产blob，创建链接，下载文件
 * @param { any } data 导出的文件blob数据
 * @param { String } tempName 导出的文件名
 * @param { Boolean } isNotify 是否有导出消息提示
 * @param { String } fileType 导出的文件格式
 */
interface useDownloadParam {
    data: any
    tempName: string
    isNotify?: boolean
    fileType?: string
}

export const useDownload = async ({ data, tempName, isNotify = true, fileType = '.xlsx' }: useDownloadParam) => {
    if (isNotify) {
        ElNotification({
            title: '温馨提示',
            message: '如果数据庞大会导致下载缓慢哦，请您耐心等待！',
            type: 'info',
            duration: 3000
        })
    }

    try {
        const blob = new Blob([data])
        // 兼容 edge 不支持 createObjectURL 方法
        if ("msSaveOrOpenBlob" in navigator) return window.navigator.msSaveOrOpenBlob(blob, tempName + fileType)
        const blobUrl = window.URL.createObjectURL(blob)
        const exportFile = document.createElement('a')
        exportFile.style.display = 'none'
        exportFile.download = `${tempName}${fileType}`
        exportFile.href = blobUrl
        document.body.appendChild(exportFile)
        exportFile.click()
        // 去除下载对 url 的影响
        document.body.removeChild(exportFile)
        window.URL.revokeObjectURL(blobUrl)
    } catch (e) {
        console.log(e)
    }
}