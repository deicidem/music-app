import { defineStore } from "pinia";

export const useCommentsStore = defineStore("Comments", () => {
	const comments = ref<UCommentWithId[]>([]);
	async function fetchComments() {
		const songId = useRoute().params.id as string;
		const { get } = useCommentsRepository();
		comments.value = await get({ songId });
	}

	async function addComment(comment: UComment) {
		const { add } = useCommentsRepository();
		const res = await add(comment);
		await fetchComments();
		return res;
	}

	return { fetchComments, addComment, comments };
});
