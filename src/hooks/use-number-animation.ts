/**
 * @description 数字增长动画
 * @param options 
 * from 起始数字
 * to: 最终数字
 * duration: 动画延迟间隔 (ms)
 * onProgress: 更新回调函数
 * 终止增长：从开始增长开始，经过的时间大于duration时，就终止
 */
export const useNumberAnimation = (options: {
    from: number 
    to: number
    duration: number
    onProgress?: (v: number) => void
}) => {
    const { from, to, duration, onProgress } = options

    let value: number = from
    const speed = (to - from) / duration // 增长速度
    const startTime = Date.now() // 起始时间
    const run = () => {
        const t = Date.now() - startTime // 时间间隔
        // 当时间间隔大于延迟时间时终止
        if (t >= duration) {
            value = to
            onProgress?.(value)
            return
        }

        // 当前值 = 起始值 + 时间间隔 * 增长速度
        value = from + t * speed
        onProgress?.(value)
        // 继续执行
        requestAnimationFrame(run)
    }

    run()
}