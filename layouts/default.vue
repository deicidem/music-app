<script lang="ts" setup>
import { AuthModal } from "#build/components";
</script>

<template>
	<LayoutsDefault>
		<LayoutsDefaultHeader />
		<slot />
		<AuthModal />
	</LayoutsDefault>
</template>

<style lang="scss" scoped></style>
