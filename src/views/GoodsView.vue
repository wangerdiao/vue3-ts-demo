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
            <el-button type="primary" @click="onSubmit">查询</el-button>
            </el-form-item>
        </el-form>
    </div>
    <el-table :data="showDataList.computedList" border style="width: 100%">
    <el-table-column prop="id" label="ID" width="100" />
    <el-table-column prop="title" label="标题" width="180" />
    <el-table-column prop="introduce" label="详情" />
  </el-table>
  <el-pagination layout="prev, pager, next" :total=" goodsListData.selectData.total*2"  @size-change="sizeChange" @current-change="currentChange"/>
</template>

<script lang='ts' setup>
import { computed, onMounted, reactive, watch } from "vue";
import {reqGetGoodsList} from '@/api/index'
import {GoodsList,GoodsInt} from '@/type/goodList'
const goodsListData = reactive(new GoodsList())
const getGoodsFunction = async () => { //获取数据的函数
  let res = await reqGetGoodsList()
  goodsListData.initGoodsData = res.data
  goodsListData.selectData.total = res.data.length  //总条数
}
onMounted(async () => {
  getGoodsFunction()
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
const onSubmit = () => {  //查询功能
  console.log(goodsListData.selectData.title);
  console.log(goodsListData.selectData.introduce);
  let newArr:GoodsInt[] = []
  if(goodsListData.selectData.title || goodsListData.selectData.introduce) {  //判断查询框是否有内容
    if(goodsListData.selectData.title) {  //查询的是标题
      newArr = goodsListData.initGoodsData.filter((value) => {
        return value.title.indexOf(goodsListData.selectData.title) !==-1
      })
    }
    if(goodsListData.selectData.introduce) {  //查询的是详情
      newArr = goodsListData.initGoodsData.filter((value) => {
        return value.introduce.indexOf(goodsListData.selectData.introduce) !==-1
      })
    }
  }else {
    newArr =  goodsListData.initGoodsData
  }
  goodsListData.initGoodsData = newArr
  goodsListData.selectData.total = newArr.length  //总条数
}
watch([() =>goodsListData.selectData.title, () =>goodsListData.selectData.introduce, ],() => { //数据监视，监视查询的关键字
  if(goodsListData.selectData.title=='' || goodsListData.selectData.introduce=='') {
    getGoodsFunction()
  }
})
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