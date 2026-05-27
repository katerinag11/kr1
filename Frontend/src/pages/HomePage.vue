<template>
  <div class="home-page">
    <section class="hero">
      <div class="container">
        <div class="hero-content">
          <h1 class="hero-title">Твой путь к идеальной форме начинается здесь</h1>
          <p class="hero-subtitle">Современное оборудование • Профессиональные тренеры • Комфортная атмосфера</p>
          <button class="hero-btn" @click="$emit('openForm')">Получить скидку 90% на первый месяц</button>
        </div>
      </div>
    </section>

    <section class="stats">
      <div class="container">
        <div class="stats-grid">
          <div class="stat-card" v-for="stat in stats" :key="stat.number">
            <div class="stat-number">{{ stat.number }}</div>
            <div class="stat-label">{{ stat.label }}</div>
          </div>
        </div>
      </div>
    </section>

    <section class="services" id="services">
      <div class="container">
        <h2 class="section-title">Наши услуги</h2>
        <div class="services-grid">
          <div class="service-card" v-for="service in services" :key="service.id">
            <div class="service-title">{{ service.title }}</div>
            <p class="service-description">{{ service.description }}</p>
            <button class="service-btn" @click="$router.push(service.link)">
              Подробнее 
            </button>
          </div>
        </div>
      </div>
    </section>


    <section class="pricing" id="pricing">
      <div class="container">
        <h2 class="section-title white-title">Тарифы</h2>
        <div class="pricing-grid">
          <div class="price-card" v-for="tariff in tariffs" :key="tariff.name" :class="{ featured: tariff.featured }">
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
    </section>


    <section class="contact" id="contact">
      <div class="container">
        <h2 class="section-title">Контакты</h2>
        <div class="contact-grid">
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
      stats: [
        { number: '10+', label: 'Лет опыта' },
        { number: '5 000+', label: 'Довольных клиентов' },
        { number: '3', label: 'Современных зала' },
        { number: '50+', label: 'Групповых программ' }
      ],
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
          features: ['Тренажёрный зал', 'Вводная тренировка', 'Мобильное приложение']
        },
        {
          name: 'Премиум',
          price: '2 999',
          featured: true,
          features: ['Всё из тарифа Старт', 'Групповые тренировки', 'СПА-зона', 'Гостевой доступ']
        },
        {
          name: 'Семейный',
          price: '4 500',
          featured: false,
          features: ['Доступ для 2-х человек', 'Все преимущества Премиум', 'Скидка 20%', 'Приоритетная запись']
        }
      ]
    }
  }
}
</script>

<style scoped>
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

.hero {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 100px 0 80px;
  margin-top: 0;
  text-align: center;
}

.hero-title {
  font-size: 3rem;
  font-weight: 700;
  color: white;
  margin-bottom: 1rem;
}

.hero-subtitle {
  font-size: 1.2rem;
  color: rgba(255,255,255,0.9);
  margin-bottom: 2rem;
}

.hero-btn {
  background: white;
  color: #667eea;
  border: none;
  padding: 12px 32px;
  font-size: 1rem;
  font-weight: 600;
  border-radius: 50px;
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

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 30px;
}

.stat-card {
  text-align: center;
  background: white;
  padding: 30px;
  border-radius: 16px;
  box-shadow: 0 4px 15px rgba(0,0,0,0.05);
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

.services-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 30px;
}

.service-card {
  text-align: center;
  padding: 30px;
  background: #f8f9fa;
  border-radius: 16px;
  transition: transform 0.3s;
}

.service-card:hover {
  transform: translateY(-5px);
}

.service-title {
  font-size: 1.3rem;
  font-weight: 600;
  color: #2d3748;
  margin-bottom: 0.5rem;
}

.service-description {
  color: #718096;
  margin-bottom: 1rem;
}

.service-btn {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  padding: 8px 20px;
  border-radius: 50px;
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

.pricing-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 30px;
}

.price-card {
  background: white;
  border-radius: 20px;
  padding: 30px;
  text-align: center;
  transition: transform 0.3s;
}

.price-card:hover {
  transform: translateY(-5px);
}

.price-card.featured {
  transform: scale(1.02);
  box-shadow: 0 15px 40px rgba(0,0,0,0.2);
}

.price-name {
  font-size: 1.6rem;
  font-weight: 600;
  color: #2d3748;
}

.price-value {
  font-size: 2rem;
  font-weight: 700;
  color: #667eea;
  margin: 15px 0;
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
  width: 100%;
}

.price-btn:hover {
  transform: translateY(-2px);
}

.contact {
  padding: 80px 0;
  background: #f8f9fa;
}

.contact-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 30px;
}

.contact-card {
  background: white;
  border-radius: 20px;
  padding: 30px;
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
  
  .price-card.featured {
    transform: scale(1);
  }
  
  .contact-grid {
    grid-template-columns: 1fr;
  }
  
  .services-grid {
    grid-template-columns: 1fr;
  }
  
  .stats-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}
</style>