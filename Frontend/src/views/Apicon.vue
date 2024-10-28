<template>
  <div>
    <h1 class="text-center my-5">Admin Panel</h1>

    <v-row dense>
      <v-col cols="12">
        <v-btn class="mr-2" color="success" @click="newItem()" > New Item</v-btn>
        <v-btn color="info" @click="viewAllOrders" > View All Orders</v-btn>
      </v-col>

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
            <v-btn text color="success" @click="editItem(item)">Edit</v-btn>
            <v-btn text color="error" @click="delItem(item)">Delete</v-btn>
            <v-btn color="info" @click="viewOrders(item)">View Orders</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>

    <v-dialog v-model="dialogedit" max-width="500px">
      <v-card>
        <v-card-title primary-title> {{ savemode }} </v-card-title>
        <v-card-text>
          <v-row>
            <v-col cols="6">
              <v-text-field
                name="name"
                label="Name"
                id="name"
                v-model="productdata.name"
              >
              </v-text-field>
            </v-col>
            <v-col cols="6">
              <v-text-field
                name="description"
                label="Description"
                id="description"
                v-model="productdata.description"
              >
              </v-text-field>
            </v-col>
            <v-col cols="6">
              <v-text-field
                name="price"
                label="Price"
                id="price"
                v-model="productdata.price"
              >
              </v-text-field>
            </v-col>
            <v-col cols="6">
              <v-text-field
                name="stock"
                label="Stock"
                id="stock"
                v-model="productdata.stock"
              >
              </v-text-field>
            </v-col>
            <v-col cols="12">
              <v-file-input
                name="image"
                label="Image"
                id="image"
                v-model="productdata.image"
                accept="image/*"
              >
              </v-file-input>
            </v-col>
          </v-row>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn text color="error" @click="closeItem()">cancel</v-btn>
          <v-btn text color="info" @click="saveSelect()">save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Dialog to display all orders -->
    <v-dialog v-model="dialogOrdersProduct" max-width="600px">
      <v-card>
        <v-card-title primary-title>All Orders</v-card-title>
        <v-card-text>
          <v-list>
            <v-list-item v-for="order in orders" :key="order._id">
              <v-list-item-content>
                <v-list-item-title>Order ID: {{ order._id }}</v-list-item-title>
                <v-list-item-subtitle
                  >Product Name: {{ order.productName }}</v-list-item-subtitle
                >
                <v-list-item-subtitle
                  >Product ID: {{ order.productId }}</v-list-item-subtitle
                >
                <v-list-item-subtitle
                  >Quantity: {{ order.quantity }}</v-list-item-subtitle
                >
                <v-list-item-subtitle
                  >Total Amount: ${{
                    order.totalAmount.toFixed(2)
                  }}</v-list-item-subtitle
                >
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-card-text>
        <v-card-actions>
          <v-btn text @click="dialogOrdersProduct = false">Close</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- view order of product -->
    <v-dialog v-model="dialogOrders" max-width="600px">
      <v-card>
        <v-card-title primary-title
          >Orders for {{ productdata.name }}</v-card-title
        >
        <v-card-text>
          <v-list>
            <v-list-item v-for="order in orders" :key="order._id">
              <v-list-item-content>
                <v-list-item-title>Order ID: {{ order._id }}</v-list-item-title>
                <v-list-item-subtitle
                  >Product Name: {{ order.productName }}</v-list-item-subtitle
                >
                <v-list-item-subtitle
                  >Quantity: {{ order.quantity }}</v-list-item-subtitle
                >
                <v-list-item-subtitle
                  >Total Amount: ${{
                    order.totalAmount.toFixed(2)
                  }}</v-list-item-subtitle
                >
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-card-text>
        <v-card-actions>
          <v-btn text @click="dialogOrders = false">Close</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dialogedit: false,
      dialogOrders: false,
      dialogOrdersProduct: false,
      orders: [],
      id: "",
      apidata: [],
      productdata: {
        name: "",
        description: "",
        price: "",
        stock: "",
        imgLink: ""
      },
      productdefault: {
        name: "",
        description: "",
        price: "",
        stock: "",
        imgLink: ""
      },
    };
  },
  created() {
    if (localStorage.getItem("Token") != undefined) {
      this.getData();
    }
  },
  computed: {
    savemode() {
      return this.id == "" ? "New Item" : "Edit Item";
    },
  },
  methods: {
    newItem() {
      this.id = "";
      this.productdata = { ...this.productdefault };
      this.dialogedit = true;
    },
    editItem(item) {
      if (!item || !item._id) {
        console.error("Invalid item:", item);
        return;
      }
      this.id = item._id;
      this.productdata = { ...item };
      this.dialogedit = true;
    },
    closeItem() {
      this.id = "";
      this.productdata = { ...this.productdefault };
      this.dialogedit = false;
    },
    saveSelect() {
      if (this.id != "") {
        this.savePutData();
      } else {
        this.saveData();
      }
    },
    getData() {
      this.axios
        .get("http://localhost:3000/api/v1/products", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("Token")}`,
          },
        })
        .then((response) => {
          this.apidata = response.data;
        });
    },
    async saveData() {
      try {
        const formData = new FormData();
        formData.append('name', this.productdata.name);
        formData.append('description', this.productdata.description);
        formData.append('price', this.productdata.price);
        formData.append('stock', this.productdata.stock);
        
        // เพิ่มการแนบไฟล์รูปภาพ
        if (this.productdata.image) {
          formData.append('image', this.productdata.image);
        }
        const { data } = await this.axios.post(
          "http://localhost:3000/api/v1/products",
          formData,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("Token")}`,
              'Content-Type': 'multipart/form-data', // ต้องตั้งค่า Content-Type
            },
          }
        );
        console.log(data);
        alert("creaete complete");
        this.getData();
        this.closeItem();
      } catch (error) {
        console.log(error);
      }
    },
    async savePutData() {
      try {
        const formData = new FormData();
        formData.append('name', this.productdata.name);
        formData.append('description', this.productdata.description);
        formData.append('price', this.productdata.price);
        formData.append('stock', this.productdata.stock);
        if (this.productdata.image) {
          formData.append('image', this.productdata.image); // Add image to FormData if new one is selected
        }
        const { data } = await this.axios.put(
          "http://localhost:3000/api/v1/products/" + this.id,
          formData,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("Token")}`,
              'Content-Type': 'multipart/form-data', // Set Content-Type
            },
          }
        );
        console.log(data);
        alert("update complete");
        this.getData();
        this.closeItem();
      } catch (error) {
        console.log(error);
      }
    },
    async delItem(item) {
      if (confirm("delete" + item.name)) {
        try {
          const { data } = await this.axios.delete(
            "http://localhost:3000/api/v1/products/" + item._id,
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("Token")}`,
              },
            }
          );
          console.log(data);
          alert("delete complete");
          this.getData();
          this.closeItem();
        } catch (error) {
          console.log(error);
        }
      }
    },
    async viewAllOrders() {
      try {
        const { data } = await this.axios.get(
          `http://localhost:3000/api/v1/orders`, // Update this URL to match your API endpoint
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("Token")}`,
            },
          }
        );
        this.orders = data;
        this.dialogOrders = true;
      } catch (error) {
        console.error("Error fetching all orders:", error);
        alert("Failed to fetch orders. Please try again.");
      }
    },
    async viewOrders(item) {
      try {
        const { data } = await this.axios.get(
          `http://localhost:3000/api/v1/products/${item._id}/orders`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("Token")}`,
            },
          }
        );
        this.orders = data;
        this.selectedItem = item;
        this.dialogOrders = true;
      } catch (error) {
        console.error("Error fetching orders:", error);
        alert("Failed to fetch orders. Please try again.");
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