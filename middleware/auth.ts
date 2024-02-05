export default defineNuxtRouteMiddleware(async () => {
  const user = await getCurrentUser();
  const { userLoggedIn } = storeToRefs(useUserStore());

  if (user) {
    userLoggedIn.value = true;
  }
});
