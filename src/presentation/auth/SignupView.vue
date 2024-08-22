<template>
  <div class="flex items-center justify-center min-h-screen bg-gray-100">
    <div class="bg-white p-8 rounded-lg shadow-lg w-96">
      <h2 class="text-2xl font-bold text-center mb-6">Sign Up</h2>
      <form @submit.prevent="signup">
        <div class="mb-4">
          <label for="name" class="block text-gray-700">Name</label>
          <input
            type="text"
            id="name"
            v-model="name"
            class="w-full p-2 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:border-blue-500"
            required
          />
        </div>
        <div class="mb-4">
          <label for="email" class="block text-gray-700">Email</label>
          <input
            type="email"
            id="email"
            v-model="email"
            class="w-full p-2 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:border-blue-500"
            required
          />
        </div>
        <div class="mb-4">
          <label for="password" class="block text-gray-700">Password</label>
          <input
            type="password"
            id="password"
            v-model="password"
            class="w-full p-2 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:border-blue-500"
            required
          />
        </div>
        <button
          type="submit"
          class="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 focus:outline-none"
        >
          Sign Up
        </button>
      </form>
      <div class="text-center mt-6">
        <p class="text-gray-600">Already have an account?</p>
        <router-link to="/login" class="text-blue-500 hover:underline">
          Login
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      name: "",
      email: "",
      password: "",
    };
  },
  methods: {
    signup() {
      // Handle signup logic
      console.log("Signing up with", this.name, this.email, this.password);
    },
  },
};
</script>
