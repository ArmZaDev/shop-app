<template>
  <div>
    <h1>Simple Page</h1>
    <v-btn color="success" @click="show = !show">swicth</v-btn>
    <h2 v-if="show">{{ name }}</h2>

    <v-row>
      <v-col cols="3" v-for="(item, index) in imglist" :key="index">
        <v-card width="300">
          <v-img width="300" :src="item.imglink"></v-img>
          <v-card-title primary-title>
            {{ item.name }}
          </v-card-title>
          <v-card-actions>
            <v-btn color="success" @click="callAlertParam(item.name)"
              >call name</v-btn
            >
          </v-card-actions>
        </v-card>
      </v-col>
      <v-col cols="12">
        <v-btn color="success" @click="callAlert">call alert</v-btn>
      </v-col>
      <v-col cols="12">
        <h1>Message: {{message}}</h1>
        <v-text-field
          name="message"
          label="message"
          id="message"
          v-model="message"
        ></v-text-field>
          <v-btn color="success" @click="callAlertParam(message)">alert message</v-btn>
      </v-col>
      <v-col cols="12">
        <v-btn color="success" @click="callAlert()">call alert</v-btn>
        <v-btn color="success" @click="removeLocal()">remove local</v-btn>
      </v-col>
      <v-col cols="12">
        <subcom :name="name" @callAlert="callAlert" />
      </v-col>
    </v-row>
  </div>
</template>

<script>
import subcom from "../components/SubCom.vue";
import {EventBus } from '@/EventBus'
export default {
  components: {
    subcom
  },
  data() {
    return {
      message: '',
      name: "Nopparat Pongdong",
      show: false,
      imglist: [
        {
          name: "jinhsi",
          imglink:
            "https://wutheringlab.com/wp-content/uploads//Jinshi_icon.png",
        },
        {
          name: "changli",
          imglink:
            "https://wutheringlab.com/wp-content/uploads//Changli_icon.png",
        },
        // { name: "momo", imglink: require("../assets/") },
      ],
    };
  },
  mounted() {
    EventBus.$on('callAlert', this.callAlert)
    EventBus.$on('callAlertParam', this.callAlertParam)
  },
  beforeDestroy() {
    EventBus.$off('callAlert', this.callAlert)
    EventBus.$off('callAlertParam', this.callAlertParam)
  },
  methods: {
    callAlert() {
      alert("⚠️ALERT!⚠️");
    },
    callAlertParam(item) {
      localStorage.setItem("User", item);
      this.$cookies.set("token", item, "30s")
      console.log(this.name);
      alert(item);
    },
    removeLocal() {
      localStorage.removeItem("User");
      alert('remove complete')
    },
  },
};
</script>

<style>
</style>