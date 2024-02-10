import { type FirestoreDataConverter, collection, getDocs } from "firebase/firestore";
import { defineStore } from "pinia";

export const useSongsStore = defineStore("Songs", () => {
	const songs = ref<SongWithId[]>([]);

	const songConverter: FirestoreDataConverter<SongWithId> = {
		toFirestore: data => data,
		fromFirestore: (snapshot) => {
			const data = snapshot.data() as SongWithId;
			return {
				uid: data.uid,
				displayName: data.displayName,
				originalName: data.originalName,
				modifiedName: data.modifiedName,
				genre: data.genre,
				commentCount: data.commentCount,
				url: data.url,
				id: snapshot.id,
			};
		},
	};

	async function fetchSongs() {
		const store = useFirestore();
		const songsCollection = collection(store, "songs").withConverter<SongWithId>(songConverter);
		const querySnapshot = await getDocs(songsCollection);

		songs.value = querySnapshot.docs.map(doc => doc.data());
	}

	return { songs, fetchSongs };
});
