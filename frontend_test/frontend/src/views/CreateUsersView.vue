<template>
    <q-page class="flex flex-center">
      <q-card class="create-card">
        <q-card-section class="bg-primary text-white">
          <div class="text-h5 text-center">➕ เพิ่มผู้ใช้ใหม่</div>
        </q-card-section>
  
        <q-card-section>
          <q-form @submit="onCreate">
            <q-input
              v-model="user.firstname"
              label="👤 ชื่อ"
              filled
              dense
              lazy-rules
              :rules="[val => !!val || 'กรุณากรอกชื่อ']"
              class="form-input"
            />
            <q-input
              v-model="user.lastname"
              label="👥 นามสกุล"
              filled
              dense
              lazy-rules
              :rules="[val => !!val || 'กรุณากรอกนามสกุล']"
              class="form-input"
            />
            <q-input
              v-model="user.age"
              type="number"
              label="🎂 อายุ"
              filled
              dense
              lazy-rules
              :rules="[val => !!val || 'กรุณากรอกอายุ']"
              class="form-input"
            />
            <q-select
              v-model="user.gender"
              :options="genderOptions"
              label="⚧ เพศ"
              filled
              dense
              lazy-rules
              :rules="[val => !!val || 'กรุณาเลือกเพศ']"
              class="form-input text-dark text-weight-medium"
            />
            <q-input
              v-model="user.interests"
              label="⭐ ความสนใจ"
              filled
              dense
              lazy-rules
              :rules="[val => !!val || 'กรุณากรอกความสนใจ']"
              class="form-input"
            />
            <q-input
              v-model="user.description"
              label="📝 คำอธิบาย"
              type="textarea"
              filled
              dense
              lazy-rules
              :rules="[val => !!val || 'กรุณากรอกคำอธิบาย']"
              class="form-input"
            />
  
            <div class="q-mt-md row justify-end q-gutter-md">
              <q-btn label="❌ ยกเลิก" color="negative" flat @click="onCancel" />
              <q-btn type="submit" label="💾 บันทึกข้อมูล" color="positive" />
            </div>
          </q-form>
        </q-card-section>
      </q-card>
    </q-page>
  </template>
  
  <script setup>
  import { ref } from "vue";
  import { useRouter } from "vue-router";
  import { useQuasar } from "quasar";
  
  const router = useRouter();
  const $q = useQuasar();
  
  const user = ref({
    firstname: "",
    lastname: "",
    age: "",
    gender: "",
    interests: "",
    description: ""
  });
  
  const genderOptions = ["ชาย", "หญิง", "ไม่ระบุ"];
  
  // ฟังก์ชันเพิ่มผู้ใช้
  const onCreate = async () => {
    console.log("🔍 Data to Send:", user.value); // ตรวจสอบค่าที่จะส่งไปยัง API
  
    try {
      const res = await fetch("http://localhost:8000/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user.value)
      });
  
      const result = await res.json();
      console.log("✅ Server Response:", result);
  
      if (res.ok) {
        $q.notify({ type: "positive", message: "เพิ่มผู้ใช้สำเร็จ!" });
        router.push("/users");
      } else {
        throw new Error(result.message || "เกิดข้อผิดพลาด");
      }
    } catch (error) {
      console.error("❌ Error creating user:", error);
      $q.notify({ type: "negative", message: "เกิดข้อผิดพลาดในการเพิ่มผู้ใช้" });
    }
  };
  
  // ยกเลิกและกลับไปหน้าหลัก
  const onCancel = () => {
    router.push("/users");
  };
  </script>
  
  <style scoped>
  /* ปรับแต่งหน้า Create */
  .create-card {
    max-width: 520px;
    width: 100%;
    padding: 20px;
    border-radius: 16px;
    box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.15);
    animation: fadeIn 0.5s ease-in-out;
  }
  
  /* ปรับแต่ง Form Input */
  .form-input {
    margin-bottom: 14px;
  }
  
  /* Animation */
  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(-20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  </style>
  