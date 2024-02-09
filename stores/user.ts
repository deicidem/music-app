import {
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	signOut,
	updateProfile,
} from "firebase/auth";
import { collection, doc, setDoc } from "firebase/firestore";
import { defineStore } from "pinia";

export interface User {
	name: string;
	email: string;
	age: number;
	country: string;
}

interface UserRegistrationData {
	name: string;
	email: string;
	passwords: {
		password: string;
		passwordConfirmation: string;
	};
	age: number;
	country: string;
	tos: boolean;
}

interface UserAuthData {
	email: string;
	password: string;
}

interface UserCreateData {
	name: string;
	email: string;
	age: number;
	country: string;
}

export const useUserStore = defineStore("User", () => {
	const auth = useFirebaseAuth()!;

	const userLoggedIn = ref<boolean | null>(null);

	const createUser = async (email: string, password: string) => {
		const userCredential = await createUserWithEmailAndPassword(
			auth,
			email,
			password,
		);
		return userCredential;
	};

	const addUser = async (uid: string, user: UserCreateData) => {
		const store = useFirestore();
		const usersCollection = collection(store, "users");

		return await setDoc(doc(usersCollection, uid), user);
	};

	const register = async (values: UserRegistrationData) => {
		const userCredentials = await createUser(
			values.email,
			values.passwords.password,
		);

		await addUser(userCredentials.user.uid, {
			name: values.name,
			email: values.email,
			age: values.age,
			country: values.country,
		});

		updateProfile(userCredentials.user, {
			displayName: values.name,
		});
	};

	const authenticate = async (values: UserAuthData) => {
		await signInWithEmailAndPassword(auth, values.email, values.password);
	};

	const logOut = async () => {
		await signOut(auth);
		userLoggedIn.value = false;
	};

	return { userLoggedIn, register, authenticate, logOut };
});
