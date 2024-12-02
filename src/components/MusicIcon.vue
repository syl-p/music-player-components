<template>
  <a href="#" class="nav-player-btn circle-btn" :class="{ 'on status-playing': currentTime > 0 }">
    <svg class="circle-svg" width="40" height="40" viewBox="0 0 50 50">
      <circle
        class="circle-bg"
        cx="25"
        cy="25"
        r="23"
        stroke="#fff"
        stroke-width="1"
        fill="none"
      ></circle>
      <circle
        class="circle"
        cx="25"
        cy="25"
        r="23"
        stroke="#fff"
        stroke-width="1"
        fill="none"
        :style="'stroke-dasharray:' + (currentTime / durationTime) * 144 + ', 144;'"
      ></circle>
    </svg>
    <span><i class="fa fa-music"></i></span>
  </a>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { usePlaylistStore } from '@/stores/playlist'
const store = usePlaylistStore()
const { current, durationTime, currentTime } = storeToRefs(store)
</script>
