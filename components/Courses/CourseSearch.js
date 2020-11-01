import React, { useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { SearchBar } from "react-native-elements";
import courses from "../data/courses.json";
import * as firebase from "firebase";

const CourseSearch = (props) => {
  const [searchText, setSearchText] = useState("");
  const [searchResults, setSearchResults] = useState(null);

  const AddCourseChat = (item) => {
    if (item && item.course_name) {
      const newCourseChat = firebase
        .database()
        .ref("/Users/" + firebase.auth().currentUser.uid + "/courses/")
        .child(item.course_name);

      newCourseChat
        .set({
          course: item,
        })
        .then(() => {});
    }
  }

  const SearchFilterFunction = (text) => {
    const newData = courses.filter(function (item) {
      const itemData = item.course_name
        ? item.course_name.toUpperCase()
        : "".toUpperCase();
      const textData = text.toUpperCase();
      return itemData.indexOf(textData) > -1;
    });
    setSearchResults(newData.length > 10 ? newData.slice(0, 10): newData);
    setSearchText(text);
  }

  return (
    <View>
        <SearchBar
          onChangeText={(text) => SearchFilterFunction(text)}
          onClear={(text) => SearchFilterFunction("")}
          placeholder="Search For a Course"
          value={searchText}
        />
        <View style={styles.viewStyle}>
          <FlatList
            data={searchResults}
            renderItem={({ item }) => (
                <View style={styles.courseContainer}>
                    <View style={styles.textContainer}>
                      <Text>{item.course_code}{item.course_number}{"    "}</Text>
                      <Text style={styles.textStyle}>{item.course_name}</Text>
                    </View>
                  <TouchableOpacity style={styles.addButton}  onPress={() => AddCourseChat(item)}>
                    <Text style={styles.buttonText}> Add Chat </Text>
                  </TouchableOpacity>
                </View>
            )}
            enableEmptySections={true}
            style={{flexDirection: 'column'}}
            keyExtractor={(item, index) => index.toString()}
          />
        </View>
    </View>
  );
}

export default  CourseSearch;

const styles = StyleSheet.create({
  viewStyle: {
    backgroundColor: "white",
    height: 600,
  },
  courseContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    margin: "25 0",
    height: "200",
    padding: 20
  },
  textContainer: {
    width: "75%",
    flexDirection: 'row'
  },
  textStyle: {
  },
  addButton: {
    backgroundColor: "#90EE90",
    padding: 5
  },
  button: {
    marginVertical: 8,
  },
});
