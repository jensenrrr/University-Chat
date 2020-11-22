export const getCourseChat = (code, number) => {
  return "/Chats/" + code + number;
};

export const getDirectMessages = (theirid, myid) => {
  return theirid + "/DMs/" + myid;
};
export const getGroupChats = (chatId) => {
  return "/GroupChats/" + chatId;
};
