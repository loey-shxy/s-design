import { DirectiveBinding } from 'vue'

const permissionList: string[] = []

const checkPermission = (el: HTMLElement, binding: DirectiveBinding) => {
    const { value } = binding
    if (Array.isArray(value)) {
        if (value.length > 0) {
            const permissionValueList = value
            const hasPermission = permissionValueList.some((currentValue) => {
                return !currentValue || permissionList?.includes(currentValue)
            })

            if (!hasPermission && el.parentNode) {
                el.parentNode.removeChild(el)
            }
        }
    } else {
        throw new Error(`need roles! Like v-permission="['admin', 'user']"`)
    }
} 

export default {
    mounted(el: HTMLElement, binding: DirectiveBinding) {
        checkPermission(el, binding)
    },

    onUpdated(el: HTMLElement, binding: DirectiveBinding) {
        checkPermission(el, binding)
    }
}