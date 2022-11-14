import { createApp, defineComponent } from './vendor/vue.esm-browser.js';

const API_URL = 'https://course-vue.javascript.ru/api';

const App = defineComponent({
  data() {
    return {
      meetupId: 1,
      meetupTitle: '',
    };
  },
  watch: {
    meetupId() {
      this.fetchMeetupById().then((data) => (this.meetupTitle = data.title));
    },
  },
  mounted() {
    this.fetchMeetupById().then((data) => (this.meetupTitle = data.title));
  },
  methods: {
    fetchMeetupById() {
      return fetch(`${API_URL}/meetups/${Number(this.meetupId)}`).then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          return response.json().then((error) => {
            throw error;
          });
        }
      });
    },
  },
});

createApp(App).mount('#app');
