import "./compstyles/Group.css";
import { fetchPeople } from "../apiCalls";
import { AppContext } from "../App";
import { useContext, useState } from "react";
import CloseLogo from "../logos/close.svg";

const Group = (props) => {
  const [people, setPeople] = useState([]);
  const [vis, setVis] = useState(false);
  const { token } = useContext(AppContext);
  const getPeople = async (e) => {
    const data = {
      groupId: e.target.getAttribute("data-groupid"),
    };
    const people_ = await fetchPeople(data, token);
    setPeople(people_);
    setVis(true);
  };

  return (
    <>
      <div className={vis?"show-peop":"vis-hidd"}>
        <div className="pp-head">
          <div className="pp-lbl">Group: {props.groupName}</div>
          <div className="pp-lbl">People</div>
        <img
          onClick={()=>{setVis(false)}}
          src={CloseLogo}
          height={20}
          alt="close"
          className="close-logo"
        ></img>
        </div>
        {people.map((data) => {
          return (
            <div className="pop-tile">
              <div className="pop-name pop-it">{data.name}</div>
              <div className="pop-email pop-it">{data.email}</div>
            </div>
          );
        })}
      </div>
      <div className={props.selected?"group-card prev-sel g-sel":"group-card prev-sel"}>
        <div className="gp-it gp-row">
          <div className="group-name" data-groupid={props.groupId} onClick={props.onClick}>
            {props.groupName}
          </div>
          <div
            className="gp-pop"
            data-groupid={props.groupId}
            onClick={getPeople}
          >
            People
          </div>
        </div>
        <div className="group-des gp-it">{props.groupDescription}</div>
      </div>
    </>
  );
};

export default Group;
