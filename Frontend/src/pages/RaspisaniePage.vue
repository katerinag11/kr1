<template>
    <div class="raspisanie-page">
      <section class="schedule-hero">
        <h1>Расписание групповых тренировок</h1>
        <p>Выберите удобное время и направление</p>
      </section>
  
      <section class="schedule-container">
        <div class="schedule-table-wrapper">
          <table class="schedule-table">
            <thead>
              <tr>
                <th>Время</th>
                <th>Пн</th>
                <th>Вт</th>
                <th>Ср</th>
                <th>Чт</th>
                <th>Пт</th>
                <th>Сб</th>
                <th>Вс</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="time in timeSlots" :key="time">
                <td class="time-cell">{{ time }}</td>
                <td v-for="day in weekDays" :key="day">
                  <div 
                    v-if="getClass(day, time)" 
                    class="class-tag" 
                    :class="getClass(day, time).type"
                    @click="$emit('openFormWithTraining', getClass(day, time).name)"
                  >
                    {{ getClass(day, time).name }}
                  </div>
                  <span v-else class="empty-slot">—</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  </template>
  
  <script>
  export default {
    name: 'RaspisaniePage',
    emits: ['openFormWithTraining'],
    data() {
      return {
        weekDays: ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'],
        timeSlots: ['08:00', '10:00', '12:00', '14:00', '16:00', '18:00', '20:00'],
        schedule: {
          '08:00': {
            mon: { name: 'Йога', type: 'yoga' },
            wed: { name: 'Йога', type: 'yoga' },
            fri: { name: 'Йога', type: 'yoga' }
          },
          '10:00': {
            tue: { name: 'Пилатес', type: 'pilates' },
            thu: { name: 'Пилатес', type: 'pilates' }
          },
          '18:00': {
            mon: { name: 'Кроссфит', type: 'crossfit' },
            wed: { name: 'Кроссфит', type: 'crossfit' },
            fri: { name: 'Кроссфит', type: 'crossfit' }
          },
          '19:00': {
            tue: { name: 'Танцы', type: 'dance' },
            thu: { name: 'Танцы', type: 'dance' }
          }
        }
      }
    },
    methods: {
      getClass(day, time) {
        return this.schedule[time]?.[day]
      }
    }
  }
  </script>
  
  <style scoped>
  .schedule-hero {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    text-align: center;
    padding: 8rem 2rem 4rem;
    margin-top: 60px;
  }
  
  .schedule-hero h1 {
    font-size: 2.5rem;
    margin-bottom: 1rem;
  }
  
  .schedule-container {
    padding: 2rem;
    max-width: 1200px;
    margin: 0 auto;
  }
  
  .schedule-table-wrapper {
    overflow-x: auto;
    border-radius: 16px;
    box-shadow: 0 4px 20px rgba(0,0,0,0.08);
  }
  
  .schedule-table {
    width: 100%;
    border-collapse: collapse;
    background: white;
  }
  
  .schedule-table th {
    background: #667eea;
    color: white;
    padding: 1rem;
    text-align: center;
  }
  
  .schedule-table td {
    padding: 1rem;
    text-align: center;
    border-bottom: 1px solid #e5e7eb;
  }
  
  .time-cell {
    font-weight: bold;
    color: #667eea;
  }
  
  .class-tag {
    display: inline-block;
    padding: 6px 12px;
    border-radius: 20px;
    font-size: 0.85rem;
    font-weight: 600;
    cursor: pointer;
    transition: transform 0.2s;
  }
  
  .class-tag:hover {
    transform: scale(1.05);
  }
  
  .class-tag.yoga { background: #e0f7e9; color: #1b7a3d; }
  .class-tag.pilates { background: #e0eef7; color: #1b4f7a; }
  .class-tag.crossfit { background: #f3e0f7; color: #6b2d8b; }
  .class-tag.dance { background: #fff3e0; color: #c05621; }
  
  .empty-slot {
    color: #cbd5e1;
  }
  </style>