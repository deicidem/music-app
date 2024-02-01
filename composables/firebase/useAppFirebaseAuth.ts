import { createUserWithEmailAndPassword } from "firebase/auth";

export const useAppFirebaseAuth = () => {
  const auth = useFirebaseAuth()!;

  const createUser = async (email: string, password: string) => {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password,
    );
    return userCredential;
  };

  return { createUser };
};
