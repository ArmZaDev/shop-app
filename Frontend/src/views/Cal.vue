<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" md="6">
        <v-card>
          <v-card-title>
            <h2>Grade Calculator</h2>
          </v-card-title>
          <v-card-text>
            <v-text-field
              v-model="score"
              label="Enter your score"
              type="text"
              outlined
              @input="resetAlerts"
            ></v-text-field>
            <v-btn color="primary" @click="calculateGrade">Calculate Grade</v-btn>

            <v-alert
              v-if="alertMessage"
              type="error"
              dense
              dismissible
              class="mt-4"
            >
              {{ alertMessage }}
            </v-alert>

            <v-alert
              v-if="grade"
              type="success"
              dense
              dismissible
              class="mt-4"
            >
              Your grade is: {{ grade }}
            </v-alert>
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
      score: '',
      grade: '',
      alertMessage: '',
    };
  },
  methods: {
    calculateGrade() {
      const scoreValue = parseFloat(this.score);

      // Validate input
      if (isNaN(scoreValue) || scoreValue < 0 || scoreValue > 100) {
        return this.alertMessage = 'Please enter a valid score between 0 and 100.';
      }

      // Calculate grade based on the score
      if (scoreValue >= 80) {
        this.grade = 'A';
      } else if (scoreValue >= 70) {
        this.grade = 'B';
      } else if (scoreValue >= 60) {
        this.grade = 'C';
      } else if (scoreValue >= 50) {
        this.grade = 'D';
      } else {
        this.grade = 'F';
      }
    },
    resetAlerts() {
      this.grade = '';
      this.alertMessage = '';
    },
  },
};
</script>

<style scoped>
h2 {
  color: #3f51b5;
}
.mt-4 {
  margin-top: 20px;
}
</style>
