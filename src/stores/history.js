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
                this.page++
                //是否有更多数据的判断
                if (newList.length < this.limit) {
                    this.hasMore = false
                }
            }).catch(error => {
            message.error('加载数据失败')
        }).finally(() => {
            this.isLoading = false
        })
    }

    //清空或重制
    @action reset() {
        this.list = []
        this.isLoading = false
        this.hasMore = true
        this.page = 0
    }

    @action delete(item) {
        UpLoader.delete(item.id)
            .then(() => {
                //删除结束以后 历史记录要更新新的UI（筛选出没有被删除的重新渲染）
                this.list = this.list.filter(i => i.id !== item.id)
            })

    }
}

export default new HistoryStore()