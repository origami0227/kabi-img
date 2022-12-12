import React from "react";
import {observer} from "mobx-react";
import {useStores} from "../stores";

const Register = observer(() => {
    const {AuthStore} = useStores() //获取AuthStore

    return (
        <>
            <h1>Register:{AuthStore.values.username}</h1>
        </>
    )
})

export default Register