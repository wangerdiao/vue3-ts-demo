export interface LoginForm {
    username:string,
    password:string,
}
export class LoginData {
    data:LoginForm = {
        username:'',
        password:''
    }
}