<template>
  <div class="about">
    <PlayersStatsTable
      v-if="isDataLoaded"
      :players="goalkeepersData"
      :statsToDisplay="goalkeeperStatsToDisplay"
    />
  </div>
</template>

<script>
import { computed } from "vue";
import { useStore } from "vuex";
import PlayersStatsTable from "../components/PlayersStatsTable.vue";

export default {
  components: {
    PlayersStatsTable,
  },

  setup() {
    const store = useStore();

    const goalkeepersData = computed(() => {
      return store.getters.getGoalkeepersData;
    });

    const goalkeeperStatsToDisplay = [
      "display_name",
      "team",
      "now_cost",
      "minutes",
      "total_points",
      "bps",
      "clean_sheets",
      "clean_sheets_per_90",
      "saves",
      "saves_per_90",
      "goals_conceded",
      "goals_conceded_per_90",
      "expected_goals_conceded",
      "expected_goals_conceded_per_90",
    ];

    const isDataLoaded = computed(() => {
      return store.getters.getDataLoadedStatus;
    });

    return { goalkeepersData, goalkeeperStatsToDisplay, isDataLoaded };
  },
};
</script>
