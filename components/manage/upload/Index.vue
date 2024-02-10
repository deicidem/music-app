<script lang="ts" setup>
function onProgress(payload: any) {
	console.log(payload);
}
</script>

<template>
	<div class="bg-white rounded border border-gray-200 relative flex flex-col">
		<div class="px-6 pt-6 pb-5 font-bold border-b border-gray-200">
			<span class="card-title">Upload</span>
			<i class="fas fa-upload float-right text-green-400 text-2xl" />
		</div>
		<ManageUploadDropbox :progress="onProgress" />
	</div>
</template>
