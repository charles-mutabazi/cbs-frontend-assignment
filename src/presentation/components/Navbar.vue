<script lang="ts" setup>
import { useAuthStore } from '@/data/stores/userAccountStore'
import { useRouter } from 'vue-router'

const router = useRouter()
const {logoutUser} = useAuthStore()
const logout = () => {
  logoutUser()
  router.replace('auth/login')
}
</script>

<template>
  <nav>
    <div class="flex flex-wrap justify-between items-center mx-auto max-w-screen-lg p-4">
      <router-link class="flex items-center" to="/">
        <img alt="Book A Car" class="h-8 mr-3 rounded-lg" src="@/assets/logo.svg" />
        <span class="self-center text-2xl font-semibold whitespace-nowrap">XYZ Company</span>
      </router-link>

      <div class="flex items-center">
        <button
          class="text-white bg-red-700 hover:bg-red-900 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-10 focus:outline-none"
          @click="logout"
        >
          Logout
        </button>
      </div>
    </div>
  </nav>
</template>
