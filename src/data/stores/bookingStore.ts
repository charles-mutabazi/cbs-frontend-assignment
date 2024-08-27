import { defineStore } from 'pinia'
import type { Vehicle } from '@/domain/model/Vehicle'
import { type BookingListing, BookingStatus, type NewBooking } from '@/domain/model/Booking'
import { useAuthStore } from '@/data/stores/authStore'

interface BookingState {
  bookings: BookingListing[]
  errorMessage: string | null
}

export const useBookingStore = defineStore('bookingStore', {
  state: (): BookingState => ({
    bookings: [],
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

    async fetchAvailableVehicles(slotDateTime: String): Promise<Vehicle[]> {
      try {
        const res = await fetch(import.meta.env.VITE_API_BASE_URL + '/vehicles/available', {
          method: 'POST',
          headers: {
            Authorization: 'Bearer ' + useAuthStore().jwt,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ slotDateTime })
        })
        if (!res.ok) {
          console.error('Error', res.statusText)
          this.errorMessage = 'Unable to fetch available vehicles, please try again later'
          return []
        }
        return await res.json()
      } catch (e) {
        console.error('Error', e)
        this.errorMessage = 'An error occurred while fetching available vehicles'
        return []
      }
    },

    async createBooking(newBooking: NewBooking) {
      try {
        this.errorMessage = null
        const res = await fetch(import.meta.env.VITE_API_BASE_URL + '/bookings', {
          method: 'POST',
          body: JSON.stringify(newBooking),
          headers: {
            Authorization: 'Bearer ' + useAuthStore().jwt,
            'Content-Type': 'application/json'
          }
        })
        if (!res.ok) {
          this.errorMessage = 'Unable to book the vehicle'
          return
        }
        this.bookings = [...this.bookings, newBooking]
      } catch (e) {
        console.error('Error', e)
        this.errorMessage = 'An error occurred while booking the vehicle'
      }
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
