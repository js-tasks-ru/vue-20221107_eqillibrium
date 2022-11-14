import { createApp, defineComponent} from './vendor/vue.esm-browser.js';

const App = defineComponent({
  data() {
    return {
      count: 0
    }
  },
  methods: {
    update() {
      this.count += 1
    }
  }
})
const app = createApp(App);
app.mount('#app');
