<template>
  <div class="home-page">
    <!-- Hero секция -->
    <section class="hero">
      <v-container>
        <v-row justify="center">
          <v-col cols="12" md="10" lg="8" class="text-center">
            <h1 class="hero-title">Твой путь к идеальной форме начинается здесь</h1>
            <p class="hero-subtitle">Современное оборудование • Профессиональные тренеры • Комфортная атмосфера</p>
            <button class="hero-btn" @click="$emit('openForm')">Получить скидку 90% на первый месяц</button>
          </v-col>
        </v-row>
      </v-container>
    </section>

    <!-- Статистика -->
    <section class="stats">
      <v-container>
        <v-row>
          <v-col v-for="stat in stats" :key="stat.number" cols="12" sm="6" md="3">
            <div class="stat-card">
              <div class="stat-number">{{ stat.number }}</div>
              <div class="stat-label">{{ stat.label }}</div>
            </div>
          </v-col>
        </v-row>
      </v-container>
    </section>

    <!-- Услуги -->
    <section class="services" id="services">
      <v-container>
        <h2 class="section-title">Наши услуги</h2>
        <v-row>
          <v-col v-for="service in services" :key="service.title" cols="12" sm="6" md="3">
            <div class="service-card">
              <div class="service-title">{{ service.title }}</div>
              <p class="service-description">{{ service.description }}</p>
              <button class="service-btn" @click="$emit('openForm')">Подробнее</button>
            </div>
          </v-col>
        </v-row>
      </v-container>
    </section>

    <!-- Тарифы с каруселью -->
    <section class="pricing" id="pricing">
      <v-container>
        <h2 class="section-title white-title">Тарифы</h2>
        
        <div class="carousel-container">
          <button class="carousel-arrow prev" @click="prevSlide">❮</button>
          
          <div class="carousel-wrapper">
            <div class="carousel-track" :style="{ transform: `translateX(-${currentIndex * 100}%)` }">
              <div class="carousel-slide" v-for="tariff in tariffs" :key="tariff.name">
                <div class="price-card" :class="{ featured: tariff.featured }">
                  <h3 class="price-name">{{ tariff.name }}</h3>
                  <div class="price-value">{{ tariff.price }} ₽<span>/мес</span></div>
                  <div class="price-divider"></div>
                  <ul class="price-features">
                    <li v-for="feature in tariff.features" :key="feature">
                      <span class="check-icon">✓</span>
                      {{ feature }}
                    </li>
                  </ul>
                  <button class="price-btn" @click="$emit('openForm')">Выбрать</button>
                </div>
              </div>
            </div>
          </div>
          
          <button class="carousel-arrow next" @click="nextSlide">❯</button>
        </div>
        
        <div class="carousel-dots">
          <span 
            v-for="(_, index) in tariffs" 
            :key="index"
            class="dot"
            :class="{ active: currentIndex === index }"
            @click="goToSlide(index)"
          ></span>
        </div>
      </v-container>
    </section>

    <!-- Контакты -->
    <section class="contact" id="contact">
      <v-container>
        <h2 class="section-title">Контакты</h2>
        <v-row>
          <v-col cols="12" md="6">
            <div class="contact-card">
              <h3>Свяжитесь с нами</h3>
              <div class="contact-item">
                <span class="contact-icon">📞</span>
                <span>+7 (495) 123-45-67</span>
              </div>
              <div class="contact-item">
                <span class="contact-icon">✉️</span>
                <span>hello@fitcomplex.ru</span>
              </div>
              <div class="contact-item">
                <span class="contact-icon">🕐</span>
                <span>Ежедневно: 06:00 – 24:00</span>
              </div>
            </div>
          </v-col>
          <v-col cols="12" md="6">
            <div class="contact-card">
              <h3>Как нас найти</h3>
              <div class="contact-item">
                <span class="contact-icon">📍</span>
                <span>Северодвинск, ул. Капитана Воронина, 6</span>
              </div>
              <div class="map-wrapper">
                <iframe 
                  src="https://yandex.ru/map-widget/v1/?ll=39.805159%2C64.562896&mode=whatshere&whatshere%5Bpoint%5D=39.803663%2C64.563110&whatshere%5Bzoom%5D=17&z=17" 
                  width="100%" 
                  height="250" 
                  frameborder="0" 
                  allowfullscreen="true" 
                  style="border-radius: 12px;">
                </iframe>
              </div>
            </div>
          </v-col>
        </v-row>
      </v-container>
    </section>
  </div>
</template>

<script>
export default {
  name: 'HomePage',
  emits: ['openForm'],
  data() {
    return {
      currentIndex: 0,
      stats: [
        { number: '10+', label: 'Лет опыта' },
        { number: '5 000+', label: 'Довольных клиентов' },
        { number: '3', label: 'Современных зала' },
        { number: '50+', label: 'Групповых программ' }
      ],
      services: [
        { title: 'Тренажёрный зал', description: 'Профессиональное оборудование премиум-класса' },
        { title: 'Групповые тренировки', description: 'Более 50 программ на любой вкус' },
        { title: 'Персональные тренировки', description: 'Индивидуальный подход к каждому' },
        { title: 'СПА-зона', description: 'Восстановление после тренировок' }
      ],
      tariffs: [
        {
          name: 'Старт',
          price: '1 900',
          featured: false,
          features: ['Тренажёрный зал', 'Вводная тренировка', 'Мобильное приложение']
        },
        {
          name: 'Премиум',
          price: '2 999',
          featured: true,
          features: ['Всё из тарифа «Старт»', 'Групповые тренировки', 'СПА-зона', 'Гостевой доступ']
        },
        {
          name: 'Семейный',
          price: '4 500',
          featured: false,
          features: ['Доступ для 2-х человек', 'Все преимущества Премиум', 'Скидка 20%', 'Приоритетная запись']
        }
      ]
    }
  },
  methods: {
    nextSlide() {
      if (this.currentIndex < this.tariffs.length - 1) {
        this.currentIndex++
      } else {
        this.currentIndex = 0
      }
    },
    prevSlide() {
      if (this.currentIndex > 0) {
        this.currentIndex--
      } else {
        this.currentIndex = this.tariffs.length - 1
      }
    },
    goToSlide(index) {
      this.currentIndex = index
    }
  }
}
</script>

<style scoped>
.hero {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  min-height: 500px;
  display: flex;
  align-items: center;
  margin-top: 0;
  padding: 100px 0 80px;
}

.hero-title {
  font-size: 3rem;
  font-weight: 700;
  color: white;
  margin-bottom: 1rem;
  line-height: 1.2;
}

.hero-subtitle {
  font-size: 1.2rem;
  color: rgba(255,255,255,0.95);
  margin-bottom: 2rem;
}

.hero-btn {
  background: white;
  color: #667eea;
  font-weight: 600;
  padding: 12px 32px;
  font-size: 1rem;
  text-transform: none;
  border-radius: 50px;
  border: none;
  cursor: pointer;
  transition: transform 0.3s;
}

.hero-btn:hover {
  transform: translateY(-2px);
}

.stats {
  background: #f8f9fa;
  padding: 60px 0;
}

.stat-card {
  text-align: center;
  background: white;
  padding: 30px 20px;
  border-radius: 16px;
  box-shadow: 0 4px 15px rgba(0,0,0,0.05);
  transition: transform 0.3s;
}

.stat-card:hover {
  transform: translateY(-5px);
}

.stat-number {
  font-size: 2.5rem;
  font-weight: 700;
  color: #667eea;
  margin-bottom: 8px;
}

.stat-label {
  font-size: 1rem;
  color: #4a5568;
}

.services {
  padding: 80px 0;
  background: white;
}

.section-title {
  font-size: 2.2rem;
  font-weight: 600;
  text-align: center;
  margin-bottom: 3rem;
  color: #2d3748;
}

.white-title {
  color: white;
}

.service-card {
  text-align: center;
  padding: 30px 20px;
  border-radius: 16px;
  background: #f8f9fa;
  transition: all 0.3s;
  height: 100%;
}

.service-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 30px rgba(0,0,0,0.1);
}

.service-title {
  font-size: 1.3rem;
  font-weight: 600;
  color: #2d3748;
  margin-bottom: 0.5rem;
}

.service-description {
  color: #718096;
  font-size: 0.9rem;
  margin-bottom: 1rem;
}

.service-btn {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  padding: 8px 20px;
  border-radius: 50px;
  font-size: 0.85rem;
  cursor: pointer;
  transition: transform 0.2s;
}

.service-btn:hover {
  transform: translateY(-2px);
}

.pricing {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 80px 0;
}

.carousel-container {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
  max-width: 500px;
  margin: 0 auto;
  position: relative;
}

.carousel-wrapper {
  overflow: hidden;
  flex: 1;
}

.carousel-track {
  display: flex;
  transition: transform 0.5s ease;
}

.carousel-slide {
  min-width: 100%;
  padding: 10px;
}

.carousel-arrow {
  width: 45px;
  height: 45px;
  border-radius: 50%;
  background: white;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  transition: all 0.3s;
  color: #667eea;
  display: flex;
  align-items: center;
  justify-content: center;
}

.carousel-arrow:hover {
  background: #667eea;
  color: white;
  transform: scale(1.05);
}

.carousel-dots {
  display: flex;
  justify-content: center;
  gap: 12px;
  margin-top: 30px;
}

.dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: rgba(255,255,255,0.5);
  cursor: pointer;
  transition: all 0.3s;
}

.dot:hover {
  background: rgba(255,255,255,0.8);
  transform: scale(1.2);
}

.dot.active {
  background: white;
  width: 30px;
  border-radius: 10px;
}

.price-card {
  background: white;
  border-radius: 24px;
  padding: 30px;
  text-align: center;
  transition: transform 0.3s;
  height: 100%;
}

.price-card:hover {
  transform: translateY(-8px);
}

.price-card.featured {
  transform: scale(1.02);
  box-shadow: 0 15px 40px rgba(0,0,0,0.2);
}

.price-name {
  font-size: 1.6rem;
  font-weight: 600;
  color: #2d3748;
  margin: 10px 0;
}

.price-value {
  font-size: 2rem;
  font-weight: 700;
  color: #667eea;
}

.price-value span {
  font-size: 0.9rem;
  color: #718096;
}

.price-divider {
  width: 50px;
  height: 2px;
  background: #e2e8f0;
  margin: 20px auto;
}

.price-features {
  list-style: none;
  padding: 0;
  margin: 20px 0;
  text-align: left;
}

.price-features li {
  padding: 8px 0;
  color: #4a5568;
  display: flex;
  align-items: center;
  gap: 8px;
}

.check-icon {
  color: #48bb78;
  font-weight: bold;
}

.price-btn {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 50px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;
  width: 100%;
}

.price-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(102, 126, 234, 0.4);
}

.contact {
  padding: 80px 0;
  background: #f8f9fa;
}

.contact-card {
  background: white;
  border-radius: 20px;
  padding: 30px;
  height: 100%;
  box-shadow: 0 4px 15px rgba(0,0,0,0.05);
}

.contact-card h3 {
  font-size: 1.5rem;
  font-weight: 600;
  color: #2d3748;
  margin-bottom: 20px;
}

.contact-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 0;
  color: #4a5568;
}

.contact-icon {
  font-size: 1.2rem;
}

.map-wrapper {
  margin-top: 15px;
  border-radius: 12px;
  overflow: hidden;
}

@media (max-width: 768px) {
  .hero-title {
    font-size: 2rem;
  }
  
  .hero-subtitle {
    font-size: 1rem;
  }
  
  .section-title {
    font-size: 1.8rem;
  }
  
  .carousel-container {
    max-width: 100%;
  }
  
  .carousel-arrow {
    width: 35px;
    height: 35px;
    font-size: 1.2rem;
  }
  
  .price-card.featured {
    transform: scale(1);
  }
}
</style>