<template>
  <TheNavbar />
  <div class="container"><RouterView /></div>
</template>

<script>
import { RouterView } from "vue-router";
import { onMounted, computed } from "vue";
import axios from "axios";
import { useStore } from "vuex";

import TheNavbar from "./components/TheNavbar.vue";

export default {
  components: {
    TheNavbar,
  },
  setup() {
    // Using Axios to fetch data (in fact launch Python functions to fetch data from FPL and Understat)
    const fetchData = async () => {
      await axios.get("http://localhost:8000/fpl");
      await axios.get("http://localhost:8000/understat");
    };

    const store = useStore();

    // Gettig players data from Vuex Store
    const playersData = computed(() => {
      return store.getters.getPlayersFPLData;
    });
    // Getting teams data from Vuex Store
    const teamsData = computed(() => {
      return store.getters.getTeamsUnderstatData;
    });

    onMounted(async () => {
      // Function fetchData is run on every app launch, getting up to date data
      await fetchData();
      // Dispatching actions to fetch data from JSON files and put it in Vuex Store index.js
      store.dispatch("fetchFromFPL");
      store.dispatch("fetchFromUnderstat");
    });

    return { playersData, teamsData };
  },
};
</script>
