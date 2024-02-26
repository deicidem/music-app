<script lang="ts" setup>
import { z } from 'zod'

const { register: createUser } = useUserStore()
const form = useForm({
  validationSchema: toTypedSchema(
    z.object({
      name: z.string().min(3).max(100).trim(),
      email: z.string().email().min(3).max(100),
      age: z.number().gte(18).lte(100).int(),
      country: z
        .string()
        .refine(
          str => str !== 'Antarctica',
          'Due to restrictions, we do not accept users from this location.',
        ),
      passwords: z
        .object({
          password: z
            .string()
            .min(9)
            .max(100)
            .refine(
              str => str !== 'password',
              'Password should not be \'password\'',
            ),
          passwordConfirmation: z.string().min(9).max(100),
        })
        .refine(
          (data) => {
            return data.password === data.passwordConfirmation
          },
          {
            message: 'Passwords do not match',
            path: ['passwordConfirmation'],
          },
        ),
      tos: z.boolean(),
    }),
  ),
  initialValues: {
    tos: true,
  },
})

const [name, nameAttrs] = form.defineField('name')
const [email, emailAttrs] = form.defineField('email')
const [age, ageAttrs] = form.defineField('age')
const [password, passwordAttrs] = form.defineField('passwords.password')

const [passwordConfirmation, passwordConfirmationAttrs] = form.defineField(
  'passwords.passwordConfirmation',
)
const [country, countryAttrs] = form.defineField('country')
const [tos, tosAttrs] = form.defineField('tos')

enum AlertVariants {
  BLUE = 'bg-blue-500',
  GREEN = 'bg-green-500',
  RED = 'bg-red-500',
}

enum AlertMessages {
  WAIT = 'Please wait! Your account is being created.',
  SUCCESS = 'Success! Your account has been created.',
  ERROR = 'An error occurred. Please try again.',
}

const regInProgress = ref(false)
const regShowAlert = ref(false)
const regAlertVariant = ref(AlertVariants.BLUE)
const regAlertMsg = ref(AlertMessages.WAIT)

const register = form.handleSubmit(async (values) => {
  regShowAlert.value = true
  regInProgress.value = true
  regAlertVariant.value = AlertVariants.BLUE
  regAlertMsg.value = AlertMessages.WAIT

  try {
    await createUser(values)
  }
  catch (error) {
    regInProgress.value = false
    regAlertVariant.value = AlertVariants.RED
    regAlertMsg.value = AlertMessages.ERROR
    return
  }

  regInProgress.value = false
  regAlertVariant.value = AlertVariants.GREEN
  regAlertMsg.value = AlertMessages.SUCCESS
  window.location.reload()
})
</script>

<template>
  <div
    v-if="regShowAlert"
    class="text-white text-center font-bold p-4 rounded mb-4"
    :class="regAlertVariant"
  >
    {{ regAlertMsg }}
  </div>
  <form :="$attrs" @submit="register">
    <!-- Name -->
    <div class="mb-3">
      <label class="inline-block mb-2">Name</label>
      <input
        v-model="name"
        v-bind="nameAttrs"
        name="name"
        type="text"
        class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
        placeholder="Enter Name"
      >
      <div class="text-red-600">
        {{ form.errors.value.name }}
      </div>
    </div>
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
      >
      <div class="text-red-600">
        {{ form.errors.value.email }}
      </div>
    </div>
    <!-- Age -->
    <div class="mb-3">
      <label class="inline-block mb-2">Age</label>
      <input
        v-model="age"
        v-bind="ageAttrs"
        name="age"
        type="number"
        class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
      >
      <div class="text-red-600">
        {{ form.errors.value.age }}
      </div>
    </div>
    <!-- Password -->
    <div class="mb-3">
      <label class="inline-block mb-2">Password</label>
      <input
        v-model="password"
        v-bind="passwordAttrs"
        type="password"
        class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
        placeholder="Password"
      >
      <div
        v-for="error in form.errorBag.value['passwords.password']"
        :key="error"
        class="text-red-600"
      >
        {{ error }}
      </div>
    </div>
    <!-- Confirm Password -->
    <div class="mb-3">
      <label class="inline-block mb-2">Confirm Password</label>
      <input
        v-model="passwordConfirmation"
        v-bind="passwordConfirmationAttrs"
        name="passwordConfirmation"
        type="password"
        class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
        placeholder="Confirm Password"
      >
      <div class="text-red-600">
        {{ form.errors.value["passwords.passwordConfirmation"] }}
      </div>
    </div>
    <!-- Country -->
    <div class="mb-3">
      <label class="inline-block mb-2">Country</label>
      <select
        v-model="country"
        v-bind="countryAttrs"
        name="country"
        class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
      >
        <!-- <option v-for="country in countries" :key="country" value="country">
          {{ country }}
        </option> -->
        <option value="USA">
          USA
        </option>
        <option value="Mexico">
          Mexico
        </option>
        <option value="Germany">
          Germany
        </option>
        <option value="Antarctica">
          Antarctica
        </option>
      </select>
      <div class="text-red-600">
        {{ form.errors.value.country }}
      </div>
    </div>
    <!-- TOS -->
    <div class="mb-3 pl-6">
      <input
        v-model="tos"
        v-bind="tosAttrs"
        name="tos"
        type="checkbox"
        class="w-4 h-4 float-left -ml-6 mt-1 rounded"
      >
      <label class="inline-block">Accept terms of service</label>
      <div class="text-red-600">
        {{ form.errors.value.tos }}
      </div>
    </div>
    <button
      type="submit"
      :disabled="regInProgress"
      class="block w-full bg-purple-600 text-white py-1.5 px-3 rounded transition hover:bg-purple-700 disabled:bg-slate-400 disabled:cursor-not-allowed"
    >
      Submit
    </button>
  </form>
</template>
