<template>
  <div>
    <p class="text-2xl font-semibold mb-8 border-b pb-4">New Booking</p>

    <div class="flex">
      <!-- Time Slots Section -->
      <div class="w-1/2 pe-8 border-r border-gray-300 overflow-y-auto">
        <div class="mb-8 border-b pb-4">
          <vue-tailwind-datepicker
            v-model="dateValue"
            no-input
            as-single
            :formatter="formatter"
            :disable-date="dDate"
            disable-in-range
          />
        </div>
        <p class="text-lg font-bold text-gray-700 mt-4 mb-8">Time Slots</p>
        <div class="grid grid-cols-2 gap-4">
          <div
            v-for="slot in timeSlots"
            :key="slot"
            @click="selectedSlot = slot"
            :class="[
              'flex items-center justify-center h-12 bg-white border border-gray-200 text-gray-700 rounded-md',
              slot === selectedSlot ? 'bg-green-700 border-0 text-white' : ''
            ]"
          >
            {{ slot }}
          </div>
        </div>
      </div>

      <!-- Booking Form Section -->
      <div class="w-2/3 ps-8 flex flex-col">
        <h2 class="text-xl font-semibold mb-4">Add Booking Details</h2>
        <form @submit.prevent="submitForm" class="space-y-4">
          <div>
            <label for="name" class="block text-gray-700 font-medium">Name</label>
            <input
              id="name"
              v-model="currentUser.names"
              type="text"
              class="bg-gray-100 mt-1 p-2 w-full border border-gray-300 rounded-lg"
              disabled
              readonly
            />
          </div>
          <div>
            <label for="email" class="block text-gray-700 font-medium">Email</label>
            <input
              id="email"
              v-model="currentUser.email"
              type="email"
              class="bg-gray-100 mt-1 p-2 w-full border border-gray-300 rounded-lg"
              disabled
              readonly
            />
          </div>

          <div>
            <label for="destination" class="block text-gray-700 font-medium">Destination</label>
            <input
              id="destination"
              v-model="destination"
              class="mt-1 p-2 w-full border border-gray-300 rounded-lg"
              required
            />
            <p class="text-xs text-gray-700 mt-2">Enter the destination</p>
          </div>

          <div>
            <label for="vehicle" class="block text-gray-700 font-medium">
              Select your preferred vehicle
            </label>
            <select
              id="vehicle"
              v-model="selectedVehicle"
              class="mt-1 p-2 w-full border border-gray-300 rounded-lg bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="" selected>Select a vehicle</option>
              <option v-for="vehicle in availableCars" :key="vehicle" :value="vehicle">
                {{
                  vehicle.name + ' - ' + vehicle.capacity + ' seats (' + vehicle.licensePlate + ')'
                }}
              </option>
            </select>

            <div class="mt-4 mb-4 border-b pb-8">
              <p>Selected Slot</p>
              <p class="text-2xl font-bold">{{ displaySlotDate() }}</p>
            </div>
          </div>
          <button
            type="submit"
            class="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// Generate time slots for 8 hours, starting from 08:00 AM
import { onMounted, ref } from 'vue'
import { useBookingStore } from '@/data/stores/bookingStore'
import { useAuthStore } from '@/data/stores/authStore'
import VueTailwindDatepicker from 'vue-tailwind-datepicker'
import { BookingStatus } from '@/domain/model/Booking'
import type { Vehicle } from '@/domain/model/Vehicle'

const { getAvailableVehicles } = useBookingStore()
const { currentUser } = useAuthStore()

const availableVehicles = ref<Vehicle[]>([])

// get all bookings
onMounted(async () => {
  availableVehicles.value = await getAvailableVehicles()
})
const availableCars = availableVehicles

const generateTimeSlots = () => {
  const slots = []
  for (let hour = 8; hour <= 16; hour++) {
    if (hour === 12) continue // Skip 12:00 PM
    const addZero = hour < 10 ? '0' : ''
    slots.push(`${addZero + hour}:00`)
  }
  return slots
}

const timeSlots = ref(generateTimeSlots())
const selectedSlot = ref('')
const destination = ref('')

const dateValue = ref('')
const dDate = (date: Date) => {
  return date < new Date()
}
const formatter = ref({
  date: 'YYYY-MM-DD',
  month: 'MMM'
})

const selectedVehicle = ref<Vehicle>({})

const isoDateString = ref('')

const displaySlotDate = (): string => {
  isoDateString.value = `${dateValue.value}T${selectedSlot.value}:00+02:00`
  if (selectedSlot.value === '' || dateValue.value === '') return ''
  const date = new Date(isoDateString.value)
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric'
  }).format(date)
}

// Form state

// Handle form submission
const submitForm = () => {
  const newBooking: Booking = {
    userId: currentUser.id,
    driverId: selectedVehicle.value.driverId,
    vehicleId: selectedVehicle.value.id,
    destination: destination.value,
    slotDateTime: new Date(isoDateString.value).toISOString(),
    status: BookingStatus.PENDING
  }
  // Handle form submission logic here
  console.log('Form submitted:', newBooking)
}
</script>

