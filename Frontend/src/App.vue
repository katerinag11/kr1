<template>
  <v-app>
    <Header />
    <v-main>
      <router-view @openForm="openBookingForm" />
    </v-main>
    <FloatingButton @click="openBookingForm" />
    <BookingModal ref="bookingModal" />
    <Footer />
  </v-app>
</template>

<script>
import Header from './components/Header.vue'
import FloatingButton from './components/FloatingButton.vue'
import BookingModal from './components/BookingModal.vue'
import Footer from './components/Footer.vue'

export default {
  name: 'App',
  components: {
    Header,
    FloatingButton,
    BookingModal,
    Footer
  },
  methods: {
    openBookingForm(training = null) {
      if (this.$refs.bookingModal) {
        this.$refs.bookingModal.open(training)
      }
    }
  }
}
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  background: #f5f5f5;
}
</style>