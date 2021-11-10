<template>
  <v-app>
    <div class="loader-container">
      <v-progress-circular
        v-if="isTemplatesFetching"
        indeterminate
        class="loader"
      />
    </div>
    <Modal className="center flex-wrap" @close="handleModalClose">
      <template #trigger="modalProps">
        <ImgCard
          class="img"
          v-for="meme in memes"
          :key="meme.id"
          :name="meme.name"
          :url="meme.url"
          :hash="meme"
          @selection="(hash) => proceedToGenerate(hash, modalProps.open)"
        />
      </template>
      <template #default="modalProps">
        <GenModal v-if="!hideGenModal" :hash="selectedHash" @close="modalProps.close" />
      </template>
    </Modal>
  </v-app>
</template>

<script>
import { getTemplates } from '@/store.js';
import ImgCard from '@/components/ImgCard.vue';
import GenModal from '@/components/GenImage.vue';
import Modal from '@/components/Modal.vue';

export default {
  name: 'App',
  components: {
    ImgCard,
    Modal,
    GenModal
  },
  data() {
    return {
      memes: [],
      selectedHash: null,
      hideGenModal: false,
      isTemplatesFetching: false
    }
  },
  created() {
    this.isTemplatesFetching = true;
    getTemplates()
      .then((response) => {
        let { data: { memes } } = response;
        this.memes = memes;
      })
      .catch((err) => {
        alert(err.message);
      })
      .finally(() => this.isTemplatesFetching = false);
  },
  methods: {
    proceedToGenerate(hash, openGenModal) {
      if (hash) {
        this.hideGenModal = false;
        this.selectedHash = hash;
        openGenModal();
      }
    },
    handleModalClose() {
      this.hideGenModal = true;
    }
  }
}
</script>

<style>
  html, body, #app {
    font-family: 'Roboto', sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    height: 100%;
    width: 100%;
    background-color: rgb(32, 33, 36);
  }
  .loader-container {
    width: 100%;
    position: relative;
    top: 50%;
    transform: translateY(-50%);
  }
  .loader svg circle {
    stroke: #fff;
  }
  .img {
    padding: 12px;
    margin: 24px;
  }
  .flex-wrap {
    flex-wrap: wrap;
  }
  .center {
    display: flex;
    justify-content: center;
    align-content: center;
  }
  .no-break {
    word-break: normal !important;
  }
  .cursor-pointer {
    cursor: pointer;
  }
</style>
