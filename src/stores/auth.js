import {observable, action} from "mobx";


class AuthStore {
    //观测是否登录，加载，以及用户的信息
    @observable isLogin = false;
    @observable isLoading = false
    @observable values = {
        username:'',
        password:''
    };
    //动作
    //登录操作
    @action setIsLogin(isLogin){
        this.isLogin = isLogin
    }
    //设置用户名
    @action setUsername(username){
        this.values.username = username
    }
    //设置密码
    @action setPassword(password){
        this.values.password = password
    }
}