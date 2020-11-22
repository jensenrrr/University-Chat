const fs = require("fs");

const userStructExample = {
  firstName: "",
  lastName: "",
  email: "",
  profilePicture: "URL",
  university: "universityOfFlorida",
  courses: {
    uniqueid1: {
      metadata: "metadata",
      reference: "REFERENCE",
    },
    uniqueid2: {
      metadata: "metadata",
      reference: "REFERENCE",
    },
    uniqueid3: {
      metadata: "metadata",
      reference: "REFERENCE",
    },
  },
};

const courseChats = {
  universityOfFlorida: {
    uniqueId1: {
      meta: {
        code: "ASG1010",
        name: "Astronomical Gains",
      },
      messages: [],
    },
  },
  universityOfSouthFlorida: {
    uniqueId2: {
      meta: {
        code: "PUG1010",
        name: "Puny Gains",
        lastMessage: {
          text: "meme",
          name: "Phil Smith",
        },
      },
      messages: [],
    },
  },
};

const groupChats = {
  uniqueId1: {
    meta: {
      name: "Puny Gains",
      lastMessage: "That last test was hard!",
      lastMessageUser: "Fred T.",
    },
    messages: [],
  },
};

const ufCourses = {
  EEL4473: {
    course_code: "EEL",
    course_number: "4473",
    course_name: "Electromagnetic Fields and Applications",
    credits: "3",
  },
  EEL4495: {
    course_code: "EEL",
    course_number: "4495",
    course_name: "Lightning",
    credits: "3",
  },
  EEL4514C: {
    course_code: "EEL",
    course_number: "4514C",
    course_name: "Communication Systems and Components",
    credits: "4",
  },
};
const usfCourses = {
  EEL4473: {
    course_code: "EEL",
    course_number: "4473",
    course_name: "Electromagnetic Fields and Applications",
    credits: "3",
  },
  EEL4495: {
    course_code: "EEL",
    course_number: "4495",
    course_name: "Lightning",
    credits: "3",
  },
  EEL4514C: {
    course_code: "EEL",
    course_number: "4514C",
    course_name: "Communication Systems and Components",
    credits: "4",
  },
};
const db = {
  users: { userId: userStructExample },
  courses: {
    universityOfFlorida: [ufCourses],
    universityOfSouthFlorida: [usfCourses],
  },
  courseChats: courseChats,
  groupChats: groupChats,
};

let data = JSON.stringify(db);
fs.writeFileSync("dbExample.json", data);
