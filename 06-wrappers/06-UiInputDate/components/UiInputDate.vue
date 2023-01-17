<template>
  <ui-input
    :type="type"
    v-bind="{
      valueAsNumber: getValueNumber(),
      ...$attrs,
    }"
    :modelValue="formattedDate"
    @update:modelValue="onChangeInput($event)"
  >
    <template #left-icon>
      <slot name="left-icon"></slot>
    </template>
    <template #right-icon>
      <slot name="right-icon"></slot>
    </template>
  </ui-input>
</template>

<script>
import UiInput from './UiInput';
import { computed } from 'vue';
import { useParseDate } from '../composibles/useDateUtils';
export default {
  name: 'UiInputDate',

  components: { UiInput },

  inheritAttrs: false,
  props: {
    type: {
      type: String,
      default: 'date',
    },
    modelValue: {
      type: Number,
      default: null,
    },
  },
  emits: ['update:modelValue'],
  setup(props, { emit }) {
    const dateObj = computed(() => new Date(props.modelValue));
    const formattedDate = computed(() => {
      if (props.modelValue === null) {
        return '';
      }
      if (props.type === 'date') {
        return dateObj.value.toISOString().slice(0, 10);
      } else if (props.type === 'time') {
        return dateObj.value.toISOString().slice(11, 16);
      } else {
        return dateObj.value.toISOString().slice(0, 16);
      }
    });
    const onChangeInput = (value) => {
      const { result } = useParseDate(value, props);
      emit('update:modelValue', result);
    };
    const getValueNumber = () => {
      if (props.type === 'date') {
        return 'date';
      } else if (props.type === 'time') {
        return 'time';
      } else {
        return NaN;
      }
    };
    return {
      formattedDate,
      onChangeInput,
      getValueNumber,
    };
  },
};
</script>
