<template>
  <div class="player">
    <div class="player-controls">
      <div class="player-stop">
        <a v-on:click.prevent="stop" title="Stop">
          <i class="fa fa-stop"></i>
        </a>
      </div>
      <div class="">
        <a v-on:click.prevent="previous">
          <i class="fa fa-step-backward"></i>
        </a>
      </div>
      <div>
        <a @click.prevent="setPlaying(false)" title="Play/Pause" v-if="playing">
          <i class="fa fa-pause" />
        </a>
        <a @click.prevent="setPlaying(true)" title="Play/Pause" v-else>
          <i class="fa fa-play" />
        </a>
      </div>
      <div class="">
        <a v-on:click.prevent="next">
          <i class="fa fa-step-forward"></i>
        </a>
      </div>
      <div class="player-volume">
        <a v-on:click.prevent="" title="Volume">
          <div v-if="volume > 0">
            <i class="fa fa-volume-up" ></i>
          </div>
          <div v-else>
            <i class="fa fa-volume-off"></i>
          </div>
          <input v-model="volume" type="range" min="0" max="1" step="0.1" id="volume" />
        </a>
      </div>
      <div>
        <a>
          <i class="fa fa-th-list"></i>
        </a>
      </div>
      <div class="player-album">
        <div class="player-album-thumb">
          <img src="https://picsum.photos/50" alt="Track cover" class="sp-track-artwork" />
        </div>
        <div class="player-album-description">
          <p>
            <span class="player-album-title">{{ currentSong.title }}</span
            ><br />
            <span class="player-album-author">{{ currentSong.author }}</span>
          </p>
        </div>
      </div>
      <div class="player-progression">
        <div v-on:click="seek" class="player-progress" title="Time played : Total time">
          <div :style="{ width: percentComplete + '%' }" class="player-seeker"></div>
        </div>
        <div class="player-time">
          <div class="player-time-current">{{ currentTimeHHMMSS }}</div>
          <div class="player-time-total">{{ durationTimeHHMMSS }}</div>
        </div>
      </div>
    </div>

    <audio ref="audio" :src="currentSong.file" preload="auto" style="display: none"></audio>
  </div>
</template>
<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { usePlaylistStore } from '@/stores/playlist'
import { convertTimeHHMMSS } from '@/utils/convertTime' // Assume you have this function in a utility file
import { computed, type ModelRef, onMounted, ref, watch, watchEffect } from 'vue'

const store = usePlaylistStore()

const { next, previous, setCurrentTime, setDurationTime, setPlaying } = store
const { playing, currentSong, currentTime, durationTime } = storeToRefs(store)
const volume: ModelRef<number> = defineModel('volume', {
  default: 0,
  type: Number
})


const loader = ref(false)
const audio = ref<HTMLAudioElement | undefined>()

const currentTimeHHMMSS = computed(() => {
  return convertTimeHHMMSS(currentTime.value)
})

const durationTimeHHMMSS = computed(() => {
  return convertTimeHHMMSS(durationTime.value)
})

const percentComplete = computed(() => {
  return (currentTime.value / durationTime.value) * 100
})

function stop() {
  if (audio.value) {
    audio.value.currentTime = 0
    setPlaying(false)
    setCurrentTime(0)
  }
}

function seek(e: any) {
  if (!playing || e.target.tagName === 'SPAN') {
    return
  }

  const el = e.target.getBoundingClientRect()
  const seekPos = (e.clientX - el.left) / el.width
  if (audio.value) audio.value.currentTime = audio.value.duration * seekPos
}

onMounted(() => {
  if (audio.value) {
    volume.value = 1
    audio.value.addEventListener('loadstart', () => {
      console.log('change')
      loader.value = false
    })
    audio.value.addEventListener('timeupdate', () => {
      if (audio.value && audio.value.currentTime) {
        setCurrentTime(audio.value.currentTime)
      }
    })
    audio.value.addEventListener('loadeddata', () => {
      if (audio.value && audio.value.readyState >= 2) {
        loader.value = true
        setDurationTime(audio.value.duration)
      }
    })
  }
})

watchEffect(async () => {
  console.log('watch playing', playing.value)
  if (!audio.value) return

  if (playing.value && loader.value) {
    await audio.value.play()
  } else {
    await audio.value.pause()
  }
})

watch(volume, () => {
  if(!audio.value) return
  audio.value.volume = volume.value ?? 0
})
</script>
