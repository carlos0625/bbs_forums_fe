<template>
  <div>
    <div class="controler">
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="文章标题">
          <el-input v-model="formInline.title" placeholder="标题"></el-input>
        </el-form-item>
        <el-form-item label="文章概述">
          <el-input v-model="formInline.subTitle" placeholder="概述"></el-input>
        </el-form-item>
        <el-form-item label="文章标签">
          <el-input v-model="formInline.tag" placeholder="标签"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">{{upDateText}}</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div id="editor">
      <textarea :value="content" @input="update"></textarea>
      <div v-html="compiledMarkdown"></div>
    </div>
  </div>
</template>
<script>
import marked from "marked";
import { mapGetters } from "vuex";

var _ = require("lodash");

var rendererMD = new marked.Renderer();

marked.setOptions({
  renderer: rendererMD,
  gfm: true,
  tables: true,
  breaks: false,
  pedantic: false,
  sanitize: false,
  smartLists: true,
  smartypants: false
});
export default {
  data() {
    return {
      content: "# hello",
      formInline: {
        title: "",
        subTitle: "",
        tag: ""
      },
      modifyArt: {}
    };
  },
  computed: {
    compiledMarkdown: function() {
      return marked(this.content, { sanitize: true });
    },
    upDateText() {
      console.log(this.modifyStatus);
      return this.modifyStatus.ismodify ? "更新" : "发布";
    },
    ...mapGetters(["id", "modifyStatus"])
  },
  mounted() {
    if (this.modifyStatus.ismodify) {
      this.$store
        .dispatch("getDetail", this.modifyStatus.articleid)
        .then(res => {
          let {
            data: { result }
          } = res;
          this.content = result.content;
          this.formInline = result;
          console.log(res);
        });
    }
  },
  destroyed() {
    this.$store.dispatch("setModifyed", {
      ismodify: false,
      articleid: 0
    });
  },
  methods: {
    update: _.debounce(function(e) {
      this.content = e.target.value;
    }, 300),
    onSubmit() {
      let content = {};
      content.content = this.content;
      content.title = this.formInline.title;
      content.subTitle = this.formInline.subTitle;
      content.tag = this.formInline.tag;
      content.userId = this.id;
      if (this.modifyStatus.ismodify) {
        this.modify();
      } else {
        this.publishArt(content);
      }
    },
    publishArt(data) {
      this.$store
        .dispatch("addArticle", data)
        .then(() => {
          this.content = "";
          (this.formInline.title = ""), (this.formInline.subTitle = "");
          this.$message({
            type: "success",
            message: "发帖成功"
          });
        })
        .catch(error => {
          console.log(error);
          this.$message({
            type: "warning",
            message: "未知错误"
          });
        });
    },
    modify() {
      let content = this.content;
      let data = { ...this.modifyArt, ...this.formInline, content };
      console.log(data);
      this.$store.dispatch("modifyArticle", data).then(res => {
        if (res.data.status === 1) {
          this.$message({
            type: "success",
            message: "修改成功"
          });
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.controler {
  margin: 20px 30px 0;
}
#editor {
  margin: 0;
  min-height: calc(100vh - 50px);
  font-family: "Helvetica Neue", Arial, sans-serif;
  color: #333;
}

textarea,
#editor div {
  display: inline-block;
  width: 49%;
  min-height: calc(100vh - 50px);
  vertical-align: top;
  box-sizing: border-box;
  padding: 0 20px;
}

textarea {
  border: none;
  border-right: 1px solid #ccc;
  resize: none;
  outline: none;
  background-color: #f6f6f6;
  font-size: 14px;
  font-family: "Monaco", courier, monospace;
  padding: 20px;
}

code {
  color: #f66;
}
</style>
