import React from "react";
import { getCourseChat } from "../../utilities/dbAccess";
import Chat from "./Chat";

const CourseChat = ({ navigation, ...props }) => {
  const { code, number } = props.route.params;
  return (
    <Chat navigation={navigation} chatPath={getCourseChat(code, number)} />
  );
};

export default CourseChat;
