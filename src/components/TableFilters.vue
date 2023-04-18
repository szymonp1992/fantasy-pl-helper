<template>
  <!-- <div class="row">
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
          @input.prevent="filterByMinMinutesAndMaxPrice"
          v-model="minMinutesPlayed"
          class="form-control"
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
          @input.prevent="filterByMinMinutesAndMaxPrice"
          step="0.1"
          class="form-control"
        />
      </div>
      <div class="form-check mt-4">
        <input
          class="form-check-input"
          type="radio"
          name="filterRadios"
          id="allRadio"
          value="allRadio"
          checked
          @change="onRadioChange('allRadio')"
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
          @change="onRadioChange('allSeasonRadio')"
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
          @change="onRadioChange('per90Radio')"
        />
        <label class="form-check-label" for="per90Radio">
          Only per 90 stats
        </label>
      </div>
    </div>
  </div> -->
</template>

<script></script>
