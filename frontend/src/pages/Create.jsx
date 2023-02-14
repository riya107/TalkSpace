import "./pagestyles/Create.css";
import { AppContext } from "../App";
import { useContext, useEffect, useState } from "react";
import { emailSearch } from "../apiCalls";
import TrashLogo from "../logos/trash.svg";
import { groupCreate } from "../apiCalls";
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Create = () => {
  const [searchResults, setResults] = useState([]);
  const { setTabs, token } = useContext(AppContext);
  const [people, setPeople] = useState([]);
  const [groupDetails,setGroup] = useState({groupName:"",groupDescription:""});
  const addPeople = (e) => {
    const email = e.target.innerText;
    if(!people.includes(email)){
      setPeople([...people,email]);
    }
  };
  useEffect(() => {
    (async () => {
      setResults(await emailSearch("", token));
    })();
    setTabs({ home: false, groups: false, create: true, invitations: false });
  }, [setTabs, token]);

  const searchHandler = async (e) => {
    setResults(await emailSearch(e.target.value, token));
  };

  const removeDelete = async(e) =>{
    const email = e.target.getAttribute("data-email");
    const index = people.indexOf(email);
    if(index!==-1){
      setPeople([...people.slice(0,index), ...people.slice(index+1)]);
    }
  }

  const changeGroup = (e) =>{
    setGroup({...groupDetails,[e.target.name]:e.target.value});
  }

  const validateData = (data) =>{
    const {groupName,groupDescription,emails} = data;
    if(groupName.length===0 || groupDescription.length===0 || emails.length===0){
      toast.error('Enter valid group details!', {
        position: toast.POSITION.TOP_RIGHT
    });
      return false;
    }
    return true;
  }

  const createGroup = async () =>{
    const data = {
      groupName:groupDetails.groupName,
      groupDescription:groupDetails.groupDescription,
      emails:people
    }
    if(validateData(data)){
      const success = await groupCreate(data,token);
      if(success){
        setPeople([]);
        setGroup({groupName:"",groupDescription:""});
        toast.success('Group has been created successfully!', {
          position: toast.POSITION.TOP_RIGHT
      });
      }
      else{
        toast.error('Group could not be created!', {
          position: toast.POSITION.TOP_RIGHT
      });
      }
    }
  }
  return (
    <div>
      <div className="create-main">
        <div className="create-form">
          <div className="create-head">Create New Group</div>
          <div className="inp-box">
            <input
              onChange={changeGroup}
              type={"text"}
              name="groupName"
              value={groupDetails.groupName}
              placeholder="Group Name"
              className="create-inp"
            ></input>
          </div>
          <div className="inp-box">
            <input
              type={"text"}
              value={groupDetails.groupDescription}
              onChange={changeGroup}
              name="groupDescription"
              placeholder="Group Description"
              className="create-inp"
            ></input>
          </div>
          <div className="add">Add People</div>
          <div className="inp-box">
            <input
              type={"text"}
              name="searchQuery"
              className="create-inp"
              placeholder="Search By Email"
              onChange={searchHandler}
            ></input>
            <div className="search-results">
              {searchResults.length === 0 ? (
                <div className="res-lbl res-itm">No Result Found</div>
              ) : (
                <>
                  {searchResults.map((data) => {
                    return (
                      <>
                        <div className="res-email res-itm" onClick={addPeople}>
                          {data.email}
                        </div>
                        <hr color="#EEEEEE"></hr>
                      </>
                    );
                  })}
                </>
              )}
            </div>
          </div>
          <button className="crt-btn" onClick={createGroup}>Create Group</button>
        </div>
        <div className="added-people-out">
        <div className="add-lbl">Added People</div>
        <div className="added-people">
        {people.length===0?<div className='no-peop'>No People Added</div>:<>
          {people.map((data) => {
            return (
              <>
              <div className="people-tile">
                <div className="peop-itm">{data}</div>
                <div>
                  <img
                    data-email={data}
                    onClick={removeDelete}
                    src={TrashLogo}
                    height={25}
                    className="trashlogo"
                    alt="trash logo"
                  ></img>
                </div>
              </div>
              <hr color="#EEEEEE"/>
              </>
            );
          })}</>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Create;
