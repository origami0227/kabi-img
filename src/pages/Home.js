import React from "react";
import {observer} from 'mobx-react'
import {useStores} from '../stores'
import Uploader from "../components/Uploader";

const Home = observer(() => {
    const {UserStore} = useStores()
    return (
        <>
            <div>{
                UserStore.currentUser ? <>
                        Hello,{UserStore.currentUser.attributes.username}
                    </>
                    :
                    "该用户未登录"
            }</div>
            <Uploader/>
        </>
    )
})

export default Home