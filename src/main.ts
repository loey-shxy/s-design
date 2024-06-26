import { createApp } from 'vue'
import App from './App.vue'
import getCommonComponents from '@/packages/components/index'
import router from './router'
import '@/packages/theme-chalk/index.scss'
import i18n from './i18n'
import directive from './directive'

const app = createApp(App)
const bootstrap = async () => {
	const commonComponents = await getCommonComponents.traversal()
	app.use(router)
		.use(getCommonComponents, commonComponents)
		.use(i18n)
		.use(directive)
		.mount('#app')
}

void bootstrap()
