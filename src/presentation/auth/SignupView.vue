<template>
  <div class="flex items-center justify-center min-h-screen bg-gray-100">
    <div class="bg-white p-8 rounded-lg shadow-lg w-96">
      <h2 class="text-2xl font-bold text-center mb-6">Sign Up</h2>

      <!-- Error Banner -->
      <div v-if="errorMessage" class="bg-red-500 text-white text-center p-2 rounded mb-4">
        {{ errorMessage }}
      </div>

      <form @submit.prevent="signup">
        <div class="mb-4">
          <label for="name" class="block text-gray-700">Name</label>
          <input
            type="text"
            id="name"
            v-model="name"
            class="w-full p-2 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:border-blue-500"
            required
          />
        </div>
        <div class="mb-4">
          <label for="email" class="block text-gray-700">Email</label>
          <input
            type="email"
            id="email"
            v-model="email"
            class="w-full p-2 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:border-blue-500"
            required
          />
        </div>
        <div class="mb-4">
          <label for="password" class="block text-gray-700">Password</label>
          <input
            type="password"
            id="password"
            v-model="password"
            class="w-full p-2 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:border-blue-500"
            required
          />
        </div>

        <!-- Account Type Radio Buttons -->
        <div class="mb-4">
          <label class="block text-gray-700">Account Type</label>
          <div class="flex items-center mt-2">
            <label class="flex items-center">
              <input
                type="radio"
                v-model="accountType"
                value="employee"
                class="form-radio text-blue-600"
              />
              <span class="ml-2 text-gray-700">Employee</span>
            </label>
            <label class="flex items-center ml-4">
              <input
                type="radio"
                v-model="accountType"
                value="driver"
                class="form-radio text-blue-600"
              />
              <span class="ml-2 text-gray-700">Driver</span>
            </label>
          </div>
        </div>

        <hr class="mt-6 mb-6" />

        <button
          type="submit"
          class="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 focus:outline-none"
        >
          Sign Up
        </button>
      </form>
      <div class="text-center mt-6">
        <p class="text-gray-600">Already have an account?</p>
        <router-link to="login" class="text-blue-500 hover:underline"> Login</router-link>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { useAuthStore } from '@/data/stores/userAccountStore'
import { useRouter } from 'vue-router'

const authStore = useAuthStore()
const router = useRouter()

const name = ref('')
const email = ref('')
const password = ref('')
const accountType = ref('employee') // Default to "Employee"
const errorMessage = ref('')

const signup = async () => {
  const accountInfo: NewAccount = {
    names: name.value,
    email: email.value,
    password: password.value
  }

  const isSuccess = await authStore.createUserAccount(accountInfo, accountType.value)
  if (isSuccess) {
    await router.replace('login')
  } else {
    errorMessage.value = authStore.error
  }
}
</script>
