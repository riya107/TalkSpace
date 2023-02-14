import './compstyles/HamOps.css';
import { getAuth, signOut } from "firebase/auth";
import firebaseapp from '../firebaseinit';
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

const HamOps = () => {
    const navigate = useNavigate();
    const handleSignOut = ()=>{
        const auth = getAuth(firebaseapp);
        signOut(auth).then(()=>{
            navigate('/login');
            toast.info('You have been signed out!', {
                position: toast.POSITION.TOP_RIGHT
            });
        })
        .catch(()=>{
            toast.error('Sign Out Failed!', {
                position: toast.POSITION.TOP_RIGHT
            });
        });
    }
    return ( 
        <div>
            <div className="hamops">
                <div className="op" onClick={handleSignOut}>Sign Out</div>
            </div>
        </div>
     );
}
 
export default HamOps;