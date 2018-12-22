<template>
  <div class="frontpage-container">
    <!-- <div class="frontpage-text">name:{{ name }}</div> -->
    <!-- <div class="frontpage-text">roles:<span v-for="role in roles" :key="role">{{ role }}</span></div> -->
    <div class="articleItem" v-for="(article, index) in articles" :key="index">
      <articleItem></articleItem>
    </div>
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
      // articles:[1,2,3,4]
    }
  },
  computed: {
    ...mapGetters([
      'articles',
    ])
  },
  methods:{
    getArticles(){
      this.$store.dispatch('getArticle').then()
    }
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
