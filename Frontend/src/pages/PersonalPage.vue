<template>
<div class="service-page">
  <div class="service-hero">
    <div class="service-icon"></div>
    <h1>Персональные тренировки</h1>
    <p>Индивидуальный подход к каждому</p>
  </div>

  <div class="service-content">
    <div class="container">
      <div class="service-info">
        <h2>О персональных тренировках</h2>
        <p>Персональные тренировки — самый эффективный способ достичь своих целей в кратчайшие сроки. Ваш личный тренер разработает индивидуальную программу с учётом ваших особенностей, целей и физической подготовки.</p>
        
        <h3>Что вы получите:</h3>
        <ul>
          <li>Индивидуальная программа тренировок</li>
          <li> Персональный тренер 24/7</li>
          <li>Разработка плана питания</li>
          <li>Еженедельный контроль прогресса</li>
          <li> Фотофиксация результатов</li>
          <li>Коррекция осанки и техники</li>
        </ul>

        <button class="book-btn" @click="openBooking">Записаться на тренировку</button>
      </div>
    </div>
  </div>
</div>
</template>

<script>
export default {
name: 'PersonalPage',
methods: {
  openBooking() {
    this.$emit('openForm', 'Персональные тренировки')
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