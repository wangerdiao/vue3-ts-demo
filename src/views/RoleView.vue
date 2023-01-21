<template>
<div class="select">
            <el-form :inline="true"  class="demo-form-inline">
                <el-form-item>
                <el-button type="primary" @click="roleListData.isShow =true">添加角色</el-button>
                </el-form-item>
            </el-form>
        </div>
        <el-table :data="roleListData.list" border style="width: 100%">
            <el-table-column prop="roleId" label="ID" width="400" />
            <el-table-column prop="roleName" label="角色名称" width="430" />
            <el-table-column prop="authority" label="操作" >
                <template #default="scope">
                    <el-button
                    type="primary"
                    size="small"
                    @click="changeRole(scope.row)"
                    >
                    修改权限
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-dialog v-model="roleListData.isShow" title="添加角色信息">
    <el-form :model="roleListData.list">
      <el-form-item label="角色名称" label-width="90px">
        <el-input  v-model="roleListData.newRole" autocomplete="off" />
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click=" roleListData.isShow= false">取消</el-button>
        <el-button type="primary" @click="submitRole">
          确认
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import {onMounted, reactive} from 'vue'
import {reqGetRoleList} from '@/api/index'
import {InitData,InitRoleList} from '@/type/role'
import { ElMessage, ElMessageBox } from 'element-plus'
import { useRouter } from 'vue-router'
const roleListData = reactive(new InitData())
const router = useRouter()
const getRoleList = async () => { //获取用户列表的回调
    let res = await reqGetRoleList()
    roleListData.list =res.data
}
onMounted(() => {
    getRoleList()
    console.log(roleListData);
})

const submitRole = () => { //对话框确认提交的回调
  console.log(roleListData.newRole);
  roleListData.list.push({roleId:roleListData.list.length+1,roleName:roleListData.newRole,authority:[]})
  roleListData.isShow= false
}

const changeRole = (row:InitRoleList) => { //修改权限按钮的回
  router.push({
    path:'authority',
    query:{
      id:row.roleId,
      authority:row.authority.join(',')
    }
  })
}
</script>


<style scoped>

</style>
