import AV, {User} from "leancloud-storage";

AV.init({
    appId: "wWAUvlcYC9A5Ux3xSD4Iznm8-gzGzoHsz",
    appKey: "HM2s8fp2eR1ESJWPjVyKOtBQ",
    serverURL: "https://wwauvlcy.lc-cn-n1-shared.com"
});

//状态管理的办法
const Auth = {
    //注册逻辑
    register(username, password) {
        let user = new User()
        user.setUsername(username)
        user.setPassword(password)
        return new Promise((resolve, reject) => {
            user.signUp().then(loginedUser => {
                console.log('注册成功')
                resolve(loginedUser)
            }, error => {
                reject(error)
            })
        })
    },
    //登录逻辑
    login(username, password) {
        return new Promise((resolve, reject) => {
            User.logIn(username, password).then(loginedUser => {
                console.log('登录成功')
                resolve(loginedUser)
            }, error => {
                reject(error)
            })
        })
    },
    //注销
    logout() {
        User.logOut()
    },
    //获取当前用户信息
    getCurrentUser() {
        return User.current()
    }
}

console.log('start...')
//测试代码


export {Auth};
