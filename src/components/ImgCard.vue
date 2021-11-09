<template>
  <v-card max-width="336" class="cursor-pointer card">
    <div class="backdrop">
      <v-card-title class="no-break name">{{name}}</v-card-title>
      <v-btn @click.stop="$emit('selection', hash)">
        Use this!
      </v-btn>
    </div>
    <v-img
      height="300"
      width="300"
      :contain="true"
      :src="url"
    />
  </v-card>
</template>

<script>
  export default {
    props: ['name', 'url', 'onSelection', 'hash']
  }
</script>

<style scoped>
  .card {
    position: relative;
  }
  .backdrop {
    display: none;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
    width: 100%;
    height: 100%;
    position: absolute;
    opacity: 0.9;
    background-color: rgb(32, 33, 36);
    top: 0;
    left: 0;
    z-index: 1;
  }
  .name {
    color: white;
    justify-content: center;
    width: 100%;
  }
  .card:hover .backdrop {
    display: flex;
  }
</style>