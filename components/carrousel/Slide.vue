<template>
  <transition name="carrouselSlide"> <slot /> </transition>
</template>

<style>
.slide-enter-active,
.slide-leave-active {
  transition: opacity 5s linear;
}
.slide-enter-from,
.slide-leave-to {
  opacity: 0;
}
.slide-enter-to,
.slide-leave-from {
  opacity: 1;
}
</style>
