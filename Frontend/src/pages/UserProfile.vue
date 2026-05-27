<template>
  <div class="user-profile">
    <div class="profile-header">
      <h1>Личный кабинет</h1>
      <button class="logout-btn" @click="logout">Выйти</button>
    </div>

    <div class="profile-content">
      <div class="profile-card">
        <div class="profile-card-header">
          <h2> Мои данные</h2>
          <button class="edit-btn" v-if="!editMode" @click="startEdit">Редактировать</button>
        </div>
        <div class="profile-completion">
          <span class="completion-label">Профиль заполнен на</span>
          <div class="completion-bar">
            <div class="completion-fill" :style="{ width: getProfileCompletion() + '%' }"></div>
          </div>
          <span class="completion-value">{{ getProfileCompletion() }}%</span>
        </div>

        <div v-if="editMode" class="profile-edit-form">
          <div class="form-row">
            <label>Имя</label>
            <input v-model="profileForm.username" type="text" />
          </div>
          <div class="form-row">
            <label>Email</label>
            <input v-model="profileForm.email" type="email" />
          </div>
          <div class="form-row">
            <label>Телефон</label>
            <input v-model="profileForm.phone" type="text" />
          </div>
          <div class="form-row">
            <label>Город</label>
            <input v-model="profileForm.city" type="text" />
          </div>
          <div class="form-row">
            <label>Цель</label>
            <input v-model="profileForm.goal" type="text" />
          </div>
          <div class="form-row">
            <label>Рост</label>
            <input v-model.number="profileForm.height" type="number" min="0" />
          </div>
          <div class="form-row">
            <label>Вес</label>
            <input v-model.number="profileForm.weight" type="number" min="0" />
          </div>
          <div class="form-row">
            <label>Дата рождения</label>
            <input v-model="profileForm.birthday" type="text" placeholder="ДД.MM.ГГГГ" />
          </div>
          <div class="form-row">
            <label>Пол</label>
            <select v-model="profileForm.gender">
              <option>Мужской</option>
              <option>Женский</option>
              <option>Не указан</option>
            </select>
          </div>
          <div class="actions-row">
            <button class="save-btn" @click="saveProfile" :disabled="saving">{{ saving ? 'Сохранение...' : 'Сохранить' }}</button>
            <button class="cancel-btn" @click="cancelEdit" type="button">Отмена</button>
          </div>
          <div v-if="profileMessage" class="profile-message">{{ profileMessage }}</div>
        </div>

        <div v-else class="user-info">
          <div class="info-row">
            <span class="label">Имя:</span>
            <span class="value">{{ user.username || 'Не указано' }}</span>
          </div>
          <div class="info-row">
            <span class="label">Email:</span>
            <span class="value">{{ user.email }}</span>
          </div>
          <div class="info-row">
            <span class="label">Дата регистрации:</span>
            <span class="value">{{ user.date || '20.05.2026' }}</span>
          </div>
          <div class="info-row">
            <span class="label">Телефон:</span>
            <span class="value">{{ user.phone || 'Не указан' }}</span>
          </div>
          <div class="info-row">
            <span class="label">Город:</span>
            <span class="value">{{ user.city || 'Не указан' }}</span>
          </div>
          <div class="info-row">
            <span class="label">Цель:</span>
            <span class="value">{{ user.goal || 'Не указана' }}</span>
          </div>
          <div class="info-row">
            <span class="label">Рост:</span>
            <span class="value">{{ user.height ? user.height + ' см' : 'Не указан' }}</span>
          </div>
          <div class="info-row">
            <span class="label">Вес:</span>
            <span class="value">{{ user.weight ? user.weight + ' кг' : 'Не указан' }}</span>
          </div>
          <div class="info-row">
            <span class="label">Дата рождения:</span>
            <span class="value">{{ user.birthday || 'Не указана' }}</span>
          </div>
          <div class="info-row">
            <span class="label">Пол:</span>
            <span class="value">{{ user.gender || 'Не указан' }}</span>
          </div>
        </div>
      </div>


      <div class="subscription-card">
        <h2>Мой абонемент</h2>
        <div v-if="user.subscription && user.subscription !== 'none'" class="subscription-info">
          <div class="sub-name">{{ getUserSubscriptionName() }}</div>
          <div class="sub-price">{{ getUserSubscriptionPrice() }} ₽/мес</div>
          <div class="sub-validity">
            Действует до: {{ subscriptionValidUntil }}
          </div>
          <div class="sub-features">
            <span v-for="feature in getUserSubscriptionFeatures()" :key="feature">
              {{ feature }}
            </span>
          </div>
        </div>
        <div v-else class="no-subscription">
          <p> У вас нет активного абонемента</p>
          <button class="buy-btn" @click="goToTariffs">
            Выбрать абонемент
          </button>
        </div>
      </div>

      <div class="schedule-card">
        <h2> Мои тренировки</h2>
        <div class="schedule-filters">
          <button 
            v-for="filter in filters" 
            :key="filter"
            class="filter-btn"
            :class="{ active: activeFilter === filter }"
            @click="activeFilter = filter"
          >
            {{ filter }}
          </button>
        </div>

        <div class="bookings-list">
          <div v-if="filteredBookings.length === 0" class="empty-schedule">
            <p>У вас пока нет запланированных тренировок</p>
            <button class="book-btn" @click="goToSchedule">
              Записаться на тренировку
            </button>
          </div>
          <div v-else class="booking-items">
            <div v-for="booking in filteredBookings" :key="booking.id" class="booking-item">
              <div class="booking-date">{{ booking.date }}</div>
              <div class="booking-time">{{ booking.time }}</div>
              <div class="booking-name">{{ booking.training }}</div>
              <span :class="'status-' + booking.status" class="booking-status">
                {{ getStatusText(booking.status) }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import api from '../api'

export default {
  name: 'UserProfile',
  data() {
    return {
      user: {},
      profileForm: {},
      editMode: false,
      saving: false,
      profileMessage: '',
      activeFilter: 'Все',
      filters: ['Все', 'Активные', 'Завершённые'],
      bookings: [],
      subscriptionsList: [
        { id: 1, name: 'Старт', price: '1 900', features: [' Тренажёрный зал', ' Мобильное приложение', ' Вводная тренировка'] },
        { id: 2, name: 'Премиум', price: '2 999', features: ['Тренажёрный зал', ' Групповые тренировки', 'СПА-зона', ' Гостевой доступ', ' Видеотренировки'] },
        { id: 3, name: 'Семейный', price: '4 500', features: ['Доступ для 2-х', ' Все преимущества Премиум', ' Скидка 20%', ' Приоритетная запись'] }
      ],
      subscriptionValidUntil: '15.07.2026'
    }
  },
  computed: {
    filteredBookings() {
      if (this.activeFilter === 'Все') return this.bookings
      if (this.activeFilter === 'Активные') return this.bookings.filter(b => b.status === 'confirmed' || b.status === 'new')
      if (this.activeFilter === 'Завершённые') return this.bookings.filter(b => b.status === 'completed')
      return this.bookings
    }
  },
  mounted() {
    this.loadUserData()
    this.loadUserBookings()
  },
  methods: {
    loadUserData() {
      const userData = localStorage.getItem('user')
      const defaultUser = {
        username: 'Гость',
        email: 'guest@fitcomplex.ru',
        date: '20.05.2026',
        subscription: 'Премиум',
        phone: '+7 (900) 000-00-00',
        city: 'Северодвинск',
        goal: 'Поддерживать форму',
        height: 175,
        weight: 70,
        birthday: '01.01.1990',
        gender: 'Не указан'
      }

      if (userData) {
        this.user = { ...defaultUser, ...JSON.parse(userData) }
      } else {
        this.user = defaultUser
      }
      this.profileForm = { ...this.user }
    },
    async loadUserBookings() {
      try {
        const response = await api.get('/bookings/user')
        if (response.data.success) {
          this.bookings = response.data.data
        }
      } catch (error) {
  
        this.bookings = [
          { id: 1, date: '22.05.2026', time: '18:00', training: ' Йога', status: 'confirmed' },
          { id: 2, date: '24.05.2026', time: '19:00', training: ' Кроссфит', status: 'confirmed' },
          { id: 3, date: '26.05.2026', time: '10:00', training: ' Пилатес', status: 'completed' },
          { id: 4, date: '28.05.2026', time: '17:00', training: ' Танцы', status: 'new' }
        ]
      }
    },
    getUserSubscriptionName() {
      if (!this.user.subscription || this.user.subscription === 'none') return 'Нет абонемента'
      const sub = this.subscriptionsList.find(s => {
        const normalizedCurrent = String(this.user.subscription).toLowerCase().replace(/\s+/g, '')
        const normalizedName = s.name.toLowerCase().replace(/\s+/g, '')
        return normalizedName === normalizedCurrent || s.name === this.user.subscription
      })
      return sub ? sub.name : this.user.subscription
    },
    getUserSubscriptionPrice() {
      const sub = this.subscriptionsList.find(s => {
        const normalizedCurrent = String(this.user.subscription).toLowerCase().replace(/\s+/g, '')
        const normalizedName = s.name.toLowerCase().replace(/\s+/g, '')
        return normalizedName === normalizedCurrent || s.name === this.user.subscription
      })
      return sub ? sub.price : '0'
    },
    getUserSubscriptionFeatures() {
      const sub = this.subscriptionsList.find(s => {
        const normalizedCurrent = String(this.user.subscription).toLowerCase().replace(/\s+/g, '')
        const normalizedName = s.name.toLowerCase().replace(/\s+/g, '')
        return normalizedName === normalizedCurrent || s.name === this.user.subscription
      })
      return sub ? sub.features : []
    },
    getStatusText(status) {
      const statuses = { 
        new: ' Новая', 
        confirmed: ' Активная', 
        completed: ' Завершена',
        cancelled: ' Отменена'
      }
      return statuses[status] || status
    },
    startEdit() {
      this.editMode = true
      this.profileMessage = ''
      this.profileForm = { ...this.user }
    },
    cancelEdit() {
      this.editMode = false
      this.profileMessage = ''
      this.profileForm = { ...this.user }
    },
    async saveProfile() {
      if (!this.user.id) {
        this.profileMessage = 'Невозможно сохранить профиль: отсутствует ID пользователя.'
        return
      }
      this.saving = true
      this.profileMessage = ''
      try {
        const response = await api.put(`/users/${this.user.id}`, {
          username: this.profileForm.username,
          email: this.profileForm.email,
          phone: this.profileForm.phone,
          city: this.profileForm.city,
          goal: this.profileForm.goal,
          height: this.profileForm.height,
          weight: this.profileForm.weight,
          birthday: this.profileForm.birthday,
          gender: this.profileForm.gender
        })

        if (response.data.success) {
          this.user = { ...this.user, ...response.data.data }
          localStorage.setItem('user', JSON.stringify(this.user))
          this.editMode = false
          this.profileMessage = 'Профиль успешно сохранён'
        } else {
          this.profileMessage = response.data.message || 'Не удалось сохранить профиль'
        }
      } catch (error) {
        this.profileMessage = error.response?.data?.message || error.message || 'Ошибка сохранения профиля'
      } finally {
        this.saving = false
      }
    },
    getProfileCompletion() {
      const fields = ['username', 'email', 'date', 'phone', 'city', 'goal', 'height', 'weight', 'birthday', 'gender']
      const filled = fields.reduce((count, field) => {
        const value = this.user[field]
        return count + (value !== undefined && value !== null && value !== '' ? 1 : 0)
      }, 0)
      return Math.round((filled / fields.length) * 100)
    },
    goToTariffs() {
      this.$router.push('/#pricing')
      setTimeout(() => {
        const element = document.getElementById('pricing')
        if (element) element.scrollIntoView({ behavior: 'smooth' })
      }, 100)
    },
    goToSchedule() {
      this.$router.push('/raspisanie')
    },
    logout() {
      localStorage.clear()
      sessionStorage.clear()
      this.$router.push('/login')
    }
  }
}
</script>

<style scoped>
.user-profile {
  max-width: 1000px;
  margin: 80px auto 0;
  padding: 2rem;
}

.profile-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  padding-bottom: 1rem;
  border-bottom: 2px solid #e5e7eb;
}

.profile-header h1 {
  color: #2d3748;
  font-size: 1.8rem;
}

.logout-btn {
  background: #ef4444;
  color: white;
  border: none;
  padding: 8px 20px;
  border-radius: 8px;
  cursor: pointer;
  font-size: 0.9rem;
  transition: background 0.2s;
}

.logout-btn:hover {
  background: #dc2626;
}

.profile-content {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.profile-card, .subscription-card, .schedule-card {
  background: white;
  border-radius: 20px;
  padding: 1.5rem;
  box-shadow: 0 4px 15px rgba(0,0,0,0.08);
  transition: transform 0.2s, box-shadow 0.2s;
}

.profile-card:hover, .subscription-card:hover, .schedule-card:hover {
  box-shadow: 0 8px 25px rgba(0,0,0,0.12);
}

.profile-card h2, .subscription-card h2, .schedule-card h2 {
  color: #2d3748;
  margin-bottom: 1.5rem;
  border-left: 4px solid #667eea;
  padding-left: 1rem;
  font-size: 1.3rem;
}

.user-info {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.profile-completion {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 1.25rem;
}

.completion-label {
  color: #4a5568;
  font-weight: 600;
}

.profile-card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
}

.edit-btn,
.save-btn,
.cancel-btn {
  background: #667eea;
  color: white;
  border: none;
  border-radius: 12px;
  padding: 10px 18px;
  cursor: pointer;
  font-weight: 600;
  transition: background 0.2s;
}

.edit-btn:hover,
.save-btn:hover {
  background: #5469d4;
}

.cancel-btn {
  background: #a0aec0;
}

.cancel-btn:hover {
  background: #718096;
}

.profile-edit-form {
  display: grid;
  gap: 1rem;
  margin-bottom: 1rem;
}

.form-row {
  display: grid;
  gap: 0.5rem;
}

.form-row label {
  font-weight: 600;
  color: #4a5568;
}

.form-row input,
.form-row select {
  width: 100%;
  padding: 12px;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  font-size: 1rem;
}

.actions-row {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
}

.profile-message {
  color: #16a34a;
  font-weight: 600;
}

.completion-bar {
  flex: 1;
  min-width: 180px;
  height: 12px;
  background: #e5e7eb;
  border-radius: 999px;
  overflow: hidden;
}

.completion-fill {
  height: 100%;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 999px;
}

.completion-value {
  color: #2d3748;
  font-weight: 600;
  min-width: 45px;
  text-align: right;
}

.info-row {
  display: flex;
  padding: 0.75rem 0;
  border-bottom: 1px solid #f0f0f0;
}

.info-row .label {
  font-weight: 600;
  width: 140px;
  color: #4a5568;
}

.info-row .value {
  color: #2d3748;
  font-weight: 500;
}

.subscription-info {
  text-align: center;
}

.sub-name {
  font-size: 2rem;
  font-weight: bold;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  margin-bottom: 0.5rem;
}

.sub-price {
  font-size: 1.3rem;
  color: #4a5568;
  margin-bottom: 1rem;
}

.sub-validity {
  background: #f0fdf4;
  color: #166534;
  padding: 0.5rem;
  border-radius: 8px;
  margin-bottom: 1rem;
  font-size: 0.9rem;
}

.sub-features {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  justify-content: center;
}

.sub-features span {
  background: #e0e7ff;
  color: #4338ca;
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.8rem;
}

.no-subscription {
  text-align: center;
  padding: 1.5rem;
}

.no-subscription p {
  color: #6b7280;
  margin-bottom: 1rem;
}

.buy-btn, .book-btn {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  padding: 10px 24px;
  border-radius: 25px;
  cursor: pointer;
  font-size: 0.9rem;
  transition: transform 0.2s;
}

.buy-btn:hover, .book-btn:hover {
  transform: translateY(-2px);
}

.schedule-filters {
  display: flex;
  gap: 0.75rem;
  margin-bottom: 1.5rem;
  flex-wrap: wrap;
}

.filter-btn {
  padding: 0.5rem 1.25rem;
  border: 1px solid #e5e7eb;
  background: white;
  border-radius: 25px;
  cursor: pointer;
  font-size: 0.9rem;
  transition: all 0.2s;
}

.filter-btn:hover {
  background: #f3f4f6;
}

.filter-btn.active {
  background: #667eea;
  color: white;
  border-color: #667eea;
}

.booking-items {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.booking-item {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  background: #f9fafb;
  border-radius: 12px;
  transition: all 0.2s;
}

.booking-item:hover {
  background: #f3f4f6;
  transform: translateX(5px);
}

.booking-date {
  min-width: 100px;
  font-weight: 600;
  color: #2d3748;
}

.booking-time {
  min-width: 70px;
  color: #4a5568;
  font-weight: 500;
}

.booking-name {
  flex: 1;
  font-weight: 500;
  color: #2d3748;
}

.booking-status {
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 500;
}

.status-new {
  background: #fef3c7;
  color: #92400e;
}

.status-confirmed {
  background: #d1fae5;
  color: #065f46;
}

.status-completed {
  background: #dbeafe;
  color: #1e40af;
}

.status-cancelled {
  background: #fee2e2;
  color: #991b1b;
}

.empty-schedule {
  text-align: center;
  padding: 2rem;
  color: #6b7280;
}

@media (max-width: 768px) {
  .user-profile {
    padding: 1rem;
    margin-top: 70px;
  }
  
  .booking-item {
    flex-wrap: wrap;
    gap: 0.5rem;
  }
  
  .booking-date, .booking-time {
    min-width: auto;
  }
  
  .info-row {
    flex-direction: column;
    gap: 0.25rem;
  }
  
  .info-row .label {
    width: auto;
  }
  
  .profile-header {
    flex-direction: column;
    gap: 1rem;
    text-align: center;
  }
  
  .sub-name {
    font-size: 1.5rem;
  }
}
</style>