<template>
  <div class="row">
    <div class="col-6">
      <div class="input-group">
        <div class="input-group-prepend">
          <span class="input-group-text" id="inputGroup-sizing-sm"
            >Min. minutes played</span
          >
        </div>
        <input
          type="number"
          name="minutes-played-input"
          id="minutes-played-input"
          min="0"
          :max="maxMinutesPlayed"
          v-model="minMinutesPlayed"
          class="form-control"
          @change="onFiltersChange"
        />
      </div>
      <div class="input-group mt-2">
        <div class="input-group-prepend">
          <span class="input-group-text" id="inputGroup-sizing-sm"
            >Max. price</span
          >
        </div>
        <input
          type="number"
          name="maximum-price-input"
          id="maximum-price-input"
          :min="minPrice"
          :max="maxPrice"
          v-model="maxPlayerPrice"
          step="0.1"
          class="form-control"
          @change="onFiltersChange"
        />
      </div>
      <RadioFilters @radio-change="onFiltersChange"></RadioFilters>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import RadioFilters from "./RadioFilters.vue";

export default {
  components: { RadioFilters },
  props: {
    maxPrice: {
      type: Number,
      required: true,
    },
    minPrice: {
      type: Number,
      required: true,
    },
    maxMinutesPlayed: {
      type: Number,
      required: true,
    },
  },
  setup(props, { emit }) {
    const minMinutesPlayed = ref(0);
    const maxMinutesPlayed = ref(props.maxMinutesPlayed);
    const minPrice = ref(props.minPrice);
    const maxPrice = ref(props.maxPrice);
    const maxPlayerPrice = ref(props.maxPrice);
    const radioPicked = ref();

    function onFiltersChange(data) {
      if (data.radioOptionPicked) {
        radioPicked.value = data.radioOptionPicked;
      }
      emit("filters-change", {
        minMinutesPlayed: minMinutesPlayed.value,
        maxMinutesPlayed: maxMinutesPlayed.value,
        maxPlayerPrice: maxPlayerPrice.value,
        radioPicked: radioPicked.value,
      });
    }

    return {
      minMinutesPlayed,
      maxMinutesPlayed,
      maxPlayerPrice,
      minPrice,
      maxPrice,
      radioPicked,
      onFiltersChange,
    };
  },
};
</script>
