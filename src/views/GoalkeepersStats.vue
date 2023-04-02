<template>
  <div class="about">
    <h1>This is goalkeepers stats page</h1>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";

export default {
  setup() {
    const goalkeepersList = ref([]);

    async function loadGoalkeepersData() {
      const response = await fetch("../fpl.json");
      const data = await response.json();
      console.log(data);
    }
  },
};
</script>
