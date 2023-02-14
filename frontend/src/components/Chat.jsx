import './compstyles/Chat.css';
import SendLogo from '../logos/send.svg';
import Message from './Message';
import { useState } from 'react';
import ScrollToBottom from 'react-scroll-to-bottom';
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Chat = (props) => {
    const [message, setMessage] = useState("");
    const handleEnterMessage = (e) =>{
        if (e.key === 'Enter') {
            if(message===""){
                toast.error('You can\'t send empty message!', {
                    position: toast.POSITION.TOP_RIGHT
                });
            }
            else{
                props.handleMessage(message);
                setMessage("");
            }
        }
    }
    const handleMessage = () =>{
        if(message===""){
            toast.error('You can\'t send empty message!', {
                position: toast.POSITION.TOP_RIGHT
            });
        }
        else{
            props.handleMessage(message);
            setMessage("");
        }
    }
    return (
        <div className="chat">
        <div className='grp-name'>{props.gpName}</div>
        <ScrollToBottom className='messages'>
            {props.messages.map((data)=>{
                return <Message senderName={data.senderName} message={data.message} senderEmail={data.senderEmail}/>
            })}
        </ScrollToBottom>
        <div className= {props.selected===-1?'hid':'snd'}>
        <input className='mess-inp' type={'text'} name='message' onChange={(e)=>{setMessage(e.target.value)}} onKeyDown={handleEnterMessage} value={message}></input>
        <div className='snd-out'>
        <img src={SendLogo} height={30} className="snd-img" alt='Send' onClick={handleMessage}></img>
        </div>
        </div>
        </div>
    );
}
 
export default Chat;