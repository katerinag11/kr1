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
components: { Header, FloatingButton, BookingModal, Footer },
methods: {
  openBookingForm(training = null) {
    this.$refs.bookingModal?.open(training)
  }
}
}
</script>