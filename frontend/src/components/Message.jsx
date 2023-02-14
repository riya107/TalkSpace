import { AppContext } from '../App';
import './compstyles/Message.css';
import { useContext } from 'react';

const Message = (props) => {
    const {userEmail} = useContext(AppContext);
    return (
        <div className={props.senderEmail===userEmail?'mess-card mess-right':'mess-card mess-left'}>
            <div className='sender-name mess-it'>{props.senderEmail===userEmail?"You":`${props.senderName}`}</div>
            <div className='sent-mess mess-it'>{props.message}</div>
        </div>
     );
}
 
export default Message;