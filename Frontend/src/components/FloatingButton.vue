<template>
  <v-btn
    class="floating-btn"
    color="primary"
    fab
    dark
    large
    @click="$emit('click')"
  >
    <v-icon size="28">mdi-plus</v-icon>
  </v-btn>
</template>

<script>
export default {
  name: 'FloatingButton',
  emits: ['click']
}
</script>

<style scoped>
.floating-btn {
  position: fixed !important;
  bottom: 30px;
  right: 30px;
  z-index: 9999;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%) !important;
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0% {
    box-shadow: 0 0 0 0 rgba(102, 126, 234, 0.7);
  }
  70% {
    box-shadow: 0 0 0 15px rgba(102, 126, 234, 0);
  }
  100% {
    box-shadow: 0 0 0 0 rgba(102, 126, 234, 0);
  }
}
</style>