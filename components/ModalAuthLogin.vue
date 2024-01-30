<script lang="ts" setup>
import { z } from "zod";

const form = useForm({
  validationSchema: toTypedSchema(
    z.object({
      email: z.string().email().min(3).max(100),
      // password should not be equal to 'password'
      password: z
        .string()
        .min(9)
        .max(100)
        .refine(
          (str) => str !== "password",
          "Password should not be 'password'",
        ),
    }),
  ),
});
const [email, emailAttrs] = form.defineField("email");
const [password, passwordAttrs] = form.defineField("password");

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

const login = form.handleSubmit((values) => {
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
});
</script>

<template>
  <div
    v-if="loginShowAlert"
    class="text-white text-center font-bold p-4 rounded mb-4"
    :class="loginAlertVariant"
  >
    {{ loginAlertMsg }}
  </div>
  <form @submit="login">
    <!-- Email -->
    <div class="mb-3">
      <label class="inline-block mb-2">Email</label>
      <input
        v-model="email"
        v-bind="emailAttrs"
        name="email"
        type="email"
        class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
        placeholder="Enter Email"
      />
      <div
        v-for="error in form.errorBag.value.email"
        :key="error"
        class="text-red-600"
      >
        {{ error }}
      </div>
    </div>
    <!-- Password -->
    <div class="mb-3">
      <label class="inline-block mb-2">Password</label>
      <input
        v-model="password"
        v-bind="passwordAttrs"
        name="password"
        type="password"
        class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
        placeholder="Password"
      />
      <div
        v-for="error in form.errorBag.value.password"
        :key="error"
        class="text-red-600"
      >
        {{ error }}
      </div>
    </div>
    <button
      type="submit"
      :disabled="loginInProgress"
      class="block w-full bg-purple-600 text-white py-1.5 px-3 rounded transition hover:bg-purple-700 disabled:bg-slate-400 disabled:cursor-not-allowed"
    >
      Submit
    </button>
    {{}}
  </form>
</template>

<style lang="scss" scoped></style>
