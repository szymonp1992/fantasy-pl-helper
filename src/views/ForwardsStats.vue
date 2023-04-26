<template>
  <div class="about">
    <KeepAlive>
      <StatsTable
        v-if="isDataLoaded"
        :players="forwardsData"
        :statsToDisplay="forwardStatsToDisplay"
      />
    </KeepAlive>
  </div>
</template>

<script>
import { computed } from "vue";
import { useStore } from "vuex";
import StatsTable from "../components/StatsTable.vue";

export default {
  components: {
    StatsTable,
  },

  setup() {
    const store = useStore();

    const forwardsData = computed(() => {
      return store.getters.getForwardsData;
    });

    const forwardStatsToDisplay = [
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
    ];

    const isDataLoaded = computed(() => {
      return store.getters.getDataLoadedStatus;
    });

    return { forwardsData, forwardStatsToDisplay, isDataLoaded };
  },
};
</script>
