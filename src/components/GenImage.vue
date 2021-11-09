<template>
  <v-row justify="center">
    <v-dialog
      v-model="isVisible"
      max-width="450"
      persistent
    >
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
            @click="closeModal"
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
    </v-dialog>
  </v-row>
</template>

<script>
import { generateMeme } from '@/store.js';

  export default {
    props: ['isModalVisible', 'hash'],
    data() {
      return {
        isGenerating: false,
        isVisible: false,
        text0: '',
        text1: '',
        rules: {
          text0: (value) => !!value
        }
      }
    },
    watch: {
      hash() {
        if (this.hash) {
          this.openModal();
        }
      }
    },
    methods: {
      openModal() {
        this.isVisible = true;
      },
      closeModal() {
        this.$emit('cancel');
        this.isVisible = false;
      },
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
                window.open(url, '_blank').focus();
                this.closeModal();
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