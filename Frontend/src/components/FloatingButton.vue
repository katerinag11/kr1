<template>
    <div class="floating-container">
      <button class="floating-button" @click="$emit('click')">
      </button>
    </div>
  </template>
  
  <script>
  export default {
    name: 'FloatingButton',
    emits: ['click']
  }
  </script>
  
  <style scoped>
  .floating-container {
    position: fixed;
    bottom: 30px;
    right: 30px;
    z-index: 9999;
  }
  
  .floating-button {
    width: 65px;
    height: 65px;
    border-radius: 50%;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    border: none;
    font-size: 28px;
    cursor: pointer;
    box-shadow: 0 4px 15px rgba(0,0,0,0.2);
    transition: transform 0.3s;
    animation: pulse 2s infinite;
  }
  
  .floating-button:hover {
    transform: scale(1.1);
  }
  
  @keyframes pulse {
    0% { box-shadow: 0 0 0 0 rgba(102, 126, 234, 0.7); }
    70% { box-shadow: 0 0 0 15px rgba(102, 126, 234, 0); }
    100% { box-shadow: 0 0 0 0 rgba(102, 126, 234, 0); }
  }
  </style>