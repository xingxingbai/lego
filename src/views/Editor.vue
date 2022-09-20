<template>
  <div>
    <LText/>
    <Uploader />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import LText from '../components/LText.vue'
import Uploader from '../components/Uploader.vue'
export default defineComponent({
  components: {
    LText,
    Uploader
  },
  setup() {
    return {};
  },
});
</script>
