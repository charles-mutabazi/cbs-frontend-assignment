import {defineStore} from "pinia";
import { useStorage } from '@vueuse/core'

export const useAuthStore = defineStore('authStore', {
  state: () => ({
    currentUser: useStorage('currentUser', null) as User,
    jwt: useStorage('jwt', null) as string,
    isLoading: false,
    error: null,
  }),
});