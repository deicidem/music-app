<script lang="ts" setup>
import type { GenericObject } from "vee-validate";

const schema = reactive({
  email: "required|email|min:3|max:100",
  password: "required|min:9|max:100|excluded:password",
});

enum AlertVariants {
  BLUE = "bg-blue-500",
  GREEN = "bg-green-500",
  RED = "bg-red-500",
}

enum AlertMessages {
  WAIT = "Please wait! You are logging in.",
  SUCCESS = "Success! You are now logged in.",
  ERROR = "Invalid email or password. Please try again.",
}

const loginInProgress = ref(false);
const loginShowAlert = ref(false);
const loginAlertVariant = ref(AlertVariants.BLUE);
const loginAlertMsg = ref(AlertMessages.WAIT);

const login = (values: GenericObject) => {
  loginShowAlert.value = true;
  loginInProgress.value = true;
  loginAlertVariant.value = AlertVariants.BLUE;
  loginAlertMsg.value = AlertMessages.WAIT;

  setTimeout(() => {
    loginAlertVariant.value = AlertVariants.GREEN;
    loginAlertMsg.value = AlertMessages.SUCCESS;
    loginInProgress.value = false;
  }, 2000);

  console.log(values);
};
</script>

<template>
  <div
    v-if="loginShowAlert"
    class="text-white text-center font-bold p-4 rounded mb-4"
    :class="loginAlertVariant"
  >
    {{ loginAlertMsg }}
  </div>
  <VeeForm :validation-schema="schema" @submit="(values) => login(values)">
    <!-- Email -->
    <div class="mb-3">
      <label class="inline-block mb-2">Email</label>
      <VeeField
        name="email"
        type="email"
        class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
        placeholder="Enter Email"
      ></VeeField>
      <VeeErrorMessage class="text-red-600" name="email" />
    </div>
    <!-- Password -->
    <div class="mb-3">
      <label class="inline-block mb-2">Password</label>
      <VeeField
        name="password"
        type="password"
        class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
        placeholder="Password"
      />
      <VeeErrorMessage class="text-red-600" name="password" />
    </div>
    <button
      type="submit"
      :disabled="loginInProgress"
      class="block w-full bg-purple-600 text-white py-1.5 px-3 rounded transition hover:bg-purple-700 disabled:bg-slate-400 disabled:cursor-not-allowed"
    >
      Submit
    </button>
  </VeeForm>
</template>

<style lang="scss" scoped></style>
