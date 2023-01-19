import { request } from "./request";
import {LoginForm} from '@/type/login'
//用户登录的接口
export const login = (data:LoginForm) => request({url:'/login',method:'post',data})
//获取商品列表的接口
export const reqGetGoodsList = () => request({url:'/getGoodsList',method:'get'})
//获取用户列表的接口
export const reqGetUserList = () => request({url:'/getUserList',method:'get'})
//获取角色列表的接口
export const reqGetRoleList = () => request({url:'/getRoleList',method:'get'})

