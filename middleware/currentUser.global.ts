export default defineNuxtRouteMiddleware(async () => {
  const { userLoggedIn } = storeToRefs(useUserStore())

  if (!userLoggedIn.value) {
    try {
      const user = await getCurrentUser()

      if (user)
        userLoggedIn.value = true
    }
    catch (error) {
      return navigateTo({ name: 'home' })
    }
  }
})
