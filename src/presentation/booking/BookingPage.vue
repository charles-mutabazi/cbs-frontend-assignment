<template>
  <div>
    <p class="text-2xl font-semibold mb-8 border-b pb-4">New Booking</p>

    <div class="flex">
      <!-- Time Slots Section -->
      <div class="w-1/2 pe-8 border-r border-gray-300 overflow-y-auto">
        <div class="mb-8 border-b pb-4">
          <vue-tailwind-datepicker v-model="dateValue" no-input as-single :formatter="formatter" :disable-date="dDate"
            disable-in-range />
        </div>
        <p class="text-lg font-bold text-gray-700 mt-4 mb-8">Time Slots</p>
        <div class="grid grid-cols-2 gap-4">
          <div v-for="slot in timeSlots" :key="slot" @click="selectedSlot = slot" :class="[
              'flex items-center justify-center h-12  rounded-md hover:cursor-pointer',
  slot === selectedSlot ? 'bg-green-700 border-0 text-white' : 'bg-green-50 text-green-700 border border-green-700'
            ]">
            {{ slot }}
          </div>
        </div>
      </div>

      <!-- Booking Form Section -->
      <div class="w-2/3 ps-8 flex flex-col">
        <!-- Only show this div if a slot is selected-->
        <div v-if="displaySlotDate() !== ''">
          <div class="border-b">
            <h2 class="text-xl font-semibold mb-2">Add Booking Details</h2>
            <h2 class="text-md mb-4 text-gray-700">
              You are making a booking as: {{ currentUser.names }}
            </h2>
          </div>

          <div class="mt-4 mb-4 border-b pb-4">
            <p>Selected Slot</p>
            <p class="text-2xl font-bold">{{ displaySlotDate() }}</p>
          </div>

          <button v-if="showButton" @click="fetchVehicles()"
            class="w-full bg-amber-700 text-white rounded-lg hover:bg-amber-800 mb-4 h-14">
            Check available vehicles
          </button>

          <!--grid of available vehicles-->
          <div class="mb-8" v-show="!showButton">
            <p class="text-lg font-bold text-gray-700">Available Vehicles</p>
            <p class="text-xs text-gray-500 mb-4">Select your desired vehicle</p>
            <div class="grid grid-cols-2 gap-4" v-if="vehicles.length > 0">
              <div v-for="vehicle in vehicles" :key="vehicle.id" @click="selectedVehicle = vehicle" :class="[
                  'bg-amber-50 border border-amber-500 rounded-md p-2 hover:cursor-pointer hover:bg-amber-100',
                  vehicle === selectedVehicle ? 'bg-amber-700 border-0 hover:bg-amber-700' : ''
                ]">
                <p :class="[
                    'text-sm font-semibold mb-2',
                    vehicle === selectedVehicle ? 'text-white' : 'text-amber-900'
                  ]">
                  {{ vehicle.name }}
                </p>
                <p :class="[
                    'text-xs',
                    vehicle === selectedVehicle ? 'text-white' : 'text-amber-700'
                  ]">
                  License Plate: {{ vehicle.licensePlate }}
                </p>
                <p :class="[
                    'text-xs',
                    vehicle === selectedVehicle ? 'text-white' : 'text-amber-700'
                  ]">
                  Capacity: {{ vehicle.capacity }} seats
                </p>

                <p :class="[
                    'text-xs font-semibold',
                    vehicle === selectedVehicle ? 'text-white' : 'text-amber-700'
                  ]">
                  Driver: {{ vehicle.driverNames }}
                </p>
              </div>
            </div>
            <div v-else class="flex items-center justify-center">
              <p class="w-full mt-4 mb-4 text-lg text-gray-500 text-center">
                No vehicles available for the selected date and time. Please change the date and
                time and try again.
              </p>
            </div>
          </div>

          <div>
            <label for="destination" class="block text-gray-700 font-medium">
              Enter your Destination
            </label>
            <input id="destination" v-model="destination"
              class="mt-1 p-2 w-full border border-gray-300 rounded-lg disabled:bg-gray-100 disabled:cursor-not-allowed"
              :disabled="!selectedVehicle" required />
          </div>

          <hr class="mt-8 mb-8" />

          <button @click="submitForm" type="submit"
            class="w-full bg-blue-500 text-white rounded-lg hover:bg-blue-600 h-14 disabled:opacity-60 disabled:cursor-not-allowed"
            :disabled="!selectedVehicle || !destination">
            Submit
          </button>
        </div>

        <div v-else class="flex h-full justify-center items-center">
          <div class="text-2xl text-gray-500 text-center font-bold">
            <p>Please Select date and time</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// Generate time slots for 8 hours, starting from 08:00 AM
import { ref, watch } from 'vue'
import { useBookingStore } from '@/data/stores/bookingStore'
import { useAuthStore } from '@/data/stores/authStore'
import VueTailwindDatepicker from 'vue-tailwind-datepicker'
import { BookingStatus, type NewBooking } from '@/domain/model/Booking'
import type { Vehicle } from '@/domain/model/Vehicle'
import { useRouter } from 'vue-router'

const { fetchAvailableVehicles, createBooking, errorMessage } = useBookingStore()
const { currentUser } = useAuthStore()
const router = useRouter()

//generate time slots for 8 hours
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

const today = new Date()
const dateValue = ref(today.toISOString().substring(0, 10))
const dDate = (date: Date) => {
  return date < today
}
const formatter = ref({
  date: 'YYYY-MM-DD',
  month: 'MMM'
})

const isoDateString = ref('')
const showButton = ref(false)

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

const selectedVehicle = ref()
const vehicles = ref<Vehicle[]>([])

const fetchVehicles = async () => {
  vehicles.value = await fetchAvailableVehicles(new Date(isoDateString.value).toISOString())
  showButton.value = false
}

watch([dateValue, selectedSlot], () => {
  showButton.value = true
})

// Handle form submission
const submitForm = async () => {
  const newBooking: NewBooking = {
    driverId: selectedVehicle.value.driverId,
    vehicleId: selectedVehicle.value.id,
    destination: destination.value,
    slotDateTime: new Date(isoDateString.value).toISOString(),
    status: BookingStatus.PENDING
  }
  await createBooking(newBooking)

  if(errorMessage === '' || errorMessage === null){
    router.replace('/')
  }
}
</script>
