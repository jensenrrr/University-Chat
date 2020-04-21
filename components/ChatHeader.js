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
  container: {
    flex: 1,
    backgroundColor: "#a29bfe",
  },
});

export default ChatHeader;
