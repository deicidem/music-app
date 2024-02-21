<script lang="ts" setup>
defineProps<{
	song: SongWithId;
}>();
</script>

<template>
	<li
		class="flex justify-between items-center p-3 pl-6 cursor-pointer transition duration-300 hover:bg-gray-50"
	>
		<div>
			<NuxtLink :to="{ name: 'song', params: { id: song.id } }" class="font-bold block text-gray-600">
				{{ song.modifiedName }}
			</NuxtLink>
			<span class="text-gray-500 text-sm">{{ song.displayName }}</span>
		</div>

		<div class="text-gray-600 text-lg">
			<span class="comments">
				<i class="fa fa-comments text-gray-600" />
				{{ song.commentCount }}
			</span>
		</div>
	</li>
</template>
