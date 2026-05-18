<template>
  <div class="user-profile">
    <div class="profile-header">
      <h1>Личный кабинет</h1>
      <button class="logout-btn" @click="logout">Выйти</button>
    </div>

    <div class="profile-content">
      <div class="profile-card">
        <h2>Данные пользователя</h2>
        <div class="user-info">
          <div class="info-row">
            <span class="label">Имя:</span>
            <span class="value">{{ user.username }}</span>
          </div>
          <div class="info-row">
            <span class="label">Email:</span>
            <span class="value">{{ user.email }}</span>
          </div>
          <div class="info-row">
            <span class="label">Дата регистрации:</span>
            <span class="value">{{ user.createdAt }}</span>
          </div>
        </div>
      </div>

      <div class="schedule-card">
        <h2>Мои тренировки</h2>
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
</template>

<script>
export default {
  name: 'UserProfile',
  data() {
    return {
      user: {
        username: 'Екатерина',
        email: 'katerina@fitcomplex.ru',
        createdAt: '18.05.2026'
      },
      activeFilter: 'Все',
      filters: ['Все', 'Активные', 'Завершённые'],
      bookings: [
        { id: 1, date: '20.05.2026', time: '18:00', training: 'Йога', status: 'confirmed' },
        { id: 2, date: '22.05.2026', time: '19:00', training: 'Кроссфит', status: 'confirmed' },
        { id: 3, date: '25.05.2026', time: '10:00', training: 'Пилатес', status: 'completed' }
      ]
    }
  },
  computed: {
    filteredBookings() {
      if (this.activeFilter === 'Все') return this.bookings
      if (this.activeFilter === 'Активные') return this.bookings.filter(b => b.status === 'confirmed')
      if (this.activeFilter === 'Завершённые') return this.bookings.filter(b => b.status === 'completed')
      return this.bookings
    }
  },
  methods: {
    getStatusText(status) {
      const statuses = { confirmed: 'Активная', completed: 'Завершена' }
      return statuses[status] || status
    },
    logout() {
      localStorage.clear()
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
}

.logout-btn {
  background: #ef4444;
  color: white;
  border: none;
  padding: 8px 20px;
  border-radius: 8px;
  cursor: pointer;
}

.profile-card, .schedule-card {
  background: white;
  border-radius: 16px;
  padding: 1.5rem;
  margin-bottom: 2rem;
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
}

.info-row {
  display: flex;
  padding: 0.5rem 0;
  border-bottom: 1px solid #f0f0f0;
}

.label {
  font-weight: 600;
  width: 140px;
}

.schedule-filters {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
}

.filter-btn {
  padding: 0.5rem 1rem;
  border: 1px solid #e5e7eb;
  background: white;
  border-radius: 20px;
  cursor: pointer;
}

.filter-btn.active {
  background: #667eea;
  color: white;
}

.booking-item {
  display: flex;
  gap: 1rem;
  padding: 1rem;
  background: #f9fafb;
  border-radius: 12px;
  margin-bottom: 0.5rem;
}

.booking-date {
  min-width: 100px;
  font-weight: 600;
}

.status-confirmed {
  background: #d1fae5;
  color: #065f46;
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
}

.status-completed {
  background: #dbeafe;
  color: #1e40af;
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
}
</style>