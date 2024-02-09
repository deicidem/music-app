<script lang="ts" setup>
const { songs } = storeToRefs(useSongsStore());
const { fetchSongs } = useSongsStore();
await useAsyncData("songs", () => fetchSongs());
</script>

<template>
	<div class="p-6">
		<SongsListItem v-for="song in songs" :key="song.id" :song="song" />
	</div>
</template>
