import {Routes, Route} from 'react-router-dom'
import Header from "./components/Header";
import Footer from "./components/Footer";
import React, {Suspense, lazy} from 'react';
import Loading from "./components/Loading";
import './App.css'
// import Home from "./pages/Home";
// import History from "./pages/History";
// import About from "./pages/About";
//对这三个界面组件进行懒加载
const Home = lazy(() => import('./pages/Home'))
const History = lazy(() => import('./pages/History'))
const About = lazy(() => import('./pages/About'))
const Login = lazy(()=>{import('./pages/Login')})
const Register = lazy(()=>import('./pages/Register'))

function App() {
    return (
        <>
            <Header/>
            <main>
                <Suspense fallback={<Loading/>}>
                    {/*fallback 方法用于组件没有加载完成时页面的显示*/}
                    <Routes>
                        {/*exact是精准匹配，只有路径完全一致才能被匹配到*/}
                        {/*v6版本中用element代替了component/render*/}
                        <Route path='/' exact element={<Home/>}/>
                        <Route path='/history' element={<History/>}/>
                        <Route path='/about' element={<About/>}/>
                        <Route path='/login' element={<Login/>}/>
                        <Route path='/register' element={<Register/>}/>
                    </Routes>
                </Suspense>
            </main>
            <Footer/>
        </>
    );
}

export default App;
