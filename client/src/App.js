
import './App.css';
import{BrowserRouter ,Routes ,Route}from 'react-router-dom'
import Home from './components/Home'
import Login from './components/login'
import SingUp from './components/singUp'





function App() {

  const user = localStorage.setItem('token')

  return (
    <BrowserRouter>
    <Routes>
      {user && <Route path='/' element= {<Home/>}></Route>}
      <Route path='/Login' element= {<Login/>}></Route>
      <Route path='/SingUp' element= {<SingUp/>}></Route>
    </Routes>
    </BrowserRouter>
  );
}

export default App;
