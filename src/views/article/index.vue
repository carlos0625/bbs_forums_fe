<template>
  <div>
    <div class="controler">
      <el-form
        :inline="true"
        :model="formInline"
        class="demo-form-inline"
      >
        <el-form-item label="文章标题">
          <el-input
            v-model="formInline.title"
            placeholder="标题"
          ></el-input>
        </el-form-item>
        <el-form-item label="文章概述">
          <el-input
            v-model="formInline.subTitle"
            placeholder="概述"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            @click="onSubmit"
          >发表</el-button>
        </el-form-item>
      </el-form>
    </div>

    <div id="editor">
      <textarea
        :value="article"
        @input="update"
      ></textarea>
      <div v-html="compiledMarkdown"></div>
    </div>
  </div>

</template>
<script>
import marked from "marked";
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
      article: "# hello",
      formInline: {
        title: "",
        subTitle: ""
      }
    };
  },
  computed: {
    compiledMarkdown: function() {
      return marked(this.article, { sanitize: true });
    }
  },
  methods: {
    update: _.debounce(function(e) {
      this.input = e.target.value;
    }, 300),
    onSubmit() {
      let article = {};
      article.content = this.article;
      article.title = this.formInline.title;
      article.subTitle = this.formInline.subTitle;
      console.log(article);
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
