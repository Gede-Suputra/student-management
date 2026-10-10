```vue
<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import Sidebar from './components/Sidebar.vue'

const route = useRoute()
const isLoginPage = computed(() => route.path === '/login')
</script>

<template>
  <div class="min-h-screen bg-slate-50 md:flex">
    <Sidebar v-if="!isLoginPage" />

    <main class="min-w-0 flex-1 p-5 sm:p-8">
      <RouterView />
    </main>
  </div>
</template>
```