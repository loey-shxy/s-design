<template>
    <div class="chart-container">
        <div v-for="(item, index) in data" :key="index">{{ item.title }}</div>
    </div>
</template>
    
<script setup lang='ts'>
import { onMounted, defineProps } from 'vue'

defineProps<{
    data: { title: string }[]
}>();

onMounted(() => {
    console.log('Chart 初始化')
})
</script>
    
<style lang="scss" scoped>
.chart-container {
    border: 1px solid #000;
}
</style>