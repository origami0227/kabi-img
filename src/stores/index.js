import {useContext, createContext} from "react";
import AuthStore from "./auth";
import UserStore from './user'
import ImageStore from './image'
import HistoryStore from "./history";


//创建context对象
const context = createContext({
    //后续有别的store也放在context中
    AuthStore,
    UserStore,
    ImageStore,
    HistoryStore,
})
window.stores = {
    AuthStore,
    UserStore,
    ImageStore,
    HistoryStore,
}

export const useStores = () => useContext(context) //导出
