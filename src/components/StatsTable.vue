<template>
  <div class="container-fluid mt-4">
    <TableFilters
      v-if="minPrice < 100"
      :maxPrice="maxPrice"
      :minPrice="minPrice"
      :maxMinutesPlayed="maxMinutesPlayed"
    ></TableFilters>
    <table class="table table-bordered border-secondary teams-table">
      <thead>
        <tr class="table-secondary">
          <th
            v-for="stat in statsToDisplay"
            :key="stat"
            scope="col"
            class="text-center"
            :class="activeHeader === stat ? 'active-header' : ''"
            @click="sortTableBy(stat)"
          >
            {{ stat.charAt(0).toUpperCase()
            }}{{ stat.slice(1).replaceAll("_", " ") }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="playerStatsKeysAndValues in playersArrayRef">
          <td
            v-for="[statKey, statValue] in Object.entries(
              playerStatsKeysAndValues
            )"
            scope="col"
            class="text-center"
            :style="{ backgroundColor: colorCells(statKey, statValue) }"
            :key="statKey"
          >
            {{ statValue }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { computed, ref, onMounted } from "vue";
import { useStore } from "vuex";
import TableFilters from "./TableFilters.vue";

export default {
  components: {
    TableFilters,
  },
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

    //
    // Populating with players' data logic
    //

    // Empty array that will be populated with players and their wanted stats
    const playersArrayRef = ref([]);

    // Computed property to retrieve players passed through props
    const playersArray = computed(() => {
      return props.players;
    });

    // Stats that we want to have in final player object
    const statsToDisplay = props.statsToDisplay;

    onMounted(() => {
      const playersArrayToManipulate = playersArray.value;
      // playersArrayRef key-value pairs are filtered with statsToDisplay array. If a key is found in player object, it is left there. If not, it is removed
      playersArrayRef.value = playersArrayToManipulate.map((playerObj) => {
        const newObj = {};
        for (const key of statsToDisplay) {
          if (playerObj.hasOwnProperty(key)) {
            newObj[key] = playerObj[key];
          }
        }
        return newObj;
      });
      sortTableBy("total_points");
    });

    //
    // Sorting logic
    //

    const activeHeader = ref("total_points");
    const currentSort = ref("total_points");
    const currentSortDir = ref("asc");

    function sortTableBy(headerName) {
      activeHeader.value = headerName;
      if (headerName === currentSort.value) {
        currentSortDir.value = currentSortDir.value === "desc" ? "asc" : "desc";
      }
      currentSort.value = headerName;
      playersArrayRef.value = playersArrayRef.value.sort((a, b) => {
        let modifier = 1;
        if (currentSortDir.value === "desc") modifier = -1;
        if (a[currentSort.value] < b[currentSort.value]) return -1 * modifier;
        if (a[currentSort.value] > b[currentSort.value]) return 1 * modifier;
        return 0;
      });
    }

    //
    // Getting min and max values for players' minutes and prices
    //

    const maxPrice = computed(() => {
      return playersArrayRef.value.reduce((max, player) => {
        return parseFloat(player.now_cost) > max
          ? parseFloat(player.now_cost)
          : max;
      }, 0);
    });

    const minPrice = computed(() => {
      return playersArrayRef.value.reduce((min, player) => {
        return parseFloat(player.now_cost) < min
          ? parseFloat(player.now_cost)
          : min;
      }, 100);
    });

    const maxMinutesPlayed = computed(() => {
      return playersArrayRef.value.reduce((max, player) => {
        return player.minutes > max ? player.minutes : max;
      }, 0);
    });

    //
    // Coloring logic
    //

    // Stats that should be sorted ascending (the lower, the better)
    const reverseStatKeys = [
      "goals_conceded",
      "goals_conceded_per_90",
      "expected_goals_conceded",
      "expected_goals_conceded_per_90",
    ];

    // Function responsible for coloring cells
    function colorCells(statKey, statValue) {
      // Eliminating string type properties (Display name, team, price)
      if (typeof statValue === "string" || statKey === "now_cost") return;
      // Getting maximum value of certain property
      const maxValue = Math.max(
        ...playersArrayRef.value.map((player) => player[statKey])
      );
      // Getting minimum value of certain property
      const minValue = Math.min(
        ...playersArrayRef.value.map((player) => player[statKey])
      );
      // Calculating value range between min and max
      const valueRange = maxValue - minValue;
      // Relative value variable for value between 0 and 1 representing percentage of statValue vs valueRange
      let relativeValue = 0;
      let reverseValue = 0;
      // If statement for stats sorted ascending (the lower, the better)
      if (reverseStatKeys.indexOf(statKey) > -1) {
        if (statValue > valueRange / 2) {
          reverseValue = statValue - (statValue - valueRange / 2) * 2;
        }
        if (statValue < valueRange / 2) {
          reverseValue = statValue + (valueRange / 2 - statValue) * 2;
        }
        if (statValue === valueRange / 2) {
          reverseValue = statValue;
        }
        relativeValue = (reverseValue + minValue) / valueRange;
      }
      // If statement for all the other stats (sorted descending, the higher, the better)
      if (reverseStatKeys.indexOf(statKey) === -1) {
        relativeValue = (statValue - minValue) / valueRange;
      }
      // Counting hue
      const hue = (relativeValue * 130).toString(10);
      // Returning color from green - red palette
      return `hsl(${hue}, 70%, 44%)`;
    }

    // Checking if all data is loaded from store
    const isDataLoaded = computed(() => {
      return store.getters.getDataLoadedStatus;
    });

    return {
      isDataLoaded,
      playersArray,
      playersArrayRef,
      statsToDisplay,
      activeHeader,
      maxPrice,
      minPrice,
      maxMinutesPlayed,
      sortTableBy,
      colorCells,
    };
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
  vertical-align: middle;
  word-break: break-word;
  hyphens: auto;
  font-size: 0.75rem;
}
th {
  cursor: pointer;
}
.active-header {
  text-decoration: underline;
  color: #0b5394;
  background-color: #ffe8a2 !important;
}
</style>
