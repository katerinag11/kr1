<template>
  <div class="admin-panel">
    <div class="admin-header">
      <h1>👑 Админ панель</h1>
      <button class="logout-btn" @click="logout">Выйти</button>
    </div>

    <div class="admin-tabs">
      <button 
        class="tab-btn" 
        :class="{ active: activeTab === 'bookings' }" 
        @click="activeTab = 'bookings'"
      >
        📋 Заявки
        <span v-if="newBookingsCount" class="badge">{{ newBookingsCount }}</span>
      </button>
      <button 
        class="tab-btn" 
        :class="{ active: activeTab === 'subscriptions' }" 
        @click="activeTab = 'subscriptions'"
      >
        🎫 Абонементы
      </button>
      <button 
        class="tab-btn" 
        :class="{ active: activeTab === 'users' }" 
        @click="activeTab = 'users'"
      >
        👥 Пользователи
      </button>
      <button 
        class="tab-btn" 
        :class="{ active: activeTab === 'trainings' }" 
        @click="activeTab = 'trainings'"
      >
        📅 Тренировки
      </button>
    </div>

    <!-- === Вкладка: ЗАЯВКИ === -->
    <div v-show="activeTab === 'bookings'" class="bookings-section">
      <div class="section-header">
        <h2>📝 Заявки от клиентов</h2>
        <button class="refresh-btn" @click="loadBookings">🔄 Обновить</button>
      </div>

      <div class="table-wrapper">
        <table class="data-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Дата</th>
              <th>Имя</th>
              <th>Телефон</th>
              <th>Тренировка</th>
              <th>Статус</th>
              <th>Действия</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="booking in bookings" :key="booking.id">
              <td>{{ booking.id }}</td>
              <td>{{ formatDate(booking.createdAt) }}</td>
              <td><strong>{{ booking.name }}</strong></td>
              <td>{{ booking.phone }}</td>
              <td>{{ booking.training || 'Не указана' }}</td>
              <td>
                <select v-model="booking.status" @change="updateBookingStatus(booking)" class="status-select">
                  <option value="new">🆕 Новая</option>
                  <option value="confirmed">✅ Подтверждена</option>
                  <option value="completed">✔️ Завершена</option>
                  <option value="cancelled">❌ Отменена</option>
                </select>
              </td>
              <td>
                <button class="delete-btn" @click="deleteBooking(booking.id)" title="Удалить">🗑️</button>
              </td>
            </tr>
            <tr v-if="bookings.length === 0">
              <td colspan="7" class="empty-row">Нет заявок</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- === Вкладка: АБОНЕМЕНТЫ === -->
    <div v-show="activeTab === 'subscriptions'" class="subscriptions-section">
      <div class="section-header">
        <h2>🎫 Управление абонементами</h2>
        <button class="add-btn" @click="openAddSubscriptionModal">+ Добавить абонемент</button>
      </div>

      <div class="subscriptions-grid">
        <div v-for="sub in subscriptions" :key="sub.id" class="subscription-card">
          <div class="subscription-icon">{{ sub.icon }}</div>
          <h3>{{ sub.name }}</h3>
          <div class="price">{{ sub.price }} ₽<span>/мес</span></div>
          <ul>
            <li v-for="feature in sub.features" :key="feature">✅ {{ feature }}</li>
          </ul>
          <div class="card-actions">
            <button class="edit-card-btn" @click="editSubscription(sub)">✏️ Редактировать</button>
            <button class="delete-card-btn" @click="deleteSubscription(sub.id)">🗑️ Удалить</button>
          </div>
        </div>
      </div>
    </div>

    <!-- === Вкладка: ПОЛЬЗОВАТЕЛИ === -->
    <div v-show="activeTab === 'users'" class="users-section">
      <div class="section-header">
        <h2>👥 Управление пользователями</h2>
        <button class="add-btn" @click="openAddUserModal">+ Добавить пользователя</button>
      </div>

      <div class="table-wrapper">
        <table class="data-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Имя пользователя</th>
              <th>Email</th>
              <th>Абонемент</th>
              <th>Дата регистрации</th>
              <th>Действия</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="user in users" :key="user.id">
              <td>{{ user.id }}</td>
              <td>{{ user.username }}</td>
              <td>{{ user.email }}</td>
              <td>
                <select v-model="user.subscription" @change="updateUserSubscription(user)" class="sub-select">
                  <option value="none">Нет абонемента</option>
                  <option v-for="sub in subscriptions" :key="sub.id" :value="sub.name">
                    {{ sub.name }} ({{ sub.price }} ₽)
                  </option>
                </select>
              </td>
              <td>{{ user.date }}</td>
              <td>
                <button class="edit-btn" @click="editUser(user)">✏️</button>
                <button class="delete-btn" @click="deleteUser(user.id)">🗑️</button>
              </td>
            </tr>
            <tr v-if="users.length === 0">
              <td colspan="6" class="empty-row">Нет пользователей</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- === Вкладка: ТРЕНИРОВКИ === -->
    <div v-show="activeTab === 'trainings'" class="trainings-section">
      <div class="section-header">
        <h2>📅 Расписание тренировок</h2>
        <button class="add-btn" @click="openAddTrainingModal">+ Добавить тренировку</button>
      </div>

      <div class="table-wrapper">
        <table class="data-table">
          <thead>
            <tr>
              <th>День</th>
              <th>Время</th>
              <th>Тренировка</th>
              <th>Тренер</th>
              <th>Действия</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="training in trainings" :key="training.id">
              <td>{{ training.day }}</td>
              <td>{{ training.time }}</td>
              <td><strong>{{ training.name }}</strong></td>
              <td>{{ training.trainer }}</td>
              <td>
                <button class="edit-btn" @click="editTraining(training)">✏️</button>
                <button class="delete-btn" @click="deleteTraining(training.id)">🗑️</button>
              </td>
            </tr>
            <tr v-if="trainings.length === 0">
              <td colspan="5" class="empty-row">Нет тренировок</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- === Модальное окно: Редактирование пользователя === -->
    <div v-if="showUserModal" class="modal" @click.self="closeUserModal">
      <div class="modal-content">
        <h3>✏️ Редактировать пользователя</h3>
        <div class="form-group">
          <label>Имя пользователя</label>
          <input v-model="editingUser.username" type="text">
        </div>
        <div class="form-group">
          <label>Email</label>
          <input v-model="editingUser.email" type="email">
        </div>
        <div class="modal-actions">
          <button @click="saveUser" class="save-btn">Сохранить</button>
          <button @click="closeUserModal" class="cancel-btn">Отмена</button>
        </div>
      </div>
    </div>

    <!-- === Модальное окно: Добавление/редактирование абонемента === -->
    <div v-if="showSubscriptionModal" class="modal" @click.self="closeSubscriptionModal">
      <div class="modal-content">
        <h3>{{ isEditingSubscription ? '✏️ Редактировать' : '➕ Добавить' }} абонемент</h3>
        <div class="form-group">
          <label>Иконка</label>
          <input v-model="editingSubscription.icon" type="text" placeholder="🎫">
        </div>
        <div class="form-group">
          <label>Название</label>
          <input v-model="editingSubscription.name" type="text">
        </div>
        <div class="form-group">
          <label>Цена (₽)</label>
          <input v-model="editingSubscription.price" type="number">
        </div>
        <div class="form-group">
          <label>Преимущества (через запятую)</label>
          <textarea v-model="editingSubscription.featuresText" rows="3" placeholder="Тренажёрный зал, Вводная тренировка, ..."></textarea>
        </div>
        <div class="modal-actions">
          <button @click="saveSubscription" class="save-btn">Сохранить</button>
          <button @click="closeSubscriptionModal" class="cancel-btn">Отмена</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import api from '../api'

export default {
  name: 'AdminPanel',
  data() {
    return {
      activeTab: 'bookings',
      bookings: [],
      users: [],
      subscriptions: [
        { id: 1, icon: '💪', name: 'Старт', price: '1 900', features: ['Тренажёрный зал', 'Вводная тренировка', 'Мобильное приложение'] },
        { id: 2, icon: '⭐', name: 'Премиум', price: '2 999', features: ['Тренажёрный зал', 'Групповые тренировки', 'СПА-зона', 'Гостевой доступ'] },
        { id: 3, icon: '👨‍👩‍👧‍👦', name: 'Семейный', price: '4 500', features: ['Доступ для 2-х человек', 'Все преимущества Премиум', 'Скидка 20%'] }
      ],
      trainings: [
        { id: 1, day: 'Понедельник', time: '08:00', name: 'Йога', trainer: 'Анна Иванова' },
        { id: 2, day: 'Понедельник', time: '19:00', name: 'Кроссфит', trainer: 'Дмитрий Сидоров' },
        { id: 3, day: 'Вторник', time: '18:00', name: 'Пилатес', trainer: 'Мария Петрова' },
        { id: 4, day: 'Среда', time: '09:00', name: 'Кардио', trainer: 'Елена Смирнова' },
        { id: 5, day: 'Четверг', time: '20:00', name: 'Танцы', trainer: 'Ольга Кузнецова' }
      ],
      showUserModal: false,
      editingUser: {},
      showSubscriptionModal: false,
      isEditingSubscription: false,
      editingSubscription: {
        icon: '',
        name: '',
        price: '',
        featuresText: '',
        features: []
      }
    }
  },
  computed: {
    newBookingsCount() {
      return this.bookings.filter(b => b.status === 'new').length
    }
  },
  mounted() {
    this.loadBookings()
    this.loadUsers()
  },
  methods: {
    // ========== ЗАЯВКИ ==========
    async loadBookings() {
      try {
        const response = await api.get('/admin/bookings')
        if (response.data.success) {
          this.bookings = response.data.data
        }
      } catch (error) {
        console.error('Ошибка загрузки заявок:', error)
        // Тестовые данные
        this.bookings = [
          { id: 1, name: 'Иван Петров', phone: '+7 (999) 123-45-67', training: 'Йога', status: 'new', createdAt: new Date().toISOString() },
          { id: 2, name: 'Мария Сидорова', phone: '+7 (999) 765-43-21', training: 'Кроссфит', status: 'confirmed', createdAt: new Date().toISOString() }
        ]
      }
    },
    async updateBookingStatus(booking) {
      try {
        await api.put(`/admin/bookings/${booking.id}`, { status: booking.status })
        console.log('✅ Статус обновлён')
      } catch (error) {
        console.error('Ошибка обновления:', error)
      }
    },
    async deleteBooking(id) {
      if (confirm('Удалить заявку?')) {
        try {
          await api.delete(`/admin/bookings/${id}`)
          this.bookings = this.bookings.filter(b => b.id !== id)
        } catch (error) {
          console.error('Ошибка удаления:', error)
        }
      }
    },
    formatDate(date) {
      if (!date) return '—'
      return new Date(date).toLocaleString('ru-RU')
    },

    // ========== ПОЛЬЗОВАТЕЛИ ==========
    async loadUsers() {
      try {
        const response = await api.get('/admin/users')
        if (response.data.success) {
          this.users = response.data.data
        }
      } catch (error) {
        console.error('Ошибка загрузки пользователей:', error)
        this.users = [
          { id: 1, username: 'admin', email: 'admin@fitcomplex.ru', subscription: 'premium', date: '18.05.2026' },
          { id: 2, username: 'Катя', email: 'katerina@gmail.ru', subscription: 'start', date: '20.05.2026' }
        ]
      }
    },
    editUser(user) {
      this.editingUser = { ...user }
      this.showUserModal = true
    },
    saveUser() {
      const index = this.users.findIndex(u => u.id === this.editingUser.id)
      if (index !== -1) {
        this.users[index] = { ...this.editingUser }
      }
      this.closeUserModal()
    },
    deleteUser(id) {
      if (confirm('Удалить пользователя?')) {
        this.users = this.users.filter(u => u.id !== id)
      }
    },
    updateUserSubscription(user) {
      console.log('Абонемент обновлён:', user)
    },
    openAddUserModal() {
      const newUser = {
        id: Date.now(),
        username: 'Новый пользователь',
        email: 'new@mail.ru',
        subscription: 'none',
        date: new Date().toLocaleDateString()
      }
      this.users.push(newUser)
    },
    closeUserModal() {
      this.showUserModal = false
      this.editingUser = {}
    },

    // ========== АБОНЕМЕНТЫ ==========
    editSubscription(sub) {
      this.editingSubscription = {
        ...sub,
        featuresText: sub.features.join(', ')
      }
      this.isEditingSubscription = true
      this.showSubscriptionModal = true
    },
    deleteSubscription(id) {
      if (confirm('Удалить абонемент?')) {
        this.subscriptions = this.subscriptions.filter(s => s.id !== id)
      }
    },
    openAddSubscriptionModal() {
      this.editingSubscription = {
        id: null,
        icon: '🎫',
        name: '',
        price: '',
        featuresText: '',
        features: []
      }
      this.isEditingSubscription = false
      this.showSubscriptionModal = true
    },
    saveSubscription() {
      const features = this.editingSubscription.featuresText.split(',').map(f => f.trim()).filter(f => f)
      const subscription = {
        id: this.isEditingSubscription ? this.editingSubscription.id : Date.now(),
        icon: this.editingSubscription.icon || '🎫',
        name: this.editingSubscription.name,
        price: this.editingSubscription.price,
        features: features
      }
      
      if (this.isEditingSubscription) {
        const index = this.subscriptions.findIndex(s => s.id === subscription.id)
        if (index !== -1) this.subscriptions[index] = subscription
      } else {
        this.subscriptions.push(subscription)
      }
      this.closeSubscriptionModal()
    },
    closeSubscriptionModal() {
      this.showSubscriptionModal = false
      this.editingSubscription = { icon: '', name: '', price: '', featuresText: '', features: [] }
    },

    // ========== ТРЕНИРОВКИ ==========
    editTraining(training) {
      const newName = prompt('Название тренировки:', training.name)
      if (newName) training.name = newName
      const newTrainer = prompt('Тренер:', training.trainer)
      if (newTrainer) training.trainer = newTrainer
    },
    deleteTraining(id) {
      if (confirm('Удалить тренировку?')) {
        this.trainings = this.trainings.filter(t => t.id !== id)
      }
    },
    openAddTrainingModal() {
      const newTraining = {
        id: Date.now(),
        day: 'Новый день',
        time: '00:00',
        name: 'Новая тренировка',
        trainer: 'Тренер'
      }
      this.trainings.push(newTraining)
    },

    // ========== ОБЩИЕ ==========
    logout() {
      localStorage.clear()
      sessionStorage.clear()
      this.$router.push('/login')
    }
  }
}
</script>

<style scoped>
.admin-panel {
  max-width: 1400px;
  margin: 80px auto 0;
  padding: 2rem;
}

.admin-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  padding-bottom: 1rem;
  border-bottom: 2px solid #e5e7eb;
}

.admin-header h1 {
  color: #2d3748;
}

.logout-btn {
  background: #ef4444;
  color: white;
  border: none;
  padding: 8px 20px;
  border-radius: 8px;
  cursor: pointer;
}

.admin-tabs {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 2rem;
  flex-wrap: wrap;
  border-bottom: 2px solid #e5e7eb;
  padding-bottom: 0.5rem;
}

.tab-btn {
  padding: 0.75rem 1.5rem;
  background: none;
  border: none;
  cursor: pointer;
  font-size: 1rem;
  border-radius: 8px;
  transition: all 0.2s;
  position: relative;
}

.tab-btn:hover {
  background: #f3f4f6;
}

.tab-btn.active {
  background: #667eea;
  color: white;
}

.badge {
  position: absolute;
  top: -5px;
  right: -5px;
  background: #ef4444;
  color: white;
  border-radius: 50%;
  padding: 2px 6px;
  font-size: 0.7rem;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
  flex-wrap: wrap;
  gap: 1rem;
}

.section-header h2 {
  color: #2d3748;
}

.add-btn, .refresh-btn {
  background: #10b981;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 8px;
  cursor: pointer;
}

.refresh-btn {
  background: #667eea;
}

.table-wrapper {
  overflow-x: auto;
  background: white;
  border-radius: 12px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
}

.data-table {
  width: 100%;
  border-collapse: collapse;
}

.data-table th,
.data-table td {
  padding: 12px 16px;
  text-align: left;
  border-bottom: 1px solid #e5e7eb;
}

.data-table th {
  background: #f9fafb;
  font-weight: 600;
  color: #374151;
}

.data-table tr:hover {
  background: #f9fafb;
}

.empty-row {
  text-align: center;
  color: #9ca3af;
  padding: 2rem;
}

.subscriptions-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 1.5rem;
}

.subscription-card {
  background: white;
  border-radius: 16px;
  padding: 1.5rem;
  text-align: center;
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
  transition: transform 0.2s;
}

.subscription-card:hover {
  transform: translateY(-4px);
}

.subscription-icon {
  font-size: 3rem;
}

.subscription-card h3 {
  color: #667eea;
  margin: 0.5rem 0;
}

.subscription-card .price {
  font-size: 1.8rem;
  font-weight: bold;
  color: #2d3748;
}

.subscription-card .price span {
  font-size: 0.9rem;
  color: #6b7280;
}

.subscription-card ul {
  list-style: none;
  padding: 0;
  margin: 1rem 0;
  text-align: left;
}

.subscription-card li {
  padding: 0.25rem 0;
  color: #4b5563;
}

.card-actions {
  display: flex;
  gap: 0.5rem;
  justify-content: center;
  margin-top: 1rem;
}

.edit-card-btn, .delete-card-btn, .edit-btn, .delete-btn {
  padding: 6px 12px;
  border-radius: 6px;
  cursor: pointer;
  font-size: 0.875rem;
  border: none;
}

.edit-card-btn, .edit-btn {
  background: #667eea;
  color: white;
}

.delete-card-btn, .delete-btn {
  background: #ef4444;
  color: white;
}

.status-select, .sub-select {
  padding: 6px 10px;
  border-radius: 6px;
  border: 1px solid #e5e7eb;
  background: white;
}

.modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0,0,0,0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal-content {
  background: white;
  padding: 2rem;
  border-radius: 16px;
  width: 90%;
  max-width: 500px;
  max-height: 90vh;
  overflow-y: auto;
}

.form-group {
  margin-bottom: 1rem;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
  color: #374151;
}

.form-group input, .form-group textarea {
  width: 100%;
  padding: 10px;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  font-size: 1rem;
}

.modal-actions {
  display: flex;
  gap: 1rem;
  justify-content: flex-end;
  margin-top: 1.5rem;
}

.save-btn {
  background: #10b981;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 6px;
  cursor: pointer;
}

.cancel-btn {
  background: #6b7280;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 6px;
  cursor: pointer;
}

@media (max-width: 768px) {
  .admin-panel {
    padding: 1rem;
  }
  
  .admin-tabs {
    gap: 0.25rem;
  }
  
  .tab-btn {
    padding: 0.5rem 1rem;
    font-size: 0.875rem;
  }
  
  .subscriptions-grid {
    grid-template-columns: 1fr;
  }
  
  .data-table th, .data-table td {
    padding: 8px 12px;
    font-size: 0.875rem;
  }
}
</style>