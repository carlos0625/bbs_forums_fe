<template>
  <el-card  shadow="hover" class="box-card">
    <div
      slot="header"
      class="clearfix"
    > 
      <span>卡片名称</span>
      <el-button
        style="float: right; padding: 3px 0"
        type="text"
      >fuck</el-button>
    </div>
    <div
      v-for="o in 2"
      :key="o"
      class="text item"
    >
      {{'列表内容 ' + o }}
    </div>
  </el-card>

</template>
<script>
export default {};
</script>

<style lang="scss" scoped>
.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both;
}

.box-card {
  margin: 14px 0;
}
</style>
