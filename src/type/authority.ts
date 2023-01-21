export interface InitList {
    name:string,
    roleId:number,
    roleList?:InitList[],
    viewRole?:string
}
export class InitData {
    id:number
    authority:number[]
    list:InitList[] = []
    treeRef:any 
    constructor(id:number,authority:number[]) {
        this.id = id
        this.authority = authority
    }
}