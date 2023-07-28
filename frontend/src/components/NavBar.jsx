import { Outlet, useNavigate } from 'react-router';
import ChatLogo from '../logos/chatlogo.svg';
import Hamburger from '../logos/hamburger.svg';
import { Link } from 'react-router-dom';
import HamOps from './HamOps';
import { useState } from 'react';
import { AppContext } from '../App';
import { useContext } from 'react';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import firebaseapp from '../firebaseinit';
import './compstyles/NavBar.css';

const NavBar = () => {
    const auth = getAuth(firebaseapp);
    const navigate = useNavigate();
    const {setToken, setUserEmail, setUserName} = useContext(AppContext);
    onAuthStateChanged(auth, (user) => {
      if (!user) {
        navigate('/login');
      }
      else{
        setToken(user.accessToken);
        setUserEmail(user.email);
        setUserName(user.displayName);
      }
    });
    const {tabs} = useContext(AppContext);
    const [opVis, setVis] = useState(false);

    const hamburgerHandler=()=>{
        if(opVis===false){
            setVis(true);
        }
        else{
            setVis(false);
        }
    }
    return ( 
        <div>
            {opVis?<HamOps/>:null}
            <nav className='navbar'>
                <div className='leftnav'>
                <div className='applogobox'>
                    <img src={ChatLogo} height={30} className="navapplogo" alt='app logo'></img>
                    <p className='navlogotext'>TalkSpace</p>
                </div>
                <div className='navitems'>
                    <Link to='/' className={tabs.home?'navi bg-w':'navi'}>Home</Link>
                    <Link to= '/groups' className={tabs.groups?'navi bg-w':'navi'}>Groups</Link>
                    <Link to='/create' className={tabs.create?'navi bg-w':'navi'}>Create</Link>
                    <Link to='/invitations' className={tabs.invitations?'navi bg-w':'navi'}>Invitations</Link>
                </div>
                </div>
                <div className='hambox'>
                <img src={Hamburger} onClick={hamburgerHandler} height={30} className="hamburger" alt='hamburger menu'></img>
                </div>
            </nav>
            <hr color='black'/>
            <Outlet/>
        </div>
    );
}
 
export default NavBar;