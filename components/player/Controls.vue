<script lang="ts" setup>
const { toggleAudio, updateSeek } = usePlayerStore()
const { playing, duration, seek, playerProgress } = storeToRefs(usePlayerStore())
function handleProgressClick(event: MouseEvent) {
  if (!playing.value)
    return

  const target = event.currentTarget as HTMLDivElement
  const { x } = target.getBoundingClientRect()
  const clickX = event.clientX - x
  const offset = clickX / target.clientWidth
  updateSeek(offset)
}
</script>

<template>
  <div class="flex flex-nowrap gap-4 items-center">
    <!-- Play/Pause Button -->
    <button type="button" @click="toggleAudio">
      <i class="fa text-gray-500 text-xl" :class="playing ? 'fa-pause' : 'fa-play'" />
    </button>
    <!-- Current Position -->
    <div class="player-currenttime">
      {{ seek }}
    </div>
    <!-- Scrub Container  -->
    <div class="w-full h-2 rounded bg-gray-200 relative cursor-pointer" @click.prevent="handleProgressClick">
      <!-- Player Ball -->
      <span
        class="absolute -top-2.5 -ml-2.5 text-gray-800 text-lg"
        :style="{ left: `${playerProgress}%` }"
      >
        <i class="fas fa-circle" />
      </span>
      <!-- Player Progress Bar -->
      <span
        class="block h-2 rounded bg-gradient-to-r from-green-500 to-green-400"
        :style="{ width: `${playerProgress}%` }"
      />
    </div>
    <!-- Duration -->
    <div class="player-duration">
      {{ duration }}
    </div>
  </div>
</template>
