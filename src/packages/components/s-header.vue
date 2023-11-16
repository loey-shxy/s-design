<template>
	<div class="s-header">
		<div class="s-header__left pl-20">
			<el-icon>
				<Fold v-if="!collapse" @click="collapseChange(true)" />
				<Expand v-else @click="collapseChange(false)" />
			</el-icon>
			<el-breadcrumb class="ml-20" separator="/">
				<el-breadcrumb-item v-for="item in breadcrumb" :key="item">
					{{ $t(item) }}
				</el-breadcrumb-item>
			</el-breadcrumb>
		</div>
		<div class="s-header__right pr-20">
			<s-nav-menu />
			<div class="icon">
				<el-icon><ChatDotRound /></el-icon>
			</div>
			<div class="icon">
				<el-icon @click="openDrawer"><Setting /></el-icon>
			</div>
		</div>
	</div>
	<el-drawer v-model="showDrawer" :size="300" direction="rtl">
		<template #header>
			<h4>{{ $t('Custom Settings') }}</h4>
		</template>
		<template #default>
			<div>
				<el-form :model="systemSettings" label-width="120px" label-suffix=":">
					<h5>{{ $t('Language And Name') }}</h5>
					<el-form-item :label="$t('Language')">
						<el-select v-model="locale" @change="handleChangeLocale">
							<el-option
								v-for="item in LANGUAGES"
								:key="item.v"
								:value="item.v"
								:label="item.l"
							></el-option>
						</el-select>
					</el-form-item>
					<el-form-item :label="$t('System Name')">
						<el-input v-model="systemSettings.systemName" />
					</el-form-item>
					<el-divider />

					<h5>{{ $t('Main Color') }}</h5>
					<div class="main-color-row">
						<div
							v-for="item in mainColorList"
							:key="item"
							class="main-color-item"
							:style="{ backgroundColor: item }"
							@click="handleChangeMainColor(item)"
						>
							<el-icon v-if="systemSettings.mainColor === item"><Select /></el-icon>
						</div>
					</div>
					<el-divider />
				</el-form>
			</div>
		</template>
	</el-drawer>
</template>

<script setup lang="ts" name="SHeader">
import { Fold, Expand, ChatDotRound, Setting, Select } from '@element-plus/icons-vue'
import { RouteLocationNormalizedLoaded } from 'vue-router'
import SNavMenu from './s-nav-menu.vue'
import { SystemSettings } from '@/interface/system'
import colorTool from '@/utils/color'
import { LANGUAGES } from '@/common/constants'

const route = inject('route') as RouteLocationNormalizedLoaded
interface Props {
	collapse: boolean
	systemSettings: SystemSettings
}
const props = withDefaults(defineProps<Props>(), {
	collapse: false,
	systemSettings: undefined,
})

const emits = defineEmits(['update:collapse', 'update:data.systemSettings'])

const systemSettings = computed({
	get() {
		return props.systemSettings
	},
	set(value) {
		emits('update:data.systemSettings', value)
	},
})

const showDrawer = ref(false)

const openDrawer = () => {
	showDrawer.value = true
}

const breadcrumb = computed(() => {
	return route.meta?.title ? route.meta.title.split('>').map((item: string) => item.trim()) : []
})

// 折叠/展开左侧菜单
const collapseChange = (collapse: boolean) => {
	const systemSettings = props.systemSettings
	systemSettings.collapse = collapse
	emits('update:data.systemSettings', systemSettings)
}

const mainColorList = ref(['#669572', '#ea697e', '#F5B318', '#02B865', '#13BDBD', '#409EFF'])
/**
 * @description 修改主色
 */
const handleChangeMainColor = (color: string) => {
	const systemSettings = props.systemSettings
	systemSettings.mainColor = color
	emits('update:data.systemSettings', systemSettings)
	const el = document.documentElement
	el.style.setProperty('--el-color-primary', color)
	for (let i = 1; i <= 9; i++) {
		document.documentElement.style.setProperty(
			`--el-color-primary-light-${i}`,
			colorTool.lighten(color, i / 10)
		)
	}
}

const locale = ref(localStorage.getItem('locale') || 'zh')
const handleChangeLocale = () => {
	localStorage.setItem('locale', locale.value)
	location.reload()
}
</script>
