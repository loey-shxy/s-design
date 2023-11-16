import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
	{
		path: '/',
		name: 'Index',
		redirect: '/table',
	},
	{
		path: '/table',
		name: 'table-example',
		meta: { title: 'Table>Table Example', cache: false },
		component: async () => await import('@/example/table/table-example.vue'),
	},
	{
		path: '/dialog',
		name: 'dialog-example',
		meta: { title: 'Dialog>Dialog Example', cache: false },
		component: async () => await import('@/example/dialog/dialog-example.vue'),
	},
]

const router = createRouter({
	history: createWebHashHistory(),
	routes,
})

router.afterEach((to, from) => {
	if (to.path === '/redirect') {
		if (from && from.path !== '/redirect') {
			router.replace({
				path: from.path,
				query: from.query,
			})
		}
	}
})

export default router
