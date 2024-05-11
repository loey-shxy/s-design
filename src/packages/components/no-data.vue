<template>
    <div class="flex items-center justify-center w-full h-full">
        <el-empty :description="props.description"></el-empty>
    </div>
</template>
    
<script setup lang='ts'>
import { defineProps } from 'vue'
const props = defineProps<{
    description: string
}>({
    description: '暂无数据'
})
</script>
    
<style lang="scss" scoped>

</style>