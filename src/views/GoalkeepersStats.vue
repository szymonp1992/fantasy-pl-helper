<template>
  <div class="about">
    <h1>This is goalkeepers stats page</h1>
    <StatsTable :players="goalkeepers" />
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

    const goalkeepers = computed(() => {
      return store.getters.getGoalkeepersData;
    });

    return { goalkeepers };
  },
};
</script>
