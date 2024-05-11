<template>
    <div class="flex justify-center">{{ number }}</div>
</template>
    
<script setup lang='ts'>
import { ref } from 'vue'
import { useNumberAnimation } from '../../hooks/use-number-animation'

const number = ref('0')

useNumberAnimation({
    from: 0,
    to: 782545.254,
    duration: 3000,
    onProgress: v => {
        console.log(`此时的值是：${v}`)
        number.value = v.toFixed(2)
    }
})
</script>
    
<style>
    
</style>