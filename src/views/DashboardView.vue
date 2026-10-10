
<script setup>
import { computed, onMounted } from 'vue'
import { useStudentStore } from '../stores/studentStore'
import StatCard from '../components/StatCard.vue'
import StudentTable from '../components/StudentTable.vue'

const studentStore = useStudentStore()

onMounted(() => {
  studentStore.fetchStudents()
})

const mahasiswaTerbaru = computed(() => {
  return [...studentStore.students].slice(-5).reverse()
})
</script>

<template>
  <div class="space-y-8">
    <header>
      <p class="text-sm text-blue-600">Overview</p>
      <h2 class="mt-1 text-2xl font-bold text-slate-800">Dashboard</h2>
      <p class="mt-2 text-slate-500">
        Ringkasan informasi akademik mahasiswa.
      </p>
    </header>

    <section class="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
      <StatCard
        title="Total Mahasiswa"
        :value="studentStore.totalMahasiswa"
        description="Seluruh data mahasiswa"
      />

      <StatCard
        title="Total Jurusan"
        :value="studentStore.totalJurusan"
        description="Jurusan yang terdaftar"
      />

      <StatCard
        title="Rata-rata IPK"
        :value="studentStore.rataRataIPK"
        description="Rata-rata seluruh mahasiswa"
      />
    </section>

    <section class="space-y-4">
      <div>
        <h3 class="text-lg font-bold text-slate-800">Data Mahasiswa</h3>
        <p class="mt-1 text-sm text-slate-500">
          Daftar mahasiswa yang terdaftar dalam sistem.
        </p>
      </div>

      <StudentTable :students="mahasiswaTerbaru" />
    </section>
  </div>
</template>