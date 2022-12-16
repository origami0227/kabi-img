import React from "react";
import logo from './logo.svg'
import {NavLink,useNavigate} from "react-router-dom";
import styled from 'styled-components'
import {Button} from "antd";
import {useStores} from "../stores";
import {observer} from "mobx-react";


const Header = styled.header` //返回一个新的标签
  background-color: #02101f;
  padding: 10px 100px;
  display: flex;
  align-items: center;
  color: #fff;
`
const Logo = styled.img`
  height: 30px;
`

const StyledLink = styled(NavLink)`
  color: #fff;
  margin-left: 30px;

  &.active {
    border-bottom: 1px solid #ccc;
  }
`
const Login = styled.div`
  margin-left: auto;
`
const StyledButton = styled(Button)`
  margin-left: 10px;
`


const Component = observer(() => {
    //状态判断
    const {UserStore, AuthStore} = useStores() //使用UserStore
    const navigate = useNavigate()
    const handleLogout = () => {
        AuthStore.logout()
    }
    const handleLogin = () => {
        console.log('跳转到登录界面')
        navigate("/login")
    }
    const handleRegister = () => {
        console.log('跳转到注册界面')
        navigate("/register")
    }
    return (
        <Header>
            <Logo src={logo} alt=''/>
            <nav>
                <StyledLink to='/' activeclassname='active'>首页</StyledLink>
                <StyledLink to='/history' activeclassname='active'>上传历史</StyledLink>
                <StyledLink to='/about' activeclassname='active'>关于我</StyledLink>
            </nav>
            <Login>
                {/*判断登录状态*/}
                {/*如果登录了就展示用户名否则展示登录/注册按钮*/}
                {UserStore.currentUser ? <>
                        {UserStore.currentUser.attributes.username} <StyledButton type="primary"
                                                                                  onClick={handleLogout}>注销</StyledButton>
                    </> :
                    <>
                        <StyledButton type="primary" onClick={handleLogin}>
                            登录
                        </StyledButton>
                        <StyledButton type="primary" onClick={handleRegister}>
                            注册
                        </StyledButton>
                    </>
                }
            </Login>
        </Header>
    )
})

export default Component


