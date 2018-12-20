<template>
  <div class="header-main">
    <div class="header-left">
      <img id="myImage" src="./../assets/logo.png"/>
    </div>
    <div class="header-right">
      <el-button type="primary" icon="el-icon-edit" circle></el-button>
      <el-button type="success" round>我的文章</el-button>
      <el-button type="warning" icon="el-icon-star-off" circle></el-button>
    </div>
  </div>
</template>

<script>
export default{
  name: 'Header'
}
</script>

<style>
.header-main {
  width: 100%;
  height: 120px;
  padding-top: 30px;
}
.header-left {
  width: 200px;
  float: left;
}
.header-right {
  padding-top: 20px;
  width: 300px;
  float: right
}
#myImage {
  width: 70px;
  height: 70px;
}
</style>
