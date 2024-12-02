<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { usePlaylistStore } from '@/stores/playlist'
const store = usePlaylistStore()
const { setSong, setPlaying } = store
const { songs, current, currentTime, durationTime, playing } = storeToRefs(store)

const select = (id: number) => {
  if (current.value == id) {
    setPlaying(!playing.value)
  } else {
    setSong(id)
  }
}
</script>
<template>
  <ul id="tracklist-1" class="sp-list sp-tracklist">
    <li class="sp-track-item" v-for="s in songs" :key="s.id">
      <div class="track-row track-row-data">
        <a
          href="#"
          class="sp-play-track"
          :class="{ 'sp-play': current == s.id }"
          @click.prevent="select(s.id)"
        >
          <span class="track-status">
            <span class="nr"></span>
            <template v-if="current == s.id">
              <svg
                v-if="playing"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                class="size-6"
              >
                <path
                  fill-rule="evenodd"
                  d="M6.75 5.25a.75.75 0 0 1 .75-.75H9a.75.75 0 0 1 .75.75v13.5a.75.75 0 0 1-.75.75H7.5a.75.75 0 0 1-.75-.75V5.25Zm7.5 0A.75.75 0 0 1 15 4.5h1.5a.75.75 0 0 1 .75.75v13.5a.75.75 0 0 1-.75.75H15a.75.75 0 0 1-.75-.75V5.25Z"
                  clip-rule="evenodd"
                />
              </svg>
              <svg
                v-else
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                class="size-6"
              >
                <path
                  fill-rule="evenodd"
                  d="M4.5 5.653c0-1.427 1.529-2.33 2.779-1.643l11.54 6.347c1.295.712 1.295 2.573 0 3.286L7.28 19.99c-1.25.687-2.779-.217-2.779-1.643V5.653Z"
                  clip-rule="evenodd"
                />
              </svg>
            </template>
            <svg
              v-else
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              class="size-6"
            >
              <path
                fill-rule="evenodd"
                d="M4.5 5.653c0-1.427 1.529-2.33 2.779-1.643l11.54 6.347c1.295.712 1.295 2.573 0 3.286L7.28 19.99c-1.25.687-2.779-.217-2.779-1.643V5.653Z"
                clip-rule="evenodd"
              />
            </svg>
          </span>
          <span class="track-title">{{ s.title }}</span>
          <span class="track-artists">{{ s.author }}</span>
        </a>
      </div>
      <div
        class="track-row track-row-progress"
        v-if="current === s.id"
        :class="{ 'sp-is-active': current === s.id }"
      >
        <span data-v-5f77b0c4="" class="sp-content-progress"
          ><span data-v-5f77b0c4="" class="sp-content-loading"></span>
          <span
            class="sp-content-position"
            :style="'width:' + (currentTime / durationTime) * 100 + '%;'"
          ></span>
        </span>
      </div>
    </li>
  </ul>
</template>
