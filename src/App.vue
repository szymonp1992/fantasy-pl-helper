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

    // Creating store instance in main App.vue file
    const store = useStore();

    onMounted(async () => {
      // Function fetchData is run on every app launch, getting up to date data
      await fetchData();
      // Dispatching actions to fetch data from JSON files and put it in Vuex Store index.js
      await store.dispatch("fetchFromFPLAndUnderstat");
    });
  },
};
</script>
