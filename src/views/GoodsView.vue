<template>
    <div class="select">
        <el-form :inline="true" :model="goodsListData.initGoodsData" class="demo-form-inline">
            <el-form-item label="标题">
            <el-input v-model="goodsListData.selectData.title" placeholder="请输入标题" />
            </el-form-item>
            <el-form-item label="内容">
                <el-input v-model="goodsListData.selectData.introduce" placeholder="请输入关键字" />
            </el-form-item>
            <el-form-item>
            <el-button type="primary" >查询</el-button>
            </el-form-item>
        </el-form>
    </div>
    <el-table :data="showDataList.computedList" border style="width: 100%">
    <el-table-column prop="id" label="ID" width="100" />
    <el-table-column prop="title" label="标题" width="180" />
    <el-table-column prop="introduce" label="详情" />
  </el-table>
  <el-pagination layout="prev, pager, next" :total=" goodsListData.selectData.total"  @size-change="sizeChange" @current-change="currentChange"/>
</template>

<script lang='ts' setup>
import { computed, onMounted, reactive } from "vue";
import {reqGetGoodsList} from '@/api/index'
import {GoodsList} from '@/type/goodList'
const goodsListData = reactive(new GoodsList())
onMounted(async () => {
  let res = await reqGetGoodsList()
  console.log(res);
  goodsListData.initGoodsData = res.data
  goodsListData.selectData.total = res.data.length  //总条数
})
const showDataList = reactive({
  computedList:computed(() => { //分页展示的数据
    return goodsListData.initGoodsData.slice((goodsListData.selectData.page-1)*goodsListData.selectData.pageSize, //page=1,size=10-->0,page=2,-->10
    goodsListData.selectData.page*goodsListData.selectData.pageSize) //page=1,pagesize=10-->10 page=2-->20
    // [0,9]
    //[10,19]
  })
})
const sizeChange = (page:number) => { //更改页面显示的条数触发的回调
  goodsListData.selectData.pageSize =page
} 
const currentChange = (page:number) => { //更改页数触发的回调
  goodsListData.selectData.page =page
}
</script>

<style lang="scss" scoped>
.el-table  {
  font-size:18px;
}
.el-pagination {
  position: fixed;
  bottom: 20px;
  left: 900px;
}
</style>