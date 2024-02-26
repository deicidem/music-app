import { type FirestoreDataConverter, collection } from 'firebase/firestore'

export function useCommentsCollection() {
  const converter: FirestoreDataConverter<UCommentWithId> = {
    toFirestore: data => data,
    fromFirestore: (snapshot) => {
      const data = snapshot.data() as UCommentWithId
      return {
        uid: data.uid,
        content: data.content,
        datePosted: data.datePosted,
        name: data.name,
        sid: data.sid,
        id: snapshot.id,
      }
    },
  }

  const store = useFirestore()
  const commentsCollection = collection(store, 'comments').withConverter<UCommentWithId>(converter)
  return commentsCollection
}
