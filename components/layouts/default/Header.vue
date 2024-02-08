<script lang="ts" setup>
const { isOpen } = storeToRefs(useModalStore());
const { userLoggedIn } = storeToRefs(useUserStore());
const { logOut } = useUserStore();
function toggleAuthModal() {
	isOpen.value = !isOpen.value;
}

async function signOut() {
	await logOut();
	useRouter().push({ name: "home" });
}
</script>

<template>
	<header id="header" class="bg-gray-700">
		<nav class="container mx-auto flex justify-start items-center py-5 px-4">
			<!-- App Name -->
			<NuxtLink
				class="text-white font-bold uppercase text-2xl mr-4"
				exact-active-class="no-active"
				:to="{ name: 'home' }"
			>
				Music
			</NuxtLink>

			<div class="flex flex-grow items-center">
				<!-- Primary Navigation -->
				<ul class="flex flex-row mt-1">
					<!-- Navigation Links -->
					<li v-if="!userLoggedIn">
						<a class="px-2 text-white" href="#" @click.prevent="toggleAuthModal">Login / Register</a>
					</li>
					<template v-else>
						<li>
							<a class="px-2 text-white" href="#" @click.prevent="signOut">Logout</a>
						</li>
						<li>
							<NuxtLink class="px-2 text-white" :to="{ name: 'manage' }">
								Manage
							</NuxtLink>
						</li>
					</template>
				</ul>
			</div>
		</nav>
	</header>
</template>

<style lang="scss" scoped></style>
