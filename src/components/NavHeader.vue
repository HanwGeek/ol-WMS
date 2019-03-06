<template>
  <div id='nav-header'>
    <div id='title'>{{title}}</div>
    <div id='nav'>
      <a id='avatar' href='https://hanwgeek.github.io/'>
        <img :src='avatar'>
      </a>
    </div>
  </div>
</template>


<script>
export default {
  data () {
    return {
      title: 'OpenLayers',
      avatar: require("../assets/avatar.jpg"),
    }
  }
}
</script>

<style scoped>
#nav-header {
  position: fixed;
  height: 40px;
  width: 100%;
  padding: 10px 50px;
  line-height: 40px;
  top: 0;
  left: 0;
  z-index: 100;
  background-color: #fff;
  box-shadow: 0 0 1px rgba(0,0,0,0.25);
}

#title {
  font-size: 24px;
  float: left;
  vertical-align: center;
}


#avatar img{
  position: fixed;
  right: 15px;
  height: 40px;
  border-radius: 50%;
}


</style>


