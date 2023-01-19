export interface InitUserList {  //用户列表的接口
    id:number, 
    nickName:string,
    role: InitRole[],
    userName:string
}
interface InitRole {
    role:number,
    roleName:string
}
export interface SelectData {
    role:number,
    nickName:string
}
interface InitRoleList {
    authority:number[],
    roleId:number,
    roleName:string
}
interface activeData {
    id:number, 
    nickName:string,
    role: number[],
    userName:string
}
export class InitData {
    userList:InitUserList[] = [] //接受用户信息的列表
    selectData:SelectData = {  //接受查询的信息
        role:0,
        nickName:''
    }
    roleList:InitRoleList[] = [] //接受角色信息的列表
    isShow= false //对话框的展示
    active:activeData ={
        id:0, 
        nickName:'',
        role: [],
        userName:''
    }
}