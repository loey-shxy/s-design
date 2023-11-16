<template>
	<s-layout
		:system-settings="data.systemSettings"
		:cache-components="data.cacheComponents"
		:menus="data.menus"
		:remove-cache-component="data.removeCacheComponent"
		:nav-menu="data.navMenu"
		:handle-click-nav-menu="handleClickNavMenu"
	/>
</template>
<script setup lang="ts" name="App">
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()
console.log(route)
provide('router', router)
provide('route', route)
const data = reactive({
	cacheComponents: [],
	menus: [
		{
			active: false,
			cache: false,
			componentName: 'table',
			icon: 'none',
			isMenu: true,
			menuId: 1,
			menuName: 'Table',
			openMode: 'content',
			parentId: -1,
			route: false,
			url: '/table',
			children: [
				{
					active: false,
					cache: false,
					componentName: 'table-example',
					icon: 'none',
					isMenu: true,
					menuId: 11,
					menuName: 'Table Example',
					openMode: 'content',
					parentId: 1,
					route: true,
					url: '/table',
				},
			],
		},
		{
			active: false,
			cache: false,
			componentName: 'dialog',
			icon: 'none',
			isMenu: true,
			menuId: 2,
			menuName: 'Dialog',
			openMode: 'content',
			parentId: -1,
			route: false,
			url: '/dialog',
			children: [
				{
					active: false,
					cache: false,
					componentName: 'dialog-example',
					icon: 'none',
					isMenu: true,
					menuId: 21,
					menuName: 'Dialog Example',
					openMode: 'content',
					parentId: 1,
					route: true,
					url: '/dialog',
				},
			],
		},
	],
	navMenu: [
		{
			code: 'switch-system',
			name: 'Switch System',
			path: '/switch-system',
		},
		{
			code: 'logout',
			name: 'Logout',
			path: '/login',
		},
	],
	removeCacheComponent: () => {
		console.log('name')
	},
	systemSettings: {
		systemName: 's-ui',
		mainColor: '#3785FF',
	},
})

const handleClickNavMenu = () => {
	console.log('handleClickNavMenu')
}
</script>

<style lang="scss">
html,
body {
	margin: 0;
	padding: 0;
}
</style>
