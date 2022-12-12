import React from "react";
import {observer} from 'mobx-react';
import {useStores} from "../stores";

const Login = observer(() => {
    const {AuthStore} = useStores() //获取AuthStore
    return (
        <>
            <h1>Login:{AuthStore.values.username}</h1>
        </>
    )
})

export default Login