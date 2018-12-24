<template>
  <el-card
    shadow="hover"
    class="box-card"
  >
    <div
      slot="header"
      class="clearfix"
    >
      <div style="float: left">
        <img style="border-radius: 50%;width:40px;height:40px">
      </div>
      <div style="width: 50%;margin-left: 20px;height: 100%;float: left;margin-top: 5px;" class="center-vertical">
        <div>{{ article.username }}</div>
        <div style="color: gray; font-size: 5px;margin-top:5px;">{{ article.createdTime.substring(0, 10) + ' ' + article.createdTime.substring(11, 19) }}</div>
      </div>
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
    <div  @click="goDetail()" style="height: 100px;width: 100%;">
      <div style="float: left;width: 70%">
        <div style="font-size: 20px;font-weight: bold;margin: 5px 5px 5px 0px;">
          {{article.title}}
        </div>
        <div>
        {{article.subTitle}}
        </div>
        <div class="tip">
          <el-badge :value="12" class="item">
            <el-button size="small">赞</el-button>
          </el-badge>
          <el-badge :value="3" class="item">
            <el-button size="small">踩</el-button>
          </el-badge>
          <el-badge :value="1" class="item" type="primary">
            <el-button size="small">评论</el-button>
          </el-badge>
        </div>
      </div>
      <div style="float: right">
        <el-tag type="success">{{ article.tag }}</el-tag>
      </div>
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
    goDetail() {
      console.log(this.article);
      this.$router.push({ name: "detail", params: { article: this.article } });
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

.center-vectical {
  margin-top: auto;
  margin-bottom: auto;
  vertical-align: middle;
}

.box-card {
  margin: 14px 0;
}
.item {
  margin-top: 10px;
  margin-right: 14px;
}
.tip {
  margin-top: 10px;
  margin-bottom: -10px;
}
</style>
