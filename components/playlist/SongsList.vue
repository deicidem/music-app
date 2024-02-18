<script lang="ts" setup>
const { songs } = storeToRefs(usePlaylistStore());
const { fetchSongs } = usePlaylistStore();
await useAsyncData("songs", () => fetchSongs());
</script>

<template>
	<ol id="playlist">
		<PlaylistSongsListItem v-for="song in songs" :key="song.id" :song="song" />
	</ol>
</template>
