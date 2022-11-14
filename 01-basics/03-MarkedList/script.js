import { createApp, defineComponent } from './vendor/vue.esm-browser.js';

const App = defineComponent({
  data() {
    return {
      mark: '',
      comments: [],
      start: 0,
      limit: 15,
      perPage: 15,
      page: 1,
    };
  },
  computed: {
    markedEmails() {
      if (this.mark)
        return this.comments.map((el) =>
          el.email.toLowerCase().includes(this.mark.toLowerCase()) ? { ...el, marked: true } : { ...el },
        );
      return this.comments;
    },
  },
  async mounted() {
    await this.fetchComments();
  },
  methods: {
    async nextPage() {
      this.page += 1;
      this.start = this.start + this.perPage;
      await this.fetchComments();
    },
    async prevPage() {
      if (this.page !== 1) {
        this.page -= 1;
        this.start = this.start - this.perPage;
        await this.fetchComments();
      }
    },
    async fetchComments() {
      try {
        const response = await fetch(
          `https://jsonplaceholder.typicode.com/comments?_start=${this.start}&_limit=${this.limit}`,
        );
        const data = await response.json();
        this.comments = data.map((el) => ({ ...el, marked: false }));
      } catch (e) {
        console.log(e);
      }
    },
  },
});

createApp(App).mount('#app');
