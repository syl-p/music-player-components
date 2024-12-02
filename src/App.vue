<script setup lang="ts">
import TrackList from '@/components/TrackList.vue'
import MusicIcon from '@/components/MusicIcon.vue'
import PlayerBar from './components/PlayerBar.vue'
import '@fortawesome/fontawesome-free/css/all.css'
import '@fortawesome/fontawesome-free/js/all.js'
</script>

<template>
  <header class="header">
    <nav id="icon-nav">
      <ul>
        <li class="player-trigger-wrap">
          <MusicIcon />
        </li>
      </ul>
    </nav>
  </header>
  <article class="content">
    <h1>My Playlist</h1>
    <TrackList />
  </article>
  <footer class="footer">
    <PlayerBar />
  </footer>
</template>

<style scoped></style>
