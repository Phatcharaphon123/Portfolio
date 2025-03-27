<template>
  <div class="q-pa-md">
    <q-card class="main-card">
      <q-card-section class="header-section">
        <div class="text-h6 text-white">📋 ระบบจัดการโปรไฟล์ผู้ใช้</div>
      </q-card-section>

      <!-- ค้นหา / กรอง / เรียงลำดับ -->
      <q-card-section class="q-gutter-md row">
        <q-input v-model="search" filled dense debounce="300" placeholder="🔍 ค้นหาผู้ใช้ (ชื่อ, นามสกุล, อายุ, เพศ, ความสนใจ, คำอธิบาย)" class="search-input">
          <template v-slot:prepend>
            <q-icon name="search" />
          </template>
        </q-input>

        <q-select v-model="filterGender" :options="genderOptions" filled dense clearable label="📌 กรองเพศ" class="filter-select">
          <template v-slot:prepend>
            <q-icon name="filter_list" />
          </template>
        </q-select>

        <q-select v-model="sortBy" :options="sortOptions" filled dense clearable label="🔃 เรียงลำดับ" class="sort-select">
          <template v-slot:prepend>
            <q-icon name="sort" />
          </template>
        </q-select>

        <q-btn icon="add" label="เพิ่มผู้ใช้" color="positive" @click="onCreate" class="add-user-btn" />
      </q-card-section>

      <!-- ตารางแสดงข้อมูล -->
      <q-card-section>
        <q-table title="📋 รายชื่อผู้ใช้" :rows="filteredUsers" :columns="columns" row-key="id" flat bordered class="user-table">
          <template v-slot:body-cell-actions="props">
            <q-td :props="props">
              <q-btn flat dense round icon="edit" color="blue" @click="onEdit(props.row.id)" class="edit-btn" />
              <q-btn flat dense round icon="delete" color="red" @click="confirmDelete(props.row.id)" class="delete-btn" />
            </q-td>
          </template>
        </q-table>
      </q-card-section>
    </q-card>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useQuasar } from "quasar";
import router from "../router";

const $q = useQuasar();
const users = ref([]);
const search = ref("");
const filterGender = ref(null);
const sortBy = ref(null);

const genderOptions = ["ทั้งหมด", "ชาย", "หญิง", "ไม่ระบุ"];
const sortOptions = ["ชื่อ", "นามสกุล", "อายุ", "ความสนใจ", "คำอธิบาย"];

const columns = [
  { name: "id", align: "center", label: "🆔 รหัส", field: "id", sortable: true },
  { name: "firstname", align: "center", label: "👤 ชื่อ", field: "firstname", sortable: true },
  { name: "lastname", align: "center", label: "👥 นามสกุล", field: "lastname", sortable: true },
  { name: "age", align: "center", label: "🎂 อายุ", field: "age", sortable: true },
  { name: "gender", align: "center", label: "⚧ เพศ", field: "gender", sortable: true },
  { name: "interests", align: "center", label: "⭐ ความสนใจ", field: "interests", sortable: true },
  { name: "description", align: "center", label: "📝 คำอธิบาย", field: "description", sortable: true },
  { name: "actions", align: "center", label: "🔧 Actions", field: "actions" },
];

// ดึงข้อมูล Users
const fetchData = async () => {
  try {
    const res = await fetch("http://localhost:8000/users");
    users.value = await res.json();
  } catch (error) {
    console.error("Error fetching users:", error);
  }
};

// ฟิลเตอร์และเรียงลำดับข้อมูล
const filteredUsers = computed(() => {
  let filtered = users.value;

  if (search.value) {
    filtered = filtered.filter((user) =>
      `${user.firstname} ${user.lastname} ${user.age} ${user.gender} ${user.interests} ${user.description}`
        .toLowerCase()
        .includes(search.value.toLowerCase())
    );
  }

  if (filterGender.value && filterGender.value !== "ทั้งหมด") {
    filtered = filtered.filter((user) => user.gender === filterGender.value);
  }

  if (sortBy.value) {
    filtered.sort((a, b) => (a[sortBy.value] > b[sortBy.value] ? 1 : -1));
  }

  return filtered;
});

onMounted(fetchData);

const onCreate = () => router.push("/createUsers");
const onEdit = (id) => router.push("/updateUser/" + id);

// ยืนยันการลบ
const confirmDelete = (id) => {
  if (!$q || !$q.dialog) {
    console.error("❌ Quasar Dialog ไม่สามารถใช้งานได้");
    return;
  }

  console.log("🛑 กำลังพยายามลบผู้ใช้:", id); // ตรวจสอบค่า ID ที่กดลบ

  $q.dialog({
    title: "⚠️ ยืนยันการลบ",
    message: "คุณต้องการลบผู้ใช้นี้หรือไม่?",
    ok: "ลบ",
    cancel: "ยกเลิก",
    persistent: true
  }).onOk(() => onDelete(id));
};


// ลบผู้ใช้
const onDelete = async (id) => {
  console.log("🔍 กำลังลบ ID:", id); // ตรวจสอบค่า ID ที่ส่งไป API

  if (!$q || !$q.notify) {
    console.error("❌ Quasar Notify ไม่สามารถใช้งานได้");
    return;
  }

  try {
    const res = await fetch(`http://localhost:8000/users/${id}`, { method: "DELETE" });

    if (!res.ok) {
      throw new Error("ไม่สามารถลบผู้ใช้ได้ หรือผู้ใช้นี้ไม่มีอยู่ในระบบ");
    }

    const result = await res.json();
    console.log("✅ Server Response:", result);

    $q.notify({ type: "positive", message: "ลบผู้ใช้สำเร็จ!" });
    fetchData(); // โหลดข้อมูลใหม่หลังลบสำเร็จ
  } catch (error) {
    console.error("❌ Error deleting user:", error);
    $q.notify({ type: "negative", message: "เกิดข้อผิดพลาดในการลบผู้ใช้" });
  }
};


</script>

<style scoped>
/* ปรับแต่ง Card */
.main-card {
  border-radius: 12px;
  transition: 0.3s;
  box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.1);
  background-color: white;
}

/* Header ของ Card */
.header-section {
  background-color: #1976D2;
  padding: 16px;
  border-radius: 12px 12px 0 0;
}

/* ปรับแต่ง Table */
.user-table {
  min-height: 300px;
  background: #f9f9f9;
  border-radius: 10px;
}

/* Hover Effect บน Table */
.q-table tbody tr:hover {
  background-color: rgba(25, 118, 210, 0.1);
}

/* ปรับแต่งปุ่ม */
.q-btn {
  border-radius: 8px;
  font-weight: bold;
  transition: transform 0.2s ease-in-out;
}

/* ปุ่มกดแล้วมีเอฟเฟกต์ */
.q-btn:active {
  transform: scale(0.95);
}

.filter-select .q-field__label, .sort-select .q-field__label {
  color: #000000; /* สีเข้ม */
}

.filter-select .q-field__control, .sort-select .q-field__control {
  color: #000000; /* สีเข้ม */
}
</style>
