<template>
  <div>
    <h2>App component - {{ msg }} </h2>
  </div>
</template>

<script lang="ts">
import {defineComponent} from "vue";
export default defineComponent({
  setup() {
    return {
      msg: 'Test message',
    }
  }
});
</script>
