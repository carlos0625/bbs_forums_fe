<template>
  <div class="frontpage-container">
    <!-- <div class="frontpage-text">name:{{ name }}</div> -->
    <!-- <div class="frontpage-text">roles:<span v-for="role in roles" :key="role">{{ role }}</span></div> -->
    <!--置顶页-->
    <div class="articleItem" v-for="(article, index) in articles" :key="index">
      <articleItem v-if="article.top" v-bind:article="article"></articleItem>
    </div>
    <!--非置顶页-->
    <div class="articleItem" v-for="(article, index) in articles" :key="index">
      <articleItem v-if="article.top === false" v-bind:article="article"></articleItem>
    </div>
    <!-- <div class="articleItem" v-if="article.top" v-for="(article, index) in articles" :key="index">
      <articleItem v-bind:article="article"></articleItem>
    </div> -->
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import articleItem from './components/articleItem'
export default {
  name: 'frontpage',
  components: {
    articleItem: articleItem
  },
  data(){
    return {
      
    }
  },
  computed: {
    ...mapGetters([
      'articles',
    ])
  },
  methods:{
    getArticles(){
      this.$store.dispatch('getArticle')
    }
  },
  mounted: function() {
    this.getArticles();
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.frontpage {
  &-container {
    margin: 20px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
