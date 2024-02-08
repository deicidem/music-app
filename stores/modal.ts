export const useModalStore = defineStore("Modal", () => {
	const isOpen = ref(false);
	return { isOpen };
});
