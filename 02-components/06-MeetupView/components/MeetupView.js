import { defineComponent } from '../vendor/vue.esm-browser.js';
import UiAlert from './UiAlert.js';
import UiContainer from './UiContainer.js';
import MeetupCover from '../../03-MeetupCover/components/MeetupCover';
import MeetupDescription from '../../02-MeetupDescription/components/MeetupDescription';
import MeetupAgenda from '../../05-MeetupAgenda/components/MeetupAgenda';
import MeetupInfo from "../../04-MeetupInfo/components/MeetupInfo";

export default defineComponent({
  name: 'MeetupView',

  components: {
    UiAlert,
    UiContainer,
    MeetupCover,
    MeetupDescription,
    MeetupAgenda,
    MeetupInfo,
  },

  props: {
    meetup: {
      type: Object,
      required: true,
    },
  },

  template: `
    <div>
    <!-- meetup cover-->
    <MeetupCover :title="meetup.title" :image="meetup.image" />
    <ui-container>
      <div class="meetup" v-if="meetup.agenda && meetup.agenda.length > 0">
        <div class="meetup__content">
          <!-- meetup description -->
          <MeetupDescription :description="meetup.description" />
          <!-- meetup agenda -->
          <MeetupAgenda :agenda="meetup.agenda"/>
        </div>
        <div class="meetup__aside">
          <!-- meetup info -->
          <MeetupInfo
            :organizer="meetup.organizer"
            :date="meetup.date"
            :place="meetup.place"/>
        </div>
      </div>
      <ui-alert v-else>Программа пока пуста...</ui-alert>
    </ui-container>
    </div>`,
});
