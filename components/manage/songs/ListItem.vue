<script lang="ts" setup>
const props = defineProps<{
	song: SongWithId;
}>();

const showForm = ref(false);
function toggleForm() {
	showForm.value = !showForm.value;
}

const { deleteSong } = useSongsManagerStore();
</script>

<template>
	<div class="border border-gray-200 p-3 mb-4 rounded">
		<div>
			<h4 class="inline-block text-2xl font-bold">
				{{ props.song.modifiedName }}
			</h4>
			<button
				class="ml-1 py-1 px-2 text-sm rounded text-white bg-red-600 float-right"
				@click="deleteSong(song)"
			>
				<i class="fa fa-times" />
			</button>
			<button
				class="ml-1 py-1 px-2 text-sm rounded text-white bg-blue-600 float-right"
				@click="toggleForm"
			>
				<i class="fa fa-pencil-alt" />
			</button>
		</div>
		<ManageSongsListItemForm v-if="showForm" :song="props.song" @close="showForm = false" />
	</div>
</template>
