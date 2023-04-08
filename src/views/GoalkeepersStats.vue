<template>
  <div class="about">
    <h1>This is goalkeepers stats page</h1>
    <StatsTable
      :players="goalkeepersData"
      :statsToDisplay="goalkeeperStatsToDisplay"
    />
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

    const goalkeepersData = computed(() => {
      return store.getters.getGoalkeepersData;
    });

    const goalkeeperStatsToDisplay = [
      "display_name",
      "team",
      "total_points",
      "minutes",
      "clean_sheets",
      "saves",
    ];

    return { goalkeepersData, goalkeeperStatsToDisplay };
  },
};
</script>
