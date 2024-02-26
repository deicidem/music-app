<script lang="ts" setup>
defineProps<{ song: SongWithId }>()
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
      >
        <i class="fas fa-play" />
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
