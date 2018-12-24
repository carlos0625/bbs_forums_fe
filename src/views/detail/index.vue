<template>
  <div>
    <div class="header">
      <div style="float: left">
        <img style="border-radius: 50%; width: 50px;height: 50px">
      </div>
      <div style="margin-left:10px;float:left;width:150px;">
        <div style="margin: 6px;">{{ article.username }}</div>
        <div style="color: gray;font-size:10px;margin:5px;">{{ article.tag }}</div>
      </div>
      <div style="float: right">
        <el-tooltip class="item" effect="dark" content="修改文章" placement="bottom-end">
          <el-button type="primary" icon="el-icon-edit" circle></el-button>
        </el-tooltip>
        <el-tooltip class="item" effect="dark" content="设为精选" placement="bottom-end">
          <el-button type="warning" icon="el-icon-star-off" circle></el-button>
        </el-tooltip>
      </div>
    </div>
    <div class="content">
      <div style="padding:10px;" v-html="compiledMarkdown"></div>
    </div>
    <div class="details">
    </div>
  </div>
</template>

<script>
import { getContent } from '../../api/article.js'
import marked from 'marked'

export default {
  data() {
    return {
      article: this.$route.params.article,
      content: ''
    };
  },
  methods: {
    getDetail () {
      return new Promise((resolve, reject) => {
        getContent(this.article.articleId).then(response => {
          const data = response.data
          if (data.status === 1) {
            this.content = data.result
          } else {
            reject('getContent: something wrong')
          }
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    }
  },
  mounted() {
    this.getDetail();
    // console.log(this.content)
  },
  computed: {
    compiledMarkdown: function() {
      return marked(this.content, { sanitize: true })
    }
  }
};
</script>

<style>
.header {
  height: 75px;
  padding: 10px;
  margin-top: 5px;
}
.content {
  padding: 10px;
}
.text-center {
  text-align: center
}
</style>
