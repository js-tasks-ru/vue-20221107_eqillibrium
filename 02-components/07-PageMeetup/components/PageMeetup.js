import { defineComponent } from '../vendor/vue.esm-browser.js';
import UiContainer from './UiContainer.js';
import UiAlert from './UiAlert.js';
import { fetchMeetupById } from '../meetupService';
import MeetupView from "../../06-MeetupView/components/MeetupView";

export default defineComponent({
  name: 'PageMeetup',

  components: {
    UiAlert,
    UiContainer,
    MeetupView,
  },

  props: {
    meetupId: Number,
  },
  data() {
    return {
      meetup: null,
      error: false,
      loading: false,
    };
  },
  watch: {
    meetupId: {
      handler() {
        this.fetchMeetups();
      },
      immediate: true,
    },
  },
  methods: {
    async fetchMeetups() {
      this.meetup = null;
      this.loading = true;
      this.error = false;
      await fetchMeetupById(Number(this.meetupId))
        .then((data) => (this.meetup = data))
        .catch((error) => (this.error = error.message));
      this.loading = false;
    },
  },

  template: `
    <div class="page-meetup">
    <!-- meetup view -->
    <MeetupView v-if="meetup && !error" :meetup="this.meetup"/>
    <UiContainer v-if="loading">
      <UiAlert>Загрузка...</UiAlert>
    </UiContainer>

    <UiContainer v-if="error">
      <UiAlert>{{ this.error }}</UiAlert>
    </UiContainer>
    </div>`,
});
