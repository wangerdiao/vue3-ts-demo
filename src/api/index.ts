import { request } from "./request";
import {LoginForm} from '@/type/login'
//用户登录的接口
export const login = (data:LoginForm) => request({url:'/login',method:'post',data})
//获取商品列表的接口
export const reqGetGoodsList = () => request({url:'/getGoodsList',method:'get'})
