<template>
  <footer class="footer">
    <div class="footer-content">
      <div class="footer-section">
        <h3>FitComplex</h3>
        <p>Твой путь к идеальной форме начинается здесь</p>
      </div>

      <div class="footer-section">
        <h4>Навигация</h4>
        <ul>
          <li><a href="/">Главная</a></li>
          <li><a href="/raspisanie">Расписание</a></li>
          <li><a href="#services">Услуги</a></li>
          <li><a href="#pricing">Тарифы</a></li>
        </ul>
      </div>

      <div class="footer-section">
        <h4>Контакты</h4>
        <ul>
          <li><a href="tel:+74951234567">+7 (495) 123-45-67</a></li>
          <li><a href="mailto:info@fitcomplex.ru">info@fitcomplex.ru</a></li>
          <li>ул. Капитана Воронина, 6</li>
          <li>Ежедневно: 06:00 – 24:00</li>
        </ul>
      </div>
    </div>

    <div class="footer-bottom">
      <p>© 2026 FitComplex. Все права защищены.</p>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'Footer'
}
</script>

<style scoped>
.footer {
  background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
  color: #fff;
  padding: 3rem 2rem 1rem;
  margin-top: 0;
}

.footer-content {
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  margin-bottom: 2rem;
}

.footer-section h3 {
  font-size: 1.5rem;
  margin-bottom: 1rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}

.footer-section h4 {
  font-size: 1.2rem;
  margin-bottom: 1rem;
  color: #667eea;
}

.footer-section p {
  color: #a0aec0;
  line-height: 1.6;
}

.footer-section ul {
  list-style: none;
  padding: 0;
}

.footer-section ul li {
  margin-bottom: 0.75rem;
  color: #a0aec0;
}

.footer-section ul li a {
  color: #a0aec0;
  text-decoration: none;
  transition: color 0.3s;
}

.footer-section ul li a:hover {
  color: #667eea;
}

.footer-bottom {
  max-width: 1200px;
  margin: 0 auto;
  padding-top: 2rem;
  border-top: 1px solid rgba(255,255,255,0.1);
  text-align: center;
}

.footer-bottom p {
  color: #a0aec0;
  font-size: 0.9rem;
}

@media (max-width: 768px) {
  .footer-content {
    grid-template-columns: 1fr;
    text-align: center;
  }
}
</style>