<template>
	<el-config-provider :locale="locale">
		<div class="layout">
			<div class="aside">
				<s-logo :logo="props.logo" :system-name="props.systemSettings.systemName" />
				<s-menu :menus="menus" />
			</div>
			<div id="layout-container" ref="containerRef" class="layout-container">
				<s-header v-model:systemSettings="data.systemSettings" />
				<s-nav-tab :container-ref="containerRef" :remove-cache-component="removeCacheComponent" />
				<router-view v-slot="{ Component, route }">
					<keep-alive :include="cacheComponents">
						<component
							:is="Component"
							v-if="cacheComponents.includes(route.name?.toString() || '')"
							:key="route.name"
						/>
					</keep-alive>
					<component
						:is="Component"
						v-if="!cacheComponents.includes(route.name?.toString() || '') && !route.meta.cache"
						:key="route.name"
					/>
				</router-view>
			</div>
		</div>
	</el-config-provider>
</template>

<script setup lang="ts" name="SLayout">
import SMenu from './s-menu.vue'
import SHeader from './s-header.vue'
import SLogo from './s-logo.vue'
import SNavMenu from './s-nav-menu.vue'
import SNavTab from './s-nav-tab.vue'
import { SystemSettings, MenuInterface, NavMenuItem } from '@/interface/system'
import { cloneDeep } from 'lodash'
import { getImageUrl } from '@/utils/utils'

const locale = ref(localStorage.getItem('locale') || 'zh')

interface Props {
	logo: string
	systemSettings: SystemSettings // 系统基础配置
	cacheComponents: string[] // 缓存的组件
	menus: MenuInterface[] // 系统菜单
	navMenu: NavMenuItem[]
	removeCacheComponent: (...args: any[]) => void // 移除某个缓存的组件
}

const props = withDefaults(defineProps<Props>(), {
	logo: '',
	systemSettings: {
		systemName: '',
		userName: 'admin',
	},
	cacheComponents: () => [],
	menus: () => [],
	navMenu: () => [],
	removeCacheComponent: () => {},
})

provide('navMenu', props.navMenu)
provide('handleClickNavMenu', props.handleClickNavMenu)
provide('userName', props.systemSettings.userName)

const data = reactive({
	systemSettings: cloneDeep(props.systemSettings),
})
const containerRef = ref<any>(null)
</script>
