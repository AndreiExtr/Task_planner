<template>
  <div class="main_app" id="app">
    <Sidebar />
    <Main />
    <router-view />
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import Sidebar from '@/components/Sidebar.vue';
import Main from '@/components/Main.vue';

export default defineComponent({
  name: 'App',
  components: {
    Sidebar,
    Main
  }
});
</script>

<style>
html, body, #app {
  height: 100%;
  margin: 0;
  background-color: #cccccc;
}
.main_app {
  height: 100%;
  display: flex;
  flex-direction: row;
}
</style>
