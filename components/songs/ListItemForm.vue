<script lang="ts" setup>
import { object, string } from "zod";

const props = defineProps<{
	song: SongWithId;
}>();

const emit = defineEmits<{
	close: [];
}>();

enum AlertVariants {
	BLUE = "bg-blue-500",
	GREEN = "bg-green-500",
	RED = "bg-red-500",
}

enum AlertMessages {
	WAIT = "Please wait! Your song is being updated.",
	SUCCESS = "Success! Your song has been updated.",
	ERROR = "An error occurred. Please try again.",
}

const inProgress = ref(false);
const showAlert = ref(false);
const alertVariant = ref(AlertVariants.BLUE);
const alertMsg = ref(AlertMessages.WAIT);

const form = useForm({
	validationSchema: toTypedSchema(object({
		modifiedName: string().min(3).max(100),
		genre: string().min(3).max(100).optional(),
	})),
	initialValues: {
		modifiedName: props.song.modifiedName,
		genre: props.song.genre ?? null,
	},
});

const [modifiedName, modifiedNameAttrs] = form.defineField("modifiedName");
const [genre, genreAttrs] = form.defineField("genre");

const { updateSong } = useSongsStore();

const handleSubmit = form.handleSubmit(async (values) => {
	inProgress.value = true;
	showAlert.value = true;
	alertVariant.value = AlertVariants.BLUE;
	alertMsg.value = AlertMessages.WAIT;

	try {
		const { id, ...songWithoutId } = props.song;
		await updateSong(id, {
			...songWithoutId,
			modifiedName: values.modifiedName,
			genre: values.genre ?? songWithoutId.genre,
		});
	}
	catch (error) {
		inProgress.value = false;
		showAlert.value = false;
		alertVariant.value = AlertVariants.RED;
		alertMsg.value = AlertMessages.ERROR;
		return;
	}

	inProgress.value = false;
	alertVariant.value = AlertVariants.GREEN;
	alertMsg.value = AlertMessages.SUCCESS;

	setHaveUnsavedChanges(false);
});

function goBack() {
	emit("close");
}
const addUnsavedChange = inject<Function>("addUnsavedChange");
const removeUnsavedChange = inject<Function>("removeUnsavedChange");

function setHaveUnsavedChanges(value: boolean) {
	if (addUnsavedChange && removeUnsavedChange) {
		if (value)
			addUnsavedChange(props.song.id);
		else
			removeUnsavedChange(props.song.id);
	}
}

watchEffect(() => {
	if (modifiedName.value === props.song.modifiedName
		&& genre.value === props.song.genre
	) setHaveUnsavedChanges(false);
	else
		setHaveUnsavedChanges(true);
});

onBeforeUnmount(() => {
	setHaveUnsavedChanges(false);
});
</script>

<template>
	<div v-if="showAlert" class="text-white text-center font-bold p-4 mb-4" :class="alertVariant">
		{{ alertMsg }}
	</div>
	<form @submit.prevent="handleSubmit">
		<div class="mb-3">
			<label class="inline-block mb-2">Song Title</label>
			<input
				v-model="modifiedName"
				v-bind="modifiedNameAttrs"
				type="text"
				class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
				placeholder="Enter Song Title"
			>
			<div class="text-red-600">
				{{ form.errors.value.modifiedName }}
			</div>
		</div>
		<div class="mb-3">
			<label class="inline-block mb-2">Genre</label>
			<input
				v-model="genre"
				v-bind="genreAttrs"
				type="text"
				class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
				placeholder="Enter Genre"
			>
			<div class="text-red-600">
				{{ form.errors.value.genre }}
			</div>
		</div>
		<button
			type="submit"
			class="py-1.5 px-3 rounded text-white bg-green-600 mr-2"
			:disabled="inProgress"
		>
			Submit
		</button>
		<button
			type="button"
			class="py-1.5 px-3 rounded text-white bg-gray-600"
			:disabled="inProgress"
			@click.prevent="goBack"
		>
			Go Back
		</button>
	</form>
</template>
