import { DirectiveBinding, render, h } from 'vue'
import { ElTooltip } from 'element-plus'
const id = 'element_tooplit____directive'
const isObject = (val: any): boolean => val !== null && typeof val === 'object'
const setMaxRows = (value: any, el: HTMLElement) => {
    if (isObject(value)) {
        const maxRows = value.maxRows
        if (maxRows && maxRows > 1) {
            el.style.display = '-webkit-box'
            el.style.whiteSpace = 'pre-wrap'
            el.style.wordBreak = 'break-all'
            el.style.webkitBoxOrient = 'vertical'
            el.style.webkitLineClamp = maxRows
        }
    }
}
const tooplit = (el: HTMLElement, binding: DirectiveBinding) => {
    const { value } = binding
    const maxWidth = isObject(value) ? value.value : value
    const width = typeof maxWidth === 'string' ? maxWidth : maxWidth + 'px'
    el.style.width = width
    el.style.overflow = 'hidden'
    el.style.textOverflow = 'ellipsis'
    el.style.whiteSpace = 'nowrap'

    const tooltipOptions = {
        appendTo: 'body',
        content: el.innerText,
        showArrow: false,
        teleported: true,
        effect: 'light',
        placement: 'bottom',
        virtualTriggering:  true,
        virtualRef: el,
        popperClass: 'v-tooplit-diretive-text-popper',
        ...(isObject(value) ? value: {})
    }

    /**
     * 判断是否满足省略条件，原则先渲染tooplit再省略文字内容，避免检查省略条件失效
     */
    if (el.scrollWidth > el.clientWidth) {
        render(h(ElTooltip, tooltipOptions), el)
        setMaxRows(value, el)
    } else {
        return
    }
}

export default {
    mounted(el: HTMLElement, binding: DirectiveBinding) {
        tooplit(el, binding)
    },
    updated(el: HTMLElement, binding: DirectiveBinding) {
        tooplit(el, binding)
    },
    unmounted() {
        const el = document.getElementById(id)
        el && el.remove()
    }
}