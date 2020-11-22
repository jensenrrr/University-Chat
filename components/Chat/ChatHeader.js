import React from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5";
class ChatHeader extends React.Component {
  render() {
    return (
      <View style={{ flexDirection: "row" }}>
        <Text
          style={{
            color: "#fff",
            textAlign: "center",
            marginTop: -2,
            fontSize: 16,
            fontWeight: "700",
            paddingRight: 20,
          }}
        >
          {this.props.name}
        </Text>
        <TouchableOpacity
          style={{
            width: 50,
            height: 50,
            position: "absolute",
            left: 285,
            top: -13,
            justifyContent: "center",
          }}
          onPress={() => {
            const { navigation } = this.props;
            navigation.navigate("Pins", {
              code: this.props.code,
              number: this.props.number,
              name: this.props.name,
            });
          }}
        >
          <Icon name="thumbtack" color="#fff" size={20} />
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    position: "absolute",
    right: 50,
    backgroundColor: "#ffffff",
    alignItems: "center",
    justifyContent: "center",
    height: 25,
    width: 25,
    borderRadius: 40,
  },
  icon: {
    height: 15,
    width: 15,
  },

  container: {
    flex: 1,
  },
});

export default ChatHeader;
