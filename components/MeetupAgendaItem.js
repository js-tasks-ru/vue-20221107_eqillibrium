import { defineComponent } from '../vendor/vue.esm-browser.js';
import { agendaItemIcons, agendaItemDefaultTitles } from '../meetupService.js';

export default defineComponent({
  name: 'MeetupAgendaItem',

  props: {
    item: Object,
  },

  computed: {
    agendaTitle() {
      return this.item.title ? this.item.title : agendaItemDefaultTitles[this.item.type];
    },
    agendaIcon() {
      return agendaItemIcons[this.item.type];
    },
    iconSource() {
      return `/assets/icons/icon-${this.agendaIcon}.svg`;
    },
    talk() {
      return this.item.type === 'talk';
    },
  },

  template: `
    <div class="agenda-item">
      <div class="agenda-item__col">
        <img :src="iconSource" class="icon" alt="key" />
      </div>
      <div class="agenda-item__col">{{ item.startsAt }} - {{ item.endsAt }}</div>
      <div class="agenda-item__col">
        <h3 class="agenda-item__title">{{ agendaTitle }}</h3>
        <p class="agenda-item__talk" v-if="talk">
          <span >{{ item.speaker }}</span>
          <span class="agenda-item__dot"></span>
          <span class="agenda-item__lang">{{ item.language }}</span>
        </p>
        <p v-if="item.description">{{ item.description }}</p>
      </div>
    </div>`,
});
