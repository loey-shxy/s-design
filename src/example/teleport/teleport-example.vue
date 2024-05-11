<template>
    <el-tabs v-model="activeName">
        <el-tab-pane label="Tab1" name="first">
            <div id="tabPanefirst"></div>
            <div>Content of Tab Pane 1</div>
        </el-tab-pane>
        <el-tab-pane label="Tab2" name="second">
            <div id="tabPanesecond"></div>
            <div>Content of Tab Pane 2</div>
        </el-tab-pane>
        <el-tab-pane label="Tab3" name="third">
            <div id="tabPanethird"></div>
            <div>Content of Tab Pane 3</div>
        </el-tab-pane>
    </el-tabs>

    <Teleport :to="teleportTo" v-if="showChart">
        <Chart :data="data" />
    </Teleport>
</template>
    
<script setup lang='ts'>
import { onMouted, shallowRef, computed } from 'vue'
import Chart from './chart-data.vue'

const activeName = shallowRef('first')
const showChart = shallowRef(false)

// 计算 teleport 需要渲染到哪个节点
const teleportTo = computed(() => `#tabPane${activeName.value}`)

const data = shallowRef<{ title: string }[]>([])

const fetchData = async () => {
    const res = await Promise.resolve(
        new Array(6).fill(0).map((_, index) => ({
            title: `这是Chart 组件内内容${index}`
        }))
    )

    data.value = res
    // 请求到数据再把 Teleport 开启
    showChart.value = true
}

onMouted(() => {
    fetchData()
})
</script>
