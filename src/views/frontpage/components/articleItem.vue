<template>
  <el-card
    shadow="hover"
    class="box-card"
  >
    <div
      slot="header"
      class="clearfix"
    >
      <span>{{article.title}}</span>
      <el-row style="float: right;">
        <!-- 编辑文章 -->
        <el-button
          type="primary"
          size="mini"
          icon="el-icon-edit"
          circle
        ></el-button>
        <!-- 删除文章 -->
        <el-button
          type="danger"
          size="mini"
          icon="el-icon-delete"
          circle
        ></el-button>
      </el-row>
    </div>
    <div @click="goDetail(article.id)">
      {{article.subTitle}}
    </div>
  </el-card>

</template>
<script>
export default {
  props: {
    article: {
      type: Object,
      default: function() {
        return {
          id: 1,
          title: "this is a title",
          subTitle: "this is subTitle"
        };
      }
    }
  },
  methods: {
    goDetail(id) {
      this.$router.push({ name: "detail", params: { articleid: 123 } });
    }
  }
};
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
