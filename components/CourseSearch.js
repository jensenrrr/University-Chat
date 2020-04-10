import React from 'react';
import { Text, View, StyleSheet, FlatList, TouchableHighlight, Button } from 'react-native';
import { SearchBar } from 'react-native-elements';
import courses from "./data/courses.json";
export default class CourseSearch extends React.Component {
  constructor(props) {
    super(props);
    this.state = { search: '' };
    this.arrayholder = courses;
  }
  OnPressItem(item) {
    console.log('Selected Item :', item);
  }
  SearchFilterFunction(text) {
    const newData = this.arrayholder.filter(function (item) {
      const itemData = item.course_name ? item.course_name.toUpperCase() : ''.toUpperCase();
      const textData = text.toUpperCase();
      return itemData.indexOf(textData) > -1;
    });
    this.setState({
      dataSource: newData,
      search: text,
    });
  }
  /*
  ListViewItemSeparator = () => {
    //Item sparator view
    return (
      <View
        style={{
          height: 0.3,
          width: '90%',
          backgroundColor: '#080808',
        }}
      />
    );
  };
*/
  render() {
    return (

      <View >
        <SearchBar
          onChangeText={text => this.SearchFilterFunction(text)}
          onClear={text => this.SearchFilterFunction('')}
          placeholder="Search For a Course"
          value={this.state.search}
        />
        <View style={styles.viewStyle}>
          <FlatList
            data={this.state.dataSource}

            renderItem={({ item }) => (
              <TouchableHighlight
                onPress={() => this.OnPressItem(item)}
              >
                <Text style={styles.textStyle}>{item.course_name}</Text>
              </TouchableHighlight>

            )}
            enableEmptySections={true}
            style={{ marginTop: 10 }}
            keyExtractor={(item, index) => index.toString()}
          />
          </View>
          <View style={styles.button}>
           
        <Button title="Confirm"
          
          onPress={() => console.log("ran")}
        />
      </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  viewStyle: {
    backgroundColor: 'white',
    maxHeight: '75%',
  },
  textStyle: {
    padding: 10,
  },
  button: {
    marginVertical: 8,
  },
});