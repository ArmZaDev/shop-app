<template>
  <div>
    <h1 class="text-center my-5">Product List</h1>
    <v-row dense>
      <v-col
        cols="12"
        md="4"
        lg="3"
        v-for="(item, index) in apidata"
        :key="index"
      >
        <v-card elevation="3" class="mx-auto">
          <v-img
            :src="item.image"
            height="200px"
            class="white--text align-end"
            gradient="to bottom, rgba(0,0,0,.3), rgba(0,0,0,.7)"
          >
            <v-card-title>{{ item.name }}</v-card-title>
          </v-img>
          <v-card-subtitle class="text-center">
            ${{ item.price.toFixed(2) }}
          </v-card-subtitle>
          <v-card-text class="px-4">
            <div>{{ item.description }}</div>
            <div class="mt-3"><strong>Stock:</strong> {{ item.stock }}</div>
          </v-card-text>
          <v-card-actions>
            <v-btn text color="primary" @click="addToCart(item)">Add to Cart</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      apidata: [],
    };
  },
  created() {
    if (localStorage.getItem("Token") != undefined) {
      this.getData();
    }
  },
  methods: {
    getData() {
      this.axios
        .get("http://localhost:3000/api/v1/products",{
            headers: {
            Authorization: `Bearer ${localStorage.getItem("Token")}`,
          },
        })
        .then((response) => {
          this.apidata = response.data;
        });
    },
    addToCart(item) {
      let cart = JSON.parse(localStorage.getItem('cart')) || [];
      const index = cart.findIndex(cartItem => cartItem._id === item._id);
      if (index !== -1) {
        cart[index].quantity += 1;
      } else {
        cart.push({...item, quantity: 1});
      }
      localStorage.setItem('cart', JSON.stringify(cart));
      alert('Added to cart!');
    }
  },
};
</script>

<style scoped>
.text-center {
  text-align: center;
}
.my-5 {
  margin-top: 2rem;
  margin-bottom: 2rem;
}
.mx-auto {
  margin-left: auto;
  margin-right: auto;
}
</style>
