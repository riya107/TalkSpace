import ChatBg from '../logos/chatbg.svg';
import { AppContext } from '../App';
import { useContext, useEffect } from 'react';
import './compstyles/Home.css';

const Home = () => {
    const {setTabs} = useContext(AppContext);
    useEffect(() => {
        setTabs({home:true,groups:false,create:false,invitations:false});
      }, [setTabs]);
    return (
        <div className='bg'>
        <img src={ChatBg} className="chatbg" alt='chat bg'></img>
        <div className='secdiv'>
        <p className='sectext'>A secure place for group chat...</p>
        <p className='sectext right'>World's most trusted chat app...</p>
        </div>
        </div>
    );
}
 
export default Home;