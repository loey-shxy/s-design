import { App } from 'vue'
import { DefineComponent } from 'vue'

const modules = import.meta.glob('./**/*.vue')
const getCommonComponents = {
	async traversal() {
		return await new Promise(async (resolve) => {
			const res = await Promise.all(
				Object.keys(modules).map(async (key) => {
					return await modules[key]()
				})
			)
			resolve(res)
		})
	},
	async install(app: App, res: DefineComponent[]) {
		res.map((item) => {
			app.component(item.default.name, item.default)
		})
	},
}

export default getCommonComponents
