const mongoose = require("mongoose");

const inviteSchema = new mongoose.Schema(
  {
    groupId: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
    },
    groupName: {
      type: String,
    },
    groupDescription: {
      type: String,
    },
    creatorName: {
      type: String,
    },
    creatorEmail: {
      type: String,
    },
    accepted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    invites: {
      type: [inviteSchema],
      default: [],
    },
    groups: {
      type: [
        {
          type: mongoose.Schema.ObjectId,
          ref: "Group",
        },
      ],
      default: [],
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);
module.exports = User;
