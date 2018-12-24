<template>
  <div>
    <div class="header">
      <div style="float: left">
        <img style="border-radius: 50%; width: 50px;height: 50px">
      </div>
      <div style="margin-left:10px;float:left;width:150px;">
        <div style="margin: 6px;">{{ currentArt.title }}</div>
        <div style="color: gray;font-size:10px;margin:5px;">{{ currentArt.tag }}</div>
      </div>
      <!-- <div style="float: right" v-if="roles === 'admin'">
        <el-tooltip class="item" effect="dark" content="修改文章" placement="bottom-end">
          <el-button type="primary" icon="el-icon-edit" circle size="mini"></el-button>
        </el-tooltip>
        <el-tooltip class="item" effect="dark" content="设为精选" placement="bottom-end">
          <el-button type="warning" icon="el-icon-star-off" size="mini" circle></el-button>
        </el-tooltip>
        <el-tooltip class="item" effect="dark" content="删除该文章" placement="bottom-end">
          <el-button type="danger" size="mini" icon="el-icon-delete" circle></el-button>
        </el-tooltip>
      </div> -->
    </div>
    <div class="content">
      <div style="padding:10px;" v-html="compiledMarkdown"></div>
    </div>
    <div class="inputBox">
      <el-input
        type="textarea"
        :autosize="{ minRows: 4, maxRows: 8}"
        placeholder="输入评论"
        v-model="newComment"
      ></el-input>
      <el-button class="commentBtn" @click="submitComment" type="primary">提交评论</el-button>
    </div>
    <div class="comments">
      <div class="commentItem" v-for="(comment, index) in comments" :key="index">
        <CommentItem v-on:atuser="commentAtUser" :comment="comment"></CommentItem>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import marked from "marked";
import CommentItem from "./components/commentItem.vue";
export default {
  data() {
    return {
      articleid: this.$route.params.articleid,
      content: "",
      newComment: ""
    };
  },
  components: {
    CommentItem: CommentItem
  },
  computed: {
    compiledMarkdown: function() {
      return marked(this.currentArt.content, { sanitize: true });
    },
    ...mapGetters(["roles", "name", "id", "token", "currentArt", "comments"])
  },
  methods: {
    commentAtUser(data) {
      console.log(data);
      this.newComment = `@${data}`;
    },
    getDetail() {
      this.$store.dispatch("getDetail", this.articleid);
    },
    getComments() {
      console.log(this.id);
      this.$store.dispatch("getComments", this.articleid);
    },
    submitComment() {
      let discuss = {};
      discuss.userId = this.id;
      discuss.articleId = this.articleid;
      discuss.content = this.newComment;
      console.log(discuss);
      this.$store.dispatch("addComment", discuss).then(res => {
        if (res.data.status === 1) {
          this.comments.push(discuss);
          this.$message({
            type: "success",
            message: "评论成功"
          });
          this.conent = "";
        }
      });
    }
  },
  mounted() {
    this.getDetail();
    this.getComments();
  }
};
</script>

<style>
.header {
  height: 75px;
  padding: 10px;
  margin-top: 5px;
}
.inputBox {
  width: 80%;
  margin: 20px;
}
.content {
  padding: 10px;
}
.text-center {
  text-align: center;
}
.commentBtn {
  margin-top: 20px;
}
</style>
