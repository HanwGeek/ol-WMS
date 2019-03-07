<template>
  <div id="app">
    <el-container>
      <!-- <el-header> -->
       <NavHeader />
      <!-- </el-header> -->
      <el-container>
        <el-aside width="150px">
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
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 0px;
}

.el-main {
  padding: 0px;
}

.el-aside {
  line-height: 200px;
  margin-top: 50px;
}

.el-header {
  line-height: 60px;
}
</style>
