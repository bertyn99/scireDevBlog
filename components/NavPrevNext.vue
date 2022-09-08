
<script setup>
// import icons
// define prev and next props
defineProps(["prev", "next"]);
</script>
    
<template>
    <ul class="prev-next-cont">
        <li class="link-item prev">
            <NuxtLink v-if="prev" :to="prev._path">

                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                    stroke="currentColor" class="w-6 h-6">
                    <path stroke-linecap="round" stroke-linejoin="round"
                        d="M19.5 12h-15m0 0l6.75 6.75M4.5 12l6.75-6.75" />
                </svg>

                <span> {{ prev.title }} </span>
            </NuxtLink>
        </li>
        <li class="link-item next">
            <NuxtLink v-if="next" :to="next._path">
                <span> {{ next.title }} </span>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                    stroke="currentColor" class="w-6 h-6">
                    <path stroke-linecap="round" stroke-linejoin="round"
                        d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75" />
                </svg>
            </NuxtLink>
        </li>
    </ul>
</template>
    
<style scoped>
.prev-next-cont {
    @apply flex gap-4 justify-between p-4 border border-slate-200 rounded-lg;
}

.link-item a {
    @apply flex gap-2;
}
</style>