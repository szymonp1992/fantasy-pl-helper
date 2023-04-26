<template>
  <div class="form-check mt-4">
    <input
      class="form-check-input"
      type="radio"
      name="filterRadios"
      id="allRadio"
      value="allRadio"
      checked
      @change="onRadioChange"
      v-model="radioOptionPicked"
    />
    <label class="form-check-label" for="allRadio"> All stats </label>
  </div>
  <div class="form-check">
    <input
      class="form-check-input"
      type="radio"
      name="filterRadios"
      id="allSeasonRadio"
      value="allSeasonRadio"
      @change="onRadioChange"
      v-model="radioOptionPicked"
    />
    <label class="form-check-label" for="allSeasonRadio">
      Only all season stats
    </label>
  </div>
  <div class="form-check">
    <input
      class="form-check-input"
      type="radio"
      name="filterRadios"
      id="per90Radio"
      value="per90Radio"
      @change="onRadioChange"
      v-model="radioOptionPicked"
    />
    <label class="form-check-label" for="per90Radio"> Only per 90 stats </label>
  </div>
</template>

<script>
import { ref } from "vue";

export default {
  emits: ["radio-change"],
  setup(_, { emit }) {
    const radioOptionPicked = ref();

    function onRadioChange() {
      emit("radio-change", {
        radioOptionPicked: radioOptionPicked.value,
      });
    }

    return { radioOptionPicked, onRadioChange };
  },
};
</script>
