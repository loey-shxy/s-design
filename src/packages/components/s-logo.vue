<template>
	<div class="s-logo">
		<div class="logo">
			<img v-if="props.logo" :src="props.logo" />
		</div>
		<div class="system-name">{{ props.systemName }}</div>
	</div>
</template>

<script setup lang="ts" name="SLogo">
import { SystemSettings } from '@/interface/system'
interface Props {
	logo: string
	systemName: string
}
const props = withDefaults(defineProps<Props>(), {
	logo: '',
	systemName: '',
})
</script>

<style></style>
