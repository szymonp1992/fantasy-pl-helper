<template>
  <div class="about">
    <h1>This is team stats page</h1>
    <TeamsStatsTable
      v-if="isDataLoaded"
      :teams="teamsData"
      :statsToDisplay="teamsStatsToDisplay"
    />
  </div>
</template>

<script>
import TeamsStatsTable from "../components/TeamsStatsTable.vue";

import { computed, onMounted } from "vue";

import { useStore } from "vuex";

export default {
  components: {
    TeamsStatsTable,
  },

  setup() {
    const store = useStore();

    const teamsData = computed(() => {
      return store.getters.getTeamsData;
    });

    const teamsStatsToDisplay = [
      "name",
      "goals_scored",
      "goals_conceded",
      "goals_difference",
      "xG",
      "xGA",
      "xGD",
      "npxG",
      "npxGA",
      "npxGD",
      "last_5_goals_scored",
      "last_5_goals_conceded",
      "last_5_goals_difference",
      "last_5_xG",
      "last_5_xGA",
      "last_5_xGD",
      "last_5_npxG",
      "last_5_npxGA",
      "last_5_npxGD",
    ];

    const isDataLoaded = computed(() => {
      return store.getters.getDataLoadedStatus;
    });

    return { teamsData, teamsStatsToDisplay, isDataLoaded };
  },
};
</script>
