<script lang="ts" setup>
import { object, string } from 'zod'

const { song } = defineProps<{ song: SongWithId }>()
const { addComment } = useCommentsStore()
enum AlertVariants {

  BLUE = 'bg-blue-500',
  GREEN = 'bg-green-500',
  RED = 'bg-red-500',
}

enum AlertMessages {
  WAIT = 'Please wait! Your song is being updated.',
  SUCCESS = 'Success! Your song has been updated.',
  ERROR = 'An error occurred. Please try again.',
}

const inProgress = ref(false)
const showAlert = ref(false)
const alertVariant = ref(AlertVariants.BLUE)
const alertMsg = ref(AlertMessages.WAIT)

const form = useForm({
  validationSchema: toTypedSchema(object({
    comment: string().min(3).max(1000),
  })),
})

const [comment, commentAttrs] = form.defineField('comment')

const handleSubmit = form.handleSubmit(async (values) => {
  inProgress.value = true
  showAlert.value = true
  alertVariant.value = AlertVariants.BLUE
  alertMsg.value = AlertMessages.WAIT

  try {
    const comment: UComment = {
      content: values.comment,
      datePosted: new Date().toString(),
      sid: song.id,
      name: useCurrentUser().value?.displayName || 'Anonymous',
      uid: useCurrentUser().value?.uid || '',
    }

    await addComment(comment)
  }
  catch (error) {
    inProgress.value = false
    showAlert.value = false
    alertVariant.value = AlertVariants.RED
    alertMsg.value = AlertMessages.ERROR
    return
  }

  inProgress.value = false
  alertVariant.value = AlertVariants.GREEN
  alertMsg.value = AlertMessages.SUCCESS
})
</script>

<template>
  <div class="p-6">
    <div v-if="showAlert" class="text-white text-center font-bold p-4 mb-4" :class="alertVariant">
      {{ alertMsg }}
    </div>
    <form @submit.prevent="handleSubmit">
      <textarea
        v-model="comment"
        v-bind="commentAttrs"
        class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
        placeholder="Your comment here..."
      />
      <div class="text-red-600 mb-4">
        {{ form.errors.value.comment }}
      </div>
      <button
        type="submit"
        class="py-1.5 px-3 rounded text-white bg-green-600 block"
      >
        Submit
      </button>
    </form>
    <!-- Sort Comments -->
  </div>
</template>
