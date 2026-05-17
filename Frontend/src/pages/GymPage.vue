<template>
<div class="service-page">
  <div class="service-hero">
    <h1>Тренажёрный зал</h1>
    <p>Профессиональное оборудование премиум-класса</p>
  </div>

  <div class="service-content">
    <div class="container">
      <div class="service-info">
        <h2>О тренажёрном зале</h2>
        <p>Наш тренажёрный зал оснащён самым современным оборудованием ведущих мировых брендов: Technogym, Matrix, Life Fitness. Здесь вы найдёте всё необходимое для достижения любых фитнес-целей: от кардиотренировок до серьёзной силовой работы.</p>
        
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
export default {
name: 'GymPage',
methods: {
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

.service-hero h1 {
font-size: 2.5rem;
margin-bottom: 1rem;
}

.service-content {
padding: 4rem 2rem;
max-width: 1200px;
margin: 0 auto;
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
</style>