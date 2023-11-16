<template>
	<el-menu :default-active="activeMenu" class="s-menu">
		<s-menu-item v-for="(item, index) in props.menus" :key="index" :menu="item"></s-menu-item>
	</el-menu>
</template>

<script setup lang="ts" name="SMenu">
import SMenuItem from './s-menu-item.vue'
import { MenuInterface } from '@/interface/system'
import { RouteLocationNormalizedLoaded } from 'vue-router'

const props = withDefaults(defineProps<{ menus: MenuIterface[] }>(), {
	menus: () => [],
})

const route = inject('route') as RouteLocationNormalizedLoaded
const activeMenu = ref('')
watch(
	() => route.path,
	(newVal: string) => {
		activeMenu.value = newVal
	},
	{
		immediate: true,
	}
)
</script>
