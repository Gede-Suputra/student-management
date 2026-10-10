
<script setup>
defineProps({
  students: {
    type: Array,
    required: true,
  },
})
</script>

<template>
  <div class="overflow-x-auto rounded-xl border border-slate-200 bg-white">
    <table class="w-full text-left text-sm">
      <thead class="bg-slate-50 text-slate-500">
        <tr>
          <th class="px-5 py-4 font-medium">NIM</th>
          <th class="px-5 py-4 font-medium">Nama Mahasiswa</th>
          <th class="px-5 py-4 font-medium">Jurusan</th>
          <th class="px-5 py-4 font-medium">Semester</th>
          <th class="px-5 py-4 font-medium">IPK</th>
        </tr>
      </thead>

      <tbody class="divide-y divide-slate-100">
        <tr
          v-for="student in students"
          :key="student.id"
          class="transition hover:bg-slate-50"
        >
          <td class="px-5 py-4 font-medium text-slate-700">
            {{ student.nim }}
          </td>
          <td class="px-5 py-4 text-slate-800">
            {{ student.nama }}
          </td>
          <td class="px-5 py-4 text-slate-600">
            {{ student.jurusan }}
          </td>
          <td class="px-5 py-4 text-slate-600">
            {{ student.semester }}
          </td>
          <td class="px-5 py-4 font-semibold text-slate-700">
            {{ Number(student.ipk).toFixed(2) }}
          </td>
        </tr>

        <tr v-if="students.length === 0">
          <td colspan="5" class="px-5 py-10 text-center text-slate-500">
            Belum ada data mahasiswa.
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>