<script >
import { RouterView } from 'vue-router'
import HeaderView from "../src/components/Header.vue"
export default {
  components: {
    HeaderView,
  },
  data() {
    return {
      
    }
  },
}


</script>

<template>
  <HeaderView />
  <div class="container">
    <RouterView  />
  </div>
</template>

<style >
body {
  margin: 0;

}

.container {
  height: 79vh;
  min-width: 1285px;
}
</style>
