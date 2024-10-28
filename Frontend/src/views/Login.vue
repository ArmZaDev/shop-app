<template>
<div class="login-page">
  <div class="login-container">
    <h2>Login</h2>
    <form @submit.prevent="login">
      <div class="form-group">
        <label for="name">Username</label>
        <input type="text" v-model="name" id="name" required />
      </div>
      <div class="form-group">
        <label for="password">Password</label>
        <input type="password" v-model="password" id="password" required />
      </div>
      <button type="submit" class="login-button">Login</button>
    </form>
  </div>
</div>
</template>

<script>
export default {
  data() {
    return {
      name: "",
      password: "",
    };
  },
  methods: {
    login() {
      this.axios
        .post("http://localhost:3000/api/v1/login", {
          name: this.name,
          password: this.password,
        })
        .then((response) => {
          localStorage.setItem("Token", response.data.data.token);
          this.$router.push("/products");
          console.log(response.data);
        });
    },
  },
};
</script>

<style>
.login-page {
  display: flex;
  justify-content: center; 
  align-items: center;

}

.login-container {
  max-width: 500px;
  width: 100%;
  margin: 190px auto;
  padding: 15px;
  border: 1px solid #ccc;
  border-radius: 8px;
  background-color: #f9f9f9;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

h2 {
  text-align: center;
  margin-bottom: 20px;
}

.form-group {
  margin-bottom: 15px;
}

label {
  display: block;
  font-weight: bold;
  margin-bottom: 5px;
}

input[type="text"],
input[type="password"] {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
}

.login-button {
  width: 100%;
  padding: 10px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
}

.login-button:hover {
  background-color: #0056b3;
}
</style>

