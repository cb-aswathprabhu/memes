<template>
  <div>
    <div :class="className">
      <slot name="trigger" :open="openModal" />
    </div>
    <v-row justify="center">
      <v-dialog
        v-model="isVisible"
        max-width="450"
        persistent
      >
        <slot :close="closeModal" />
      </v-dialog>
    </v-row>
  </div>
</template>

<script>
  export default {
    props: ['className'],
    data() {
      return {
        isVisible: false
      }
    },
    methods: {
      openModal() {
        this.isVisible = true;
      },
      closeModal() {
        // Wait for animation to end and trigger close
        setTimeout(() => {
          this.$emit('close');
        }, 300);
        this.isVisible = false;
      }
    }
  }
</script>