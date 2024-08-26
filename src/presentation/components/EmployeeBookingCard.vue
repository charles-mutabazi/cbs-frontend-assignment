<script setup lang="ts">
import { BookingStatus } from '@/domain/model/Booking'

defineProps(['driverNames', 'carDetails', 'capacity', 'destination', 'dateTimeSlot', 'status', 'onCancel'])
</script>

<template>
  <div class="flex justify-between overflow-hidden shadow-sm p-4 rounded-md bg-gray-100 mb-4">

    <div>
      <p class="font-bold text-lg">{{ dateTimeSlot }}</p>
      <p class="text-xs text-gray-500">Date and Time</p>
    </div>

    <div>
      <p class="font-bold text-xl">{{ carDetails }}</p>
      <p class="text-xs text-gray-500">Names of car</p>
    </div>

    <div>
      <p class="font-bold text-xl">{{ driverNames }}</p>
      <p class="text-xs text-gray-500">Names of the driver</p>
    </div>

    <div>
      <p class="font-bold text-lg">{{ destination }}</p>
      <p class="text-xs text-gray-500">Destination</p>
    </div>


    <div class="text-gray-700 text-base">
      <p
        :class="[
          'font-bold',
          {
            'text-green-600': status === BookingStatus.CONFIRMED,
            'text-yellow-600': status === BookingStatus.PENDING,
            'text-red-600': status === BookingStatus.CANCELED
          }
        ]"
      >
        {{ status }}
      </p>
      <p class="text-xs text-gray-500">Status</p>
    </div>

    <div>
      <button
        @click="onCancel"
        :disabled="status !== BookingStatus.PENDING"
        :class="[
          'text-white font-bold py-2 px-4 rounded',
          status === BookingStatus.PENDING
            ? 'bg-red-500 hover:bg-red-600'
            : 'cursor-not-allowed bg-gray-500 opacity-40'
        ]"
      >
        Cancel
      </button>
    </div>
  </div>
</template>
