import { Ref, ref, computed, watch, ComputedRef } from 'vue'

export function usePagination<T>(list: Ref<T[] | undefined | null> | ComputedRef<T[] | undefined | null>) {
    // 当前页
    const pageNum = ref(1)
    // 分页大小
    const pageSize = ref(10)
    // 总页数
    const total = computed(() => {
        if (!list.value) return 0
        let page = ((list.value.length / pageSize.value) | 0) + 1
        if (list.value.length % pageSize.value === 0) {
            page = page - 1 === 0 ? 1 : page - 1
        }
        return page
    })

    // 是否上翻
    const isPre = computed(() => pageNum.value > 1)
    // 是否下翻
    const isNext = computed(() => pageNum.value < total.value)

    // 分页整理后的数据
    const Grouplist = computed(() => {
        let arr: T[][] = []
        if (list.value) {
            for (let i = 0; i < total.value; i++) {
                const subArr = list.value.slice(i * pageSize.value, (i + 1) * pageSize.value)
                arr.push(subArr)
            }
        }

        return arr
    })

    const data = computed(() => Grouplist.value[pageNum.value - 1])
    // 翻页
    const pre = () => {
        pageNum.value > 1 && pageNum.value--
    }
    const next = () => {
        pageNum.value < total.value && pageNum.value++
    }

    watch(
        () => list.value,
        () => {
            pageNum.value = 1
        },
        {
            immediate: true,
            deep: true
        }
    )

    return {
        pageSize,
        pageNum,
        total,
        isNext,
        isPre,
        data,
        next,
        pre
    }
}