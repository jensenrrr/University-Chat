import React from "react";
import { View, Text, TouchableOpacity } from "react-native";

const SubscribedGroupChats = ({ navigation, dms, id }) => {
  return (
    <View>
      <View>
        <Text
          style={{
            justifyContent: "center",
            color: "#9F84BD",
            fontWeight: "600",
            marginTop: "1%",
            marginBottom: "2%",
            textAlign: "center",
            borderColor: "#9F84BD",
            borderBottomWidth: 1,
          }}
        >
          Direct Messages
        </Text>
      </View>
      {dms
        ? Object.keys(dms).map((chat) => (
            <View key={chat}>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate("DirectMessage", {
                    name: dms[chat].name,
                    chat: chat,
                    theirid: id,
                    myid: firebase.auth().currentUser.uid,
                  })
                }
              >
                <View style={{ flexDirection: "row" }}>
                  <View
                    style={{
                      height: 50,
                      width: 50,
                      backgroundColor: "#9F84BD",
                      borderRadius: 3,
                      alignItems: "center",
                      justifyContent: "center",
                      marginBottom: "2%",
                      marginRight: "1%",
                      marginLeft: "1%",
                    }}
                  >
                    <Text style={{ color: "#fff", fontWeight: "700" }}>
                      {dms[chat].name}
                    </Text>
                  </View>
                  <Text style={{}}>{dms[chat].name}</Text>
                </View>
              </TouchableOpacity>
            </View>
          ))
        : null}
    </View>
  );
};

export default SubscribedGroupChats;
