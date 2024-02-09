<script lang="ts" setup>
definePageMeta({
	middleware: ["auth"],
	name: "manage",
});
const unsavedChanges = ref<Record<string, boolean>>({});

const haveUnsavedChanges = computed(() => {
	return Object.values(unsavedChanges.value).some(e => e);
});

function addUnsavedChange(songId: string) {
	unsavedChanges.value[songId] = true;
}
function removeUnsavedChange(songId: string) {
	delete unsavedChanges.value[songId];
}

provide("addUnsavedChange", addUnsavedChange);
provide("removeUnsavedChange", removeUnsavedChange);

onBeforeRouteLeave((to, from, next) => {
	if (haveUnsavedChanges.value) {
		// eslint-disable-next-line no-alert
		const leave = confirm("You have unsaved changes. Are you sure you want to leave?");
		next(leave);
	}
	next();
});
</script>

<template>
	<div>
		<NuxtLayout>
			<section class="container mx-auto mt-6">
				<div class="md:grid md:grid-cols-3 md:gap-4">
					<div class="col-span-1">
						<Upload />
					</div>
					<div class="col-span-2">
						<Songs />
					</div>
				</div>
			</section>
		</NuxtLayout>
	</div>
</template>

<style lang="scss" scoped></style>
