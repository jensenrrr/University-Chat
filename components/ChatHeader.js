import React from "react";
import { StyleSheet, View, Button } from "react-native";

class ChatHeader extends React.Component {
  render() {
    console.log(this.props);

    return (
      <View>
        <div>
          {this.props.name}
          <Button
            title="Pins"
            onPress={() => {
              const { navigation } = this.props;
              navigation.navigate("Pins", {
                code: this.props.code,
                number: this.props.number,
                name: this.props.name,
              });
            }}
          ></Button>
        </div>
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
