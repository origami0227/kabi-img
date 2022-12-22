import {observable, action, makeObservable} from "mobx";
import {UpLoader} from '../models'
import {message} from 'antd';

class HistoryStore {
    constructor() {
        makeObservable(this)//mobx 6版本要求
    }

    @observable list = []
    @observable isLoading = false
    @observable hasMore = true
    @observable page = 0
    @observable limit = 10

    //加载到列表里
    @action append(newList) {
        this.list = newList
    }

    //查询
    @action find() {
        this.isLoading = true
        UpLoader.find({page: this.page, limit: this.limit})
            .then(newList => {
                this.append(newList)
                //是否有更多数据的判断
                if(newList.length < this.limit){
                    this.hasMore = false
                }
            }).catch(error => {
                message.error('加载数据失败')
        }).finally(()=>{
            this.isLoading = false
        })
    }
}

export default new HistoryStore()