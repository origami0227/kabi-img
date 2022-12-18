import React from 'react'
import {useStores} from "../stores";
import {observer} from 'mobx-react'
import {message, Upload} from 'antd';
import {InboxOutlined} from '@ant-design/icons';

const {Dragger} = Upload;
const Uploader = observer(() => {
    const {ImageStore,UserStore} = useStores() //使用ImageStore
    const props = {
        showUploadList:false, //隐藏文件展示列表
        beforeUpload: file => {
            //里面有文件的情况（即已经上传）即可调用上传逻辑
            ImageStore.setFile(file) //把上传的文件设置进去
            ImageStore.setFilename(file.name)//设置文件名
            //条件判断
            if(UserStore.currentUser === null){
                message.warning('请先登录再上传')
                return false //不执行后续的手动上传逻辑
            }
            //上传
            ImageStore.upload()
                .then((serverFile) => {
                    console.log('上传成功')
                    console.log(serverFile)
                }).catch((err) => {
                console.log('上传失败')
                console.log(err)
            })
            //取消自动上传
            return false
        }
    }

    return (
        <div>
            <h1>文件上传</h1>
            <Dragger {...props}>
                <p className="ant-upload-drag-icon">
                    <InboxOutlined/>
                </p>
                <p className="ant-upload-text">Click or drag file to this area to upload</p>
                <p className="ant-upload-hint">
                    Support for a single or bulk upload. Strictly prohibit from uploading company data or other
                    band files
                </p>
            </Dragger>
            <h1>上传结果:</h1>
            {ImageStore.serverFile
                ?
                <div>{ImageStore.serverFile.attributes.url.attributes.url}</div>
                :
                null
            }
        </div>
    )
})

export default Uploader