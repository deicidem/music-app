<script lang="ts" setup>
import type { GenericObject } from "vee-validate";

const userData = reactive({
  country: "USA",
});

const schema = reactive({
  name: "required|min:3|max:100|alpha_spaces",
  email: "required|email|min:3|max:100",
  age: "required|min_value:18|max_value:100",
  password: "required|min:9|max:100|excluded:password",
  passwordConfirmation: "password_mismatch:@password",
  country: "required|country_excluded:Antarctica",
  tos: "tos",
});

enum AlertVariants {
  BLUE = "bg-blue-500",
  GREEN = "bg-green-500",
  RED = "bg-red-500",
}

enum AlertMessages {
  WAIT = "Please wait! Your account is being created.",
  SUCCESS = "Success! Your account has been created.",
  ERROR = "An error occurred. Please try again.",
}

const regInProgress = ref(false);
const regShowAlert = ref(false);
const regAlertVariant = ref(AlertVariants.BLUE);
const regAlertMsg = ref(AlertMessages.WAIT);

const register = (values: GenericObject) => {
  regShowAlert.value = true;
  regInProgress.value = true;
  regAlertVariant.value = AlertVariants.BLUE;
  regAlertMsg.value = AlertMessages.WAIT;

  setTimeout(() => {
    regAlertVariant.value = AlertVariants.GREEN;
    regAlertMsg.value = AlertMessages.SUCCESS;
    regInProgress.value = false;
  }, 2000);

  console.log(values);
};
</script>

<template>
  <div
    v-if="regShowAlert"
    class="text-white text-center font-bold p-4 rounded mb-4"
    :class="regAlertVariant"
  >
    {{ regAlertMsg }}
  </div>
  <VeeForm
    :="$attrs"
    :validation-schema="schema"
    :initial-values="userData"
    @submit="(values) => register(values)"
  >
    <!-- Name -->
    <div class="mb-3">
      <label class="inline-block mb-2">Name</label>
      <VeeField
        name="name"
        type="text"
        class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
        placeholder="Enter Name"
      />
      <VeeErrorMessage class="text-red-600" name="name" />
    </div>
    <!-- Email -->
    <div class="mb-3">
      <label class="inline-block mb-2">Email</label>
      <VeeField
        name="email"
        type="email"
        class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
        placeholder="Enter Email"
      />
      <VeeErrorMessage class="text-red-600" name="email" />
    </div>
    <!-- Age -->
    <div class="mb-3">
      <label class="inline-block mb-2">Age</label>
      <VeeField
        name="age"
        type="number"
        class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
      />
      <VeeErrorMessage class="text-red-600" name="age" />
    </div>
    <!-- Password -->
    <div class="mb-3">
      <label class="inline-block mb-2">Password</label>
      <VeeField name="password" :bails="false" #="{ field, errors }">
        <input
          type="password"
          class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
          placeholder="Password"
          :="field"
        />
        <div v-for="error in errors" :key="error" class="text-red-600">
          {{ error }}
        </div>
      </VeeField>
    </div>
    <!-- Confirm Password -->
    <div class="mb-3">
      <label class="inline-block mb-2">Confirm Password</label>
      <VeeField
        name="passwordConfirmation"
        type="password"
        class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
        placeholder="Confirm Password"
      />
      <VeeErrorMessage class="text-red-600" name="passwordConfirmation" />
    </div>
    <!-- Country -->
    <div class="mb-3">
      <label class="inline-block mb-2">Country</label>
      <VeeField
        as="select"
        name="country"
        class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
      >
        <!-- <option v-for="country in countries" :key="country" value="country">
          {{ country }}
        </option> -->
        <option value="USA">USA</option>
        <option value="Mexico">Mexico</option>
        <option value="Germany">Germany</option>
        <option value="Antarctica">Antarctica</option>
      </VeeField>
      <VeeErrorMessage class="text-red-600" name="country" />
    </div>
    <!-- TOS -->
    <div class="mb-3 pl-6">
      <VeeField
        name="tos"
        type="checkbox"
        value="1"
        :checked-value="true"
        class="w-4 h-4 float-left -ml-6 mt-1 rounded"
      />
      <label class="inline-block">Accept terms of service</label>
      <VeeErrorMessage class="text-red-600 block" name="tos" />
    </div>
    <button
      type="submit"
      :disabled="regInProgress"
      class="block w-full bg-purple-600 text-white py-1.5 px-3 rounded transition hover:bg-purple-700 disabled:bg-slate-400 disabled:cursor-not-allowed"
    >
      Submit
    </button>
  </VeeForm>
</template>

<style lang="scss" scoped></style>
