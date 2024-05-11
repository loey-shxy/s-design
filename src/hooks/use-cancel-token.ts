import axios, { CancelTokenStatic, CancelToken, Canceler } from 'axios'

const Cancelers: Canceler[] = []

export const useCancelToken = () => {
    /**
     * 取消类实现注入  需要在接口处声明使用
     * @param callback 
     */
    const add = (callback: (cancelToken: CancelToken) => void) => {
        const cancelToken = axios.CancelToken

        // 先取消之前的，再添加进数组
        if (Cancelers.length) {
            Cancelers.forEach((item) => {
                item && item()
            })
        }
        // 为函数注入取消类
        const Cancel = new cancelToken((cancel) => {
            Cancelers.push(cancel)
        })

        callback(Cancel)
    }
    return {
        add
    }
}