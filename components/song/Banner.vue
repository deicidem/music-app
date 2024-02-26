<script lang="ts" setup>
const props = defineProps<{ song: SongWithId }>()

const { newSong, toggleAudio } = usePlayerStore()
const { currentSong, playing } = storeToRefs(usePlayerStore())
const isCurrentSong = computed(() => {
  return currentSong.value?.id === props.song.id
})

const isCurrentSongPlaying = computed(() => {
  return isCurrentSong.value && playing.value
})

async function handlePlay() {
  if (isCurrentSong.value)
    toggleAudio()
  else
    await newSong(props.song)
}
</script>

<template>
  <section class="w-full mb-8 py-14 text-center text-white relative">
    <div
      class="absolute inset-0 w-full h-full box-border bg-contain music-bg"
    />
    <div class="container mx-auto flex items-center">
      <!-- Play/Pause Button -->
      <button
        type="button"
        class="z-50 h-24 w-24 text-3xl bg-white text-black rounded-full focus:outline-none"
        @click.prevent="handlePlay"
      >
        <i class="fas" :class="isCurrentSongPlaying ? 'fa-pause' : 'fa-play'" />
      </button>
      <div class="z-50 text-left ml-8">
        <!-- Song Info -->
        <div class="text-3xl font-bold">
          {{ song.modifiedName }}
        </div>
        <div>{{ song.genre }}</div>
      </div>
    </div>
  </section>
</template>
