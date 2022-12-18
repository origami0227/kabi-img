import React from "react";
import {observer} from 'mobx-react'
import {useStores} from '../stores'
import Uploader from "../components/Uploader";
import Tips from "../components/Tips";

const Home = observer(() => {
    const {UserStore} = useStores()
    return (
        <>
            <div>{
                UserStore.currentUser ? null : <Tips/>
            }</div>
            <Uploader/>
        </>
    )
})

export default Home