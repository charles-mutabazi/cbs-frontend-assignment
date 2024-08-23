<script setup lang="ts">
import Navbar from '@/presentation/components/Navbar.vue'
</script>

<template>
  <main class="bg-gray-100">
    <header>
      <Navbar />
    </header>
    <div class="container mx-auto max-w-screen-lg mb-16 min-h-screen">
      <div class="bg-white p-8 rounded-lg shadow-lg mt-4">
        <RouterView />
      </div>
    </div>
  </main>
</template>
