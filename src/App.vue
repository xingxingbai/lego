<template>
  <div id="nav">
  </div>
  <router-view />
</template>
<script lang="ts">
import { useStore } from 'vuex';
import { defineComponent, computed } from 'vue';
import { GlobalDataProps } from './store/index';
export default defineComponent({
  name: 'App',
  setup() {
    const store = useStore<GlobalDataProps>();
    const isLoading = computed(() => store.getters.isLoading);
    return {
      isLoading,
    };
  },
});
</script>