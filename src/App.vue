<template>
  <v-app>
    <div class="loader-container">
      <v-progress-circular
        v-if="isTemplatesFetching"
        indeterminate
        class="loader"
      />
    </div>
    <div class="center flex-wrap">
      <ImgCard
        class="img"
        v-for="meme in memes"
        :key="meme.id"
        :name="meme.name"
        :url="meme.url"
        :hash="meme"
        @selection="handleTemplateSel"
      />
    </div>
    <Modal :hash="selectedHash" @cancel="onCancel" />
  </v-app>
</template>

<script>
import { getTemplates } from '@/store.js';
import ImgCard from '@/components/ImgCard.vue';
import Modal from '@/components/GenImage.vue';

export default {
  name: 'App',
  components: {
    ImgCard,
    Modal
  },
  data() {
    return {
      memes: [],
      isTemplatesFetching: false,
      selectedHash: null
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
    handleTemplateSel(hash) {
      if (hash) {
        this.selectedHash = hash;
      }
    },
    onCancel() {
      this.selectedHash = null;
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
    /* To stack before modal */
    width: 100%;
    position: relative;
    z-index: 1;
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
