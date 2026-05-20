<template>
  <v-footer class="footer" padless>
    <v-container>
      <v-row justify="space-between" align="start">
        <v-col cols="12" md="4" class="text-center text-md-left">
          <div class="logo">FitComplex</div>
          <p class="description">Твой путь к идеальной форме начинается здесь</p>
        </v-col>
        
        <v-col cols="12" md="4" class="text-center">
          <h4>Навигация</h4>
          <div class="footer-links">
            <a href="/" class="footer-link">Главная</a>
            <a href="/raspisanie" class="footer-link">Расписание</a>
            <a href="#services" class="footer-link">Услуги</a>
            <a href="#pricing" class="footer-link">Тарифы</a>
          </div>
        </v-col>
        
        <v-col cols="12" md="4" class="text-center text-md-right">
          <h4>Контакты</h4>
          <div class="contact-info">
            <p><a href="tel:+74951234567" class="contact-link">+7 (495) 123-45-67</a></p>
            <p><a href="mailto:info@fitcomplex.ru" class="contact-link">info@fitcomplex.ru</a></p>
            <p>Северодвинск, ул. Капитана Воронина, 6</p>
            <p>Ежедневно: 06:00 – 24:00</p>
          </div>
        </v-col>
      </v-row>
      
      <v-divider class="my-4" light></v-divider>
      
      <v-row justify="center">
        <v-col cols="auto">
          <div class="copyright">© 2026 FitComplex. Все права защищены.</div>
        </v-col>
      </v-row>
    </v-container>
  </v-footer>
</template>

<script>
export default {
  name: 'Footer'
}
</script>

<style scoped>
.footer {
  background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
  color: #ffffff;
  margin-top: 3rem;
  padding: 3rem 0 1rem;
}

.logo {
  font-size: 1.8rem;
  font-weight: bold;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  margin-bottom: 0.5rem;
}

.description {
  color: #a0aec0;
  font-size: 0.9rem;
  line-height: 1.5;
}

h4 {
  color: #667eea;
  font-size: 1.1rem;
  margin-bottom: 1rem;
  font-weight: 600;
}

.footer-links {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.footer-link {
  color: #a0aec0;
  text-decoration: none;
  transition: color 0.3s;
  font-size: 0.9rem;
}

.footer-link:hover {
  color: #667eea;
}

.contact-info p {
  margin: 0.5rem 0;
  color: #a0aec0;
  font-size: 0.9rem;
}

.contact-link {
  color: #a0aec0;
  text-decoration: none;
  transition: color 0.3s;
}

.contact-link:hover {
  color: #667eea;
}

.copyright {
  color: #a0aec0;
  font-size: 0.8rem;
  text-align: center;
}

@media (max-width: 768px) {
  .footer-links {
    flex-direction: row;
    justify-content: center;
    flex-wrap: wrap;
    gap: 1rem;
  }
  
  .contact-info p {
    margin: 0.25rem 0;
  }
}
</style>