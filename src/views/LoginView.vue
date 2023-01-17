<template>
  <div class="login">
    <el-form
      ref="ruleFormRef"
      :model="ruleForm"
      status-icon
      label-width="60px"
      class="demo-ruleForm"
    >
    <h2>后台管理系统</h2>
      <el-form-item label="账号" prop="userName">
        <el-input
          v-model="ruleForm.data.username"
          autocomplete="off"
        />
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input
          v-model="ruleForm.data.password"
          type="password"
          autocomplete="off"
        />
      </el-form-item>
      <el-form-item>
        <el-button class="btn" type="primary" @click="submitForm(ruleFormRef)"
          >登录</el-button
        >
        <el-button class="btn" @click="resetForm(ruleFormRef)">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts" setup>
import { defineComponent, reactive, toRefs,ref } from "vue";
import type { FormInstance } from 'element-plus'
import {LoginData} from '../type/login'
import {login} from '@/api/index'
import {useRouter} from 'vue-router'
const ruleFormRef = ref<FormInstance>()
const ruleForm = reactive(new LoginData())
const router = useRouter()
const submitForm = (formEl: FormInstance | undefined) => {  //登录的回调
  if (!formEl) return
  formEl.validate((valid) => {
    if (valid) {
      // login(ruleForm.data).then((res) => {
      //   //保存token
      //   localStorage.setItem('token',res.data.token)
      //   //路由跳转
      //   router.push('/')
      // })
      router.push('/')
    } else {
      console.log('error submit!')
      return false
    }

  })
}

const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.resetFields()
}
</script>

<style lang="scss" scoped>
.login {
  width: 100%;
  height: 100%;
  background: url("../assets/bg.jpg");
padding: .1px;
  .demo-ruleForm{
    width: 500px;
    margin: 300px auto;
    background-color: #fff;
    border-radius: 30px;
    padding: 30px;
    text-align: center;
    h2{
        margin-bottom: 10px;
    }
    .btn{
        width: 48%;
        height: 40px;
    }
  }
}
</style>