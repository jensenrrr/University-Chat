import React from "react";
import { View, Text, TouchableOpacity } from "react-native";

const Course = ({ navigation, chat, name, number, code }) => {
  return (
    <View>
      <TouchableOpacity
        style={styles.courseContainer}
        onPress={() =>
          navigation.navigate("CourseChat", {
            name: name,
            number: number,
            code: code,
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
            <Text style={{ color: "#fff", fontWeight: "700" }}>{code}</Text>
          </View>

          <Text style={{}}>
            {code}
            {number} - {chat}
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default Course;

const styles = {
  courseContainer: {
    borderColor: "#9F84BD",
    borderBottomWidth: 2,
    marginTop: "1%",
  },
};
