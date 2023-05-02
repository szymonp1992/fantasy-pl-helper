<template>
  <div class="container-fluid mt-4">
    <RadioFilters />
    <table class="table table-bordered border-secondary teams-table">
      <thead>
        <tr class="table-secondary">
          <th
            v-for="stat in selectedStats"
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
        <tr v-for="teamStatsKeysAndValues in teamsArrayRef">
          <td
            v-for="[statKey, statValue] in Object.entries(
              teamStatsKeysAndValues
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
import RadioFilters from "./RadioFilters.vue";

export default {
  components: {
    RadioFilters,
  },
  props: {
    teams: {
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
    // Populating with teams' data logic
    //

    // Empty array that will be populated with teams and their wanted stats
    const teamsArrayRef = ref([]);

    // Computed property to retrieve teams passed through props
    const teamsArray = computed(() => {
      return props.teams;
    });

    // Stats that we want to have in final team object
    const statsToDisplay = ref(props.statsToDisplay);
    const selectedStats = ref(statsToDisplay.value);

    onMounted(() => {
      handleFiltersChange({
        radioPicked: "allRadio",
      });
    });

    //
    // Sorting logic
    //

    const activeHeader = ref("goals_difference");
    const currentSort = ref("goals_difference");
    const currentSortDir = ref("asc");

    function sortTableBy(headerName, filterChange) {
      activeHeader.value = headerName;
      if (headerName === currentSort.value) {
        currentSortDir.value = currentSortDir.value === "desc" ? "asc" : "desc";
      }
      if (filterChange) {
        currentSortDir.value = "desc";
      }
      currentSort.value = headerName;
      teamsArrayRef.value = teamsArrayRef.value.sort((a, b) => {
        let modifier = 1;
        if (currentSortDir.value === "desc") modifier = -1;
        if (a[currentSort.value] < b[currentSort.value]) return -1 * modifier;
        if (a[currentSort.value] > b[currentSort.value]) return 1 * modifier;
        return 0;
      });
    }

    //
    // Coloring logic
    //

    // Function responsible for coloring cells
    function colorCells(statKey, statValue) {
      // Eliminating string type properties (Display name, team, price)
      if (typeof statValue === "string" || statKey === "now_cost") return;
      // Getting maximum value of certain property
      const maxValue = Math.max(
        ...teamsArrayRef.value.map((team) => team[statKey])
      );
      // Getting minimum value of certain property
      const minValue = Math.min(
        ...teamsArrayRef.value.map((team) => team[statKey])
      );
      // Calculating value range between min and max
      const valueRange = maxValue - minValue;
      // Relative value variable for value between 0 and 1 representing percentage of statValue vs valueRange
      let relativeValue = 0;
      let reverseValue = 0;
      // If statement for stats sorted ascending (the lower, the better)
      if (statKey.includes("conceded") || statKey.includes("GA")) {
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
      if (!statKey.includes("conceded") && !statKey.includes("GA")) {
        relativeValue = (statValue - minValue) / valueRange;
      }
      // Counting hue
      const hue = (relativeValue * 130).toString(10);
      // Returning color from green - red palette
      return `hsl(${hue}, 70%, 44%)`;
    }

    //
    // Table reduction logic
    //

    // Handling of radio (all stats / all season stats / per 90 stats) changes
    function handleFiltersChange(data) {
      selectedStats.value = statsToDisplay.value;
      // Leaving only seasonal stats, not per 90
      if (data.radioPicked === "allSeasonRadio") {
        selectedStats.value = statsToDisplay.value.filter((stat) => {
          return !stat.includes("per_90");
        });
      }
      // Leaving only per 90 stats
      if (data.radioPicked === "per90Radio") {
        const per90StatsToLeave = ["name"];
        // Method to leave only per 90 stats plus necessary ones in the table (some checks if there is any of strings in per90StatsToLeave array included in certain stat key)
        selectedStats.value = statsToDisplay.value.filter((stat) => {
          return per90StatsToLeave.some((statToLeave) =>
            stat.includes(statToLeave)
          );
        });
      }

      // teamsArrayRef key-value pairs are filtered with statsToDisplay array. If a key is found in team object, it is left there. If not, it is removed
      teamsArrayRef.value = teamsArray.value.map((teamObj) => {
        const newObj = {};
        for (const key of selectedStats.value) {
          if (teamObj.hasOwnProperty(key)) {
            newObj[key] = teamObj[key];
          }
        }
        return newObj;
      });
      currentSortDir.value = !currentSortDir;
      sortTableBy(currentSort.value, true);
    }

    // Checking if all data is loaded from store
    const isDataLoaded = computed(() => {
      return store.getters.getDataLoadedStatus;
    });

    return {
      isDataLoaded,
      teamsArray,
      teamsArrayRef,
      selectedStats,
      activeHeader,
      sortTableBy,
      colorCells,
      handleFiltersChange,
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
