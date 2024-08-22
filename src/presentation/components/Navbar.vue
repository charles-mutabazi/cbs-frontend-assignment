<script lang="ts" setup></script>

<template>
  <nav>
    <div class="flex flex-wrap justify-between items-center mx-auto max-w-screen-md p-4">
      <router-link class="flex items-center" to="/">
        <img alt="Book A Car" class="h-8 mr-3 rounded-lg" src="@/assets/logo.svg" />
        <span class="self-center text-2xl font-semibold whitespace-nowrap">XYZ Company</span>
      </router-link>

      <div class="flex items-center">
        <router-link class="text-sm text-orange-600 hover:underline" to="/auth/login">
          Logout
        </router-link>
      </div>
    </div>
  </nav>
</template>
