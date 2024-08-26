<script setup lang="ts"></script>

<template>
  <div class="flex items-center justify-center min-h-screen bg-gray-100">
    <div class="bg-white p-8 rounded-lg shadow-lg w-1/4">
      <h1 class="text-center text-xl mb-8 font-bold">404 Not Found</h1>
      <p class="text-center text-5xl font-bold mb-10 text-gray-500">Page not found</p>

      <router-link to="/">
        <div class="flex items-center justify-center">
          <div
            class="w-1/2 text-center bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 focus:outline-none"
          >
            <p>Go to Home</p>
          </div>
        </div>
      </router-link>
    </div>
  </div>
</template>
