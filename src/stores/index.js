import {useContext, createContext} from "react";
import AuthStore from "./auth";
import UserStore from './user'


//创建context对象
const context = createContext({
    //后续有别的store也放在context中
    AuthStore,
    UserStore,
})

export const useStores = () => useContext(context) //导出
