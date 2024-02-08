<script lang="ts" setup>
export type ProgressState = "SUCCESS" | "ERROR" | "PROGRESS"

const props = defineProps<{
	title: string
	progress: number
	condition: ProgressState
}>()

enum BarVariants {
	SUCCESS = "bg-green-400",
	ERROR = "bg-red-400",
	PROGRESS = "bg-blue-400",
}

enum IconVariants {
	SUCCESS = "fas fa-check",
	ERROR = "fas fa-times",
	PROGRESS = "fas fa-spinner fa-spin",
}

enum TextVariants {
	SUCCESS = "text-green-400",
	ERROR = "text-red-400",
	PROGRESS = "",
}

const currentProgressStyle = computed(() => {
	return `width: ${props.progress >= 0 ? (props.progress <= 100 ? props.progress : 100) : 0}%`
})

const classes = computed(() => {
	return {
		bar: BarVariants[props.condition],
		icon: IconVariants[props.condition],
		text: TextVariants[props.condition],
	}
})
</script>

<template>
	<div>
		<!-- File Name -->
		<div class="font-bold text-sm mb-1" :class="classes.text">
			<i :class="classes.icon" /> {{ props.title }}
		</div>
		<div class="flex h-4 overflow-hidden bg-gray-200 rounded">
			<!-- Inner Progress Bar -->
			<div
				class="transition-all progress-bar bg-blue-400"
				:class="classes.bar"
				:style="currentProgressStyle"
			/>
		</div>
	</div>
</template>
