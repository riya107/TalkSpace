import ChatLogo from "../logos/chatlogo.svg";
import GoogleLogo from "../logos/googlelogo.svg";
import "./pagestyles/Login.css";
import Home from "../components/Home";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import firebaseapp from "../firebaseinit";
import { useNavigate } from "react-router-dom";
import { signIn } from "../apiCalls";
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
  const navigate = useNavigate();
  const loginHandle = () => {
    const provider = new GoogleAuthProvider();
    const auth = getAuth(firebaseapp);
    signInWithPopup(auth, provider)
      .then((result) => {
        const user = result.user;
        const success = signIn(user.accessToken);
        if(success){
          navigate('/'); 
          toast.success('Login Successful!', {
            position: toast.POSITION.TOP_RIGHT
        });
        }
        else{
          toast.error('Login Failed!', {
            position: toast.POSITION.TOP_RIGHT
        });
        }
      })
      .catch(() => {
        toast.error('Login Failed!', {
          position: toast.POSITION.TOP_RIGHT
      });
      });
  };

  return (
    <div>
      <nav className="loginbar">
        <div className="logobox">
          <img
            src={ChatLogo}
            height={30}
            className="applogo"
            alt="app logo"
          ></img>
          <p className="logotext">Group Chat</p>
        </div>
        <div className="loginbox">
          <img
            src={GoogleLogo}
            height={25}
            alt="app logo"
            className="googlelogo"
          ></img>
          <button className="loginbtn" onClick={loginHandle}>
            Login
          </button>
        </div>
      </nav>
      <hr color="black" />
      <Home />
    </div>
  );
};

export default Login;
