import "./pagestyles/Invitations.css";
import Invite from "../components/Invite";
import { AppContext } from "../App";
import { useContext, useEffect, useState} from "react";
import { fetchInvites } from "../apiCalls";

const Invitations = () => {
  const [invitations, setInvitations] = useState([]);
  const { setTabs, token } = useContext(AppContext);
  useEffect(() => {
    setTabs({ home: false, groups: false, create: false, invitations: true });
    (async () => {
      const invites = await fetchInvites(token);
      setInvitations(invites);
    })();
  }, [setTabs, token]);
  return (
    <div className="invite-out">
      <div className="invites">
        <div className="inv-lbl">Invites</div>
        {invitations.length===0?<div>No Invitation Available</div>:<>
        {invitations.map((data) => {
          return (
            <Invite
              groupName={data.groupName}
              groupDescription={data.groupDescription}
              sentBy={data.creatorName}
              senderEmail={data.creatorEmail}
              accepted={data.accepted}
              groupId={data.groupId}
            />
          );
        })}
        </>
        }
      </div>
    </div>
  );
};

export default Invitations;
