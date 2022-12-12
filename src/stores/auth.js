import {observable, action} from "mobx";


class AuthStore {
    //观测是否登录，加载，以及用户的信息
    @observable isLogin = false;
    @observable isLoading = false
    @observable values = {
        username: '',
        password: ''
    };
    //动作
    //登录操作
    @action setIsLogin(isLogin) {
        this.isLogin = isLogin
    }

    //设置用户名
    @action setUsername(username) {
        this.values.username = username
    }

    //设置密码
    @action setPassword(password) {
        this.values.password = password
    }

    //登录
    @action login() {
        //发请求

        //模拟
        console.log('logging...')
        this.isLoading = true
        setTimeout(() => {
            console.log('login successfully')
            this.isLogin = true //登录状态
            this.isLoading = false //成功后还原
        }, 1000)
    }

    //注册
    @action register() {
        //模拟
        console.log('registering...')
        this.isLoading = true
        setTimeout(() => {
            console.log('registered successfully')
            this.isLogin = true //登录状态
            this.isLoading = false //成功后还原
        }, 1000)
    }

    //注销
    @action logout() {
        //模拟
        console.log('Has been cancelled')
    }
}

export default AuthStore