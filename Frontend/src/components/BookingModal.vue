<template>
<Teleport to="body">
  <div v-if="isOpen" class="modal-overlay" @click="close">
    <div class="modal-content" @click.stop>
      <div class="modal-header">
        <h3>Запись на тренировку</h3>
        <button class="close-btn" @click="close">✕</button>
      </div>

      <form @submit.prevent="submitForm">
        <div class="form-group">
          <label>Ваше имя </label>
          <input 
            v-model="form.name" 
            type="text" 
            placeholder="Иван Иванов"
            :class="{ error: errors.name }"
          />
          <span v-if="errors.name" class="error-text">{{ errors.name }}</span>
        </div>

        <div class="form-group">
          <label>Номер телефона </label>
          <input 
            v-model="form.phone" 
            type="tel" 
            placeholder="+7 (999) 123-45-67"
            :class="{ error: errors.phone }"
          />
          <span v-if="errors.phone" class="error-text">{{ errors.phone }}</span>
        </div>

        <div class="form-group">
          <label>Выберите тренировку</label>
          <select v-model="form.training" class="training-select">
            <option value="" disabled>Выберите направление</option>
            <option v-for="training in trainingList" :key="training.value" :value="training.value">
              {{ training.icon }} {{ training.name }}
            </option>
          </select>
        </div>

        <div class="form-actions">
          <button type="submit" class="btn-primary" :disabled="loading">
            {{ loading ? 'Отправка...' : 'Отправить заявку' }}
          </button>
          <button type="button" class="btn-secondary" @click="close">Отмена</button>
        </div>
      </form>

      <div v-if="message" class="submit-message" :class="messageType">
        {{ message }}
      </div>
    </div>
  </div>
</Teleport>
</template>

<script>
import api from '../api'

export default {
name: 'BookingModal',
data() {
  return {
    isOpen: false,
    loading: false,
    message: '',
    messageType: '',
    selectedTraining: null,
    form: {
      name: '',
      phone: '',
      training: ''
    },
    errors: {
      name: '',
      phone: ''
    },
    trainingList: [
      { value: 'Йога', name: 'Йога' },
      { value: 'Пилатес', name: 'Пилатес'},
      { value: 'Кроссфит', name: 'Кроссфит'},
      { value: 'Кардио', name: 'Кардио'},
      { value: 'Танцы', name: 'Танцы'},
      { value: 'Силовой тренинг', name: 'Силовой тренинг'},
      { value: 'Стретчинг', name: 'Стретчинг'},
      { value: 'Функциональный тренинг', name: 'Функциональный тренинг'}
    ]
  }
},
methods: {
  open(training = null) {
    this.selectedTraining = training
    if (training) {
      this.form.training = training
    }
    this.isOpen = true
    document.body.style.overflow = 'hidden'
  },
  close() {
    this.isOpen = false
    this.resetForm()
    document.body.style.overflow = ''
  },
  resetForm() {
    this.form = { name: '', phone: '', training: '' }
    this.errors = { name: '', phone: '' }
    this.message = ''
    this.selectedTraining = null
  },
  validate() {
    let isValid = true
    this.errors = { name: '', phone: '' }

    if (!this.form.name.trim()) {
      this.errors.name = 'Введите ваше имя'
      isValid = false
    }

    const phoneRegex = /^[\+]?[0-9\s\-\(\)]{10,}$/
    if (!this.form.phone.trim()) {
      this.errors.phone = 'Введите номер телефона'
      isValid = false
    } else if (!phoneRegex.test(this.form.phone)) {
      this.errors.phone = 'Введите корректный номер'
      isValid = false
    }

    return isValid
  },
  async submitForm() {
    if (!this.validate()) return

    this.loading = true
    this.message = ''

    try {
      const response = await api.post('/bookings', {
        name: this.form.name,
        phone: this.form.phone,
        training: this.form.training || this.selectedTraining || 'Общая тренировка',
        date: new Date().toISOString().split('T')[0]
      })

      if (response.data.success) {
        this.message = ' Заявка успешно отправлена! Мы свяжемся с вами.'
        this.messageType = 'success'
        setTimeout(() => this.close(), 2000)
      }
    } catch (error) {
      this.message = 'Ошибка отправки. Попробуйте позже.'
      this.messageType = 'error'
    } finally {
      this.loading = false
    }
  }
}
}
</script>

<style scoped>
.modal-overlay {
position: fixed;
top: 0;
left: 0;
right: 0;
bottom: 0;
background: rgba(0, 0, 0, 0.5);
display: flex;
align-items: center;
justify-content: center;
z-index: 10000;
}

.modal-content {
background: white;
border-radius: 20px;
width: 90%;
max-width: 450px;
animation: slideUp 0.3s;
}

.modal-header {
display: flex;
justify-content: space-between;
align-items: center;
padding: 20px 24px;
background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
border-radius: 20px 20px 0 0;
color: white;
}

.close-btn {
background: rgba(255,255,255,0.2);
border: none;
font-size: 24px;
cursor: pointer;
color: white;
width: 32px;
height: 32px;
border-radius: 50%;
transition: transform 0.2s;
}

.close-btn:hover {
transform: rotate(90deg);
}

.form-group {
padding: 16px 24px 0;
}

.form-group label {
display: block;
margin-bottom: 8px;
font-weight: 600;
color: #333;
}

.form-group input,
.training-select {
width: 100%;
padding: 12px;
border: 2px solid #e5e7eb;
border-radius: 12px;
font-size: 16px;
transition: all 0.2s;
background: white;
cursor: pointer;
}

.form-group input:focus,
.training-select:focus {
outline: none;
border-color: #667eea;
box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
}

.form-group input.error {
border-color: #ef4444;
}

.error-text {
color: #ef4444;
font-size: 12px;
display: block;
margin-top: 5px;
}

.form-actions {
padding: 24px;
display: flex;
gap: 12px;
justify-content: flex-end;
}

.btn-primary, .btn-secondary {
padding: 10px 20px;
border-radius: 50px;
border: none;
cursor: pointer;
font-weight: 600;
transition: transform 0.2s;
}

.btn-primary {
background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
color: white;
}

.btn-primary:hover:not(:disabled) {
transform: translateY(-2px);
}

.btn-primary:disabled {
opacity: 0.6;
cursor: not-allowed;
}

.btn-secondary {
background: #f3f4f6;
}

.btn-secondary:hover {
background: #e5e7eb;
}

.submit-message {
margin: 0 24px 24px;
padding: 12px;
border-radius: 12px;
text-align: center;
}

.submit-message.success {
background: #d1fae5;
color: #065f46;
}

.submit-message.error {
background: #fee2e2;
color: #991b1b;
}

@keyframes slideUp {
from {
  transform: translateY(30px);
  opacity: 0;
}
to {
  transform: translateY(0);
  opacity: 1;
}
}

@media (max-width: 640px) {
.form-actions {
  flex-direction: column;
}

.btn-primary,
.btn-secondary {
  width: 100%;
}
}
</style>