
<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "../stores/authStore";

const auth = useAuthStore();
const router = useRouter();

const email = ref("");
const password = ref("");
const errorMessage = ref("");

async function handleLogin() {
  errorMessage.value = "";

  try {
    await auth.login(email.value, password.value);

    if (auth.profile.role === "admin") {
      await router.push("/");
    } else if (auth.profile.role === "dosen") {
      await router.push("/");
    } else {
      errorMessage.value = "Role akun tidak dikenali.";
      await auth.logout();
    }
  } catch {
    errorMessage.value = "Email, password, atau profil tidak valid.";
  }
}
</script>

<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100 p-4">
    <form
      @submit.prevent="handleLogin"
      class="w-full max-w-md rounded-xl bg-white p-8 shadow"
    >
      <h1 class="mb-2 text-2xl font-bold text-gray-800">
        Student Management
      </h1>

      <p class="mb-6 text-gray-500">Login ke akun kamu</p>

      <label class="mb-2 block text-sm font-medium">Email</label>
      <input
        v-model.trim="email"
        type="email"
        required
        autocomplete="username"
        placeholder="nama@email.com"
        class="mb-4 w-full rounded-lg border p-3 outline-none focus:ring-2 focus:ring-blue-500"
      />

      <label class="mb-2 block text-sm font-medium">Password</label>
      <input
        v-model="password"
        type="password"
        required
        autocomplete="current-password"
        placeholder="Masukkan password"
        class="mb-4 w-full rounded-lg border p-3 outline-none focus:ring-2 focus:ring-blue-500"
      />

      <p v-if="errorMessage" class="mb-4 text-sm text-red-600">
        {{ errorMessage }}
      </p>

      <button
        type="submit"
        :disabled="auth.loading"
        class="w-full rounded-lg bg-blue-600 p-3 font-semibold text-white hover:bg-blue-700 disabled:opacity-50"
      >
        {{ auth.loading ? "Memproses..." : "Login" }}
      </button>
    </form>
  </div>
</template>
