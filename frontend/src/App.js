import {  
  BrowserRouter as Router,  
  Routes,  
  Route
}   
from 'react-router-dom';

import Home from './components/Home'
import Login from './pages/Login';
import NavBar from './components/NavBar';
import Create from './pages/Create';
import Invitations from './pages/Invitations';
import Groups from './pages/Groups';

import './App.css';
import { createContext,useState } from 'react';
import { ToastContainer } from 'react-toastify';

const AppContext = createContext();

const App = () => {
  const [tabs, setTabs] = useState({home:true,groups:false,create:false,invitations:false});
  const [token, setToken] = useState(null);
  const [userEmail, setUserEmail] = useState(null);
  const [userName, setUserName] = useState(null);
  return ( 
    <AppContext.Provider value={{tabs,setTabs,token,setToken, userEmail, setUserEmail, userName,setUserName}}>
      <Router>
        <Routes>
          <Route path='/login' element={<Login/>}></Route>
          <Route path='/' element={<NavBar/>}>
            <Route index element={<Home/>}></Route>
            <Route path='/create' element={<Create/>}></Route>
            <Route path='/invitations' element={<Invitations/>}></Route>
            <Route path='/groups' element={<Groups/>}></Route>
          </Route>
        </Routes>
      </Router>
      <ToastContainer/>
      </AppContext.Provider>
   );
}
 
export {AppContext,App};
