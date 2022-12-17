import React, {useRef} from 'react'
import {useStores} from "../stores";
import {observer} from 'mobx-react'

const Uploader = observer(() => {
    const ref = useRef() //标记
    const {ImageStore} = useStores() //使用ImageStore
    const bindChange = () => {
        //ref.current得到刚才上传的文件以及对应的文件名
        window.file = ref.current //便于调试
        console.log(ref.current)
        if (ref.current.files.length > 0) {
            //里面有文件的情况（即已经上传）即可调用上传逻辑
            ImageStore.setFile(ref.current.files[0]) //把上传的文件设置进去
            ImageStore.setFilename(ref.current.files[0].name)//设置文件名
            //上传
            ImageStore.upload()
                .then((serverFile) => {
                    console.log('上传成功')
                    console.log(serverFile)
                }).catch((err) => {
                console.log('上传失败')
                console.log(err)
            })
        }
    }

    return (
        <div>
            <h1>文件上传</h1>
            <input type="file" ref={ref} onChange={bindChange}/>
        </div>
    )
})

export default Uploader