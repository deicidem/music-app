<script lang="ts" setup>
const { isOpen } = storeToRefs(useModalStore())
function closeModal() {
  isOpen.value = false
}

const target = ref<HTMLElement | null>(null)

onClickOutside(target, () => {
  closeModal()
})

const activeTab = ref<'login' | 'registration'>('login')

function activateTab(tab: 'login' | 'registration') {
  activeTab.value = tab
}

const activeTabClass = computed(() => {
  return {
    login: {
      'hover:text-white text-white bg-blue-600': activeTab.value === 'login',
      'hover:text-blue-600': activeTab.value === 'registration',
    },
    registration: {
      'hover:text-white text-white bg-blue-600':
        activeTab.value === 'registration',
      'hover:text-blue-600': activeTab.value === 'login',
    },
  }
})
</script>

<template>
  <div
    id="modal"
    class="fixed z-10 inset-0 overflow-y-auto"
    :class="{ hidden: !isOpen }"
  >
    <div
      class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0"
    >
      <div class="fixed inset-0 transition-opacity">
        <div class="absolute inset-0 bg-gray-800 opacity-75" />
      </div>

      <!-- This element is to trick the browser into centering the modal contents. -->
      <span class="hidden sm:inline-block sm:align-middle sm:h-screen">&#8203;</span>

      <div
        ref="target"
        class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
      >
        <!-- Add margin if you want to see some of the overlay behind the modal -->
        <div class="py-4 text-left px-6">
          <!-- Title -->
          <div class="flex justify-between items-center pb-4">
            <p class="text-2xl font-bold">
              Your Account
            </p>
            <!-- Modal Close Button -->
            <div class="modal-close cursor-pointer z-50" @click="closeModal">
              <i class="fas fa-times" />
            </div>
          </div>

          <!-- Tabs -->
          <ul class="flex flex-wrap mb-4">
            <li class="flex-auto text-center">
              <a
                class="block rounded py-3 px-4 transition"
                :class="activeTabClass.login"
                href="#"
                @click.prevent="activateTab('login')"
              >Login</a>
            </li>
            <li class="flex-auto text-center">
              <a
                class="block rounded py-3 px-4 transition"
                href="#"
                :class="activeTabClass.registration"
                @click.prevent="activateTab('registration')"
              >Register</a>
            </li>
          </ul>

          <AuthLoginForm v-if="activeTab === 'login'" />
          <AuthRegistrationForm v-else />
        </div>
      </div>
    </div>
  </div>
</template>
