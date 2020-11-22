import React from "react";
import { getDirectMessages } from "../../utilities/dbAccess";
import Chat from "./Chat";

const GroupChat = ({ navigation, ...props }) => {
  const { theirid, myid } = props.route.params;
  return (
    <Chat navigation={navigation} chatPath={getDirectMessages(theirid, myid)} />
  );
};

export default GroupChat;
