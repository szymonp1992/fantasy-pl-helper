<template>
  <h1>This is stats table.</h1>
  <!-- <ul v-for="player in playersArrayRef">
    <li>{{ player }}</li>
  </ul> -->
  <div class="container mt-4">
    <table class="table table-striped table-bordered border-light teams-table">
      <thead>
        <tr class="table-secondary">
          <td v-for="stat in statsToDisplay" :key="stat" scope="col">
            {{ stat }}
          </td>
        </tr>
      </thead>
      <tbody>
        <tr v-for="playerKeysAndValues in Object.values(playersArrayRef)">
          <td v-for="player in Object.values(playerKeysAndValues)" scope="col">
            {{ player }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { computed, watch, ref } from "vue";
import { useStore } from "vuex";

export default {
  props: {
    players: {
      type: Array,
      required: true,
    },
    statsToDisplay: {
      type: Array,
      required: true,
    },
  },

  setup(props) {
    const store = useStore();

    // Empty array that will be populated with players and their wanted stats
    const playersArrayRef = ref([]);

    // Computed property to retrieve players passed through props
    const playersArray = computed(() => {
      return props.players;
    });

    // Stats that we want to have in final player object
    const statsToDisplay = props.statsToDisplay;

    // Watcher that populates playersArrayRef as soon as all the data from APIs is loaded in Vuex Store
    watch(
      () => store.getters.getDataLoadedStatus,
      (value) => {
        if (value) {
          const playersArrayToManipulate = playersArray.value;
          // playersArrayRef key-value pairs are filtered with statsToDisplay array. If a key is found in player object, it is left there. If not, it is removed
          playersArrayRef.value = playersArrayToManipulate.map((playerObj) => {
            const newObj = {};
            for (const key in playerObj) {
              if (statsToDisplay.includes(key)) {
                newObj[key] = playerObj[key];
              }
            }
            return newObj;
          });
        }
      }
    );

    return { playersArray, playersArrayRef };
  },
};
</script>

<style>
table {
  table-layout: fixed;
  width: 100%;
}
td,
th {
  text-align: center;
  vertical-align: middle;
  word-break: break-word;
  hyphens: auto;
  font-size: 0.75rem;
}
</style>
