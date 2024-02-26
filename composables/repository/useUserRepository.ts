import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, updateProfile } from 'firebase/auth'
import { collection, doc, setDoc } from 'firebase/firestore'

interface UserCreateData {
  name: string
  email: string
  age: number
  country: string
}

export function useUserRepository() {
  async function add(uid: string, user: UserCreateData) {
    const store = useFirestore()
    const usersCollection = collection(store, 'users')
    const res = await setDoc(doc(usersCollection, uid), user)

    return res
  }
  async function register(email: string, password: string) {
    const auth = useFirebaseAuth()!

    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password,
    )
    return userCredential
  }
  async function authenticate(email: string, password: string) {
    const auth = useFirebaseAuth()!
    await signInWithEmailAndPassword(auth, email, password)
  }
  async function logOut() {
    const auth = useFirebaseAuth()!
    await signOut(auth)
  }

  return { add, register, authenticate, logOut, updateProfile }
}
