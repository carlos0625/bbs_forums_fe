<template>
  <el-card shadow="hover" class="box-card" v-bind:class="{ gray: article.top }">
    <div slot="header" class="clearfix">
      <div class="avatar">
        <!-- <img style="border-radius: 50%;width:40px;height:40px"> -->
        {{ article.username[0]}}
      </div>
      <div
        style="width: 50%;margin-left: 20px;float: left;margin-top: 5px;"
        class="center-vertical"
      >
        <div>{{ article.username }}</div>
        <div
          style="color: gray; font-size: 5px;margin-top:5px;"
        >{{ article.createdTime.substring(0, 10) + ' ' + article.createdTime.substring(11, 19) }}</div>
      </div>
      <el-row
        style="float: right;"
      >
        <!--置顶-->
        <el-button v-if="name === 'admin'" type="danger" round size="mini" @click="setTop()">置顶/取消</el-button>
        <!-- 编辑文章 -->
        <el-tooltip class="item" effect="dark" content="修改文章" placement="bottom-end">
          <el-button v-if="article.username === name || name==='admin'"
          type="primary" @click="goModify()" size="mini" icon="el-icon-edit" circle></el-button>
        </el-tooltip>
        <!-- 删除文章 -->
        <!-- <el-button type="danger" @c
        lick="deleteArt()" size="mini" icon="el-icon-delete" circle></el-button> -->
        <!-- 精选/取消精选 -->
        <el-tooltip class="item" effect="dark" content="设为/取消精选" placement="bottom-end">
          <el-button v-if="name === 'admin'"
          type="warning" size="mini" icon="el-icon-star-off" circle @click="setPickStatus"></el-button>
        </el-tooltip>
      </el-row>
    </div>
    <div @click="goDetail()" style="width: 100%;">
      <div>
        <div
          style="font-size: 20px;font-weight: bold;margin: 5px 5px 5px 0px; width:100%"
        >
          {{ article.title }}
          <div style="float: right">
            <el-tag v-if="article.tag.length!==0" type="success">{{ article.tag }}</el-tag>
            <el-button
              v-if="article.picked"
              size="mini"
              type="success"
              plain
              icon="el-icon-star-on"
            ></el-button>
          </div>
        </div>
        <div>{{article.subTitle}}</div>
        <div class="tip">
          <el-badge :value="article.likeNum" class="item">
            <el-tag>赞</el-tag>
          </el-badge>
          <el-badge :value="article.commentNum" class="item" type="primary">
            <el-tag type="warning">评论</el-tag>
          </el-badge>
        </div>
      </div>
    </div>
  </el-card>
</template>
<script>
import { formatTime } from "./../../../utils/index.js"
import { mapGetters } from "vuex";
export default {
  props: {
    article: {
      type: Object,
      default: function() {
        return {
          id: 1,
          title: "this is a title",
          subTitle: "this is subTitle",
          top: true
        };
      }
    }
  },
  computed: {
    ...mapGetters(["name", "roles"])
  },
  methods: {
    goDetail() {
      this.$router.push({
        name: "detail",
        params: { articleid: this.article.articleId }
      });
    },
    goModify() {
      this.$store.dispatch("setModifyed", {
        ismodify: true,
        articleid: this.article.articleId
      });
      this.$router.push("/article");
    },
    setPickStatus() {
      let data = {};
      data.articleId = this.article.articleId;
      data.picked = !this.article.picked;
      console.log(data);
      this.$store.dispatch("setPickStatus", data).then(res => {
        console.log(res);
        if (res === 1) {
          this.article.picked = !this.article.picked;
          this.$message({
            type: "success",
            message: "操作成功"
          });
        }
      });
    },

    setT() {
      this.article.top = !this.article.top
    },

    setTop() {
      let data = {}
      data.id = this.article.articleId
      data.title = ''
      data.subTitle = ''
      data.top = !this.article.top
      console.log(this.article.top)
      console.log(data)
      this.$store.dispatch("updateTopState", data).then(res => {
        console.log(res)
        if(res.status === 1) {
          this.article.top = !this.article.top
          this.$message({
            type: 'success',
            message: '操作成功'
          })
        }
      })
    },
    deleteArt() {}
  }
};
</script>

<style lang="scss" scoped>
.text {
  font-size: 14px;
}
.avatar{
  border-radius: 100%;
  width: 40px;
  height: 40px;
  font-size: 36px;
  background-color: #409EFF;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  float: left;
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
.gray {
  background:ghostwhite;
}
</style>
