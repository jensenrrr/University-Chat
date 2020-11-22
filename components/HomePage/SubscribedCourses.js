import React from "react";
import { View, Text } from "react-native";
import Course from "./Course";

const emptyCourses = (
  <View>
    <Text>No classes added.</Text>
  </View>
);

const SubscribedCourses = ({ navigation, courses }) => {
  if (!courses || Object.keys(courses).length <= 0) return emptyCourses;

  return (
    <View
      style={{
        width: "100%",
        justifyContent: "center",
      }}
    >
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
        Course Chats
      </Text>
      {Object.keys(courses).map((chat, index) => (
        <Course
          chat={chat}
          name={courses[chat].course.course_name}
          number={courses[chat].course.course_number}
          code={courses[chat].course.course_code}
          navigation={navigation}
          key={
            courses[chat].course.course_code +
            courses[chat].course.course_number
          }
        />
      ))}
    </View>
  );
};

export default SubscribedCourses;
