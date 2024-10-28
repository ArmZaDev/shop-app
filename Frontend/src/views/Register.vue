<template>
  <div>
    <h2>สมัครสมาชิก</h2>
    <form @submit.prevent="register">
      <div>
        <label for="name">ชื่อผู้ใช้:</label>
        <input type="text" v-model="name" required />
      </div>
      <div>
        <label for="password">รหัสผ่าน:</label>
        <input type="password" v-model="password" required />
      </div>
      <button type="submit">สมัครสมาชิก</button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      name: '',
      password: ''
    };
  },
  methods: {
    async register() {
      try {
        await this.axios.post('http://localhost:3000/register', {
          name: this.name,
          password: this.password
        });

        alert('สมัครสมาชิกสำเร็จแล้ว');
        this.$router.push('/login'); // เปลี่ยนเส้นทางหลังจากสมัครสมาชิกสำเร็จ
      } catch (error) {
        console.error('Error during registration:', error.response.data.message);
        alert('เกิดข้อผิดพลาดในการสมัครสมาชิก');
      }
    }
  }
};
</script>

<style>
/* เพิ่มสไตล์ที่ต้องการที่นี่ */
</style>
