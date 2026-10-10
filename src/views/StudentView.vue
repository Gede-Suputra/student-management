
<script setup>
import { ref, computed, onMounted } from 'vue'
import { useStudentStore } from '../stores/studentStore'
import StudentTable from '../components/StudentTable.vue'

const studentStore = useStudentStore()
const pencarian = ref('')
const filterJurusan = ref('Semua')

onMounted(() => {
  studentStore.fetchStudents()
})

const daftarJurusan = computed(() => {
  return [...new Set(studentStore.students.map((student) => student.jurusan))]
})

const mahasiswaTampil = computed(() => {
  return studentStore.students.filter((student) => {
    const keyword = pencarian.value.toLowerCase()

    const cocokPencarian =
      student.nama.toLowerCase().includes(keyword) ||
      student.nim.toLowerCase().includes(keyword)

    const cocokJurusan =
      filterJurusan.value === 'Semua' ||
      student.jurusan === filterJurusan.value

    return cocokPencarian && cocokJurusan
  })
})
</script>

<template>
  <div class="space-y-6">
    <header>
      <h2 class="text-2xl font-bold text-slate-800">Data Mahasiswa</h2>
      <p class="mt-2 text-slate-500">
        Cari dan filter data mahasiswa.
      </p>
    </header>

    <section class="flex flex-col gap-3 sm:flex-row">
      <input
        v-model="pencarian"
        type="text"
        placeholder="Cari nama atau NIM..."
        class="min-w-0 flex-1 rounded-lg border border-slate-300 bg-white px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
      />

      <select
        v-model="filterJurusan"
        class="rounded-lg border border-slate-300 bg-white px-4 py-3 outline-none focus:border-blue-500"
      >
        <option value="Semua">Semua Jurusan</option>

        <option
          v-for="jurusan in daftarJurusan"
          :key="jurusan"
          :value="jurusan"
        >
          {{ jurusan }}
        </option>
      </select>
    </section>

    <div class="text-sm text-slate-500">
      Menampilkan {{ mahasiswaTampil.length }} mahasiswa
    </div>

    <StudentTable :students="mahasiswaTampil" />
  </div>
</template>