import React, {useContext, createContext} from "react";
import AuthStore from "./auth";


//创建context对象
const context = createContext({
    //后续有别的store也放在context中
    AuthStore: new AuthStore() //生成对象
})

export const useStores = () => useContext(context) //导出
