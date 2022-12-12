import React from "react";
import logo from './logo.svg'
import {NavLink} from "react-router-dom";
import styled from 'styled-components'

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

function Component() {
    return (
        <Header>
            <Logo src={logo} alt=''/>
            <nav>
                <StyledLink to='/' activeclassname='active'>首页</StyledLink>
                <StyledLink to='/history' activeclassname='active'>上传历史</StyledLink>
                <StyledLink to='/about' activeclassname='active'>关于我</StyledLink>
            </nav>
        </Header>
    )
}

export default Component