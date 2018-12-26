<template>
  <div class="container">
    <el-form ref="form" :model="form" label-width="60px">
      <el-form-item label="用户名">{{name}}</el-form-item>
      <el-form-item label="手机">
        <el-input maxlength="11" v-model="form.phone" style="width: 200px;"/>
      </el-form-item>
      <el-form-item label="工作">
        <el-cascader :options="workOptions" v-model="form.work" @change="workChange"></el-cascader>
      </el-form-item>
      <el-form-item label="住址">
        <el-cascader size="large" :options="options" v-model="address" @change="addressChange"></el-cascader>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">确认修改</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import {
  provinceAndCityData,
  CodeToText,
  TextToCode
} from "element-china-area-data";
import { mapGetters } from 'vuex';
export default {
  data() {
    return {
      form: {
        phone: "",
        work: []
      },
      address: [],
      options: provinceAndCityData,
      workOptions: [
        {
          value: "大学生",
          label: "大学生"
        },
        {
          value: "中小学生",
          label: "中小学生"
        },
        {
          value: "科研人员",
          label: "科研人员"
        },
        {
          value: "程序员",
          label: "程序员"
        },
        {
          value: "爱好者",
          label: "爱好者"
        },
        {
          value: "其他",
          label: "其他"
        }
      ]
    };
  },
  computed: {
    ...mapGetters([
      'name'
    ])
  },
  methods: {
    addressChange(value) {
      console.log(CodeToText[this.address[0]]);
    },
    workChange() {
      console.log(this.form.work);
    },
    onSubmit() {
      let data = {};
      data.phone = this.form.phone;
      data.work = this.form.work.toString();
      data.address = this.address.toString();
      console.log(data);
      if(!(/^1[34578]\d{9}$/.test(data.phone))) {
        this.$message("手机号格式错误")
      } else {
        this.$message("修改成功");
        this.$store.dispatch("updateUser", data);
      }
    },
    onCancel() {
      this.$message({
        message: "cancel!",
        type: "warning"
      });
    }
  },
  mounted() {
    // this.$store.dispatch('')
  }
};
</script>

<style scoped>
.container {
  margin: 30px 20px;
  max-width: 800px;
}
.line {
  text-align: center;
}
</style>

