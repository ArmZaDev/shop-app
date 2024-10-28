<template>
  <div>
    <h1 class="text-center my-5">Shopping Cart</h1>
    <v-row dense>
      <v-col cols="12" v-if="cartItems.length === 0">
        <p class="text-center">Your cart is empty.</p>
      </v-col>
      <v-col
        cols="12"
        md="6"
        lg="4"
        v-for="(item, index) in cartItems"
        :key="index"
      >
        <v-card elevation="3" class="mx-auto">
          <v-card-title>{{ item.name }}</v-card-title>
          <v-card-subtitle class="text-center">
            ${{ (item.price * item.quantity).toFixed(2) }} ({{ item.quantity }})
          </v-card-subtitle>
          <v-card-actions>
            <v-btn @click="increaseQuantity(item)">+</v-btn>
            <v-btn @click="decreaseQuantity(item)">-</v-btn>
            <v-btn text color="error" @click="removeFromCart(item)">Remove</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" class="text-right">
        <h3>Total: ${{ totalPrice.toFixed(2) }}</h3>
      </v-col>
      <v-col cols="12" class="text-right">
        <v-btn color="primary" @click="submitOrder">Place Order</v-btn>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      cartItems: [],
    };
  },
  computed: {
    totalPrice() {
      return this.cartItems.reduce(
        (total, item) => total + item.price * item.quantity,
        0
      );
    },
  },
  created() {
    this.getCart();
  },
  methods: {
    getCart() {
      this.cartItems = JSON.parse(localStorage.getItem("cart")) || [];
    },
    increaseQuantity(item) {
      if (item.quantity < item.stock) {
        item.quantity++;
        this.updateCart();
      } else {
        alert("Not enough stock for this product.");
      }
    },
    decreaseQuantity(item) {
      if (item.quantity > 1) {
        item.quantity--;
        this.updateCart();
      }
    },
    removeFromCart(item) {
      this.cartItems = this.cartItems.filter(
        (cartItem) => cartItem._id !== item._id
      );
      this.updateCart();
    },
    updateCart() {
      localStorage.setItem("cart", JSON.stringify(this.cartItems));
    },
    async submitOrder() {
      try {
        for (const item of this.cartItems) {
          const orderData = {
            quantity: item.quantity,
          };
          console.log(item._id);
          const response = await this.axios.post(
            `http://localhost:3000/api/v1/products/${item._id}/orders`,
            orderData,
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("Token")}`,
              },
            }
          );
          console.log("Order created:", response.data);
        }
        alert("Order successfully placed!");
        this.cartItems = []; // Clear the cart after placing the order
        this.updateCart();
      } catch (error) {
        console.error("Error creating order:", error);
        alert("Failed to place the order. Please try again.");
      }
    },
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
