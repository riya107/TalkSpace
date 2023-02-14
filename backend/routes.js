const express = require("express");
const decodeToken = require("./middlewares");
const router = express.Router();
const User = require("./models/User");
const Group = require("./models/Group");

router.post("/signin", decodeToken, async (req, res) => {
  try {
    const { name } = req.body;
    const { email } = req.body;
    await User.updateOne({ email }, { name, email }, { upsert: true });
    const user = await User.findOne({ email });
    return res.status(200).json({ success: true, data: user });
  } catch (err) {
    console.log(err);
    return res.status(400).json({ success: false, message: "bad request" });
  }
});

router.post("/search", decodeToken, async (req, res) => {
  try {
    const { email } = req.body;
    const query = req.body.query.toLowerCase();
    const matches = await User.find(
      {
        $and: [
          { email: { $regex: ".*" + query + ".*" } },
          { email: { $ne: email } },
        ],
      },
      { _id: 0, email: 1 }
    );
    return res.status(200).json({ success: true, data: matches });
  } catch (err) {
    console.log(err);
    return res.status(400).json({ success: false, message: "bad request" });
  }
});

router.post("/create", decodeToken, async (req, res) => {
  try {
    const { groupName } = req.body;
    const { groupDescription } = req.body;
    const { emails } = req.body;
    const { name } = req.body;
    const { email } = req.body;
    const users = await User.find({ email: { $in: emails } });

    if (users.length != emails.length) {
      return res
        .status(400)
        .json({ success: false, message: "invalid email list" });
    }
    const group = new Group({
      groupName,
      groupDescription,
      creatorName: name,
      creatorEmail: email,
      people: [{name,email}],
    });

    const { _id: groupId } = await group.save();

    await User.updateMany(
      { email: { $in: emails } },
      {
        $push: {
          invites: {
            $each: [
              {
                groupId,
                groupName,
                groupDescription,
                creatorName: name,
                creatorEmail: email,
              },
            ],
            $position: 0,
          },
        },
      }
    );
    await User.updateOne(
    { email: email },
    {
        $push: {
        groups: groupId,
        },
    }
    );
    return res
      .status(200)
      .json({ success: true, message: "group creation successful" });
  } catch (err) {
    console.log(err);
    return res.status(400).json({ success: false, message: "bad request" });
  }
});

router.get("/invites", decodeToken, async (req, res) => {
  try {
    const { email } = req.body;
    const invites = await User.findOne({ email: email });
    return res.status(200).json({ success: true, data: invites });
  } catch (err) {
    console.log(err);
    return res.status(400).json({ success: false, message: "bad request" });
  }
});

router.post("/accept", decodeToken, async (req, res) => {
  try {
    const { name } = req.body;
    const { email } = req.body;
    const { groupId } = req.body;

    await User.findOneAndUpdate(
      { email: email, "invites.groupId": groupId },
      {
        $set: {
          "invites.$.accepted": true,
        },
      }
    );

    await Group.findByIdAndUpdate(
      { _id: groupId },
      {
        $push: {
          people: {
            name,
            email
          },
        },
      }
    );

    await User.updateOne(
      { email: email },
      {
        $push: {
          groups: groupId,
        },
      }
    );
    return res.status(200).json({ success: true, message: "accepted" });
  } catch (err) {
    console.log(err);
    return res.status(400).json({ success: false, message: "bad request" });
  }
});

router.get("/groups", decodeToken, async (req, res) => {
  try {
    const { email } = req.body;
    const groups = await User.findOne({ email: email })
      .select("groups")
      .populate({path: "groups", options: { sort: { 'updatedAt': -1 } } });

    return res.status(200).json({ success: true, data: groups });
  } catch (err) {
    console.log(err);
    return res.status(400).json({ success: false, message: "bad request" });
  }
});

router.post("/people", decodeToken, async (req, res) => {
  try {
    const { groupId } = req.body;
    const people = await Group.findById({_id:groupId}).select('people');
    return res.status(200).json({ success: true, data: people });
  } catch (err) {
    console.log(err);
    return res.status(400).json({ success: false, message: "bad request" });
  }
});

router.post("/messages", decodeToken, async (req, res) => {
  try {
    const { groupId } = req.body;
    const messages = await Group.findById({_id:groupId}).select('messages');
    return res.status(200).json({ success: true, data: messages });
  } catch (err) {
    console.log(err);
    return res.status(400).json({ success: false, message: "bad request" });
  }
});

router.post("/groupName", decodeToken, async (req, res) => {
  try {
    const { groupId } = req.body;
    const group = await Group.findById({_id:groupId});
    return res.status(200).json({ success: true, data: {groupName:group.groupName} });
  } catch (err) {
    console.log(err);
    return res.status(400).json({ success: false, message: "bad request" });
  }
});

module.exports = router;
