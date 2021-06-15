<template>
  <div>
    <h2>App component - {{ msg }} </h2>
  </div>
</template>

<script>
export default {
  data() {
    return {
      msg: 'Inner message',
    }
  }
}
</script>
