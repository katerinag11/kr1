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
          <p>Наш тренажёрный зал оснащён самым современным оборудованием ведущих мировых брендов: Technogym, Matrix, Life Fitness. Здесь вы найдёте всё необходимое для достижения любых фитнес-целей: от кардиотренировок до серьёзной силовой работы.</p>
          
          <h3>Преимущества:</h3>
          <ul>
            <li> Современное оборудование Technogym, Matrix, Life Fitness</li>
            <li> Зона функционального тренинга</li>
            <li> Зона свободных весов до 200 кг</li>
            <li> Персональные шкафчики</li>
            <li> Бесплатные полотенца</li>
            <li> Питьевая вода и зона отдыха</li>
          </ul>

          <button class="book-btn" @click="openBooking">Записаться на тренировку</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import gym1 from '../assets/gym1.jpg'
import gym2 from '../assets/gym2.jpg'
import gym3 from '../assets/gym3.jpg'
export default {
  name: 'GymPage',
  data() {
    return {
      currentIndex: 0,
      galleryImages: [
        {
          url: gym1, title: 'Современные тренажёры'
        },
        {
          url: gym2,
          title: 'Кардио зона'
        },
        {
          url: gym3,
          title: 'Зона свободных весов '
        }
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
.service-hero {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  text-align: center;
  padding: 8rem 2rem 4rem;
  margin-top: 60px;
}

.service-icon {
  font-size: 4rem;
  margin-bottom: 1rem;
}

.service-hero h1 {
  font-size: 2.5rem;
  margin-bottom: 1rem;
}

.service-hero p {
  font-size: 1.2rem;
}

.service-content {
  padding: 4rem 2rem;
  max-width: 1200px;
  margin: 0 auto;
}

.image-carousel-section {
  margin-bottom: 3rem;
}

.image-carousel-section h2 {
  text-align: center;
  margin-bottom: 2rem;
  color: #2d3748;
}

.simple-carousel {
  position: relative;
  max-width: 800px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  gap: 15px;
}

.carousel-track-container {
  overflow: hidden;
  flex: 1;
  border-radius: 20px;
  box-shadow: 0 10px 30px rgba(0,0,0,0.15);
}

.carousel-track {
  display: flex;
  transition: transform 0.5s ease-in-out;
}

.carousel-card {
  min-width: 100%;
}

.image-card {
  position: relative;
  width: 100%;
}

.gallery-image {
  width: 100%;
  height: 450px;
  object-fit: cover;
  display: block;
}

.image-caption {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: linear-gradient(to top, rgba(0,0,0,0.8), transparent);
  color: white;
  padding: 2rem 1rem 1rem;
  text-align: center;
  font-size: 1.1rem;
  font-weight: 500;
}

.carousel-arrow {
  background: rgba(255,255,255,0.9);
  border: none;
  width: 45px;
  height: 45px;
  border-radius: 50%;
  font-size: 1.5rem;
  cursor: pointer;
  transition: all 0.3s;
  box-shadow: 0 2px 10px rgba(0,0,0,0.2);
  color: #667eea;
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10;
}

.carousel-arrow:hover {
  background: #667eea;
  color: white;
  transform: scale(1.1);
}

.carousel-dots {
  display: flex;
  justify-content: center;
  gap: 12px;
  margin-top: 20px;
}

.dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: #cbd5e0;
  cursor: pointer;
  transition: all 0.3s;
}

.dot:hover {
  background: #667eea;
  transform: scale(1.2);
}

.dot.active {
  background: #667eea;
  width: 30px;
  border-radius: 10px;
}

.service-info h2 {
  color: #2d3748;
  margin-bottom: 1rem;
}

.service-info p {
  color: #4a5568;
  line-height: 1.8;
  margin-bottom: 2rem;
}

.service-info h3 {
  color: #2d3748;
  margin-bottom: 1rem;
}

.service-info ul {
  list-style: none;
  padding: 0;
  margin-bottom: 2rem;
}

.service-info li {
  padding: 0.5rem 0;
  color: #4a5568;
}

.book-btn {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  padding: 12px 30px;
  border-radius: 50px;
  font-size: 1rem;
  cursor: pointer;
  transition: transform 0.2s;
}

.book-btn:hover {
  transform: translateY(-2px);
}

@media (max-width: 768px) {
  .simple-carousel {
    max-width: 100%;
  }
  
  .carousel-arrow {
    width: 35px;
    height: 35px;
    font-size: 1.2rem;
  }
  
  .gallery-image {
    height: 250px;
  }
  
  .service-hero h1 {
    font-size: 1.8rem;
  }
  
  .image-caption {
    font-size: 0.9rem;
    padding: 1rem 0.5rem 0.5rem;
  }
}
</style>