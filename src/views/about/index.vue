<template>
  <div class="container">
    <el-form ref="form" :model="form" label-width="60px">
      <el-form-item label="用户名">{{name}}</el-form-item>
      <el-form-item label="电话">
        <el-input maxlength="11" v-model="form.phone"/>
      </el-form-item>
      <el-form-item label="工作">
        <el-cascader :options="workOptions" v-model="form.work" @change="workChange"></el-cascader>
      </el-form-item>
      <el-form-item label="住址">
        <el-cascader size="large" :options="options" v-model="address" @change="addressChange"></el-cascader>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">Create</el-button>
        <el-button @click="onCancel">Cancel</el-button>
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
export default {
  data() {
    return {
      name: "",
      form: {
        phone: "",
        work: []
      },
      address: [],
      options: provinceAndCityData,
      workOptions: [
        {
          value: "互联网",
          label: "互联网"
        },
        {
          value: "经商",
          label: "经商"
        },
        {
          value: "教师",
          label: "教师"
        }
      ]
    };
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
      this.$message("修改成功");
      this.$store.dispatch("updateUser", data);
    },
    onCancel() {
      this.$message({
        message: "cancel!",
        type: "warning"
      });
    }
  },
  mounted() {
    this.$sttore.dispatch('')
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

