import { DirectiveBinding } from 'vue'

const drag = (el: HTMLElement, binding?: DirectiveBinding) => {
    el.onmousedown = (e: MouseEvent) => {
        el.style.cursor = 'move'
        const disX = e.clientX - el.offsetLeft
        const disY = e.clientY - el.offsetTop

        document.onmousemove = (e: MouseEvent) => {
            const left = e.clientX - disX
            const top = e.clientY - disY
            el.style.left = left + 'px'
            el.style.top = top + 'px'
        }

        document.onmouseup = () => {
            el.style.cursor = 'default'
            document.onmousemove = null
            document.onmouseup = null
        }
    }
}

export default {
    mounted (el: HTMLElement, binding?: DirectiveBinding) {
        drag(el, binding)
    }
}