<template>
  <div>
    <slot name="trigger" :open="openModal" />
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
import { Vue, Component } from 'vue-property-decorator'

@Component
export default class Modal extends Vue {
  isVisible = false;

  openModal() {
    this.isVisible = true;
  }

  closeModal() {
    // Wait for animation to end and trigger close
    setTimeout(() => {
      this.$emit('close');
    }, 300);
    this.isVisible = false;
  }
}
</script>