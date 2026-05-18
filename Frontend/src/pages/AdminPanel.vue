<template>
  <div class="admin-panel">
    <div class="admin-header">
      <h1>Админ панель</h1>
      <button class="logout-btn" @click="logout">Выйти</button>
    </div>

    <div class="admin-tabs">
      <button class="tab-btn" :class="{ active: activeTab === 'users' }" @click="activeTab = 'users'">
        Пользователи
      </button>
      <button class="tab-btn" :class="{ active: activeTab === 'subscriptions' }" @click="activeTab = 'subscriptions'">
       Абонементы
      </button>
      <button class="tab-btn" :class="{ active: activeTab === 'trainings' }" @click="activeTab = 'trainings'">
        Тренировки
      </button>
    </div>

    <div v-show="activeTab === 'users'" class="users-section">
      <div class="section-header">
        <h2>Управление пользователями</h2>
        <button class="add-btn" @click="openAddUserModal">+ Добавить пользователя</button>
      </div>
      
      <div class="users-table">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Имя</th>
              <th>Email</th>
              <th>Роль</th>
              <th>Абонемент</th>
              <th>Действия</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="user in users" :key="user.id">
              <td>{{ user.id }}</td>
              <td>{{ user.username }}</td>
              <td>{{ user.email }}</td>
              <td>
                <select v-model="user.role" @change="updateUserRole(user)" class="role-select">
                  <option value="user">Пользователь</option>
                  <option value="admin">Администратор</option>
                </select>
              </td>
              <td>
                <select v-model="user.subscription" @change="updateUserSubscription(user)" class="sub-select">
                  <option value="none">Нет абонемента</option>
                  <option value="start">Старт (1 900 ₽)</option>
                  <option value="premium">Премиум (2 999 ₽)</option>
                  <option value="family">Семейный (4 500 ₽)</option>
                </select>
              </td>
              <td>
                <button class="edit-btn" @click="editUser(user)">Редактировать</button>
                <button class="delete-btn" @click="deleteUser(user.id)">Удалить</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

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
            <li v-for="feature in sub.features" :key="feature">{{ feature }}</li>
          </ul>
          <div class="card-actions">
            <button class="edit-card-btn" @click="editSubscription(sub)"> Редактировать</button>
            <button class="delete-card-btn" @click="deleteSubscription(sub.id)"> Удалить</button>
          </div>
        </div>
      </div>
    </div>

    <div v-show="activeTab === 'trainings'" class="trainings-section">
      <div class="section-header">
        <h2>Расписание тренировок</h2>
        <button class="add-btn" @click="openAddTrainingModal">+ Добавить тренировку</button>
      </div>

      <div class="trainings-table">
        <table>
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
              <td>{{ training.name }}</td>
              <td>{{ training.trainer }}</td>
              <td>
                <button class="edit-btn" @click="editTraining(training)">Редактировать</button>
                <button class="delete-btn" @click="deleteTraining(training.id)">Удалить</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <div v-if="showUserModal" class="modal" @click.self="closeUserModal">
      <div class="modal-content">
        <h3>Редактировать пользователя</h3>
        <div class="form-group">
          <label>Имя</label>
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
  </div>
</template>

<script>
export default {
  name: 'AdminPanel',
  data() {
    return {
      activeTab: 'users',
      showUserModal: false,
      editingUser: {},
      users: [
        { id: 1, username: 'Екатерина', email: 'katerina@fitcomplex.ru', role: 'user', subscription: 'premium' },
        { id: 2, username: 'Иван Петров', email: 'ivan@mail.ru', role: 'user', subscription: 'start' },
        { id: 3, username: 'Мария Сидорова', email: 'maria@mail.ru', role: 'user', subscription: 'none' },
        { id: 4, username: 'Администратор', email: 'admin@fitcomplex.ru', role: 'admin', subscription: 'premium' }
      ],
      subscriptions: [
        { id: 1, name: 'Старт', price: '1 900', features: ['Тренажёрный зал', 'Вводная тренировка', ' Мобильное приложение'] },
        { id: 2, name: 'Премиум', price: '2 999', features: ['Всё из Старт', 'Групповые тренировки', ' СПА-зона', 'Гостевой доступ'] },
        { id: 3, name: 'Семейный', price: '4 500', features: ['Доступ для 2-х', 'Все преимущества Премиум', ' Скидка 20%'] }
      ],
      trainings: [
        { id: 1, day: 'Понедельник', time: '08:00', name: 'Йога', trainer: 'Анна Иванова' },
        { id: 2, day: 'Понедельник', time: '19:00', name: 'Кроссфит', trainer: 'Дмитрий Сидоров' },
        { id: 3, day: 'Вторник', time: '18:00', name: 'Пилатес', trainer: 'Мария Петрова' },
        { id: 4, day: 'Среда', time: '09:00', name: 'Кардио', trainer: 'Елена Смирнова' }
      ]
    }
  },
  methods: {
    updateUserRole(user) {
      console.log('Роль обновлена:', user)
    },
    updateUserSubscription(user) {
      console.log('Абонемент обновлён:', user)
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
    openAddUserModal() {
      const newUser = {
        id: Date.now(),
        username: 'Новый пользователь',
        email: 'new@mail.ru',
        role: 'user',
        subscription: 'none'
      }
      this.users.push(newUser)
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
    editTraining(training) {
      const newName = prompt('Название тренировки:', training.name)
      if (newName) training.name = newName
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
    closeUserModal() {
      this.showUserModal = false
      this.editingUser = {}
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
}

.admin-tabs {
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
  border-bottom: 2px solid #e5e7eb;
}

.tab-btn {
  padding: 0.75rem 1.5rem;
  background: none;
  border: none;
  cursor: pointer;
  font-size: 1rem;
}

.tab-btn.active {
  color: #667eea;
  border-bottom: 2px solid #667eea;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
}

.add-btn {
  background: #10b981;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 8px;
  cursor: pointer;
}

.users-table, .trainings-table {
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

.role-select, .sub-select {
  padding: 5px 10px;
  border-radius: 6px;
  border: 1px solid #e5e7eb;
}

.edit-btn, .delete-btn {
  background: none;
  border: none;
  cursor: pointer;
  font-size: 1.1rem;
  margin: 0 5px;
}

.delete-btn {
  color: #ef4444;
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
  font-size: 2rem;
  font-weight: bold;
  color: #333;
}

.subscription-card ul {
  list-style: none;
  padding: 0;
  margin: 1rem 0;
  text-align: left;
}

.subscription-card li {
  padding: 0.25rem 0;
}

.card-actions {
  display: flex;
  gap: 0.5rem;
  justify-content: center;
  margin-top: 1rem;
}

.edit-card-btn, .delete-card-btn {
  padding: 5px 12px;
  border-radius: 6px;
  cursor: pointer;
}

.edit-card-btn {
  background: #667eea;
  color: white;
  border: none;
}

.delete-card-btn {
  background: #ef4444;
  color: white;
  border: none;
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
  max-width: 400px;
}

.form-group {
  margin-bottom: 1rem;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
}

.form-group input {
  width: 100%;
  padding: 8px;
  border: 1px solid #e5e7eb;
  border-radius: 6px;
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

.logout-btn {
  background: #ef4444;
  color: white;
  border: none;
  padding: 8px 20px;
  border-radius: 8px;
  cursor: pointer;
}
</style>