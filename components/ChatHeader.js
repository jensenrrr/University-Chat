import React from "react";
import { StyleSheet, View, Button, TouchableOpacity, Text, Image } from "react-native";

class ChatHeader extends React.Component {
  render() {
    console.log(this.props);

    return (
      <View>
        <div>
          {this.props.name}
          <TouchableOpacity
          style= {styles.button}
            title="Pins"
            onPress={() => {
              const { navigation } = this.props;
              navigation.navigate("Pins", {
                code: this.props.code,
                number: this.props.number,
                name: this.props.name,
              });
            }}
          >
            
            <Image style= {styles.icon} source = {require('./pinicon.png')} />
          </TouchableOpacity>
        </div>
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
      //marginTop: 30,
     // paddingVertical: 10,
      borderRadius: 40,
  },
  icon: {
    height: 15,
    width: 15
  },

  container: {
    flex: 1,
    backgroundColor: "#9F84BD8"
  },
});

export default ChatHeader;
