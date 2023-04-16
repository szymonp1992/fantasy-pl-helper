<template>
  <div class="about">
    <h1>This is goalkeepers stats page</h1>
    <KeepAlive>
      <StatsTable
        v-if="isDataLoaded"
        :players="goalkeepersData"
        :statsToDisplay="goalkeeperStatsToDisplay"
      />
    </KeepAlive>
  </div>
</template>

<script>
import { computed, watch } from "vue";
import { useStore } from "vuex";
import StatsTable from "../components/StatsTable.vue";

export default {
  components: {
    StatsTable,
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
      "total_points",
      "minutes",
      "clean_sheets",
      "saves",
      "goals_conceded",
    ];

    const isDataLoaded = computed(() => {
      return store.getters.getDataLoadedStatus;
    });

    return { goalkeepersData, goalkeeperStatsToDisplay, isDataLoaded };
  },
};
</script>
