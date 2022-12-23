import {observable, action, makeObservable} from "mobx";
import {Auth} from '../models'
import UserStore from './user'
import {message} from 'antd';
import HistoryStore from './history'
import ImageStore from './image'


class AuthStore {
    constructor() {
        makeObservable(this)//mobx 6版本要求
    }

    //观测是否登录，加载，以及用户的信息
    // @observable isLogin = false;
    @observable isLoading = false
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
        this.isLoading = true
        return new Promise((resolve, reject) => {
            //调用登录接口Auth.login,用户名就是values里面的username
            Auth.login(this.values.username, this.values.password)
                .then(user => {
                    UserStore.pullUser() //登录成功后在UserStore中也进行同步
                    resolve(user)
                })
                .catch(err => {
                    UserStore.resetUser()//失败就重置
                    message.error("登录失败")
                    reject(err)
                }).finally(()=>{
                this.isLoading = false
            })
        })
    }

    //注册
    @action register() {
        return new Promise((resolve, reject) => {
            //调用登录接口Auth.register
            Auth.register(this.values.username, this.values.password)
                .then(user => {
                    UserStore.pullUser()
                    resolve(user)
                })
                .catch(err => {
                    UserStore.resetUser()//失败就重置
                    message.error("注册失败")
                    reject(err)
                })
        })
    }

    //注销
    @action logout() {
        Auth.logout()
        UserStore.resetUser()//重置
        HistoryStore.reset()
        ImageStore.reset()
    }
}

export default new AuthStore()