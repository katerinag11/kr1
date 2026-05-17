<template>
  <div class="service-page">
    <div class="service-hero">
      <h1>Тренажёрный зал</h1>
      <p>Профессиональное оборудование премиум-класса</p>
    </div>

    <div class="service-content">
      <div class="container">
        <div class="image-carousel-section">
          <h2>Фотогалерея</h2>
          
          <div class="simple-carousel">
            <button class="carousel-arrow prev" @click="prevSlide">❮</button>
            
            <div class="carousel-track-container">
              <div class="carousel-track" :style="{ transform: `translateX(-${currentIndex * 100}%)` }">
                <div class="carousel-card" v-for="(image, index) in galleryImages" :key="index">
                  <div class="image-card">
                    <img :src="image.url" :alt="image.title" class="gallery-image">
                    <div class="image-caption">{{ image.title }}</div>
                  </div>
                </div>
              </div>
            </div>
            
            <button class="carousel-arrow next" @click="nextSlide">❯</button>
          </div>
          
          <div class="carousel-dots">
            <span 
              v-for="(_, index) in galleryImages" 
              :key="index"
              class="dot"
              :class="{ active: currentIndex === index }"
              @click="goToSlide(index)"
            ></span>
          </div>
        </div>
        
        <div class="service-info">
          <h2>О тренажёрном зале</h2>
          <p>Наш тренажёрный зал оснащён самым современным оборудованием ведущих мировых брендов: Technogym, Matrix, Life Fitness.</p>
          
          <h3>Преимущества:</h3>
          <ul>
            <li>Современное оборудование Technogym, Matrix, Life Fitness</li>
            <li>Зона функционального тренинга</li>
            <li>Зона свободных весов до 200 кг</li>
            <li>Персональные шкафчики</li>
            <li>Бесплатные полотенца</li>
            <li>Питьевая вода и зона отдыха</li>
          </ul>

          <button class="book-btn" @click="openBooking">Записаться на тренировку</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// Используем относительные пути от текущего файла
import gym1 from '../assets/gym1.jpg'
import gym2 from '../assets/gym2.jpg'
import gym3 from '../assets/gym3.jpg'

export default {
  name: 'GymPage',
  data() {
    return {
      currentIndex: 0,
      galleryImages: [
        { url: gym1, title: 'Современные тренажёры' },
        { url: gym2, title: 'Зона свободных весов' },
        { url: gym3, title: 'Кардио зона' }
      ]
    }
  },
  methods: {
    nextSlide() {
      if (this.currentIndex < this.galleryImages.length - 1) {
        this.currentIndex++
      } else {
        this.currentIndex = 0
      }
    },
    prevSlide() {
      if (this.currentIndex > 0) {
        this.currentIndex--
      } else {
        this.currentIndex = this.galleryImages.length - 1
      }
    },
    goToSlide(index) {
      this.currentIndex = index
    },
    openBooking() {
      this.$emit('openForm', 'Тренажёрный зал')
    }
  }
}
</script>

<style scoped>
/* ваши стили */
</style>
