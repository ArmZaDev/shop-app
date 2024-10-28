<template>
  <v-container>
    <v-row justify="center">
      <!-- Card for Personal Introduction -->
      <v-col cols="12" md="8">
        <v-card>
          <v-card-title>
            <h2>Self-Introduction</h2>
          </v-card-title>
          <v-card-text>
            <v-divider></v-divider>
            <h3>Personal Information</h3>
            <p><strong>Full Name:</strong> {{ full_name }}</p>
            <p><strong>Nickname:</strong> {{ nick_name }}</p>
            <p><strong>Graduated from:</strong> {{ graduated }}</p>
            <p><strong>Major:</strong> {{ major }}</p>

            <v-divider class="my-4"></v-divider>
            <h3>Hobbies</h3>
            <ul>
              <li v-for="(item, index) in hobbies" :key="index">{{ item }}</li>
            </ul>

            <v-divider class="my-4"></v-divider>
            <h3>Likes and Dislikes</h3>
            <p><strong>Likes:</strong> {{ likes.join(', ') }}</p>
            <p><strong>Dislikes:</strong> {{ dislikes.join(', ') }}</p>

            <v-divider class="my-4"></v-divider>
            <h3>Strengths</h3>
            <ul>
              <li v-for="(item, index) in strengths" :key="index">{{ item }}</li>
            </ul>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      full_name: 'Nopparat Pongdong',
      nick_name: 'Arm',
      graduated: 'Rangsit University',
      major: 'Computer Engineering',
      hobbies: ['Watching movies', 'Listening to music', 'Playing games', 'Reading', 'Coding'],
      likes: ['Food', 'Mountains', 'Beaches', 'Video games'],
      dislikes: ['Uncertainty', 'Waiting'],
      strengths: ['Creative Thinking', 'Team Player', 'Systematic Problem Solving'],
    };
  }
};
</script>

<style scoped>
h2 {
  color: #3f51b5;
}
h3 {
  margin-top: 20px;
  color: #673ab7;
}
p, li {
  margin: 0 0 10px 0;
}
.my-4 {
  margin: 20px 0;
}
</style>
