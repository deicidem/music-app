export default defineNuxtRouteMiddleware((to) => {
  const { userLoggedIn } = storeToRefs(useUserStore());

  if (!userLoggedIn.value && to.meta.requiresAuth) {
    return navigateTo({ name: "home" });
  }
});
