<template>
  <div>
    <el-collapse accordion>
    <el-collapse-item title="GetCapablities" name="1">
      <el-button type="primary" round @click="getCap">GetCapablities</el-button>
    </el-collapse-item>
  </el-collapse>
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
    getCap () {
      this.$bus.$emit("getCap");
    }
  }
}
</script>

<style scoped>

.el-collapse-item {
  font-size: 24px;
}
</style>
