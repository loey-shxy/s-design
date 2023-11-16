<template>
	<el-sub-menu v-if="menu.children && menu.isMenu" :index="menu.url" @click.self="openMenu(menu)">
		<template #title>
			<div class="s-menu-name">
				<i :class="menu.icon" />
				<span>{{ $t(menu.menuName) }}</span>
			</div>
		</template>
		<s-menu-item v-for="(item, index) in menu.children" :key="index" :menu="item"></s-menu-item>
	</el-sub-menu>
	<el-menu-item v-else :index="menu.url" @click="openMenu(menu)">
		<template #title>
			<div class="s-menu-name">
				<i :class="menu.icon" />
				<span>{{ $t(menu.menuName) }}</span>
			</div>
		</template>
	</el-menu-item>
</template>

<script setup lang="ts" name="SMenuItem">
import { MenuInterface } from '@/interface/system'
import { Router } from 'vue-router'
defineProps<{ menu: MenuInterface }>()

const router = inject('router') as Router

const openMenu = (menu: MenuInterface) => {
	if (menu.route) {
		router.push({
			path: menu.url,
		})
	}
}
</script>

<style></style>
