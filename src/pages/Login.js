import React, {useRef} from "react";
import {observer} from 'mobx-react';
import {useStores} from "../stores";

const Login = observer(() => {
    const {AuthStore} = useStores() //获取AuthStore
    const inputRef = useRef() //对input进行标记
    const bindChange = e => {
        console.log(inputRef.current.value)
        //将input里的内容赋值给username
        AuthStore.setUsername(inputRef.current.value) //设置用户名
    }
    return (
        <>
            <h1>Login:{AuthStore.values.username}</h1>
            <input type="text" onChange={bindChange} ref={inputRef}/>
        </>
    )
})

export default Login