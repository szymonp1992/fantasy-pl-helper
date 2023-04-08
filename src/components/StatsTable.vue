<template>
  <h1>This is stats table.</h1>
  <p>{{ playersArray[0] }}</p>
</template>

<script>
import { computed } from "vue";

export default {
  props: {
    players: {
      type: Array,
      required: true,
    },
  },

  setup(props) {
    const playersArray = computed(() => {
      return props.players;
    });

    return { playersArray };
  },
};
</script>
