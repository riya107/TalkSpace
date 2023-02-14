import "./pagestyles/Groups.css";
import Group from "../components/Group";
import { AppContext } from "../App";
import { useContext, useEffect, useState, useRef } from "react";
import Chat from "../components/Chat";
import { fetchGroupName, fetchGroups, fetchMessages } from "../apiCalls";
import socketIo from "socket.io-client";
let socket;

const Groups = () => {
  const { userEmail, userName} = useContext(AppContext);
  const [messages, setMessages] = useState([]);
  const [gpName, setGpName] = useState("Group");
  const [selected, setSelected] = useState(-1);
  const { setTabs, token } = useContext(AppContext);
  const [groups, setGroups] = useState([]);
  const refmessages=useRef(messages);
  useEffect(() => {
    setTabs({ home: false, groups: true, create: false, invitations: false });
  }, [setTabs]);

  useEffect(()=>{
    (async () => {
      if(token){
        const groups_ = await fetchGroups(token);
        setGroups(groups_);
      }
    })();
  },[token])

  const selectCard = async (e) => {
    const groupId = e.target.getAttribute("data-groupId");
    if(selected===groupId){
      return;
    }
    const messages_ = await fetchMessages({ groupId }, token);
    if(selected!==-1){
      socket.emit('switching',{groupId:selected});
    }
    setSelected(groupId);
    setMessages(messages_);
    const gp_ = await fetchGroupName({ groupId }, token);
    setGpName(gp_);
    refmessages.current=messages_;
    socket = socketIo(process.env.REACT_APP_SERVER, {
      cors: {
        origin: process.env.REACT_APP_SERVER,
        credentials: true,
      },
      transports: ["websocket"],
    });
    socket.on("connect", () => {
      socket.emit('join',{groupId});
    });

    socket.on("message", (data) => {
      setMessages([...refmessages.current,data]);
      refmessages.current=[...refmessages.current,data];
    });
  };

  const handleMessage = (message) => {
    socket.emit("sendMessage", {senderName:userName, senderEmail:userEmail, message, groupId:selected});
  };
  
  return (
    <div className="groups-out">
      <div className="groups">
        <div className="groups-head">Groups</div>
        {groups.length === 0 ? (
          <div>No Group Available</div>
        ) : (
          <>
            {groups.map((data) => {
              return (
                <Group
                  groupName={data.groupName}
                  groupDescription={data.groupDescription}
                  handleMessage={handleMessage}
                  groupId={data._id}
                  onClick={selectCard}
                  selected={selected === data._id}
                />
              );
            })}
          </>
        )}
      </div>
      <Chat
        messages={messages}
        selected={selected}
        gpName={gpName}
        handleMessage={handleMessage}
      />
    </div>
  );
};

export default Groups;
