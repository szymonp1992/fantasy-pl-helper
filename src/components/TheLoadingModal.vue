<template>
  <div class="spinner-modal">
    <div class="spinner-border" role="status">
      <span class="visually-hidden">Loading...</span>
    </div>
  </div>
</template>

<style>
.spinner-modal {
  position: absolute;
  height: 100%;
  width: 100%;
  top: 0;
  left: 0;
  background-color: #ccc;
  opacity: 0.4;
  z-index: 100;
}

.spinner-border {
  position: absolute;
  top: calc(50% - 1rem);
  left: calc(50% - 1rem);
}
</style>
