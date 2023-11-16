<template>
	<div class="nav-tab">
		<el-icon @click="leftMove"><caret-left /></el-icon>
		<div ref="tabsViewRef" class="container">
			<div ref="tabsRef" class="tab-row" :style="{ left: `${tabsRowLeft}px` }">
				<el-button
					v-for="item in data.navRouterList"
					:key="item.path"
					size="small"
					:type="getBtnType(item.path)"
					@click="tapTab(item)"
				>
					{{ $t(item.componentName) }}
					<el-icon v-show="data.activePath === item.path" @click.stop="handleRefresh">
						<refresh-right />
					</el-icon>
					<el-icon v-show="data.navRouterList.length > 1" @click.stop="handleCloseRoute(item)">
						<close />
					</el-icon>
				</el-button>
			</div>
		</div>
		<el-icon @click="rightMove"><caret-right /></el-icon>
		<div class="right-icon" @click="handleRefresh">
			<el-icon><refresh-right /></el-icon>
		</div>
	</div>
</template>

<script setup lang="ts" name="SNavTab">
import { CaretLeft, CaretRight, RefreshRight, Close } from '@element-plus/icons-vue'
import { NavTab } from '@/interface/system'
import { cloneDeep } from 'lodash'
import { RouteLocationNormalizedLoaded, Router } from 'vue-router'

const props = withDefaults(
	defineProps<{
		removeCacheComponent: (...args: any[]) => any
		containerRef: Element
	}>(),
	{
		removeCacheComponent: () => {},
		containerRef: undefined,
	}
)

const route = inject('route') as RouteLocationNormalizedLoaded
const router = inject('router') as Router

const data = reactive<{ navRouterList: NavTab[]; activePath: string }>({
	navRouterList: [],
	activePath: '',
})

watch(
	() => route.path,
	() => {
		const excludeList = ['/redirect', '/login', '/', '/403', '/404']
		if (excludeList.includes(route.path)) {
			return
		}

		data.activePath = route.path
		const obj: NavTab = {
			name: route.name as string,
			path: route.path,
			componentName: route.meta.title as string,
			query: { ...route.query },
		}
		const index = data.navRouterList.findIndex((item) => item.path === route.path)
		if (index > -1) {
			data.navRouterList[index] = obj
		} else {
			data.navRouterList.push(obj)
		}
	},
	{
		immediate: true,
	}
)

const getBtnType = (path: string) => (path === data.activePath ? 'primary' : 'default')

const tapTab = (routerInfo: NavTab) => {
	router.push({
		path: routerInfo.path,
		query: routerInfo.query,
	})
}

const handleRefresh = () => {
	props.removeCacheComponent(route.name as string)
	router.replace('/redirect')
}

const handleCloseRoute = (routerInfo: NavTab) => {
	props.removeCacheComponent(routerInfo.name as string)
	const tabIndex = data.navRouterList.findIndex(
		(item) => item.componentName === routerInfo.componentName
	)

	const navRouterList = cloneDeep(data.navRouterList)
	navRouterList.splice(tabIndex, 1)
	data.navRouterList = cloneDeep(navRouterList)
	if (data.activePath !== routerInfo.path) {
		return
	}

	if (tabIndex === 0) {
		data.activePath = data.navRouterList[tabIndex].path
		router.push({
			path: data.navRouterList[tabIndex].path,
			query: data.navRouterList[tabIndex].query,
		})
	} else {
		data.activePath = data.navRouterList[tabIndex - 1].path
		router.push({
			path: data.navRouterList[tabIndex - 1].path,
			query: data.navRouterList[tabIndex - 1].query,
		})
	}
	if (!data.navRouterList.length) {
		handleRefresh()
		data.navRouterList.push(routerInfo)
	}
}

const tabsRowLeft = ref(0)
const tabsViewRef = ref<Element>()
const tabsRef = ref<Element>()
/**
 * @description 向左移动
 */
const leftMove = () => {
	const tabsViewWidth = tabsViewRef.value?.getBoundingClientRect().width || 0
	const tabsWidth = tabsRef.value?.getBoundingClientRect().width() || 0
	if (tabsWidth <= tabsViewWidth) {
		tabsRowLeft.value = 0
		return
	}
	tabsRowLeft.value = tabsRowLeft.value + 60 > 0 ? 0 : tabsRowLeft.value + 60
}

/**
 * @description 向右移动
 */
const rightMove = () => {
	const tabsViewWidth = tabsViewRef.value?.getBoundingClientRect().width || 0
	const tabsWidth = tabsRef.value?.getBoundingClientRect().width || 0
	if (tabsWidth <= tabsViewWidth) {
		tabsRowLeft.value = 0
		return
	}
	tabsRowLeft.value =
		tabsRowLeft.value > tabsViewWidth - tabsWidth ? tabsRowLeft.value - 60 : tabsRowLeft.value
}
</script>
