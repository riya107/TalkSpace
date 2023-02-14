import './compstyles/Invite.css';
import { inviteAccept } from '../apiCalls';
import { AppContext } from '../App';
import {toast} from 'react-toastify';
import { useContext } from 'react';
import 'react-toastify/dist/ReactToastify.css';

const Invite = (props) => {
    const {token } = useContext(AppContext);

    const handleInvite = async (e) =>{
        const data = {groupId:e.target.getAttribute("data-groupid")};
        if(e.target.innerText==='Accept'){
            const success = await inviteAccept(data, token);
            if(success){
                e.target.innerText = 'Accepted';
                e.target.className = 'acceptedBtn';
                toast.success('Request is accepted!', {
                    position: toast.POSITION.TOP_RIGHT
                });
            }
            else{
                toast.error('Some error occured while accepting the request!', {
                    position: toast.POSITION.TOP_RIGHT
                });
            }
        }
    }
    return ( 
        <div className="card">
            <div className="namebox">
                <div className="lbl gpname">{props.groupName}</div>
                <button className={props.accepted===false?"accbtn":"acceptedBtn"} onClick={handleInvite} data-groupid={props.groupId}>{props.accepted?'Accepted':'Accept'}</button>
            </div>
            <div className="inv-box">
                <div className="lbl">Description</div>
                <div className="inf">{props.groupDescription}</div>
            </div>
            <div className="inv-box">
                <div className="lbl">Sent By</div>
                <div className="inf">{props.sentBy}</div>
                <div className="inf">{props.senderEmail}</div>
            </div>
        </div>
     );
}
 
export default Invite;