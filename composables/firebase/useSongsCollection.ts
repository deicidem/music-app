import { type FirestoreDataConverter, collection } from 'firebase/firestore'

export function useSongsCollection() {
  const songConverter: FirestoreDataConverter<SongWithId> = {
    toFirestore: data => data,
    fromFirestore: (snapshot) => {
      const data = snapshot.data() as SongWithId
      return {
        uid: data.uid,
        displayName: data.displayName,
        originalName: data.originalName,
        modifiedName: data.modifiedName,
        genre: data.genre,
        commentCount: data.commentCount,
        url: data.url,
        id: snapshot.id,
      }
    },
  }

  const store = useFirestore()
  const songsCollection = collection(store, 'songs').withConverter<SongWithId>(songConverter)
  return songsCollection
}
