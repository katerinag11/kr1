<template>
  <div class="admin-panel">
    <div class="admin-header">
      <h1>Админ панель</h1>
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
    </div>

    <!-- Вкладка: Заявки -->
    <div v-show="activeTab === 'bookings'" class="bookings-section">
      <div class="section-header">
        <h2>Заявки от клиентов</h2>
        <button class="refresh-btn" @click="loadBookings">Обновить</button>
      </div>

      <div v-if="bookings.length === 0" class="empty-state">
        <p>Нет заявок</p>
        <p class="hint">Заявки появляются здесь после отправки формы с главной страницы</p>
      </div>

      <div v-else class="bookings-table">
        <table>
          <thead>
            <tr>
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
              <td>{{ formatDate(booking.createdAt) }}</td>
              <td>{{ booking.name }}</td>
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
                <button class="delete-btn" @click="deleteBooking(booking.id)">Удалить</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Вкладка: Абонементы -->
    <div v-show="activeTab === 'subscriptions'" class="subscriptions-section">
      <div class="section-header">
        <h2>Управление абонементами</h2>
        <button class="add-btn" @click="openAddSubscriptionModal">+ Добавить абонемент</button>
      </div>

      <div class="subscriptions-grid">
        <div v-for="sub in subscriptions" :key="sub.id" class="subscription-card">
          <h3>{{ sub.name }}</h3>
          <div class="price">{{ sub.price }} ₽<span>/мес</span></div>
          <ul>
            <li v-for="feature in sub.features" :key="feature">✓ {{ feature }}</li>
          </ul>
          <div class="card-actions">
            <button class="edit-card-btn" @click="editSubscription(sub)">Редактировать</button>
            <button class="delete-card-btn" @click="deleteSubscription(sub.id)">Удалить</button>
          </div>
        </div>
      </div>
    </div>

    <!-- Вкладка: Пользователи -->
    <div v-show="activeTab === 'users'" class="users-section">
      <div class="section-header">
        <h2>Управление пользователями</h2>
      </div>

      <div class="users-table">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Имя</th>
              <th>Email</th>
              <th>Абонемент</th>
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
            </tr>
          </tbody>
        </table>
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
        { id: 1, name: 'Старт', price: '1 900', features: ['Тренажёрный зал', 'Вводная тренировка', 'Мобильное приложение'] },
        { id: 2, name: 'Премиум', price: '2 999', features: ['Всё из тарифа «Старт»', 'Групповые тренировки', 'СПА-зона', 'Гостевой доступ'] },
        { id: 3, name: 'Семейный', price: '4 500', features: ['Доступ для 2-х человек', 'Все преимущества Премиум', 'Скидка 20%', 'Приоритетная запись'] }
      ]
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
    async loadBookings() {
      try {
        const response = await api.get('/bookings')
        console.log('Загрузка заявок:', response.data)
        if (response.data.success) {
          this.bookings = response.data.data || []
        } else {
          this.bookings = []
        }
      } catch (error) {
        console.error('Ошибка загрузки заявок:', error)
        this.bookings = []
      }
    },
    async loadUsers() {
      try {
        const response = await api.get('/users')
        if (response.data.success) {
          this.users = response.data.data || []
        }
      } catch (error) {
        console.error('Ошибка загрузки пользователей:', error)
        this.users = []
      }
    },
    async updateBookingStatus(booking) {
      try {
        await api.put(`/bookings/${booking.id}`, { status: booking.status })
        console.log('Статус обновлён')
      } catch (error) {
        console.error('Ошибка обновления:', error)
      }
    },
    async deleteBooking(id) {
      if (confirm('Удалить заявку?')) {
        try {
          await api.delete(`/bookings/${id}`)
          this.bookings = this.bookings.filter(b => b.id !== id)
        } catch (error) {
          console.error('Ошибка удаления:', error)
        }
      }
    },
    updateUserSubscription(user) {
      console.log('Абонемент обновлён:', user)
    },
    editSubscription(sub) {
      const newName = prompt('Новое название:', sub.name)
      if (newName) sub.name = newName
    },
    deleteSubscription(id) {
      if (confirm('Удалить абонемент?')) {
        this.subscriptions = this.subscriptions.filter(s => s.id !== id)
      }
    },
    openAddSubscriptionModal() {
      const newSub = {
        id: Date.now(),
        name: 'Новый абонемент',
        price: '0',
        features: ['Новая опция']
      }
      this.subscriptions.push(newSub)
    },
    formatDate(date) {
      if (!date) return '—'
      return new Date(date).toLocaleString('ru-RU')
    },
    logout() {
      localStorage.clear()
      this.$router.push('/login')
    }
  }
}
</script>

<style scoped>
.admin-panel {
  max-width: 1200px;
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
}

.refresh-btn, .add-btn {
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

.empty-state {
  text-align: center;
  padding: 3rem;
  background: #f9fafb;
  border-radius: 12px;
  color: #6b7280;
}

.hint {
  font-size: 0.85rem;
  margin-top: 0.5rem;
  color: #9ca3af;
}

.bookings-table, .users-table {
  overflow-x: auto;
}

table {
  width: 100%;
  border-collapse: collapse;
  background: white;
  border-radius: 12px;
}

th, td {
  padding: 12px;
  text-align: left;
  border-bottom: 1px solid #e5e7eb;
}

th {
  background: #f9fafb;
  font-weight: 600;
}

.status-select, .sub-select {
  padding: 6px 10px;
  border-radius: 6px;
  border: 1px solid #e5e7eb;
}

.delete-btn {
  background: #ef4444;
  color: white;
  border: none;
  padding: 6px 12px;
  border-radius: 6px;
  cursor: pointer;
}

.subscriptions-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
}

.subscription-card {
  background: white;
  border-radius: 16px;
  padding: 1.5rem;
  text-align: center;
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
}

.subscription-card h3 {
  color: #667eea;
  margin-bottom: 0.5rem;
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

.edit-card-btn, .delete-card-btn {
  padding: 6px 12px;
  border-radius: 6px;
  cursor: pointer;
  font-size: 0.875rem;
  border: none;
}

.edit-card-btn {
  background: #667eea;
  color: white;
}

.delete-card-btn {
  background: #ef4444;
  color: white;
}
</style>