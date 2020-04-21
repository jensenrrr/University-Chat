import React from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome5';
class ChatHeader extends React.Component {
  render() {
    return (
      
        <View style={{flexDirection:"row"}}>
       
        <Text style={{color:"#fff", textAlign:"center", margin:"4%"}}>{this.props.name}</Text>
        <TouchableOpacity
       style={{width:50, height:50, justifyContent:"center"}}
            onPress={() => {
              const { navigation } = this.props;
              navigation.navigate("Pins", {
                code: this.props.code,
                number: this.props.number,
                name: this.props.name,
              });
            }}
          >
            <Icon raised name="thumbtack" color="#fff" /></TouchableOpacity>
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
