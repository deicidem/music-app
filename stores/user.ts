import { defineStore } from 'pinia'

interface UserRegistrationData {
  name: string
  email: string
  passwords: {
    password: string
    passwordConfirmation: string
  }
  age: number
  country: string
  tos: boolean
}

export const useUserStore = defineStore('User', () => {
  const userLoggedIn = ref<boolean | null>(null)

  const register = async (values: UserRegistrationData) => {
    const repository = useUserRepository()
    const userCredentials = await repository.register(
      values.email,
      values.passwords.password,
    )

    await repository.add(userCredentials.user.uid, {
      name: values.name,
      email: values.email,
      age: values.age,
      country: values.country,
    })

    await repository.updateProfile(userCredentials.user, {
      displayName: values.name,
    })
  }

  const authenticate = async (email: string, password: string) => {
    const repository = useUserRepository()
    await repository.authenticate(email, password)
  }

  const logOut = async () => {
    const repository = useUserRepository()
    await repository.logOut()

    userLoggedIn.value = false
  }

  return { userLoggedIn, register, authenticate, logOut }
})
