<template>
    <div>
        <div class="select">
            <el-form :inline="true" :model="userListData.selectData" class="demo-form-inline">
                <el-form-item label="姓名">
                <el-input v-model="userListData.selectData.nickName" placeholder="请输入姓名" />
                </el-form-item>
                <el-form-item label="职位">
                    <el-select v-model="userListData.selectData.role" placeholder="请选择职位">
                        <el-option
                        label="全部"
                        :value="0"
                        />
                        <el-option
                        v-for="item in userListData.roleList"
                        :key="item.roleId"
                        :label="item.roleName"
                        :value="item.roleId"
                        />
                    </el-select>
                </el-form-item>
                <el-form-item>
                <el-button type="primary" @click="onSubmit">查询</el-button>
                </el-form-item>
            </el-form>
        </div>
        <el-table :data="userListData.userList" border style="width: 100%">
            <el-table-column prop="id" label="ID" width="100" />
            <el-table-column prop="nickName" label="姓名" width="330" />
            <el-table-column prop="userName" label="用户名" width="330" />
            <el-table-column prop="role" label="角色" width="580">
                <template #default="scope">
                    <el-button
                    v-for="item in scope.row.role"
                    :key="item.role"
                    type="primary"
                    size="small"
                    >
                    {{ item.roleName }}
                    </el-button>
                </template>
            </el-table-column>
            <el-table-column prop="role" label="角色" >
                <template #default="scope">
                    <el-button
                    type="primary"
                    size="small"
                    @click="changeInfo(scope.row)"
                    >
                    编辑
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
    <el-dialog v-model="userListData.isShow" title="用户信息">
    <el-form :model="userListData.active">
      <el-form-item label="姓名" label-width="50px">
        <el-input v-model="userListData.active.nickName" autocomplete="off" />
      </el-form-item>
      <el-form-item label="角色" label-width="50px">
        <el-select multiple v-model="userListData.active.role" placeholder="请选择角色">
          <el-option
            v-for="item in userListData.roleList"
            :key="item.roleId"
            :label="item.roleName"
            :value="item.roleId"
            />
        </el-select>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click=" userListData.isShow= false">取消</el-button>
        <el-button type="primary" @click="submitInfo">
          确定更改
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import {reqGetUserList,reqGetRoleList} from '@/api/index'
import { onMounted, reactive,watch } from '@vue/runtime-core';
import {InitData,InitUserList}  from '@/type/userList'
const getUserList = async () => {
    let res = await reqGetUserList()
    userListData.userList = res.data
    console.log(userListData.userList,'用户列表');
}
const getRoleList = async () => {
    let res = await reqGetRoleList()
    userListData.roleList = res.data
    console.log(userListData.roleList,'角色列表');
}
onMounted(() => {
    getUserList()
    getRoleList()
})
const userListData = reactive(new InitData())
const onSubmit = () => {  //查询功能
  let newArr:InitUserList[] = []
  if(userListData.selectData.nickName || userListData.selectData.role!==0) {  //判断查询框是否有内容
    if(userListData.selectData.nickName) {  //查询的是姓名
      newArr = userListData.userList.filter((value) => {
        return value.nickName.indexOf(userListData.selectData.nickName) !==-1
      })
    }
    if(userListData.selectData.role!==0) {  //查询的是角色
      newArr = (userListData.selectData.nickName? newArr:userListData.userList).filter(item => {
        return item.role.find(value => value.role === userListData.selectData.role)
      })
    }
  }else {
    newArr =  userListData.userList
  }
  userListData.userList = newArr
}
watch([() =>userListData.selectData.nickName, () =>userListData.selectData.role, ],() => { //数据监视，监视查询的关键字
  if(userListData.selectData.nickName=='' || userListData.selectData.role!==0) {
    getUserList()
  }
})
const changeInfo = (row:InitUserList) => {  //点击编辑的回调
  userListData.isShow = true
  userListData.active = { //将点击的一行的数据赋值给对话框
    id:row.id,
    nickName:row.userName,
    userName:row.userName,
    role:row.role.map((item:any) => item.role || item.roleId)
  }
  
}
const submitInfo = () => { //对话框信息更改的回调
  console.log(userListData.active);
  let obj: any = userListData.userList.find(value => value.id === userListData.active.id)
  obj.nickName = userListData.active.nickName
  obj.userName = userListData.active.userName
  obj.role = userListData.roleList.filter(value => userListData.active.role.indexOf(value.roleId) !== -1)
  console.log(obj);
  
  userListData.userList.forEach((item,i) => {
    if(item.id === obj.id) {
      userListData.userList[i] = obj
    }
  })
  userListData.isShow= false
}
</script>

<style lang="scss" scoped>

</style>