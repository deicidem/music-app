import { addDoc, collection } from "firebase/firestore";
import { defineStore } from "pinia";

export interface SongCreateData {
	uid: string;
	displayName: string;
	originalName: string;
	modifiedName: string;
	genre: string;
	commentCount: number;
	url: string;
}

export const useSongsStore = defineStore("Songs", () => {
	const addSong = async (song: SongCreateData) => {
		const store = useFirestore();
		const songsCollection = collection(store, "songs");

		return await addDoc(songsCollection, song);
	};

	return { addSong };
});
