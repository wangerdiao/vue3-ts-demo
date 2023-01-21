<template>
    <div>
        <el-tree
            ref="treeRef"
            :data="data.list"
            show-checkbox
            node-key="roleId"
            :default-checked-keys="data.authority"
            :props="{
                children: 'roleList',
                label: 'name'}"
        />
        <el-button @click="changeAuthority">确认修改</el-button>
    </div>
</template>

<script setup lang="ts">
import {useRoute} from 'vue-router'
import {InitData} from '@/type/authority'
import { onMounted, reactive } from '@vue/runtime-core'
import { reqGetAuthority } from '@/api/index';
import {ref} from 'vue'
const route = useRoute()
const query:any = route.query
const treeRef = ref(null)  //获取eltree标签元素
let arr:number[] = []
 query.authority.split(',').forEach((item:string) => {
    arr.push(+item)
})
const data = reactive(new InitData(query.id,arr))
const getAuthority = async () => {
    let res = await reqGetAuthority()
    data.list = res.data
}
data.treeRef = treeRef
const changeAuthority = () => {
    console.log(data.treeRef.getCheckedKeys().sort( (a:number,b:number) => a-b)); //获取更改后的数据
    //再通过后台接口，修改后台数据，之后在返回给前端
}
onMounted(() => {
    getAuthority()
})
</script>

<style scoped>

</style>