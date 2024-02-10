<script lang="ts" setup>
import { type UploadTask, ref as storageRef } from "firebase/storage";
import type { ProgressState } from "./Progress.vue";

interface Upload {
	task: UploadTask;
	title: string;
	progress: number;
	progressState: ProgressState;
}

const isDragOver = ref(false);
const storage = useFirebaseStorage();
const uploads = ref<Upload[]>([]);
const user = useCurrentUser()!;
const { addSong } = useSongsManagerStore();

function startDrag() {
	if (!isDragOver.value) {
		console.log("dragStart");
		isDragOver.value = true;
	}
}

function endDrag() {
	if (isDragOver.value) {
		console.log("dragEnd");
		isDragOver.value = false;
	}
}

function onFileDrop(event: DragEvent) {
	endDrag();

	if (event.dataTransfer) {
		const files = [...event.dataTransfer.files];
		upload(files);
	}
}

function onFileInput(event: Event) {
	const target = event.target as HTMLInputElement;
	const files = Array.from(target.files ?? []);

	if (files.length !== 0)
		upload(files);
}

function upload(files: File[]) {
	files.forEach((file) => {
		if (file.type !== "audio/mpeg")
			return;

		const songRef = storageRef(storage, `songs/${file.name}`);
		const { upload, uploadProgress, uploadTask, url } = useStorageFile(songRef);

		upload(file);

		if (uploadTask.value == null || user.value == null)
			return;

		const uploadState = ref<Upload>({
			task: uploadTask.value,
			title: file.name,
			progress: uploadProgress.value ?? 0,
			progressState: "PROGRESS",
		});

		uploads.value.push(uploadState.value);

		uploadTask.value.on(
			"state_changed",
			() => {
				if (uploadProgress.value != null)
					uploadState.value.progress = uploadProgress.value * 100;
			},
			(error) => {
				console.log(error);
				uploadState.value.progressState = "ERROR";
			},
			async () => {
				if (!uploadTask.value || !user.value)
					return;

				const song: Song = {
					uid: user.value.uid,
					displayName: user.value.displayName ?? "",
					originalName: uploadTask.value.snapshot.ref.name,
					modifiedName: uploadTask.value.snapshot.ref.name,
					genre: "",
					commentCount: 0,
					url: url.value ?? "",
				};

				const res = await addSong(song);
				console.log(res);

				uploadState.value.progressState = "SUCCESS";
			},
		);
	});
}

onBeforeUnmount(() => {
	uploads.value.forEach((upload) => {
		upload.task.cancel();
	});
});
</script>

<template>
	<div class="p-6">
		<label>
			<input type="file" name="file" class="hidden" @input="onFileInput">
			<div
				class="w-full px-10 py-20 rounded text-center cursor-pointer border border-dashed border-gray-400 text-gray-400 transition duration-500 hover:text-white hover:bg-green-400 hover:border-green-400 hover:border-solid"
				:class="{
					'text-white bg-green-400 border-green-400 border-solid': isDragOver,
				}"
				@drag.prevent.stop=""
				@dragstart.prevent.stop=""
				@dragend.prevent.stop="endDrag"
				@dragover.prevent.stop="startDrag"
				@dragenter.prevent.stop="startDrag"
				@dragleave.prevent.stop="endDrag"
				@drop.prevent.stop="onFileDrop"
			>
				<h5>Click to upload <br> Or drop your files here</h5>
			</div>
		</label>

		<hr class="my-6">
		<div v-if="uploads.length === 0">
			No current uploads
		</div>
		<!-- Progess Bars -->
		<ManageUploadProgress
			v-for="upld in uploads"
			:key="upld.title"
			:progress="upld.progress"
			:title="upld.title"
			:condition="upld.progressState"
			class="mb-4"
		/>
	</div>
</template>
