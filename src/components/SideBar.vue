<template>
  <div>
  </div>
</template>

<script>
export default {
  name: 'SideBar',
  data () {
    return {

    }
  },
  methods: {
    showDliver () {
      this.$bus.$emit("show");
    },
    addPop () {
      this.$bus.$emit("addPop");
    },
    addRoad () {
      this.$bus.$emit("addRoad");
    },
    addRes () {
      this.$bus.$emit("addRes");
    }
  }
}
</script>

<style scoped>
.el-collapse-item {
  font-size: 24px;
}
</style>
