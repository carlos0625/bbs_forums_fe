<template>
  <el-card shadow="hover" class="box-card">
    <div slot="header" class="clearfix">
      <span>{{comment.username}}</span>
    </div>
    <div class="text item">{{comment.content }}</div>

  </el-card>
</template>
<script>
export default {
  props: {
    comment: {
      type: Object,
      default: function() {
        return {
          commenter: "fucker",
          content: "fuck you bitch"
        };
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.text {
  font-size: 14px;
}
.item {
  margin-bottom: 8px;
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
  margin: 20px;
  max-width: 80%;
}
</style>
