import React from "react";
import {observer} from 'mobx-react'
import {useStores} from '../stores'

const Home = observer(() => {
    const {UserStore} = useStores()
    return (
        <>
            <h1>{
                UserStore.currentUser ? <>
                        Hello,{UserStore.currentUser.attributes.username}
                    </>
                    :
                    "该用户未登录"
            }</h1>
        </>
    )
})

export default Home