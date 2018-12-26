<template>
  <div class="reversion-item">
    <div style="margin-top: -10px;margin-bottom: 20px">
      <el-button type="primary" @click="active()">回复</el-button><el-button v-if="show" @click="cancle()">取消</el-button>
      <el-button v-if="show" @click="go(newComment1, commentId)">发表</el-button>
    </div>
    <div v-if="show">
      <el-input
        style="margin-bottom: 10px;"
        type="textarea"
        :autosize="{ minRows: 3, maxRows: 4}"
        placeholder="输入回复"
        v-model="newComment1"
      ></el-input>
    </div>
    <el-card class="reversion-containor" v-if="reversions.length > 0">
    <div class="reversion-item" v-for="(reversion, index) in reversions" :key="index">
      <span class="gray" @click="reversion.bool = !reversion.bool">{{ reversion.username }}</span>
      <span v-if="reversion.reversionId !== null"> <span>回复</span> <span class="gray" @click="reversion.bool = !reversion.bool">{{ reversion.reversionUsername }}</span></span>: {{ reversion.content }}
      <div v-if="reversion.bool">
        <el-input
          style="margin-bottom: 10px;width: 80%;"
          type="textarea"
          :autosize="{ minRows: 3, maxRows: 4}"
          :placeholder="'@' + reversion.username"
          v-model="newComment2"
        ></el-input><br>
      <el-button size="mini" style="margin-bottom: 20px;"
      @click="go(newComment2, commentId, reversion.id, reversion.username)"
      >发表</el-button>
      <el-button size="mini" @click="reversion.bool = !reversion.bool" style="margin-bottom: 20px;">取消</el-button>
    </div>
    </div>
  </el-card>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  props: ['commentId'],
  data () {
    return {
      reversions: [],
      show: false,
      inshow: false,
      newComment1: '',
      newComment2: ''
    }
  },
  methods: {
    getReversions() {
      this.$store.dispatch('getReversions', this.commentId).then(res => {
        console.log(res)
        if(res.status === 1) {
          this.reversions = res.result
        } else {
          this.$message('未知错误')
        }
      })
    },
    active() {
      this.show = true
    },
    cancle() {
      this.show = false
    },
    go (content, commentId, reversionId, rusername) {
      let data = {}
      data.commentId = commentId
      data.userId = this.id
      data.username = this.name
      data.content = content
      data.reversionId = reversionId
      data.username = rusername
      if(content.length === 0) {
        this.$message({
          type: 'warning',
          message: '内容不可为空'
        })
        return
      }
      this.$store.dispatch('addRev', data).then(res => {
        if(data.status === 1) {
          this.newComment1 = ''
          this.newComment2 = ''
          this.reversions.push(data)
          this.$message({
            type: 'success',
            message: '回复成功'
          })
        } else {
          this.$message('未知错误')
        }
      }).catch(error => {
        console.log(error)
      })
    }
  },
  mounted() {
    this.getReversions()
  },
  computed: {
    ...mapGetters([
      'id', 'name'
    ])
  }
}
</script>

<style>
.reversion-containor {
  background: lightgrey;
  color: black;
  margin-bottom: 60px;
}
.gray {
  color: gray;
}
.reversion-item {
  margin-left: 20px;
  width: 80%;
  line-height: 20px;
}
</style>
