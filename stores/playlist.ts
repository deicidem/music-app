import { doc, getDoc, getDocs, limit, orderBy, query, startAfter } from "firebase/firestore";
import { defineStore } from "pinia";

export const usePlaylistStore = defineStore("Playlist", () => {
	const songs = ref<SongWithId[]>([]);
	const maxPerPage = ref(1);

	async function fetchSongs() {
		const songsCollection = useSongsCollection();
		const q = query(songsCollection, orderBy("modifiedName"), limit(maxPerPage.value));
		const querySnapshot = await getDocs(q);
		console.log("fetchSongs");

		songs.value = querySnapshot.docs.map(doc => doc.data());
		return songs.value;
	}

	async function fetchNextSongs() {
		const songsCollection = useSongsCollection();
		const lastDoc = await getDoc(doc(songsCollection, songs.value[songs.value.length - 1].id));
		const q = query(songsCollection, orderBy("modifiedName"), startAfter(lastDoc), limit(maxPerPage.value));
		const querySnapshot = await getDocs(q);

		querySnapshot.forEach(doc => songs.value.push(doc.data()));
		return songs.value;
	}

	async function fetchSongById(id: string) {
		const songsCollection = useSongsCollection();
		const docRef = doc(songsCollection, id);
		return (await getDoc(docRef)).data();
	};

	return { songs, fetchSongs, fetchNextSongs, maxPerPage, fetchSongById };
});
