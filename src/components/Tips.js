import React from "react";
import {useStores} from '../stores'
import {observer} from 'mobx-react'
import styled from 'styled-components'


const Tip = styled.div`
  background: orange;
  padding: 10px;
  margin: 30px 0;
  color: #fff;
  border-radius: 4px;
`
const Tips = observer(({children}) => {
    const {UserStore} = useStores()
    return (
        <>
            {UserStore.currentUser ? null : <Tip>{children}</Tip>}
        </>
    )
})

export default Tips