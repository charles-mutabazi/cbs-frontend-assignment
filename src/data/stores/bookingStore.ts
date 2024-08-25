import { defineStore } from 'pinia'
import type { Vehicle } from '@/domain/model/Vehicle'
import { type BookingListing, BookingStatus } from '@/domain/model/Booking'
import { useAuthStore } from '@/data/stores/authStore'

interface BookingState {
  bookings: BookingListing[]
  availableVehicles: Vehicle[]
  errorMessage: string | null
}

export const useBookingStore = defineStore('bookingStore', {
  state: (): BookingState => ({
    bookings: [],
    availableVehicles: [],
    errorMessage: null
  }),
  actions: {
    async getMyBookings() {
      try {
        this.errorMessage = null // Reset the error message
        const res = await fetch(import.meta.env.VITE_API_BASE_URL + '/bookings', {
          headers: {
            Authorization: 'Bearer ' + useAuthStore().jwt
          }
        })

        if (!res.ok) {
          this.errorMessage = 'Unable to fetch your bookings'
          return
        }
        this.bookings = await res.json()
      } catch (e) {
        console.error('Error', e)
        this.errorMessage = 'An error occurred while fetching your bookings'
      }
    },

    async updateBooking(bookingId: number, newStatus: BookingStatus) {
      try {
        this.errorMessage = null // Reset the error message
        const res = await fetch(import.meta.env.VITE_API_BASE_URL + '/bookings/' + bookingId, {
          method: 'PATCH',
          headers: {
            Authorization: 'Bearer ' + useAuthStore().jwt,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ status: newStatus })
        })
        if (!res.ok) {
          this.errorMessage = 'Unable to fetch your bookings'
          return
        }
        this.updateBookingStatus(bookingId, newStatus)
      } catch (e) {
        console.error('Error', e)
        this.errorMessage = 'An error occurred while cancelling your booking'
      }
    },

    async getAvailableVehicles(): Promise<Vehicle[]> {
      const res = await fetch('./mock-data/vehicles.json')
      return await res.json()
    }
  },
  getters: {
    updateBookingStatus: (state: BookingState) => (bookingId: number, newStatus: BookingStatus) => {
      const booking = state.bookings.find((booking) => booking.id === bookingId)
      if (booking) {
        booking.status = newStatus
      }
    }
  }
})
