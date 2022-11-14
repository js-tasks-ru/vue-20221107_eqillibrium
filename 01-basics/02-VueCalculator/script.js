import { createApp, defineComponent} from './vendor/vue.esm-browser.js';

const App = defineComponent({
  data() {
    return {
      firstOperand: null,
      secondOperand: null,
      operator: 'sum'
    }
  },
  computed: {
    calculate() {
      const map = {
        sum: () => this.firstOperand + this.secondOperand,
        subtract: () => this.firstOperand - this.secondOperand,
        multiply: () => this.firstOperand * this.secondOperand,
        divide: () => this.firstOperand / this.secondOperand
      }
      return map[this.operator]()
    }
  }
})
const app = createApp(App);
app.mount('#app');
