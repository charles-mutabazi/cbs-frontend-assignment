import { defineStore } from 'pinia'
import { useAuthStore } from '@/data/stores/authStore'

export const useDriverStore = defineStore('driverStore', {
  state: () => ({
    drivers: [],
    driverVehicle: null
  }),
  actions: {
    async fetchDriverDriverVehicle() {
      try {
        const res = await fetch(import.meta.env.VITE_API_BASE_URL + '/drivers/myVehicle', {
          headers: {
            Authorization: 'Bearer ' + useAuthStore().jwt
          }
        })

        if (!res.ok) {
          console.error('Unable to fetch driver vehicle')
          return
        }
        this.driverVehicle = await res.json()
      } catch (e) {
        console.error('Error', e)
      }
    }
  },
  getters: {
    getDriverVehicle(): any {
      return this.driverVehicle
    }
  }
})
