
<script setup>
import { RouterLink, useRouter } from 'vue-router'
import { useAuthStore } from '../stores/authStore'

const auth = useAuthStore()
const router = useRouter()

async function handleLogout() {
  try {
    await auth.logout()
    await router.replace('/login')
  } catch (error) {
    console.error('Gagal logout:', error.message)
  }
}
</script>

<template>
  <aside class="flex min-h-screen w-64 shrink-0 flex-col bg-slate-900 p-5 text-white">
    <h1 class="mb-10 text-xl font-bold">Student<span class="text-blue-400">Hub</span></h1>

    <p class="mb-3 text-xs font-semibold uppercase tracking-wider text-slate-400">Menu Utama</p>

    <nav class="space-y-2">
      <RouterLink
        to="/"
        class="block rounded-lg px-4 py-3 text-slate-300 transition hover:bg-slate-800 hover:text-white"
        active-class="!bg-blue-600 !text-white"
      >
        Dashboard
      </RouterLink>

      <RouterLink
        to="/students"
        class="block rounded-lg px-4 py-3 text-slate-300 transition hover:bg-slate-800 hover:text-white"
        active-class="!bg-blue-600 !text-white"
      >
        Data Mahasiswa
      </RouterLink>

      <button
        @click="handleLogout"
        class="w-full rounded-lg bg-red-600 px-4 py-3 text-left text-white transition hover:bg-red-700"
      >
        Logout
      </button>
    </nav>

    <div class="mt-auto border-t border-slate-700 pt-5 text-sm text-slate-400">
      Student Management System
    </div>
  </aside>
</template>
