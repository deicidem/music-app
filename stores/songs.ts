import { type FirestoreDataConverter, addDoc, collection, deleteDoc, doc, getDocs, query, setDoc, where } from "firebase/firestore";
import { deleteObject, ref as storageRef } from "firebase/storage";
import { defineStore } from "pinia";

export interface Song {
	uid: string;
	displayName: string;
	originalName: string;
	modifiedName: string;
	genre: string;
	commentCount: number;
	url: string;
}

export interface SongWithId extends Song {
	id: string;
}

export const useSongsStore = defineStore("Songs", () => {
	// const songs = useCollection<Song>(collection(useFirestore(), "songs").withConverter<Song>({
	// 	toFirestore: data => data,
	// 	fromFirestore: (snapshot) => {
	// 		const data = snapshot.data() as Song;
	// 		return {
	// 			uid: snapshot.id,
	// 			displayName: data.displayName,
	// 			originalName: data.originalName,
	// 			modifiedName: data.modifiedName,
	// 			genre: data.genre,
	// 			commentCount: data.commentCount,
	// 			url: data.url,
	// 		};
	// 	},
	// }));

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
		const user = useCurrentUser();

		const songsCollection = collection(store, "songs").withConverter<SongWithId>(songConverter);

		const q = query(songsCollection, where("uid", "==", user.value?.uid));
		const querySnapshot = await getDocs(q);

		songs.value = querySnapshot.docs.map(doc => doc.data());
	}

	async function addSong(song: Song) {
		const store = useFirestore();
		const songsCollection = collection(store, "songs");

		const res = (await addDoc(songsCollection, song)).withConverter<SongWithId>(songConverter);
		songs.value.push({ id: res.id, ...song });

		return res;
	}

	async function updateSong(id: string, song: Song) {
		const store = useFirestore();
		const songsCollection = collection(store, "songs");

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
		const store = useFirestore();
		const songsCollection = collection(store, "users");
		const storage = useFirebaseStorage();
		const songRef = storageRef(storage, `songs/${song.originalName}`);

		await deleteObject(songRef);
		await deleteDoc(doc(songsCollection, song.id));

		songs.value = songs.value.filter(s => s.id !== song.id);
	}

	return { addSong, songs, fetchSongs, updateSong, deleteSong };
});
