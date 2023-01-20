<template>
  <component :is="linkTag" class="link" :to="to" :href="href" :target="blank && '_blank'">
    <slot />
  </component>
</template>

<script>
export default {
  name: 'UiLink',

  props: ['tag', 'to', 'href', 'blank'],

  computed: {
    linkTag() {
      return this.tag ? this.tag : 'router-link';
    },
  }
}
</script>

<style scoped>
.link {
  color: var(--blue);
  text-decoration: none;
}

.link:hover {
  text-decoration: underline;
}
</style>
