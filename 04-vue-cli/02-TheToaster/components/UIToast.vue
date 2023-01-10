<template>
  <div class="toast" :class="styleOfToaster.className">
    <ui-icon class="toast__icon" :icon="styleOfToaster.iconName" />
    <span> {{ toast.message }}</span>
    <button class="btn" @click="close">х</button>
  </div>
</template>

<script>
import UiIcon from './UiIcon.vue';

export default {
  name: 'UIToast',

  components: { UiIcon },

  props: {
    toast: {
      type: Object,
      required: true,
    },
  },

  emits: ['close'],

  data() {
    return {
      styleMap: {
        success: {
          className: 'toast_success',
          iconName: 'check-circle',
        },
        error: {
          className: 'toast_error',
          iconName: 'alert-circle',
        },
      },
    };
  },

  computed: {
    styleOfToaster() {
      return this.styleMap[this.toast.type] ?? this.styleMap['success'];
    },
  },

  methods: {
    close() {
      this.$emit('close');
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

.btn {
  margin-left: 20px;
  border: 1px solid gray;
  width: 20px;
  height: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  line-height: 20px;
  border-radius: 50%;
  cursor: pointer;
  background: none;
  color: gray;
}
</style>
