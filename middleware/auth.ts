export default defineNuxtRouteMiddleware((_to, _from) => {
	const { userLoggedIn } = storeToRefs(useUserStore())

	if (!userLoggedIn.value)
		return navigateTo({ name: "home" })
})
