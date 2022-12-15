import {observable, action, makeObservable} from "mobx";
import {Auth} from '../models'


class AuthStore {
    constructor() {
        makeObservable(this)//mobx 6版本要求
    }

    //观测是否登录，加载，以及用户的信息
    // @observable isLogin = false;
    // @observable isLoading = false
    @observable values = {
        username: '',
        password: ''
    };
    //动作
    //登录操作
    // @action setIsLogin(isLogin) {
    //     this.isLogin = isLogin
    // }

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
        return new Promise((resolve, reject) => {
            //调用登录接口Auth.login,用户名就是values里面的username
            Auth.login(this.values.username, this.values.password)
                .then(user => {
                    console.log('登录成功')
                    resolve(user)
                })
                .catch(err => {
                    console.log('登录失败')
                    reject(err)
                })
        })
    }

    //注册
    @action register() {
        return new Promise((resolve, reject) => {
            //调用登录接口Auth.register
            Auth.register(this.values.username, this.values.password)
                .then(user => {
                    console.log('注册成功')
                    resolve(user)
                })
                .catch(err => {
                    console.log('注册失败')
                    reject(err)
                })
        })
    }

    //注销
    @action logout() {
        Auth.logout()
    }
}

export {AuthStore}