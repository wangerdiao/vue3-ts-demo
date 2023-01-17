export interface GoodsInt { //商品
    userId:number,
    id:number,
    title:'',
    introduce:string,
}
export interface SelectDataInt { //查询的商品
    title:string,
    introduce:string,
    page:number,//对应的页码
    total:number,//总条数
    pageSize:number,//一页显示几条
}
export class GoodsList {
    selectData:SelectDataInt = {
        title:'',
        introduce:'',
        page:1,
        total:0,
        pageSize:10
    }
    initGoodsData: GoodsInt[] = []
}