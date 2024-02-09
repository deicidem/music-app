<script lang="ts" setup>
definePageMeta({
	middleware: ["auth"],
	name: "manage",
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
