<script setup lang="ts">
import { useAuthStore } from '@/data/stores/userAccountStore'
import { ref } from 'vue'

const authStore = useAuthStore()
const { currentUser, jwt } = authStore

console.log(jwt, currentUser)

const bookings = ref([
  {
    vehicleName: 'Toyota Prius',
    capacity: 4,
    driver: 'John Doe',
    bookingDate: '2024-08-24',
    status: 'Confirmed'
  },
  {
    vehicleName: 'Honda Civic',
    capacity: 5,
    driver: 'Jane Smith',
    bookingDate: '2024-08-25',
    status: 'Pending'
  }
  // Add more booking objects as needed
])
</script>

<template>
  <div class="flex items-center justify-between">
    <p class="text-2xl font-semibold">Welcome {{ currentUser.names }}</p>
    <router-link
      to="new-booking"
      class="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 focus:outline-none"
    >
      Book a Vehicle
    </router-link>
  </div>

  <hr class="mt-8 mb-8" />

  <div class="bg-white shadow-md rounded my-6 overflow-x-auto">
    <table class="min-w-full bg-white">
      <thead>
        <tr>
          <th class="py-3 px-6 text-left bg-gray-800 text-gray-100 font-semibold uppercase text-sm">
            Vehicle Name
          </th>
          <th class="py-3 px-6 text-left bg-gray-800 text-gray-100 font-semibold uppercase text-sm">
            Capacity
          </th>
          <th class="py-3 px-6 text-left bg-gray-800 text-gray-100 font-semibold uppercase text-sm">
            Driver
          </th>
          <th class="py-3 px-6 text-left bg-gray-800 text-gray-100 font-semibold uppercase text-sm">
            Booking Date
          </th>
          <th class="py-3 px-6 text-left bg-gray-800 text-gray-100 font-semibold uppercase text-sm">
            Status
          </th>
          <th
            class="py-3 px-6 text-center bg-gray-800 text-gray-100 font-semibold uppercase text-sm"
          >
            Cancel
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(booking, index) in bookings"
          :key="index"
          class="border-b border-gray-200 hover:bg-gray-100"
        >
          <td class="py-3 px-6 text-left">{{ booking.vehicleName }}</td>
          <td class="py-3 px-6 text-left">{{ booking.capacity }}</td>
          <td class="py-3 px-6 text-left">{{ booking.driver }}</td>
          <td class="py-3 px-6 text-left">{{ booking.bookingDate }}</td>
          <td class="py-3 px-6 text-left">
            <span
              :class="[
                'py-1 px-3 rounded-full text-xs',
                booking.status === 'Confirmed'
                  ? 'bg-green-200 text-green-800'
                  : 'bg-yellow-200 text-yellow-800'
              ]"
            >
              {{ booking.status }}
            </span>
          </td>
          <td class="py-3 px-6 text-center">
            <button class="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600">Cancel</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
