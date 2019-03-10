<template>
  <div id="app">
    <el-container style="height: 700px">
      <!-- <el-header> -->
       <NavHeader />
      <!-- </el-header> -->
      <el-container>
        <el-aside width="360px" v-show="showSide">
          <SideBar />
        </el-aside>
        <el-main>
          <router-view/>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import NavHeader from "@/components/NavHeader"
import SideBar from "@/components/SideBar"

export default {
  name: 'App',
  components: {
    NavHeader,
    SideBar
  },
  data () {
    return {
      showSide: false
    }
  },
  created () {
    this.$bus.$on("showSide", (show) => {
      this.showSide = show;
    })
  }
}
</script>

<style scoped>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 0px;
}

.el-container {
  height: 100%;
}

.el-main {
  padding: 0px;
  height: 100%;
}

.el-aside {
  line-height: 50px;
  margin-top: 50px;
}

.el-header {
  line-height: 60px;
}
</style>
