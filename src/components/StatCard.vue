
<script setup>
defineProps({
  title: String,
  value: [String, Number],
  description: String,
})
</script>

<template>
  <div class="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
    <p class="text-sm text-slate-500">{{ title }}</p>
    <h3 class="mt-3 text-3xl font-bold text-slate-800">{{ value }}</h3>
    <p class="mt-2 text-sm text-slate-500">{{ description }}</p>
  </div>
</template>