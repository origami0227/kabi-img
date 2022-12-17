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

//上传文件
const UpLoader = {
    //上传图片 调用add方法
    add(file, filename) {
        //当用户调用UpLoader的add的时候需要向服务器创建一个图片信息,要传输file，filename两个参数
        //首先需要构造对象
        const item = new AV.Object("image") //item代表上传的文件
        const avFile = new AV.File(filename, file) //文件路径
        item.set('filename', filename) //设置文件名
        item.set("owner", AV.User) //设置文件所有者
        item.set('url', avFile) //设置文件的路径
        //保存
        return new Promise((resolve, reject) => {
            item.save().then((serverFile) => {
                console.log('保存成功')
                resolve(serverFile)
            }, (error) => {
                console.log('保存失败')
                alert(JSON.stringify(error))
                reject(error)
            })
        })
    }
}


export {Auth, UpLoader};
