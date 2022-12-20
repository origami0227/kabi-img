import {observable, action, makeObservable} from "mobx";
import {UpLoader} from '../models'
import {message} from 'antd';

class ImageStore {


    constructor() {
        makeObservable(this)//mobx 6版本要求
    }

    //观测文件名
    @observable filename = ""
    //本地文件
    @observable file = null
    //是否正在上传
    @observable isUpLoading = false
    //服务器返回文件
    @observable serverFile = null

    //设置文件名
    @action setFilename(newFilename) {
        this.filename = newFilename
    }

    //设置文件
    @action setFile(newFile) {
        this.file = newFile
    }

    //上传
    @action upload() {
        this.isUpLoading = true
        this.serverFile = null //多次上传会覆盖之前的结果
        return new Promise((resolve, reject) => {
            UpLoader.add(this.file, this.filename)
                .then(serverFile => {
                    this.serverFile = serverFile //自动覆盖
                    resolve(serverFile)
                }).catch(err => {
                console.error('上传失败')
                message.error('上传失败')
                reject(err)
            }).finally(() => {
                this.isUpLoading = false
            })
        })
    }

}

export default new ImageStore()