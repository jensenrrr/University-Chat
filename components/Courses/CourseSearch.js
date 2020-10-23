import React from "react";
import {
  Text,
  View,
  StyleSheet,
  FlatList,
  TouchableHighlight,
  Button,
} from "react-native";
import { SearchBar } from "react-native-elements";
import courses from "../data/courses.json";
import * as firebase from "firebase";

export default class CourseSearch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      search: "",
      selected: {},
    };
    this.arrayholder = courses;
  }
  OnPressItem(item) {
    this.setState({
      selected: item,
    });
  }
  ConfirmPress() {
    if (this.state.selected != {}) {
      const newReference = firebase
        .database()
        .ref("/Users/" + firebase.auth().currentUser.uid + "/courses/")
        .child(this.state.selected.course_name);

      newReference
        .set({
          course: this.state.selected,
        })
        .then(() => {});
    }
  }
  SearchFilterFunction(text) {
    const newData = this.arrayholder.filter(function (item) {
      const itemData = item.course_name
        ? item.course_name.toUpperCase()
        : "".toUpperCase();
      const textData = text.toUpperCase();
      return itemData.indexOf(textData) > -1;
    });
    this.setState({
      dataSource: newData,
      search: text,
    });
  }

  render() {
    return (
      <View>
        <SearchBar
          onChangeText={(text) => this.SearchFilterFunction(text)}
          onClear={(text) => this.SearchFilterFunction("")}
          placeholder="Search For a Course"
          value={this.state.search}
        />
        <View style={styles.viewStyle}>
          <FlatList
            data={this.state.dataSource}
            renderItem={({ item }) => (
              <TouchableHighlight onPress={() => this.OnPressItem(item)}>
                <Text style={styles.textStyle}>{item.course_name}</Text>
              </TouchableHighlight>
            )}
            enableEmptySections={true}
            style={{ marginTop: 10 }}
            keyExtractor={(item, index) => index.toString()}
          />
        </View>
        <View style={styles.button}>
          <Button title="Confirm" onPress={() => this.ConfirmPress()} />
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  viewStyle: {
    backgroundColor: "white",
    maxHeight: "75%",
  },
  textStyle: {
    padding: 10,
  },
  button: {
    marginVertical: 8,
  },
});
