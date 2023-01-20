<template>
  <div class="image-uploader">
    <label
      class="image-uploader__preview"
      :class="{ 'image-uploader__preview-loading': isLoading }"
      :style="{ '--bg-url': bgImage }"
    >
      <span class="image-uploader__text">{{ title }}</span>
      <input
        ref="inputFile"
        v-bind:="$attrs"
        type="file"
        accept="image/*"
        class="image-uploader__input"
        @click="removeFile"
        @change="changeImage"
      />
    </label>
  </div>
</template>

<script>
import { ref, computed, watch } from 'vue';

export default {
  name: 'UiImageUploader',

  inheritAttrs: false,

  props: {
    preview: {
      type: String,
      default: '',
    },
    uploader: {
      type: Function,
      required: false,
    },
  },

  emits: ['remove', 'upload', 'error', 'select'],

  setup(props, { emit }) {
    //состояние
    const isLoading = ref(false);
    const localPreview = ref(null);
    const inputFile = ref(null);
    const bgImage = computed(() => (localPreview.value ? `url(${localPreview.value})` : 'var(--default-cover)'));
    const title = computed(() => {
      if (isLoading.value) {
        return 'Загрузка...';
      }
      return localPreview.value ? 'Удалить изображение' : 'Загрузить изображение';
    });
    watch(() => props.preview,
      (currentValue, oldValue) => {
        localPreview.value = currentValue;
      },
      { deep: true, immediate: true },
    );

    //удаление изображения
    const removeInputValue = () => {
      inputFile.value.value = null;
    };
    const removeFile = (e) => {
      if (isLoading.value) {
        return false;
      }
      if (localPreview.value) {
        removeInputValue();
        localPreview.value = null;
        emit('remove');
      }
    };

    //загрузка изображения
    const changeImage = async (e) => {
      const file = e.target.files[0];
      if (!file) {
        return false;
      }
      isLoading.value = true;
      if (props.uploader) {
        try {
          const result = await props.uploader(file);
          emit('upload', result);
        } catch (e) {
          removeInputValue();
          emit('error', e);
        }
      } else {
        localPreview.value = URL.createObjectURL(file);
      }
      emit('select', file);
      isLoading.value = false;
    };

    return {
      isLoading,
      localPreview,
      inputFile,
      bgImage,
      title,
      changeImage,
      removeFile
    };
  },
};
</script>

<style scoped>
.image-uploader {
}

.image-uploader__input {
  opacity: 0;
  height: 0;
}

.image-uploader__preview {
  --bg-url: var(--default-cover);
  background-size: cover;
  background-position: center;
  background-image: linear-gradient(0deg, rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), var(--bg-url);
  border: 2px solid var(--blue-light);
  border-radius: 8px;
  transition: 0.2s border-color;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  max-width: 512px;
  height: 228px;
}

.image-uploader__text {
  color: var(--white);
  font-family: 'Nunito', sans-serif;
  font-weight: 600;
  font-size: 20px;
  line-height: 28px;
}

.image-uploader__preview:hover {
  border-color: var(--blue);
}

.image-uploader__preview.image-uploader__preview-loading {
  cursor: no-drop;
}
</style>
