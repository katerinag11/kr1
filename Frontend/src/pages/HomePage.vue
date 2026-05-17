<template>
<div class="home-page">
  <section class="hero">
    <h1>Твой путь к идеальной форме начинается здесь</h1>
    <p>Современное оборудование • Профессиональные тренеры • Комфортная атмосфера</p>
    <button class="cta-btn" @click="$emit('openForm')">Получить скидку 90% на первый месяц</button>
  </section>

  <section class="stats">
    <div class="stat-item">
      <h3>10+</h3>
      <p>Лет опыта</p>
    </div>
    <div class="stat-item">
      <h3>5 000+</h3>
      <p>Довольных клиентов</p>
    </div>
    <div class="stat-item">
      <h3>3</h3>
      <p>Современных зала</p>
    </div>
    <div class="stat-item">
      <h3>50+</h3>
      <p>Групповых программ</p>
    </div>
  </section>

  <section id="services" class="services">
    <h2 class="section-title">Наши услуги</h2>
    <div class="services-grid">
      <div class="service-card" v-for="service in services" :key="service.id">
        <div class="service-icon">{{ service.icon }}</div>
        <h3>{{ service.title }}</h3>
        <p>{{ service.description }}</p>
        <button class="service-btn" @click="goToService(service.link)">
          Подробнее →
        </button>
      </div>
    </div>
  </section>

  <section id="pricing" class="pricing">
    <h2 class="section-title white">Тарифы</h2>
    
    <div class="simple-carousel">
      <button class="carousel-arrow prev" @click="prevSlide">❮</button>
      
      <div class="carousel-track-container">
        <div class="carousel-track" :style="{ transform: `translateX(-${currentIndex * 100}%)` }">
          <div class="carousel-card" v-for="tariff in tariffs" :key="tariff.name">
            <div class="price-card glass-card" :class="{ featured: tariff.featured }">
              <h3>{{ tariff.emoji }} {{ tariff.name }}</h3>
              <div class="price">{{ tariff.price }} ₽<span>/мес</span></div>
              <ul>
                <li v-for="feature in tariff.features" :key="feature">{{ feature }}</li>
              </ul>
              <button class="card-btn" @click="$emit('openForm')">Выбрать</button>
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
  </section>

  <section id="contact" class="contact">
    <div class="contact-container">
      <div class="contact-info">
        <h3>Свяжитесь с нами</h3>
        <div class="contact-detail">
          <span><strong>Телефон:</strong> <a href="tel:+74951234567">+7 (495) 123-45-67</a></span>
        </div>
        <div class="contact-detail">
          <span><strong>Email:</strong> <a href="mailto:hello@fitcomplex.ru">hello@fitcomplex.ru</a></span>
        </div>
        <div class="work-hours">
          <p><strong>Ежедневно:</strong> 06:00 – 24:00</p>
        </div>
      </div>
      
      <div class="map-container">
        <h3>Как нас найти</h3>
        <div class="map-wrapper">
          <div style="position:relative;overflow:hidden; border-radius: 16px;">
            <a href="https://yandex.ru/maps/10849/severodvinsk/?utm_medium=mapframe&utm_source=maps" style="color:#eee;font-size:12px;position:absolute;top:0px;left:0px;z-index:1;background:rgba(0,0,0,0.5);padding:2px 5px;border-radius:4px;">Северодвинск</a>
            <a href="https://yandex.ru/maps/10849/severodvinsk/house/ulitsa_kapitana_voronina_6/Z0AYfgdjQEACQFhufXl3c3VlZQ==/?ll=39.805159%2C64.562896&utm_medium=mapframe&utm_source=maps&z=17" style="color:#eee;font-size:12px;position:absolute;top:14px;left:0px;z-index:1;background:rgba(0,0,0,0.5);padding:2px 5px;border-radius:4px;">Улица Капитана Воронина, 6</a>
            <iframe 
              src="https://yandex.ru/map-widget/v1/?ll=39.805159%2C64.562896&mode=whatshere&whatshere%5Bpoint%5D=39.803663%2C64.563110&whatshere%5Bzoom%5D=17&z=17" 
              width="100%" 
              height="300" 
              frameborder="0" 
              allowfullscreen="true" 
              style="position:relative; border-radius: 16px;">
            </iframe>
          </div>
        </div>
        <div class="badge-icon">Бесплатная парковка для членов клуба</div>
      </div>
    </div>
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
    services: [
      {
        id: 1,
        title: 'Тренажёрный зал',
        description: 'Профессиональное оборудование премиум-класса',
        link: '/service/gym'
      },
      {
        id: 2,
        title: 'Групповые тренировки',
        description: 'Более 50 программ на любой вкус',
        link: '/service/group'
      },
      {
        id: 3,
        title: 'Персональные тренировки',
        description: 'Индивидуальный подход к каждому',
        link: '/service/personal'
      },
      {
        id: 4,
        title: 'СПА-зона',
        description: 'Восстановление после тренировок',
        link: '/service/spa'
      }
    ],
    tariffs: [
      {
        name: 'Старт',
        price: '1 900',
        featured: false,
        features: [
          'Тренажёрный зал',
          'Вводная тренировка',
          'Мобильное приложение'
        ]
      },
      {
        name: 'Премиум',
        price: '2 999',
        featured: true,
        features: [
          'Всё из тарифа «Старт»',
          'Групповые тренировки',
          'СПА-зона',
          'Гостевой доступ для друзей',
          'Видеотренировки онлайн'
        ]
      },
      {
        name: 'Семейный',
        price: '4 500',
        featured: false,
        features: [
          'Доступ для 2-х человек',
          'Все преимущества Премиум',
          'Скидка 20% на доп. абонементы',
          'Приоритетная запись'
        ]
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
  },
  goToService(link) {
    this.$router.push(link)
  }
}
}
</script>

<style scoped>
.hero {
background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
color: white;
text-align: center;
padding: 8rem 2rem 5rem;
margin-top: 60px;
}

.hero h1 {
font-size: 2.5rem;
margin-bottom: 1rem;
}

.hero p {
font-size: 1.2rem;
margin-bottom: 2rem;
}

.cta-btn {
background: white;
color: #667eea;
border: none;
padding: 12px 24px;
border-radius: 50px;
font-weight: 600;
cursor: pointer;
transition: transform 0.3s;
}

.cta-btn:hover {
transform: translateY(-2px);
}

.stats {
display: grid;
grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
gap: 2rem;
padding: 3rem 2rem;
background: #f7fafc;
text-align: center;
}

.stat-item {
background: white;
padding: 1.5rem;
border-radius: 16px;
box-shadow: 0 4px 6px rgba(0,0,0,0.1);
}

.stat-item h3 {
font-size: 2rem;
color: #667eea;
}

.stat-item p {
color: #4a5568;
}

.services {
padding: 4rem 2rem;
max-width: 1200px;
margin: 0 auto;
}

.section-title {
text-align: center;
font-size: 2rem;
margin-bottom: 3rem;
color: #2d3748;
}

.section-title.white {
color: white;
}

.services-grid {
display: grid;
grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
gap: 2rem;
}

.service-card {
background: white;
padding: 2rem;
border-radius: 16px;
box-shadow: 0 4px 6px rgba(0,0,0,0.1);
transition: transform 0.3s;
text-align: center;
}

.service-card:hover {
transform: translateY(-5px);
}

.service-icon {
font-size: 3rem;
margin-bottom: 0.5rem;
}

.service-card h3 {
color: #667eea;
margin-bottom: 1rem;
font-size: 1.5rem;
}

.service-card p {
color: #4a5568;
margin-bottom: 1rem;
}

.service-btn {
background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
color: white;
border: none;
padding: 10px 24px;
border-radius: 25px;
cursor: pointer;
font-size: 0.9rem;
transition: transform 0.2s;
margin-top: 0.5rem;
}

.service-btn:hover {
transform: translateY(-2px);
}

.pricing {
background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
padding: 4rem 2rem;
overflow: hidden;
}

.glass-card {
background: rgba(255, 255, 255, 0.15);
backdrop-filter: blur(12px);
border-radius: 20px;
border: 1px solid rgba(255, 255, 255, 0.3);
box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
transition: all 0.3s ease;
}

.glass-card:hover {
background: rgba(255, 255, 255, 0.25);
transform: translateY(-5px);
box-shadow: 0 15px 40px rgba(0, 0, 0, 0.2);
}

.simple-carousel {
position: relative;
max-width: 500px;
margin: 0 auto;
display: flex;
align-items: center;
gap: 15px;
}

.carousel-track-container {
overflow: hidden;
flex: 1;
border-radius: 20px;
}

.carousel-track {
display: flex;
transition: transform 0.5s ease-in-out;
}

.carousel-card {
min-width: 100%;
padding: 10px;
}

.price-card {
padding: 2rem;
text-align: center;
color: white;
}

.price-card h3 {
font-size: 1.8rem;
margin-bottom: 1rem;
color: white;
}

.price {
font-size: 2.5rem;
font-weight: bold;
color: #ffd700;
margin: 1rem 0;
}

.price span {
font-size: 1rem;
color: rgba(255,255,255,0.7);
}

.price-card ul {
list-style: none;
margin: 1.5rem 0;
text-align: left;
}

.price-card li {
margin: 0.75rem 0;
padding: 0.25rem 0;
font-size: 0.95rem;
color: rgba(255,255,255,0.9);
}

.price-card.featured {
border: 2px solid #ffd700;
position: relative;
}

.price-card.featured::before {
content: "ПОПУЛЯРНЫЙ";
position: absolute;
top: -15px;
left: 50%;
transform: translateX(-50%);
background: #ffd700;
color: #333;
padding: 5px 15px;
border-radius: 20px;
font-size: 0.8rem;
font-weight: bold;
white-space: nowrap;
}

.card-btn {
background: rgba(255,255,255,0.2);
color: white;
border: 1px solid rgba(255,255,255,0.5);
padding: 12px 24px;
border-radius: 50px;
font-weight: 600;
cursor: pointer;
transition: all 0.3s;
margin-top: 1rem;
width: 100%;
}

.card-btn:hover {
background: white;
color: #667eea;
transform: translateY(-2px);
}

.carousel-arrow {
background: rgba(255,255,255,0.3);
backdrop-filter: blur(10px);
border: 1px solid rgba(255,255,255,0.5);
width: 45px;
height: 45px;
border-radius: 50%;
font-size: 1.5rem;
cursor: pointer;
transition: all 0.3s;
color: white;
display: flex;
align-items: center;
justify-content: center;
}

.carousel-arrow:hover {
background: rgba(255,255,255,0.5);
transform: scale(1.1);
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

.contact {
padding: 4rem 2rem;
background: #f7fafc;
}

.contact-container {
display: grid;
grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
gap: 2rem;
max-width: 1200px;
margin: 0 auto;
}

.contact-info {
background: white;
padding: 2rem;
border-radius: 16px;
box-shadow: 0 4px 6px rgba(0,0,0,0.1);
}

.contact-info h3, .map-container h3 {
color: #2d3748;
margin-bottom: 1rem;
}

.contact-detail {
margin: 1rem 0;
}

.contact-detail a {
color: #667eea;
text-decoration: none;
}

.work-hours {
margin-top: 1.5rem;
padding-top: 1rem;
border-top: 1px solid #e5e7eb;
}

.map-container {
background: white;
padding: 2rem;
border-radius: 16px;
box-shadow: 0 4px 6px rgba(0,0,0,0.1);
}

.map-wrapper {
margin: 1rem 0;
border-radius: 16px;
overflow: hidden;
}

.badge-icon {
display: inline-block;
background: #667eea;
color: white;
padding: 0.5rem 1rem;
border-radius: 50px;
font-size: 0.9rem;
text-align: center;
width: 100%;
margin-top: 1rem;
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

.price-card {
  padding: 1.5rem;
}

.price-card h3 {
  font-size: 1.4rem;
}

.price {
  font-size: 2rem;
}

.contact-container {
  grid-template-columns: 1fr;
}
}
</style>