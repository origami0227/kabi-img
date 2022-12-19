import React, {useRef} from 'react'
import {useStores} from "../stores";
import {observer, useLocalStore} from 'mobx-react'
import {message, Upload} from 'antd';
import {InboxOutlined} from '@ant-design/icons';
import styled from 'styled-components'

const {Dragger} = Upload;

const Result = styled.div`
  margin-top: 30px;
  border: 1px dashed #ccc;
  padding: 20px;
`
const H1 = styled.h1`
  margin: 20px 0;
  text-align: center;
`
const Image = styled.img`
  max-width: 300px;
`
const Uploader = observer(() => {
    const {ImageStore, UserStore} = useStores() //使用ImageStore
    const ref1 = useRef() //标记设置宽度的input
    const ref2 = useRef() //标记设置高度的input
    const bindWidthChange = () => {
        store.setWidth(ref1.current.value)
    }
    const bindHeightChange = () => {
        store.setHeight(ref2.current.value)
    }
    //使用useLocalStore
    const store = useLocalStore(() => ({
        width: null, //用户输入的宽度
        //设置宽度
        setWidth() {
            store.width = ref1.current.value
        },
        get widthStr() {
            return store.width ? `/w/${store.width}` : '' //返回控制宽度字符串
        },
        height: null, // 用户输入的高度
        //设置高度
        setHeight() {
            store.height = ref2.current.value
        },
        get heightSre() {
            return store.height ? `/h/${store.height}` : '' //返回控制高度的字符串
        },
        get fullStr() {
            //定制尺寸后的后的完整路径
            return ImageStore.serverFile.attributes.url.attributes.url + '?imageView2/0' + store.widthStr + store.heightSre
        }
    }))
    const props = {
        showUploadList: false, //隐藏文件展示列表
        beforeUpload: file => {
            //里面有文件的情况（即已经上传）即可调用上传逻辑
            ImageStore.setFile(file) //把上传的文件设置进去
            ImageStore.setFilename(file.name)//设置文件名
            //条件判断
            if (UserStore.currentUser === null) {
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
        <Result>
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
            {ImageStore.serverFile ? <div>
                <H1>上传结果:</H1>
                <dl>
                    <dt>线上地址</dt>
                    <dd><a target="_blank"
                           rel="noreferrer"
                           href={ImageStore.serverFile.attributes.url.attributes.url}>{ImageStore.serverFile.attributes.url.attributes.url}</a>
                    </dd>
                    <dt>文件名</dt>
                    <dd>{ImageStore.filename}</dd>
                    <dt>图片预览</dt>
                    <dd><Image src={ImageStore.serverFile.attributes.url.attributes.url} alt=""/></dd>
                    <dt>更多尺寸</dt>
                    <dd>
                        <input ref={ref1} onChange={bindWidthChange} placeholder="最大宽度（可选）"/>
                        <input ref={ref2} onChange={bindHeightChange} placeholder="最大高度（可选）"/>
                    </dd>
                    <dd>
                        <a rel="noreferrer"
                           target="_blank" href={store.fullStr}>{store.fullStr}</a>
                    </dd>
                </dl>
            </div> : null}
        </Result>
    )
})

export default Uploader