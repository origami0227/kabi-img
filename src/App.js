import Home from "./pages/Home";
import History from "./pages/History";
import About from "./pages/About";
import {Routes, Route} from 'react-router-dom'
import Header from "./components/Header";
import Footer from "./components/Footer";

function App() {
    return (
        <div className="app">
            <Header/>
            <Routes>
                {/*exact是精准匹配，只有路径完全一致才能被匹配到*/}
                {/*v6版本中用element代替了component/render*/}
                <Route path='/' exact element={<Home/>}/>
                <Route path='/history' element={<History/>}/>
                <Route path='/about' element={<About/>}/>
            </Routes>
            <Footer/>
        </div>
    );
}

export default App;
