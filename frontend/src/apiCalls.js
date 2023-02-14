import axios from "axios";

const signIn = async (token) => {
  try {
    await axios({
      method: "post",
      url: `${process.env.REACT_APP_SERVER}/api/signin`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return true;
  } catch (error) {
    return false;
  }
};

const emailSearch = async (query, token) => {
  try {
    const res = await axios({
      method: "post",
      url: `${process.env.REACT_APP_SERVER}/api/search`,
      data: { query },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data.data;
  } catch (error) {
    return [];
  }
};

const groupCreate = async (data, token) => {
  try {
    await axios({
      method: "post",
      url: `${process.env.REACT_APP_SERVER}/api/create`,
      data: data,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return true;
  } catch (error) {
    return false;
  }
};

const fetchInvites = async (token) => {
  try {
    const res = await axios({
      method: "get",
      url: `${process.env.REACT_APP_SERVER}/api/invites`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data.data.invites;
  } catch (error) {
    return [];
  }
};

const inviteAccept = async (data, token) => {
  try {
    await axios({
      method: "post",
      url: `${process.env.REACT_APP_SERVER}/api/accept`,
      data: data,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return true;
  } catch (error) {
    return false;
  }
};

const fetchGroups = async (token) => {
  try {
    const res = await axios({
      method: "get",
      url: `${process.env.REACT_APP_SERVER}/api/groups`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data.data.groups;
  } catch (error) {
    return [];
  }
};

const fetchPeople = async (data, token) => {
  try {
    const res = await axios({
      method: "post",
      url: `${process.env.REACT_APP_SERVER}/api/people`,
      data: data,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data.data.people;
  } catch (error) {
    return [];
  }
};

const fetchGroupName = async (data, token) => {
  try {
    const res = await axios({
      method: "post",
      url: `${process.env.REACT_APP_SERVER}/api/groupName`,
      data: data,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data.data.groupName;
  } catch (error) {
    return "Group";
  }
};

const fetchMessages = async (data, token) => {
  try {
    const res = await axios({
      method: "post",
      url: `${process.env.REACT_APP_SERVER}/api/messages`,
      data: data,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data.data.messages;
  } catch (error) {
    return [];
  }
};

export {
  signIn,
  emailSearch,
  groupCreate,
  fetchInvites,
  inviteAccept,
  fetchGroups,
  fetchPeople,
  fetchMessages,
  fetchGroupName
};
