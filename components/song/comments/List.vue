<script lang="ts" setup>
defineProps<{ song: SongWithId }>()
const { fetchComments } = useCommentsStore()
const { comments } = storeToRefs(useCommentsStore())

await useAsyncData('comments', () => fetchComments())
type SortBy = 'oldest' | 'latest'
const initialSortBy = useRoute().query.sortBy
const sortBy = ref<SortBy>(initialSortBy === 'oldest' || initialSortBy === 'latest' ? initialSortBy : 'latest')
const sortedComments = computed(() => {
  return comments.value.slice().sort((a, b) => {
    if (sortBy.value === 'oldest')
      return new Date(a.datePosted).getTime() - new Date(b.datePosted).getTime()
    else
      return new Date(b.datePosted).getTime() - new Date(a.datePosted).getTime()
  })
})

watch(sortBy, () => {
  const query = useRoute().query
  navigateTo({ query: { ...query, sortBy: sortBy.value } })
})
</script>

<template>
  <div class="container mx-auto">
    <select
      v-model="sortBy"
      class="block mt-4 py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
    >
      <option value="latest">
        Latest
      </option>
      <option value="oldest">
        Oldest
      </option>
    </select>
    <ul>
      <SongCommentsListItem v-for="comment in sortedComments" :key="comment.id" :comment="comment" />
    </ul>
  </div>
</template>
