export function useInfiniteScrollAsync<T = void>(action: () => Promise<T>) {
	async function handleScroll() {
		const { scrollTop, offsetHeight } = document.documentElement;
		const { innerHeight } = window;
		const bottomOfWindow = Math.round(scrollTop) + innerHeight === offsetHeight;
		if (bottomOfWindow)
			await action();
	}

	onMounted(() => {
		window.addEventListener("scroll", handleScroll);
	});

	onUnmounted(() => {
		window.removeEventListener("scroll", handleScroll);
	});
}
