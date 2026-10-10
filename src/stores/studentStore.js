
import { defineStore } from "pinia";
import { ref, computed } from "vue";
import {
    getStudents,
    createStudent,
} from "../service/studentService.js";

export const useStudentStore = defineStore("student", () => {
    const students = ref([]);
    const loading = ref(false);
    const error = ref("");

    const totalMahasiswa = computed(() => students.value.length);

    const totalJurusan = computed(() => {
        return new Set(students.value.map((student) => student.jurusan)).size;
    });

    const rataRataIPK = computed(() => {
        if (students.value.length === 0) return "0.00";

        const total = students.value.reduce(
            (sum, student) => sum + (Number(student.ipk) || 0),
            0,
        );

        return (total / students.value.length).toFixed(2);
    });

    async function fetchStudents() {
        loading.value = true;
        error.value = "";

        try {
            students.value = await getStudents();
        } catch (err) {
            error.value = err.message || "Terjadi kesalahan";
        } finally {
            loading.value = false;
        }
    }

    return {
        students,
        loading,
        error,
        totalMahasiswa,
        totalJurusan,
        rataRataIPK,
        fetchStudents,
        addStudent,
    };
});


async function addStudent(student) {
    loading.value = true;
    error.value = "";

    try {
        const newStudent = await createStudent(student);

        students.value.push(newStudent);

        return newStudent;
    } catch (err) {
        error.value = err.message || "Gagal menambahkan mahasiswa";
        throw err;
    } finally {
        loading.value = false;
    }
}
