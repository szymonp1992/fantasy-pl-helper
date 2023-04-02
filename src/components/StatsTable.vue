<template>
  <th
    scope="col"
    @click="($event) => sortColumn('NAZWA_ATRYBUTU')"
    id="NAZWA_ATRYUBUTU.toLowerCase() + '-header'"
    :class="
      activeHeader === 'NAZWA_ATRYBUTU.toLowerCase()' + '-header'
        ? 'active-header'
        : ''
    "
  ></th>
</template>
