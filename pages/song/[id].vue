<script lang="ts" setup>
definePageMeta({
	layout: "default",
	name: "song",
});
const { id } = useRoute().params;
const { fetchSongById } = usePlaylistStore();
const { data: song } = await useAsyncData("song", () => fetchSongById(id as string));

if (!song.value)
	navigateTo({ name: "home" });
</script>

<template>
	<div>
		<NuxtLayout>
			<template v-if="song">
				<SongBanner :song="song" />

				<section class="container mx-auto mt-6">
					<div
						class="bg-white rounded border border-gray-200 relative flex flex-col"
					>
						<div class="px-6 pt-6 pb-5 font-bold border-b border-gray-200">
							<span class="card-title">Comments ({{ song.commentCount }})</span>
							<i class="fa fa-comments float-right text-green-400 text-2xl" />
						</div>
						<SongCommentsForm :song="song" />
					</div>
				</section>

				<SongCommentsList :song="song" />
			</template>
		</NuxtLayout>
	</div>
</template>
