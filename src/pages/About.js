import React from "react";

function About() {
    return (
        <>
            <h1>关于我</h1>
            <p>卡比图床项目是我在学习React以及相关工具时做的个人练习项目。旨在提高我对React框架的掌握水平以及相关钩子的使用。这个项目使用到了React、Mobx、styled-component以及第三方UI库——Ant
                Design，后端部分则使用的LeanCloud来实现用户的登录注册以及相关的数据管理任务。
                在开发的过程中遇到了一些工具版本兼容问题，也提高了我检索信息以及排查纠错的能力。在开发的过程中也通过博客的形式记录了我思路想法以及具体的实现过程。
                项目源码详见我的github仓库,欢迎各位的批评指正。
            </p>
            <strong>博客地址：<a href="https://juejin.cn/user/1394649148430445">掘金首页 </a></strong>
            <br/>
            <strong>Github地址：<a href="https://github.com/origami0227/kabi-img">kabi-img</a></strong>
        </>
    )
}

export default About