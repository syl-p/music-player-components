import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const usePlaylistStore = defineStore('playlist', () => {
  const playing = ref(false)
  const current = ref(0)
  const currentTime = ref(0)
  const durationTime = ref(0)

  const songs = ref([
    {
      id: 0,
      file: '/songs/bangla-background-music-no-copyright-background-music-218993.mp3',
      title: 'Bangla background music no copyright',
      author: 'Background music'
    },
    {
      id: 1,
      file: '/songs/village-background-music-village-music-no-copyright-203060.mp3',
      title: 'Village background music',
      author: 'Village Music No Copyright'
    }
  ])

  const setSong = (id: number) => {
    if (songs.value[id]) {
      setPlaying(true)
      current.value = id
      currentTime.value = 0
      durationTime.value = 0
    }
  }

  const setPlaying = (bool: boolean) => {
    playing.value = bool
  }

  const next = () => {
    setSong(current.value + 1)
  }

  const previous = () => {
    setSong(current.value - 1)
  }

  const currentSong = computed(() => {
    return songs.value[current.value]
  })

  const setCurrentTime = (time: number) => {
    currentTime.value = time
  }

  const setDurationTime = (time: number) => {
    durationTime.value = time
  }

  return {
    playing,
    current,
    songs,
    currentSong,
    currentTime,
    durationTime,
    setSong,
    setPlaying,
    setCurrentTime,
    setDurationTime,
    next,
    previous
  }
})
