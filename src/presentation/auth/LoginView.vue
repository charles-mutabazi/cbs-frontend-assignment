<template>
  <div class="flex items-center justify-center min-h-screen bg-gray-100">
    <div class="bg-white p-8 rounded-lg shadow-lg w-96">
      <h2 class="text-2xl font-bold text-center mb-6">Login</h2>

      <!-- Error Banner -->
      <div v-if="errorMessage" class="bg-red-500 text-white text-center p-2 rounded mb-4">
        {{ errorMessage }}
      </div>

      <form @submit.prevent="onLogin">
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

        <hr class="mt-6 mb-6"/>

        <button
          type="submit"
          class="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 focus:outline-none"
        >
          Login
        </button>
      </form>
      <div class="text-center mt-6">
        <p class="text-gray-600">Don't have an account?</p>
        <router-link to="signup" class="text-blue-500 hover:underline"> Sign up</router-link>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useAuthStore } from '@/data/stores/authStore'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const authStore = useAuthStore()
const router = useRouter()

const email = ref('')
const password = ref('')
const accountType = ref('employee'); // Default to "Employee"
const errorMessage = ref<string|null>('')

const onLogin = async () => {
  try {
    const isSuccess = await authStore.loginUser(email.value, password.value, accountType.value)
    if (isSuccess) {
      await router.replace('/')
    } else {
      errorMessage.value = authStore.error
    }
  } catch (error: any) {
    console.error(error)
    errorMessage.value = error.message
  }
}
</script>
