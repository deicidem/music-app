<script lang="ts" setup>
const { songs } = storeToRefs(useSongsManagerStore());
const { fetchSongs } = useSongsManagerStore();
await useAsyncData("songs", () => fetchSongs());
</script>

<template>
	<div class="p-6">
		<ManageSongsListItem v-for="song in songs" :key="song.id" :song="song" />
	</div>
</template>
