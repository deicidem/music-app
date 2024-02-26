<script lang="ts" setup>
const { currentSong } = storeToRefs(usePlayerStore())
</script>

<template>
  <div class="text-center">
    <template v-if="currentSong">
      <span class="song-title font-bold">{{ currentSong.modifiedName }}</span> by
      <span class="song-artist">{{ currentSong.displayName }}</span>
    </template>
    <span v-else>No song playing</span>
  </div>
</template>
