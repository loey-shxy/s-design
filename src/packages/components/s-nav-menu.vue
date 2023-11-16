<template>
	<el-popover :width="180" :padding="0" trigger="hover" popper-style="padding: 0">
		<template #reference>
			<div class="s-nav-menu">
				<el-icon><user /></el-icon>{{ $t('Welcome') }}, {{ userName }}
				<el-icon class="arrow">
					<arrow-down />
				</el-icon>
			</div>
		</template>
		<template #default>
			<div
				v-for="item in navMenu"
				:key="item.code"
				class="nav-menu-item"
				@click="handleClickNavMenu(item)"
			>
				{{ $t(item.name) }}
			</div>
		</template>
	</el-popover>
</template>

<script setup lang="ts" name="SNavMenu">
import { User, ArrowDown } from '@element-plus/icons-vue'
import { NavMenuItem } from '@/interface/system'

const navMenu = inject('navMenu') as NavMenuItem[]
const handleClickNavMenu = inject('handleClickNavMenu') as (...args: any[]) => any
const userName = inject('userName')
</script>
