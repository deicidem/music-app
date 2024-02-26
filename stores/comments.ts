import { defineStore } from 'pinia'

export const useCommentsStore = defineStore('Comments', () => {
  const comments = ref<UCommentWithId[]>([])
  const currentSong = ref<SongWithId | null>(null)

  async function fetchComments() {
    const songId = useRoute().params.id as string
    const { get } = useCommentsRepository()
    comments.value = await get({ songId })
  }

  async function addComment(comment: UComment) {
    const { add } = useCommentsRepository()
    const res = await add(comment)

    const songId = useRoute().params.id as string
    const { update } = useSongsRepository()
    await fetchComments()

    if (currentSong.value) {
      currentSong.value.commentCount += 1
      await update(songId, { commentCount: currentSong.value.commentCount })
    }

    return res
  }

  return { fetchComments, addComment, comments, currentSong }
})
