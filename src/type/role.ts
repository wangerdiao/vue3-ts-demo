export interface InitRoleList {
    authority:number[],
    roleId:number,
    roleName:string
}
export class InitData {
    list:InitRoleList[] = []  //接受角色信息的列表
    isShow=false
    newRole:string  = ''
}