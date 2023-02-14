const mongoose = require("mongoose");

const groupSchema = new mongoose.Schema(
  {
    groupName: {
      type: String,
      required: true,
    },
    groupDescription: {
      type: String,
      required: true,
    },
    creatorName: {
      type: String,
      required: true,
    },
    creatorEmail: {
      type: String,
      required: true,
    },
    people: {
      type: [
        {
          name: String,
          email: String,
        },
      ],
      default: [],
    },
    messages: {
      type: [
        {
          senderName: {
            type: String,
          },
          senderEmail: {
            type: String,
          },
          message: {
            type: String,
          },
        },
      ],
      default: [],
    },
  },
  { timestamps: true }
);

const Group = mongoose.model("Group", groupSchema);

module.exports = Group;
