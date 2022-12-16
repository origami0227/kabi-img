import {observable, action, makeObservable} from "mobx";
import {Auth} from '../models'


class UserStore {
    constructor() {
        makeObservable(this)//mobx 6版本要求
    }

    //观测当前用户信息
    @observable currentUser = null


    //拉取用户信息
    @action pullUser() {
        this.currentUser = Auth.getCurrentUser()
    }

    //重制 初始化user
    @action resetUser() {
        this.currentUser = null
    }

}

export default new UserStore()