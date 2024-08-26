<script setup lang="ts">
import { useAuthStore } from '@/data/stores/authStore'
import { computed, onMounted } from 'vue'
import { useBookingStore } from '@/data/stores/bookingStore'
import { type BookingListing, BookingStatus } from '@/domain/model/Booking'
import { useDriverStore } from '@/data/stores/driverStore'
import DriverBookingCard from '@/presentation/components/DriverBookingCard.vue'
import EmployeeBookingCard from '@/presentation/components/EmployeeBookingCard.vue'

const authStore = useAuthStore()
const { currentUser } = authStore
const bookingStore = useBookingStore()
const driverStore = useDriverStore()

// make sure we have the latest bookings array
const bookingListings: BookingListing[] = computed(() => {
  return bookingStore.bookings.slice() // Create a copy of the array
})

const formattedDate = (dateString: string): string => {
  const date = new Date(dateString)
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric'
  }).format(date)
}

onMounted(async () => {
  if (currentUser.accountType === 'driver') {
    await driverStore.fetchDriverDriverVehicle()
  }
  await bookingStore.getMyBookings()
})
</script>

<template>
  <div class="flex items-center justify-between border-b mb-8 pb-4">
    <p class="text-2xl font-semibold">Hello, {{ currentUser.names }}!</p>
    <div v-show="currentUser.accountType === 'driver'">
      <p class="text-xl font-semibold">{{ driverStore.getDriverVehicle?.name }}</p>
      <p class="text-gray-400 text-sm">Assigned vehicle</p>
    </div>

    <router-link
      v-show="currentUser.accountType === 'employee'"
      to="new-booking"
      class="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 focus:outline-none"
    >
      Book a Vehicle
    </router-link>
  </div>

  <div v-if="bookingListings.length === 0">
    <p class="text-lg text-gray-500 text-center font-bold">No bookings available</p>
  </div>

  <div v-else>
    <div v-if="currentUser.accountType == 'driver'">
      <div v-for="(booking, index) in bookingListings" :key="index">
        <DriverBookingCard
          :userNames="booking.userName"
          :destination="booking.destination"
          :dateTimeSlot="formattedDate(booking.slotDateTime)"
          :status="booking.status"
          :onCancel="() => bookingStore.updateBookingStatus(BookingStatus.CANCELED)"
        />
      </div>
    </div>

    <div v-else>
      <div v-for="(booking, index) in bookingListings" :key="index">
        <EmployeeBookingCard
          :driverNames="booking.driverName"
          :carDetails="booking.vehicleName"
          :capacity="booking.vehicleCapacity"
          :destination="booking.destination"
          :dateTimeSlot="formattedDate(booking.slotDateTime)"
          :status="booking.status"
          :onCancel="() => bookingStore.updateBookingStatus(BookingStatus.CANCELED)"
        />
      </div>
    </div>
  </div>
</template>
