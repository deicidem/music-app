import { addDoc, getDocs, query, where } from "firebase/firestore";

interface Get {
	songId: string;
}

export function useCommentsRepository() {
	async function get(params: Get) {
		const commentsCollection = useCommentsCollection();
		const q = query(
			commentsCollection,
			where("sid", "==", params.songId),
		);

		const querySnapshot = await getDocs(q);
		return querySnapshot.docs.map(doc => doc.data());
	}

	async function add(comment: UComment): Promise<UCommentWithId> {
		const commentsCollection = useCommentsCollection();
		const res = await addDoc(commentsCollection, comment);

		return { id: res.id, ...comment };
	}

	return { get, add };
}
