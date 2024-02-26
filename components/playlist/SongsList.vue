<script lang="ts" setup>
const { songs } = storeToRefs(usePlaylistStore())
const { fetchSongs, fetchNextSongs } = usePlaylistStore()
const fetchingNextSongs = ref(false)
async function getSongs() {
  if (fetchingNextSongs.value)
    return

  fetchingNextSongs.value = true
  if (songs.value.length)
    await fetchNextSongs()
  else
    await fetchSongs()

  fetchingNextSongs.value = false
}
if (songs.value.length === 0)
  await useAsyncData('songs', () => getSongs())

useInfiniteScrollAsync(getSongs)
</script>

<template>
  <ol id="playlist">
    <PlaylistSongsListItem v-for="song in songs" :key="song.id" :song="song" />
  </ol>
</template>
