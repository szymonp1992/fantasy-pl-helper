<template>
  <div class="about">
    <PlayersStatsTable
      v-if="isDataLoaded"
      :players="defendersData"
      :statsToDisplay="defenderStatsToDisplay"
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

    const defendersData = computed(() => {
      return store.getters.getDefendersData;
    });

    const defenderStatsToDisplay = [
      "display_name",
      "team",
      "now_cost",
      "minutes",
      "total_points",
      "bps",
      "goals_scored",
      "assists",
      "expected_goals",
      "expected_goals_per_90",
      "expected_assists",
      "expected_assists_per_90",
      "expected_goal_involvements",
      "expected_goal_involvements_per_90",
      "clean_sheets",
      "clean_sheets_per_90",
      "goals_conceded",
      "goals_conceded_per_90",
      "expected_goals_conceded",
      "expected_goals_conceded_per_90",
    ];

    const isDataLoaded = computed(() => {
      return store.getters.getDataLoadedStatus;
    });

    return { defendersData, defenderStatsToDisplay, isDataLoaded };
  },
};
</script>
