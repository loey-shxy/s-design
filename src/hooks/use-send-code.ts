import { ref, Ref } from 'vue'

export default (downNum: number): ({ sendBtnText: Ref<string>, sendCode: () => void }) => {
    const sendBtnText = ref('发送验证码')
    const countDownNum = ref(downNum)

    const sendCode = () => {
        sendBtnText.value = countDownNum.value + 'S'
        const timer = setInterval(() => {
            countDownNum.value--
            sendBtnText.value = countDownNum.value + 'S'
            if (countDownNum.value === 0) {
                clearInterval(timer)
                sendBtnText.value = '发送验证码'
                countDownNum.value = downNum
            }
        }, 1000)
    }

    return { sendBtnText, sendCode }
}