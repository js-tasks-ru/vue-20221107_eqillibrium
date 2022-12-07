<template>
  <ToastsContainer>
    <UIToast
      v-for="[id, toast] in toastsMap"
      :key="id"
      :toast="toast"
      @close="remove(id)"
    />
  </ToastsContainer>
</template>

<script>
import UiIcon from './UiIcon.vue';
import UIToast from './UIToast';
import ToastsContainer from './ToastsContainer';

class Toast {
  constructor(type, message, lifetime) {
    this.types = ['success', 'error'];
    this.type = this.types.includes(type) ? type : 'success';
    this.message = message || 'No message';
    this.lifetime = lifetime || 5000;
  }
}

export default {
  name: 'TheToaster',

  components: { ToastsContainer, UIToast, UiIcon },

  data() {
    return {
      toastsMap: new Map(),
    };
  },

  methods: {
    success(message) {
      const newSuccessToast = new Toast('success', message);
      this.add(newSuccessToast);
    },
    error(message) {
      const newErrorToast = new Toast('error', message);
      this.add(newErrorToast);
    },
    add(t) {
      const id = setTimeout(() => {
        this.remove(id);
      }, t.lifetime);
      this.toastsMap.set(id, t);
    },
    remove(id) {
      this.toastsMap.delete(id);
      clearTimeout(id);
    },
  },
};
</script>

<style scoped>
.toast {
  display: flex;
  flex: 0 0 auto;
  flex-direction: row;
  align-items: center;
  padding: 16px;
  background: #ffffff;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
  border-radius: 4px;
  font-size: 18px;
  line-height: 28px;
  width: auto;
}

.toast + .toast {
  margin-top: 20px;
}

.toast__icon {
  margin-right: 12px;
}

.toast.toast_success {
  color: var(--green);
}

.toast.toast_error {
  color: var(--red);
}
</style>
