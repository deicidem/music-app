import { addDoc, deleteDoc, doc, getDoc, getDocs, limit, orderBy, query, startAfter, updateDoc, where } from 'firebase/firestore'
import { deleteObject, ref as storageRef } from 'firebase/storage'

interface Get {
  userId?: string
  limit?: number
  orderBy?: string
  startAfter?: SongWithId
}

export function useSongsRepository() {
  async function get(params?: Get) {
    const songsCollection = useSongsCollection()
    let q = query(songsCollection)

    if (params) {
      if (params.userId)
        q = query(q, where('uid', '==', params.userId))

      if (params.limit)
        q = query(q, limit(params.limit))

      if (params.orderBy)
        q = query(q, orderBy(params.orderBy))
      if (params.startAfter) {
        const docRef = doc(songsCollection, params.startAfter.id)
        const docSnap = await getDoc(docRef)
        q = query(q, startAfter(docSnap))
      }
    }

    const querySnapshot = await getDocs(q)
    return querySnapshot.docs.map(doc => doc.data())
  }

  async function getById(id: string) {
    const songsCollection = useSongsCollection()
    const docRef = doc(songsCollection, id)
    const res = await getDoc(docRef)

    return res.data()
  }

  async function add(song: Song): Promise<SongWithId> {
    const songsCollection = useSongsCollection()
    const res = await addDoc(songsCollection, song)

    return { id: res.id, ...song }
  }

  async function update(id: string, song: Partial<Song>) {
    const songsCollection = useSongsCollection()
    const res = await updateDoc(doc(songsCollection, id), song)

    return res
  }

  async function remove(song: SongWithId) {
    const songsCollection = useSongsCollection()
    const storage = useFirebaseStorage()
    const songRef = storageRef(storage, `songs/${song.originalName}`)

    await deleteObject(songRef)
    await deleteDoc(doc(songsCollection, song.id))
  }

  return { get, add, update, getById, remove }
}
