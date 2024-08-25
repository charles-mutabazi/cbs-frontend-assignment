import { defineStore } from 'pinia'
import type { Vehicle } from '@/domain/model/Vehicle'
import type { BookingListing } from '@/domain/model/Booking'
import { useAuthStore } from '@/data/stores/authStore'

interface BookingState {
  bookings: BookingListing[]
  availableVehicles: Vehicle[]
}

export const useBookingStore = defineStore('bookingStore', {
  state: (): BookingState => ({
    bookings: [],
    availableVehicles: []
  }),
  actions: {
    async getMyBookings() {
      //currently we are using a mock data
      const res = await fetch(import.meta.env.VITE_API_BASE_URL + '/bookings', {
        headers: {
          Authorization: 'Bearer ' + useAuthStore().jwt
        }
      })
      this.bookings = await res.json()

      console.log('Bookings ==XX==>', this.bookings)
    },

    async getAvailableVehicles(): Promise<Vehicle[]> {
      const res = await fetch('./mock-data/vehicles.json')
      return await res.json()
    }
  },
  getters: {
    myBookings: (state: BookingState) => state.bookings
  }
})
