<template>
  <v-footer class="footer" padless>
    <v-container>
      <v-row justify="space-between" align="center">
        <v-col cols="12" md="4" class="text-center text-md-left">
          <div class="logo">FitComplex</div>
          <p class="description">Твой путь к идеальной форме начинается здесь</p>
        </v-col>
        
        <v-col cols="12" md="4" class="text-center">
          <h4>Навигация</h4>
          <v-btn text to="/" class="footer-link">Главная</v-btn>
          <v-btn text to="/raspisanie" class="footer-link">Расписание</v-btn>
        </v-col>
        
        <v-col cols="12" md="4" class="text-center text-md-right">
          <h4>Контакты</h4>
          <p>+7 (495) 123-45-67</p>
          <p>info@fitcomplex.ru</p>
          <p>Северодвинск, ул. Капитана Воронина, 6</p>
        </v-col>
      </v-row>
      
      <v-divider class="my-4" light></v-divider>
      
      <v-row justify="center">
        <v-col cols="auto">
          <span class="copyright">© 2026 FitComplex. Все права защищены.</span>
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
}

h4 {
  color: #667eea;
  font-size: 1.1rem;
  margin-bottom: 1rem;
}

.footer-link {
  color: #a0aec0;
  text-transform: none;
  margin: 0 4px;
}

.footer-link:hover {
  color: #667eea;
  background: transparent;
}

.copyright {
  color: #a0aec0;
  font-size: 0.8rem;
}

p {
  color: #a0aec0;
  margin: 0.25rem 0;
}
</style>