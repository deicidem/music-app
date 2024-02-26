<script lang="ts" setup>
const { currentSong } = storeToRefs(usePlayerStore())
</script>

<template>
  <div v-show="currentSong !== null" class="fixed bottom-0 left-0 bg-white px-4 py-2 w-full">
    <PlayerInfo />
    <PlayerControls />
  </div>
</template>
