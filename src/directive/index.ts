import { App } from 'vue'
import drag from './drag'
import permission from './permission'
import preImg from './preImg'
import tooplit from './tooplit'

export default {
    install(Vue: App) {
        Vue.directive(drag)
        Vue.directive(permission)
        Vue.directive(preImg)
        Vue.directive(tooplit)
    }
}