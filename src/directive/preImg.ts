import { DirectiveBinding, render, h } from 'vue'
import NoData from '../packages/components/no-data.vue'

const preImg = (el: HTMLElement, binding: DirectiveBinding) => {
    const { value, oldValue } = binding

    el.style.display = 'flex'
    el.style.alignItems = 'center'
    el.style.justifyContent = 'center'
    if (value) {
        const img = document.createElement('img')
        img.src = value
        img.style.height = '100%'
        el.appendChild(img)
    } else {
        render(h(NoData), el)
    }
}

export default {
    mounted(el: HTMLElement, binding: DirectiveBinding) {
        preImg(el, binding)
    },

    updated(el: HTMLElement, binding: DirectiveBinding) {
        preImg(el, binding)
    }
}