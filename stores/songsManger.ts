import { addDoc, deleteDoc, doc, getDocs, query, setDoc, where } from "firebase/firestore";
import { deleteObject, ref as storageRef } from "firebase/storage";
import { defineStore } from "pinia";

export const useSongsManagerStore = defineStore("SongsManager", () => {
	const songs = ref<SongWithId[]>([]);

	async function fetchSongs() {
		const user = useCurrentUser();
		const songsCollection = useSongsCollection();

		const q = query(songsCollection, where("uid", "==", user.value?.uid));
		const querySnapshot = await getDocs(q);

		songs.value = querySnapshot.docs.map(doc => doc.data());
	}

	async function addSong(song: Song) {
		const songsCollection = useSongsCollection();

		const res = await addDoc(songsCollection, song);
		songs.value.push({ id: res.id, ...song });

		return res;
	}

	async function updateSong(id: string, song: Song) {
		const songsCollection = useSongsCollection();

		const res = await setDoc(doc(songsCollection, id), song);

		songs.value = songs.value.map((s) => {
			if (s.id === id)
				return { ...song, id };

			else
				return s;
		});

		return res;
	}

	async function deleteSong(song: SongWithId) {
		const songsCollection = useSongsCollection();
		const storage = useFirebaseStorage();
		const songRef = storageRef(storage, `songs/${song.originalName}`);

		await deleteObject(songRef);
		await deleteDoc(doc(songsCollection, song.id));

		songs.value = songs.value.filter(s => s.id !== song.id);
	}

	return { addSong, songs, fetchSongs, updateSong, deleteSong };
});
