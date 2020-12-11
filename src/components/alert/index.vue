<template>
  <v-alert
    dense
    type="success"
  >{{ message }}</v-alert>
</template>
<script>
export default {
  data() {
    return {
      message: '',
      duration: 60000,
      visible: false
    }
  },
  mounted() {
    console.log(this.visible)
  }
}
</script>
<style lang="scss" scoped>
.v-alert{
  position: fixed;
  top: 20px;
  left: 50%;
}
</style>