<script setup>
import { withBase } from 'ufo'
import { useRuntimeConfig, computed } from '#imports'
const props = defineProps({
    src: {
        type: String,
        default: ''
    },
    alt: {
        type: String,
        default: ''
    },
    width: {
        type: [String, Number],
        default: undefined
    },
    height: {
        type: [String, Number],
        default: undefined
    }
})
const refinedSrc = computed(() => {
    if (props.src?.startsWith('/') && !props.src.startsWith('//')) {
        return withBase(props.src, useRuntimeConfig().app.baseURL)
    }
    return props.src
})
</script>

<template>
    <nuxt-img sizes="sm:100vw md:70vw lg:800px" :src="refinedSrc" :alt="alt" :width="width" :height="height"
        loading="lazy" />
</template>