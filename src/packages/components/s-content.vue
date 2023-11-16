<template>
	<div class="s-content">
		<div class="s-body">
			<div class="s-search">
				<slot name="search"></slot>
			</div>
			<div class="s-main">
				<slot name="main"></slot>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
export default {
	name: 'SContent',
}
</script>
