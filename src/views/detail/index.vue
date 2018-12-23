
<template>
  <div>
    {{id}} 
  </div>
</template>

<script>
export default {
  data() {
    return {
      id:this.$route.params.articleid
    };
  },
  computed: {
  },
  mounted(){
    console.log(this.$route.params.articleid)
  }
};
</script>

<style>
</style>
