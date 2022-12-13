import React, {useState} from "react";
import logo from './logo.svg'
import {NavLink} from "react-router-dom";
import styled from 'styled-components'
import {Button} from "antd";

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


function Component() {
    //状态判断
    const [isLogin, setIsLogin] = useState(false) //默认是false
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
                {isLogin ? <>
                        卡比兽 <StyledButton type="primary" onClick={()=>setIsLogin(false)}>注销</StyledButton>
                    </> :
                    <>
                        <StyledButton type="primary" onClick={()=>setIsLogin(true)}>
                            <NavLink to="/login">登录</NavLink>
                        </StyledButton>
                        <StyledButton type="primary">
                            <NavLink to='/register'>注册</NavLink>
                        </StyledButton>
                    </>
                }
            </Login>
        </Header>
    )
}

export default Component


