import { createI18n } from 'vue-i18n'
import zh from '@/languages/zh'
import en from '@/languages/en'

const locale = localStorage.getItem('locale') || 'zh'
const i18n = createI18n({
	locale,
	messages: {
		zh,
		en,
	},
})

export default i18n
