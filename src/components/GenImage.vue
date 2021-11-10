<template>
  <v-card>
    <v-toolbar class="text-h6 mb-8">
      It would be fun to tweak!
    </v-toolbar>
    <v-text-field
      class="form-field"
      v-model="text0"
      label="Text #1"
      :rules="[rules.text0]"
      :autofocus=true
    />
    <v-text-field
      v-model="text1"
      class="form-field mb-2"
      label="Text #2 (Optional)"
    />
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn
        class="mb-2"
        color="green darken-1"
        text
        @click="$emit('close')"
      >
        Cancel
      </v-btn>
      <v-btn
        class="mb-2"
        color="green darken-1"
        text
        :loading="isGenerating"
        @click="genImage"
      >
        Generate
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import { generateMeme } from '@/store.js';

  export default {
    props: ['hash'],
    data() {
      return {
        isGenerating: false,
        text0: '',
        text1: '',
        rules: {
          text0: (value) => !!value
        }
      }
    },
    methods: {
      genImage() {
        let { text0, text1 } = this;
        if (text0) {
          // API expects atleast text0 or text1 to be available
          // Hence we're making text0 mandatory!
          this.isGenerating = true;
          generateMeme({ text0, text1, id: this.hash?.id })
            .then((response) => {
              let { data: { url } = {} } = response || {};
              if (url) {
                window.open(url, '_blank')?.focus();
                this.$emit('close');
              } else {
                alert('Something went wrong!')
              }
            })
            .catch((err) => alert(err.message))
            .finally(() => this.isGenerating = false);
        }
      }
    }
  }
</script>
<style scoped>
  .form-field {
    width: 300px;
    margin-left: 30px;
  }
</style>